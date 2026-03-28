/* eslint-disable */
// @ts-nocheck

import { IDL } from '@icp-sdk/core/candid';

const FitnessGoal = IDL.Variant({
  weightLoss: IDL.Null,
  muscleGain: IDL.Null,
  generalFitness: IDL.Null,
});

const CheckIn = IDL.Record({
  day: IDL.Nat,
  mealsDone: IDL.Bool,
  note: IDL.Text,
  photoAssetId: IDL.Opt(IDL.Text),
  timestamp: IDL.Int,
  workoutDone: IDL.Bool,
});

const UserProfile = IDL.Record({
  age: IDL.Nat,
  goal: FitnessGoal,
  height: IDL.Float64,
  name: IDL.Text,
  startTime: IDL.Int,
  targetDays: IDL.Nat,
  weight: IDL.Float64,
});

const UserStats = IDL.Record({
  checkIns: IDL.Vec(CheckIn),
  daysRemaining: IDL.Int,
  profile: UserProfile,
  progressPercent: IDL.Nat,
});

const UserRole = IDL.Variant({
  admin: IDL.Null,
  user: IDL.Null,
  guest: IDL.Null,
});

export const idlFactory = ({ IDL }) => {
  const FitnessGoal = IDL.Variant({
    weightLoss: IDL.Null,
    muscleGain: IDL.Null,
    generalFitness: IDL.Null,
  });
  const CheckIn = IDL.Record({
    day: IDL.Nat,
    mealsDone: IDL.Bool,
    note: IDL.Text,
    photoAssetId: IDL.Opt(IDL.Text),
    timestamp: IDL.Int,
    workoutDone: IDL.Bool,
  });
  const UserProfile = IDL.Record({
    age: IDL.Nat,
    goal: FitnessGoal,
    height: IDL.Float64,
    name: IDL.Text,
    startTime: IDL.Int,
    targetDays: IDL.Nat,
    weight: IDL.Float64,
  });
  const UserStats = IDL.Record({
    checkIns: IDL.Vec(CheckIn),
    daysRemaining: IDL.Int,
    profile: UserProfile,
    progressPercent: IDL.Nat,
  });
  const UserRole = IDL.Variant({
    admin: IDL.Null,
    user: IDL.Null,
    guest: IDL.Null,
  });
  return IDL.Service({
    _initializeAccessControlWithSecret: IDL.Func([IDL.Text], [], []),
    adminGetAllUsers: IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Principal, UserStats))], ['query']),
    assignCallerUserRole: IDL.Func([IDL.Principal, UserRole], [], []),
    getCallerUserRole: IDL.Func([], [UserRole], ['query']),
    getCheckInForDay: IDL.Func([IDL.Nat], [IDL.Opt(CheckIn)], ['query']),
    getMyCheckIns: IDL.Func([], [IDL.Vec(CheckIn)], ['query']),
    getMyProfile: IDL.Func([], [IDL.Opt(UserProfile)], ['query']),
    getMyStats: IDL.Func([], [IDL.Opt(UserStats)], ['query']),
    isCallerAdmin: IDL.Func([], [IDL.Bool], ['query']),
    saveCheckIn: IDL.Func([CheckIn], [], []),
    saveUserProfile: IDL.Func([UserProfile], [], []),
  });
};

export const idlService = idlFactory({ IDL });
export const idlInitArgs = [];
export const init = ({ IDL }) => [];
