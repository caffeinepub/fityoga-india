// GymCoach Pro local types (independent of auto-generated backend types)

export type FitnessGoal = "weightLoss" | "muscleGain" | "generalFitness";

export interface GymUserProfile {
  name: string;
  age: number;
  weight: number;
  height: number;
  goal: FitnessGoal;
  targetDays: number;
  startTime: number; // ms timestamp
}

export interface GymCheckIn {
  day: number; // unix day (Math.floor(Date.now() / 86400000))
  workoutDone: boolean;
  mealsDone: boolean;
  note: string;
  timestamp: number; // ms
  photoAssetId: string | null;
}

export interface GymUserStats {
  profile: GymUserProfile;
  checkIns: GymCheckIn[];
  progressPercent: number;
  daysRemaining: number;
}

// Helpers for converting between UI goal string and backend variant
export function stringToBackendGoal(s: FitnessGoal): Record<string, null> {
  if (s === "weightLoss") return { weightLoss: null };
  if (s === "muscleGain") return { muscleGain: null };
  return { generalFitness: null };
}

export function backendGoalToString(goal: unknown): FitnessGoal {
  if (goal && typeof goal === "object") {
    if ("weightLoss" in goal) return "weightLoss";
    if ("muscleGain" in goal) return "muscleGain";
  }
  return "generalFitness";
}

// Convert raw backend profile (bigint fields) to GymUserProfile
export function parseBackendProfile(raw: any): GymUserProfile | null {
  if (!raw) return null;
  return {
    name: raw.name ?? "",
    age: Number(raw.age ?? 0),
    weight: Number(raw.weight ?? 0),
    height: Number(raw.height ?? 0),
    goal: backendGoalToString(raw.goal),
    targetDays: Number(raw.targetDays ?? 0),
    startTime: Number(raw.startTime ?? Date.now()),
  };
}

// Convert raw backend check-in (bigint fields) to GymCheckIn
export function parseBackendCheckIn(raw: any): GymCheckIn {
  return {
    day: Number(raw.day ?? 0),
    workoutDone: Boolean(raw.workoutDone),
    mealsDone: Boolean(raw.mealsDone),
    note: raw.note ?? "",
    timestamp: Number(raw.timestamp ?? 0),
    photoAssetId: raw.photoAssetId ?? null,
  };
}
