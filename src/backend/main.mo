import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Time "mo:core/Time";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type FitnessGoal = { #weightLoss; #muscleGain; #generalFitness };

  type UserProfile = {
    name : Text;
    age : Nat;
    weight : Float;
    height : Float;
    goal : FitnessGoal;
    targetDays : Nat;
    startTime : Int;
  };

  // Old types preserved for stable variable compatibility during upgrade
  type OldUserProfile = {
    name : Text;
    age : Nat;
    location : Text;
  };

  type OldLesson = {
    title : Text;
    content : Text;
    keyPoints : [Text];
  };

  type OldQuestion = {
    question : Text;
    options : [Text];
    correctIndex : Nat;
  };

  type OldModule = {
    id : Nat;
    title : Text;
    description : Text;
    orderIndex : Nat;
    lessons : [OldLesson];
    questions : [OldQuestion];
  };

  type OldUserProgress = {
    completedLessons : [Nat];
    moduleScores : [(Nat, Nat)];
    totalScore : Nat;
    certified : Bool;
  };

  type CheckIn = {
    day : Nat;
    workoutDone : Bool;
    mealsDone : Bool;
    note : Text;
    timestamp : Int;
    photoAssetId : ?Text;
  };

  type UserStats = {
    profile : UserProfile;
    checkIns : [CheckIn];
    progressPercent : Nat;
    daysRemaining : Int;
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Old stable variables kept with original types to satisfy compatibility
  let modules = Map.empty<Nat, OldModule>();
  var nextModuleId : Nat = 1;
  let userProgress = Map.empty<Principal, OldUserProgress>();
  let userProfiles = Map.empty<Principal, OldUserProfile>();

  // New stable variables for GymCoach Pro
  let gymProfiles = Map.empty<Principal, UserProfile>();
  let userCheckIns = Map.empty<Principal, [CheckIn]>();

  system func postupgrade() {
    modules.clear();
    userProgress.clear();
    userProfiles.clear();
  };

  func computeStats(p : Principal, profile : UserProfile) : UserStats {
    let checkIns = switch (userCheckIns.get(p)) {
      case (null) { [] };
      case (?list) { list };
    };
    let doneCount = checkIns.filter(func(c : CheckIn) : Bool { c.workoutDone }).size();
    let progressPercent = if (profile.targetDays == 0) { 0 } else {
      (doneCount * 100) / profile.targetDays;
    };
    let daysPassed = Int.abs((Time.now() - profile.startTime) / 86_400_000_000_000);
    let daysRemaining : Int = Int.max(0, profile.targetDays - daysPassed);
    { profile; checkIns; progressPercent; daysRemaining };
  };

  public shared ({ caller }) func saveUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    gymProfiles.add(caller, profile);
  };

  public query ({ caller }) func getMyProfile() : async ?UserProfile {
    gymProfiles.get(caller);
  };

  public shared ({ caller }) func saveCheckIn(checkIn : CheckIn) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let existing = switch (userCheckIns.get(caller)) {
      case (null) { [] };
      case (?list) { list };
    };
    let filtered = existing.filter(func(c : CheckIn) : Bool { c.day != checkIn.day });
    userCheckIns.add(caller, filtered.concat([checkIn]));
  };

  public query ({ caller }) func getMyCheckIns() : async [CheckIn] {
    switch (userCheckIns.get(caller)) {
      case (null) { [] };
      case (?list) { list };
    };
  };

  public query ({ caller }) func getMyStats() : async ?UserStats {
    switch (gymProfiles.get(caller)) {
      case (null) { null };
      case (?profile) { ?computeStats(caller, profile) };
    };
  };

  public query ({ caller }) func adminGetAllUsers() : async [(Principal, UserStats)] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized");
    };
    let entries = gymProfiles.entries().toArray();
    var result : [(Principal, UserStats)] = [];
    for (e in entries.values()) {
      result := result.concat([(e.0, computeStats(e.0, e.1))]);
    };
    result;
  };

  public query ({ caller }) func getCheckInForDay(day : Nat) : async ?CheckIn {
    switch (userCheckIns.get(caller)) {
      case (null) { null };
      case (?list) {
        list.find(func(c : CheckIn) : Bool { c.day == day });
      };
    };
  };
};
