import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;

export type FitnessGoal = { weightLoss: null } | { muscleGain: null } | { generalFitness: null };

export interface UserProfile {
    name: string;
    age: bigint;
    weight: number;
    height: number;
    goal: FitnessGoal;
    targetDays: bigint;
    startTime: bigint;
}

export interface CheckIn {
    day: bigint;
    workoutDone: boolean;
    mealsDone: boolean;
    note: string;
    timestamp: bigint;
    photoAssetId: string | null;
}

export interface UserStats {
    profile: UserProfile;
    checkIns: Array<CheckIn>;
    progressPercent: bigint;
    daysRemaining: bigint;
}

export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}

export interface backendInterface {
    saveUserProfile(profile: UserProfile): Promise<void>;
    getMyProfile(): Promise<UserProfile | null>;
    saveCheckIn(checkIn: CheckIn): Promise<void>;
    getMyCheckIns(): Promise<Array<CheckIn>>;
    getMyStats(): Promise<UserStats | null>;
    getCheckInForDay(day: bigint): Promise<CheckIn | null>;
    adminGetAllUsers(): Promise<Array<[Principal, UserStats]>>;
    getCallerUserRole(): Promise<UserRole>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    // blob storage
    getUploadUrl(filename: string, contentType: string): Promise<string>;
    getAssetUrl(assetId: string): Promise<string>;
}
