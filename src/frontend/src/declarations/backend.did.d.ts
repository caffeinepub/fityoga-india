/* eslint-disable */
// @ts-nocheck
// This file was manually generated for GymCoach Pro.

import type { ActorMethod } from '@icp-sdk/core/agent';
import type { IDL } from '@icp-sdk/core/candid';
import type { Principal } from '@icp-sdk/core/principal';

export type FitnessGoal = { 'weightLoss': null } | { 'muscleGain': null } | { 'generalFitness': null };

export interface CheckIn {
  'day': bigint;
  'mealsDone': boolean;
  'note': string;
  'photoAssetId': [] | [string];
  'timestamp': bigint;
  'workoutDone': boolean;
}

export interface UserProfile {
  'age': bigint;
  'goal': FitnessGoal;
  'height': number;
  'name': string;
  'startTime': bigint;
  'targetDays': bigint;
  'weight': number;
}

export interface UserStats {
  'checkIns': Array<CheckIn>;
  'daysRemaining': bigint;
  'profile': UserProfile;
  'progressPercent': bigint;
}

export type UserRole = { 'admin': null } | { 'user': null } | { 'guest': null };

export interface _SERVICE {
  '_initializeAccessControlWithSecret': ActorMethod<[string], undefined>;
  'adminGetAllUsers': ActorMethod<[], Array<[Principal, UserStats]>>;
  'assignCallerUserRole': ActorMethod<[Principal, UserRole], undefined>;
  'getCallerUserRole': ActorMethod<[], UserRole>;
  'getCheckInForDay': ActorMethod<[bigint], [] | [CheckIn]>;
  'getMyCheckIns': ActorMethod<[], Array<CheckIn>>;
  'getMyProfile': ActorMethod<[], [] | [UserProfile]>;
  'getMyStats': ActorMethod<[], [] | [UserStats]>;
  'isCallerAdmin': ActorMethod<[], boolean>;
  'saveCheckIn': ActorMethod<[CheckIn], undefined>;
  'saveUserProfile': ActorMethod<[UserProfile], undefined>;
}

export declare const idlService: IDL.ServiceClass;
export declare const idlInitArgs: IDL.Type[];
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
