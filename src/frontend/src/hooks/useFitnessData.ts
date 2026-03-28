import { useCallback, useEffect, useState } from "react";
import { useInternetIdentity } from "./useInternetIdentity";

export type FitnessGoal = "weightLoss" | "muscleGain" | "generalFitness";

export interface FitnessProfile {
  goal: FitnessGoal;
  weight: number;
  height: number;
  targetDays: number;
  startDate: string; // ISO date YYYY-MM-DD
}

export interface CheckIn {
  date: string; // YYYY-MM-DD
  workoutDone: boolean;
  mealsDone: boolean;
  note: string;
  photoUrl?: string;
}

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function getKey(principal: string, suffix: string) {
  return `gymcoach_${suffix}_${principal}`;
}

export function useFitnessData() {
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal().toString() ?? "anon";

  const [fitnessProfile, setFitnessProfileState] =
    useState<FitnessProfile | null>(null);
  const [checkIns, setCheckInsState] = useState<CheckIn[]>([]);

  useEffect(() => {
    const fp = localStorage.getItem(getKey(principal, "profile"));
    setFitnessProfileState(fp ? (JSON.parse(fp) as FitnessProfile) : null);
    const ci = localStorage.getItem(getKey(principal, "checkins"));
    setCheckInsState(ci ? (JSON.parse(ci) as CheckIn[]) : []);
  }, [principal]);

  const saveFitnessProfile = useCallback(
    (profile: FitnessProfile) => {
      localStorage.setItem(
        getKey(principal, "profile"),
        JSON.stringify(profile),
      );
      setFitnessProfileState(profile);
    },
    [principal],
  );

  const saveCheckIn = useCallback(
    (checkIn: CheckIn) => {
      setCheckInsState((prev) => {
        const updated = prev.filter((c) => c.date !== checkIn.date);
        updated.push(checkIn);
        updated.sort((a, b) => a.date.localeCompare(b.date));
        localStorage.setItem(
          getKey(principal, "checkins"),
          JSON.stringify(updated),
        );
        return updated;
      });
    },
    [principal],
  );

  const getTodayCheckIn = useCallback((): CheckIn | null => {
    return checkIns.find((c) => c.date === todayStr()) ?? null;
  }, [checkIns]);

  const getStats = useCallback(() => {
    if (!fitnessProfile) return null;
    const start = new Date(fitnessProfile.startDate);
    const now = new Date();
    const totalDays = fitnessProfile.targetDays;
    const daysPassed = Math.max(
      0,
      Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
    );
    const daysRemaining = Math.max(0, totalDays - daysPassed);
    const doneDays = checkIns.filter(
      (c) => c.workoutDone || c.mealsDone,
    ).length;
    const progressPercent =
      totalDays > 0
        ? Math.min(100, Math.round((doneDays / totalDays) * 100))
        : 0;
    return { totalDays, daysPassed, daysRemaining, doneDays, progressPercent };
  }, [fitnessProfile, checkIns]);

  return {
    fitnessProfile,
    saveFitnessProfile,
    checkIns,
    saveCheckIn,
    getTodayCheckIn,
    getStats,
    todayStr: todayStr(),
  };
}
