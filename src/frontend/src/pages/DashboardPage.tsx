import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Dumbbell,
  Flame,
  Play,
  Salad,
  Trophy,
} from "lucide-react";
import { motion } from "motion/react";
import { COMPLETED_WORKOUTS, WORKOUTS } from "../data/mockData";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetCallerUserProfile } from "../hooks/useQueries";

const categoryCards = [
  {
    label: "Yoga",
    icon: "🧘",
    to: "/workouts",
    color: "bg-primary/10 border-primary/20",
    textColor: "text-primary",
  },
  {
    label: "Gym",
    icon: "💪",
    to: "/workouts",
    color: "bg-secondary/10 border-secondary/20",
    textColor: "text-secondary",
  },
  {
    label: "Cardio",
    icon: "🏃",
    to: "/workouts",
    color: "bg-orange-100 border-orange-200",
    textColor: "text-orange-600",
  },
];

const quickLinks = [
  {
    icon: Dumbbell,
    label: "Workouts",
    to: "/workouts",
    desc: "Browse all workouts",
  },
  {
    icon: CalendarDays,
    label: "Daily Plan",
    to: "/daily-plan",
    desc: "Your 7-day schedule",
  },
  {
    icon: BarChart3,
    label: "Progress",
    to: "/progress",
    desc: "Track your stats",
  },
  { icon: Salad, label: "Diet Tips", to: "/diet", desc: "Nutrition guidance" },
];

export default function DashboardPage() {
  const { identity } = useInternetIdentity();
  const { data: profile } = useGetCallerUserProfile();
  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="font-display text-2xl font-bold mb-4">
          Please login to access your dashboard
        </h2>
        <Link to="/">
          <Button className="bg-primary text-primary-foreground">
            Go to Home
          </Button>
        </Link>
      </div>
    );
  }

  const todayWorkout = WORKOUTS[0];
  const completedCount = COMPLETED_WORKOUTS.length;
  const streak = 4;
  const weeklyGoal = 5;
  const weeklyProgress = Math.round((completedCount / weeklyGoal) * 100);

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="font-display text-3xl font-bold">
          Namaste, {profile?.name ?? "Champion"} 🙏
        </h1>
        <p className="text-muted-foreground mt-1">
          Let's crush your fitness goals today!
        </p>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Workouts Done",
            value: completedCount,
            icon: "✅",
            color: "text-secondary",
          },
          {
            label: "Current Streak",
            value: `${streak} days 🔥`,
            icon: "🔥",
            color: "text-primary",
          },
          {
            label: "Calories Burned",
            value: "1,240",
            icon: "⚡",
            color: "text-orange-500",
          },
          {
            label: "This Week",
            value: `${completedCount}/${weeklyGoal}`,
            icon: "📅",
            color: "text-secondary",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            <Card data-ocid={`dashboard.stats.card.${i + 1}`}>
              <CardContent className="p-4">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className={`font-display font-bold text-xl ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Weekly progress */}
      <Card className="mb-8">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="font-semibold">Weekly Goal Progress</span>
            </div>
            <Badge variant="secondary">
              {completedCount}/{weeklyGoal} workouts
            </Badge>
          </div>
          <Progress value={weeklyProgress} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">
            {weeklyGoal - completedCount} more workouts to hit your weekly goal!
          </p>
        </CardContent>
      </Card>

      {/* Today's Featured Workout */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
          <Flame className="w-5 h-5 text-primary" /> Today's Workout
        </h2>
        <Card className="workout-card overflow-hidden">
          <div className="relative">
            <img
              src={todayWorkout.thumbnail}
              alt={todayWorkout.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <Badge className="mb-2 bg-primary text-primary-foreground">
                {todayWorkout.category}
              </Badge>
              <h3 className="font-display font-bold text-xl">
                {todayWorkout.title}
              </h3>
              <p className="text-sm text-white/80">
                {todayWorkout.duration} min · {todayWorkout.calories} cal
              </p>
            </div>
          </div>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {todayWorkout.description.substring(0, 80)}...
              </p>
            </div>
            <Link to="/workouts">
              <Button
                className="bg-primary text-primary-foreground ml-4"
                size="sm"
                data-ocid="dashboard.start_workout.button"
              >
                <Play className="w-4 h-4 mr-1" /> Start
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>

      {/* Category shortcuts */}
      <div className="mb-8">
        <h2 className="font-display text-xl font-bold mb-4">
          Browse by Category
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {categoryCards.map((cat) => (
            <Link key={cat.label} to={cat.to}>
              <Card
                className={`${cat.color} border hover:shadow-card transition-all cursor-pointer text-center`}
                data-ocid={`dashboard.${cat.label.toLowerCase()}.card`}
              >
                <CardContent className="p-5">
                  <div className="text-3xl mb-2">{cat.icon}</div>
                  <div className={`font-display font-bold ${cat.textColor}`}>
                    {cat.label}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick navigation */}
      <div>
        <h2 className="font-display text-xl font-bold mb-4">Quick Access</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {quickLinks.map((ql, i) => (
            <Link key={ql.to} to={ql.to}>
              <Card
                className="hover:shadow-card transition-all cursor-pointer"
                data-ocid={`dashboard.quick.link.${i + 1}`}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <ql.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{ql.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {ql.desc}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
