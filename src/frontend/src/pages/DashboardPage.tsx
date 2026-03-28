import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  CalendarCheck,
  CheckCircle2,
  Dumbbell,
  Salad,
  TrendingUp,
  Upload,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetCallerUserProfile,
  useGetMyCheckIns,
  useGetMyStats,
  useSaveCheckIn,
} from "../hooks/useQueries";
import type { GymCheckIn } from "../types";

const GOAL_PLANS = {
  weightLoss: {
    label: "Weight Loss",
    emoji: "🔥",
    workouts: [
      {
        name: "Morning Cardio Run",
        sets: "30 min",
        detail: "Moderate pace, fasted",
      },
      { name: "Jump Rope HIIT", sets: "4x3 min", detail: "1 min rest between" },
      {
        name: "Bodyweight Circuit",
        sets: "3x15",
        detail: "Push-ups, Squats, Lunges",
      },
      { name: "Plank Hold", sets: "3x45 sec", detail: "Core activation" },
      { name: "Cycling / Walking", sets: "20 min", detail: "Cool down" },
    ],
    meals: [
      {
        time: "7:00 AM",
        name: "Green Smoothie",
        cal: "220 kcal",
        detail: "Spinach, banana, protein powder",
      },
      {
        time: "10:00 AM",
        name: "Egg White Omelette",
        cal: "180 kcal",
        detail: "3 egg whites, veggies",
      },
      {
        time: "1:00 PM",
        name: "Grilled Chicken Salad",
        cal: "380 kcal",
        detail: "Lean protein + greens",
      },
      {
        time: "4:00 PM",
        name: "Roasted Chana",
        cal: "120 kcal",
        detail: "High fiber snack",
      },
      {
        time: "7:30 PM",
        name: "Dal Soup + Roti",
        cal: "350 kcal",
        detail: "Light dinner, no rice",
      },
    ],
  },
  muscleGain: {
    label: "Muscle Gain",
    emoji: "💪",
    workouts: [
      { name: "Barbell Squat", sets: "4x8", detail: "Heavy compound movement" },
      { name: "Bench Press", sets: "4x8", detail: "Progressive overload" },
      { name: "Deadlift", sets: "3x6", detail: "Full body strength" },
      {
        name: "Pull-ups / Lat Pulldown",
        sets: "4x10",
        detail: "Back width builder",
      },
      { name: "Overhead Press", sets: "3x10", detail: "Shoulder development" },
      {
        name: "Bicep Curls + Tricep Dips",
        sets: "3x12",
        detail: "Arm superset",
      },
    ],
    meals: [
      {
        time: "7:30 AM",
        name: "High-Protein Breakfast",
        cal: "520 kcal",
        detail: "4 eggs, oats, banana, milk",
      },
      {
        time: "10:30 AM",
        name: "Whey Protein Shake",
        cal: "250 kcal",
        detail: "Pre-workout fuel",
      },
      {
        time: "1:30 PM",
        name: "Chicken Rice Bowl",
        cal: "680 kcal",
        detail: "200g chicken, brown rice, broccoli",
      },
      {
        time: "4:30 PM",
        name: "Paneer + Peanut Butter Toast",
        cal: "320 kcal",
        detail: "Post-workout recovery",
      },
      {
        time: "8:00 PM",
        name: "Rajma + Roti + Curd",
        cal: "580 kcal",
        detail: "High protein dinner",
      },
    ],
  },
  generalFitness: {
    label: "General Fitness",
    emoji: "⚡",
    workouts: [
      { name: "Warm-up Jog", sets: "10 min", detail: "Easy pace" },
      {
        name: "Strength Circuit",
        sets: "3x12",
        detail: "Squats, Push-ups, Rows",
      },
      {
        name: "Core Work",
        sets: "3x20",
        detail: "Crunches, Leg Raises, Plank",
      },
      {
        name: "Yoga Flow",
        sets: "15 min",
        detail: "Surya Namaskar + stretches",
      },
      { name: "Cool-down Walk", sets: "10 min", detail: "Active recovery" },
    ],
    meals: [
      {
        time: "7:00 AM",
        name: "Poha with Peanuts",
        cal: "280 kcal",
        detail: "Traditional Indian breakfast",
      },
      {
        time: "11:00 AM",
        name: "Greek Yogurt + Fruit",
        cal: "220 kcal",
        detail: "Probiotic-rich snack",
      },
      {
        time: "1:30 PM",
        name: "Quinoa Khichdi",
        cal: "420 kcal",
        detail: "Protein-rich, balanced",
      },
      {
        time: "4:30 PM",
        name: "Mixed Nuts + Green Tea",
        cal: "150 kcal",
        detail: "Energy boost",
      },
      {
        time: "7:30 PM",
        name: "Dal Palak + Millets",
        cal: "380 kcal",
        detail: "Iron-rich, light",
      },
    ],
  },
};

function MyPlansTab({ goal }: { goal: keyof typeof GOAL_PLANS }) {
  const plan = GOAL_PLANS[goal];
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{plan.emoji}</span>
        <h2 className="font-display text-xl font-bold">{plan.label} Plan</h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Dumbbell className="w-4 h-4 text-primary" /> Today's Workout
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {plan.workouts.map((w) => (
              <div
                key={w.name}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <div className="font-medium text-sm">{w.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {w.detail}
                  </div>
                </div>
                <div className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {w.sets}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Salad className="w-4 h-4 text-secondary" /> Today's Meal Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {plan.meals.map((m) => (
              <div
                key={m.name}
                className="flex items-start justify-between py-2 border-b border-border last:border-0"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-16">
                      {m.time}
                    </span>
                    <span className="font-medium text-sm">{m.name}</span>
                  </div>
                  <div className="text-xs text-muted-foreground ml-[4.5rem]">
                    {m.detail}
                  </div>
                </div>
                <div className="text-xs font-semibold text-secondary ml-2 shrink-0">
                  {m.cal}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function CheckInTab() {
  const todayUnixDay = Math.floor(Date.now() / 86400000);
  const { data: checkIns = [] } = useGetMyCheckIns();
  const saveCheckIn = useSaveCheckIn();
  const existing = checkIns.find((c) => c.day === todayUnixDay) ?? null;

  const [workoutDone, setWorkoutDone] = useState(
    existing?.workoutDone ?? false,
  );
  const [mealsDone, setMealsDone] = useState(existing?.mealsDone ?? false);
  const [note, setNote] = useState(existing?.note ?? "");
  const [photoUrl, setPhotoUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const checkIn: GymCheckIn = {
      day: todayUnixDay,
      workoutDone,
      mealsDone,
      note,
      timestamp: Date.now(),
      photoAssetId: null,
    };
    try {
      await saveCheckIn.mutateAsync(checkIn);
      toast.success("Check-in saved! Keep it up! 🎯");
    } catch {
      toast.error("Could not save check-in. Please try again.");
    }
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-2 mb-6">
        <CalendarCheck className="w-5 h-5 text-primary" />
        <div>
          <h2 className="font-display text-xl font-bold">Daily Check-In</h2>
          <p className="text-sm text-muted-foreground">{today}</p>
        </div>
      </div>

      {existing && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> You've already checked in today!
          Updating...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Card>
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-semibold">Workout Done</Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Did you complete today's workout?
                </p>
              </div>
              <Switch
                checked={workoutDone}
                onCheckedChange={setWorkoutDone}
                data-ocid="checkin.workout.switch"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-semibold">Meals Done</Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Did you follow the meal plan?
                </p>
              </div>
              <Switch
                checked={mealsDone}
                onCheckedChange={setMealsDone}
                data-ocid="checkin.meals.switch"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Label>Notes (optional)</Label>
          <Textarea
            placeholder="How did today go? Any observations about your energy, strength, or mood..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            data-ocid="checkin.note.textarea"
          />
        </div>

        <div className="space-y-2">
          <Label>Daily Progress Photo (optional)</Label>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
            data-ocid="checkin.dropzone"
          >
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Progress"
                className="max-h-40 mx-auto rounded-lg object-cover"
              />
            ) : (
              <div className="text-muted-foreground">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-sm">Click to upload your daily photo</p>
                <p className="text-xs mt-1">Track your visual transformation</p>
              </div>
            )}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhoto}
            data-ocid="checkin.upload_button"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground"
          disabled={saveCheckIn.isPending}
          data-ocid="checkin.submit_button"
        >
          {saveCheckIn.isPending ? "Saving..." : "Submit Check-In"}
        </Button>
      </form>
    </div>
  );
}

const STAT_ITEMS = [
  { label: "Progress", icon: "📈", color: "text-primary" },
  { label: "Days Done", icon: "✅", color: "text-green-600" },
  { label: "Days Left", icon: "⏳", color: "text-secondary" },
  { label: "Total Days", icon: "🎯", color: "text-foreground" },
] as const;

function ProgressTab() {
  const { data: stats } = useGetMyStats();
  const { data: checkIns = [] } = useGetMyCheckIns();

  if (!stats) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-30" />
        <p>Complete onboarding and check in to see your progress</p>
      </div>
    );
  }

  const doneDays = checkIns.filter((c) => c.workoutDone || c.mealsDone).length;
  const totalDays = stats.profile.targetDays;
  const statValues = [
    `${stats.progressPercent}%`,
    doneDays,
    stats.daysRemaining,
    totalDays,
  ];

  const last30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    const unixDay = Math.floor(d.getTime() / 86400000);
    const checkIn = checkIns.find((c) => c.day === unixDay);
    return {
      day: d.getDate().toString(),
      done: checkIn
        ? checkIn.workoutDone && checkIn.mealsDone
          ? 2
          : checkIn.workoutDone || checkIn.mealsDone
            ? 1
            : 0
        : 0,
    };
  });

  const recentCheckIns = [...checkIns]
    .sort((a, b) => b.day - a.day)
    .slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {STAT_ITEMS.map((s, i) => (
          <Card key={s.label} data-ocid={`progress.stats.card.${i + 1}`}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className={`font-display font-bold text-2xl ${s.color}`}>
                {statValues[i]}
              </div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold">Overall Progress</span>
            <span className="font-bold text-primary">
              {stats.progressPercent}%
            </span>
          </div>
          <Progress value={stats.progressPercent} className="h-4" />
          <p className="text-xs text-muted-foreground mt-2">
            {doneDays} days completed of {totalDays} · {stats.daysRemaining}{" "}
            days remaining
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Last 30 Days
            Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={last30}
              margin={{ top: 4, right: 4, bottom: 0, left: -24 }}
            >
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10 }}
                domain={[0, 2]}
                ticks={[0, 1, 2]}
              />
              <Tooltip
                formatter={(val: number) => [
                  val === 2 ? "Full" : val === 1 ? "Partial" : "Missed",
                  "Status",
                ]}
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
              />
              <Bar dataKey="done" radius={[4, 4, 0, 0]}>
                {last30.map((entry, _index) => (
                  <Cell
                    key={`cell-day-${entry.day}`}
                    fill={
                      entry.done === 2
                        ? "oklch(0.56 0.13 145)"
                        : entry.done === 1
                          ? "oklch(0.73 0.17 70)"
                          : "oklch(0.85 0.01 220)"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />{" "}
              Full day
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />{" "}
              Partial
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-muted inline-block" />{" "}
              Missed
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Recent Check-ins</CardTitle>
        </CardHeader>
        <CardContent>
          {recentCheckIns.length === 0 ? (
            <div
              className="text-center py-6 text-muted-foreground"
              data-ocid="progress.checkins.empty_state"
            >
              <p className="text-sm">No check-ins yet. Start logging daily!</p>
            </div>
          ) : (
            <ScrollArea className="max-h-64">
              <div className="space-y-2">
                {recentCheckIns.map((c, i) => (
                  <div
                    key={c.day}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    data-ocid={`progress.checkins.item.${i + 1}`}
                  >
                    <div>
                      <div className="text-sm font-medium">
                        {new Date(c.day * 86400000).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </div>
                      {c.note && (
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {c.note}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${c.workoutDone ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
                      >
                        {c.workoutDone ? "✅ Workout" : "Workout"}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${c.mealsDone ? "bg-secondary/10 text-secondary-foreground" : "bg-muted text-muted-foreground"}`}
                      >
                        {c.mealsDone ? "✅ Meals" : "Meals"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function DashboardPage() {
  const { identity } = useInternetIdentity();
  const { data: profile } = useGetCallerUserProfile();
  const { data: stats } = useGetMyStats();
  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-20 text-center">
        <Dumbbell className="w-16 h-16 mx-auto mb-4 text-primary opacity-50" />
        <h2 className="font-display text-2xl font-bold mb-4">
          Sign in to access your dashboard
        </h2>
        <Link to="/">
          <Button className="bg-primary text-primary-foreground">
            Go to Home
          </Button>
        </Link>
      </div>
    );
  }

  const goal = (profile?.goal ?? "generalFitness") as keyof typeof GOAL_PLANS;
  const goalLabel = GOAL_PLANS[goal]?.label ?? "General Fitness";
  const goalEmoji = GOAL_PLANS[goal]?.emoji ?? "⚡";

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="bg-gradient-to-r from-teal-800 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold">
                Welcome back, {profile?.name ?? "Champion"} 👋
              </h1>
              <p className="text-white/80 mt-1">
                Goal: {goalEmoji} {goalLabel}
                {profile && ` · ${profile.targetDays} day program`}
              </p>
            </div>
            {stats && (
              <div className="flex items-center gap-4 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3">
                <div className="text-center">
                  <div className="font-display text-2xl font-bold">
                    {stats.progressPercent}%
                  </div>
                  <div className="text-xs text-white/70">Progress</div>
                </div>
                <div className="w-px h-10 bg-white/30" />
                <div className="text-center">
                  <div className="font-display text-2xl font-bold">
                    {stats.daysRemaining}
                  </div>
                  <div className="text-xs text-white/70">Days Left</div>
                </div>
              </div>
            )}
          </div>
          {stats && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-white/70 mb-1">
                <span>
                  {
                    stats.checkIns.filter((c) => c.workoutDone || c.mealsDone)
                      .length
                  }{" "}
                  days done
                </span>
                <span>{profile?.targetDays ?? 0} total</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-secondary rounded-full h-2 transition-all duration-700"
                  style={{ width: `${stats.progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <Tabs defaultValue="plans">
        <TabsList
          className="w-full mb-6 grid grid-cols-3 h-12"
          data-ocid="dashboard.tabs"
        >
          <TabsTrigger
            value="plans"
            className="text-sm"
            data-ocid="dashboard.plans.tab"
          >
            <Dumbbell className="w-4 h-4 mr-1.5" /> My Plans
          </TabsTrigger>
          <TabsTrigger
            value="checkin"
            className="text-sm"
            data-ocid="dashboard.checkin.tab"
          >
            <CalendarCheck className="w-4 h-4 mr-1.5" /> Check-In
          </TabsTrigger>
          <TabsTrigger
            value="progress"
            className="text-sm"
            data-ocid="dashboard.progress.tab"
          >
            <TrendingUp className="w-4 h-4 mr-1.5" /> Progress
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plans">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <MyPlansTab goal={goal} />
          </motion.div>
        </TabsContent>
        <TabsContent value="checkin">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CheckInTab />
          </motion.div>
        </TabsContent>
        <TabsContent value="progress">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ProgressTab />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
