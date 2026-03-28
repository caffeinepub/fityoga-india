import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  FitnessGoal,
  GymCheckIn,
  GymUserProfile,
  GymUserStats,
} from "../types";
import {
  parseBackendCheckIn,
  parseBackendProfile,
  stringToBackendGoal,
} from "../types";
import { useActor } from "./useActor";

// ------- Profile -------

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<GymUserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      const raw = await (actor as any).getMyProfile();
      return parseBackendProfile(raw);
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: GymUserProfile) => {
      if (!actor) throw new Error("Not connected");
      const backendProfile = {
        name: profile.name,
        age: BigInt(profile.age),
        weight: profile.weight,
        height: profile.height,
        goal: stringToBackendGoal(profile.goal),
        targetDays: BigInt(profile.targetDays),
        startTime: BigInt(profile.startTime),
      };
      await (actor as any).saveUserProfile(backendProfile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      queryClient.invalidateQueries({ queryKey: ["myStats"] });
    },
  });
}

// ------- Check-ins -------

export function useGetMyCheckIns() {
  const { actor, isFetching } = useActor();
  return useQuery<GymCheckIn[]>({
    queryKey: ["myCheckIns"],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await (actor as any).getMyCheckIns();
      return (raw as any[]).map(parseBackendCheckIn);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveCheckIn() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (checkIn: GymCheckIn) => {
      if (!actor) throw new Error("Not connected");
      const backendCheckIn = {
        day: BigInt(checkIn.day),
        workoutDone: checkIn.workoutDone,
        mealsDone: checkIn.mealsDone,
        note: checkIn.note,
        timestamp: BigInt(checkIn.timestamp),
        photoAssetId: checkIn.photoAssetId,
      };
      await (actor as any).saveCheckIn(backendCheckIn);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myCheckIns"] });
      queryClient.invalidateQueries({ queryKey: ["myStats"] });
    },
  });
}

// ------- Stats -------

export function useGetMyStats() {
  const { actor, isFetching } = useActor();
  return useQuery<GymUserStats | null>({
    queryKey: ["myStats"],
    queryFn: async () => {
      if (!actor) return null;
      const raw = await (actor as any).getMyStats();
      if (!raw) return null;
      return {
        profile: parseBackendProfile(raw.profile)!,
        checkIns: (raw.checkIns as any[]).map(parseBackendCheckIn),
        progressPercent: Number(raw.progressPercent ?? 0),
        daysRemaining: Number(raw.daysRemaining ?? 0),
      } satisfies GymUserStats;
    },
    enabled: !!actor && !isFetching,
  });
}

// ------- Admin -------

export function useIsAdmin() {
  const { actor, isFetching: actorFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useAdminGetAllUsers() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["adminAllUsers"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).adminGetAllUsers() as Promise<any[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

// Alias for backward compat
export { useSaveCallerProfile as useSaveProfile };
export type { FitnessGoal, GymUserProfile, GymCheckIn, GymUserStats };
