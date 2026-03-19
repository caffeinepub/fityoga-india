import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Question {
    question: string;
    correctIndex: bigint;
    options: Array<string>;
}
export interface Lesson {
    title: string;
    content: string;
    keyPoints: Array<string>;
}
export interface UserProgress {
    moduleScores: Array<[bigint, bigint]>;
    totalScore: bigint;
    completedLessons: Array<bigint>;
    certified: boolean;
}
export interface UserProfile {
    age: bigint;
    name: string;
    location: string;
}
export interface Module {
    id: bigint;
    title: string;
    description: string;
    lessons: Array<Lesson>;
    questions: Array<Question>;
    orderIndex: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addLesson(moduleId: bigint, lesson: Lesson): Promise<void>;
    addModule(title: string, description: string, orderIndex: bigint): Promise<bigint>;
    addQuestion(moduleId: bigint, question: Question): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    completeLesson(moduleId: bigint, lessonIndex: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getLeaderboard(): Promise<Array<[Principal, bigint]>>;
    getModules(): Promise<Array<Module>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserProgress(user: Principal): Promise<UserProgress>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitQuiz(moduleId: bigint, moduleScore: bigint): Promise<void>;
}
