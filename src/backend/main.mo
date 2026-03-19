import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type Lesson = {
    title : Text;
    content : Text;
    keyPoints : [Text];
  };

  type Question = {
    question : Text;
    options : [Text];
    correctIndex : Nat;
  };

  type Module = {
    id : Nat;
    title : Text;
    description : Text;
    orderIndex : Nat;
    lessons : [Lesson];
    questions : [Question];
  };

  type UserProgress = {
    completedLessons : [Nat];
    moduleScores : [(Nat, Nat)];
    totalScore : Nat;
    certified : Bool;
  };

  type UserProfile = {
    name : Text;
    age : Nat;
    location : Text;
  };

  module UserProgress {
    public func compare(a : (Principal, UserProgress), b : (Principal, UserProgress)) : Order.Order {
      Nat.compare(b.1.totalScore, a.1.totalScore);
    };
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let modules = Map.empty<Nat, Module>();
  let userProgress = Map.empty<Principal, UserProgress>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextModuleId = 1;

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Module Management (Admin only)
  public shared ({ caller }) func addModule(title : Text, description : Text, orderIndex : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add modules");
    };

    let newModule : Module = {
      id = nextModuleId;
      title;
      description;
      orderIndex;
      lessons = [];
      questions = [];
    };

    modules.add(nextModuleId, newModule);
    nextModuleId += 1;
    newModule.id;
  };

  public shared ({ caller }) func addLesson(moduleId : Nat, lesson : Lesson) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add lessons");
    };

    switch (modules.get(moduleId)) {
      case (null) { Runtime.trap("Module does not exist") };
      case (?mod) {
        let updatedLessons = mod.lessons.concat([lesson]);
        let updatedModule : Module = {
          mod with
          lessons = updatedLessons
        };
        modules.add(moduleId, updatedModule);
      };
    };
  };

  public shared ({ caller }) func addQuestion(moduleId : Nat, question : Question) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add questions");
    };

    switch (modules.get(moduleId)) {
      case (null) { Runtime.trap("Module does not exist") };
      case (?mod) {
        let updatedQuestions = mod.questions.concat([question]);
        let updatedModule : Module = {
          mod with
          questions = updatedQuestions
        };
        modules.add(moduleId, updatedModule);
      };
    };
  };

  // User Progress Management (User only)
  public shared ({ caller }) func completeLesson(moduleId : Nat, lessonIndex : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can complete lessons");
    };

    let currentProgress = switch (userProgress.get(caller)) {
      case (null) {
        {
          completedLessons = [];
          moduleScores = [];
          totalScore = 0;
          certified = false;
        };
      };
      case (?progress) { progress };
    };

    let lessonId = (moduleId * 1000) + lessonIndex;
    if (currentProgress.completedLessons.find(func(x) { x == lessonId }) != null) {
      Runtime.trap("Lesson already completed");
    };

    let updatedLessons = currentProgress.completedLessons.concat([lessonId]);
    let updatedProgress : UserProgress = {
      currentProgress with
      completedLessons = updatedLessons
    };

    userProgress.add(caller, updatedProgress);
  };

  public shared ({ caller }) func submitQuiz(moduleId : Nat, moduleScore : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit quizzes");
    };

    let currentProgress = switch (userProgress.get(caller)) {
      case (null) {
        {
          completedLessons = [];
          moduleScores = [];
          totalScore = 0;
          certified = false;
        };
      };
      case (?progress) { progress };
    };

    let updatedScores = currentProgress.moduleScores.filter(
      func((id, _)) { id != moduleId }
    ).concat([(moduleId, moduleScore)]);

    let newTotalScore = updatedScores.foldLeft(
      0,
      func(acc, tuple) { acc + tuple.1 }
    );

    let allModulesCompleted = modules.size() == updatedScores.size();
    let certified = allModulesCompleted and ((newTotalScore / modules.size()) >= 70);

    let updatedProgress : UserProgress = {
      currentProgress with
      moduleScores = updatedScores;
      totalScore = newTotalScore;
      certified;
    };

    userProgress.add(caller, updatedProgress);
  };

  // Public Query Functions (No authentication required)
  public query ({ caller }) func getLeaderboard() : async [(Principal, Nat)] {
    let sortedUsers = userProgress.entries().toArray().sort(
      func(a, b) {
        Nat.compare(b.1.totalScore, a.1.totalScore);
      }
    );

    let topUsers = sortedUsers.map(
      func((user, progress)) { (user, progress.totalScore) }
    );

    topUsers;
  };

  public query ({ caller }) func getModules() : async [Module] {
    modules.values().toArray();
  };

  // User Progress Query (User can view own, Admin can view any)
  public query ({ caller }) func getUserProgress(user : Principal) : async UserProgress {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own progress");
    };

    switch (userProgress.get(user)) {
      case (null) {
        Runtime.trap("No progress found for user");
      };
      case (?progress) { progress };
    };
  };
};
