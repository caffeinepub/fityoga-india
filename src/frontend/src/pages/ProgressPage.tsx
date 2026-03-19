import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Star, Target, TrendingUp, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { COMPLETED_WORKOUTS, WORKOUTS } from "../data/mockData";

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const WEEKLY_ACTIVITY = [3, 1, 2, 1, 2, 1, 0]; // workouts per day this week
const MONTHLY_ACTIVITY = Array.from({ length: 30 }, (_, i) =>
  i % 3 === 0 || i % 5 === 0 ? 1 : 0,
);

const MAX_WEEKLY = Math.max(...WEEKLY_ACTIVITY, 1);

export default function ProgressPage() {
  const completedWorkouts = COMPLETED_WORKOUTS.map((id) =>
    WORKOUTS.find((w) => w.id === id),
  ).filter(Boolean);
  const totalCalories = completedWorkouts.reduce(
    (acc, w) => acc + (w?.calories ?? 0),
    0,
  );
  const streak = 4;
  const totalMinutes = completedWorkouts.reduce(
    (acc, w) => acc + (w?.duration ?? 0),
    0,
  );

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold mb-2 flex items-center gap-3">
          <TrendingUp className="w-7 h-7 text-primary" /> Your Progress
        </h1>
        <p className="text-muted-foreground">
          Track your fitness journey and celebrate milestones
        </p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Workouts",
            value: completedWorkouts.length,
            icon: Trophy,
            color: "text-primary",
          },
          {
            label: "Day Streak",
            value: `${streak} 🔥`,
            icon: Flame,
            color: "text-orange-500",
          },
          {
            label: "Calories Burned",
            value: `${totalCalories}`,
            icon: Target,
            color: "text-secondary",
          },
          {
            label: "Minutes Active",
            value: `${totalMinutes}`,
            icon: Star,
            color: "text-primary",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Card data-ocid={`progress.stats.card.${i + 1}`}>
              <CardContent className="p-4 text-center">
                <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <div
                  className={`font-display font-bold text-2xl ${stat.color}`}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Weekly bar chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="font-display text-lg">This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-3 h-32">
            {DAYS_OF_WEEK.map((day, i) => {
              const val = WEEKLY_ACTIVITY[i];
              const height =
                val === 0 ? 8 : Math.round((val / MAX_WEEKLY) * 100);
              return (
                <div
                  key={day}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div
                    className="w-full flex flex-col justify-end"
                    style={{ height: "100px" }}
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.6, delay: i * 0.07 }}
                      className={`w-full rounded-t-md ${
                        val === 0 ? "bg-muted" : "progress-gradient"
                      }`}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{day}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Monthly calendar heatmap */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="font-display text-lg">
            Monthly Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-10 gap-1.5">
            {MONTHLY_ACTIVITY.map((active, day0) => ({
              active,
              day: day0 + 1,
            })).map(({ active, day }) => (
              <div
                key={`day-${day}`}
                title={`Day ${day}${active ? " — Workout done!" : ""}`}
                className={`aspect-square rounded-sm text-xs flex items-center justify-center ${
                  active ? "bg-primary/80 text-primary-foreground" : "bg-muted"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Completed workouts list */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">
            Completed Workouts
          </CardTitle>
        </CardHeader>
        <CardContent>
          {completedWorkouts.length === 0 ? (
            <div
              className="text-center py-8 text-muted-foreground"
              data-ocid="progress.empty_state"
            >
              No workouts completed yet. Start today!
            </div>
          ) : (
            <div className="space-y-3" data-ocid="progress.list">
              {completedWorkouts.map(
                (workout, i) =>
                  workout && (
                    <motion.div
                      key={workout.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="flex items-center gap-4 p-3 bg-muted/50 rounded-xl"
                      data-ocid={`progress.item.${i + 1}`}
                    >
                      <img
                        src={workout.thumbnail}
                        alt={workout.title}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-sm">
                          {workout.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {workout.duration} min · {workout.calories} cal
                        </div>
                      </div>
                      <Badge variant="outline">{workout.category}</Badge>
                    </motion.div>
                  ),
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
