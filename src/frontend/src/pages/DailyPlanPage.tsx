import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarDays, CheckCircle2, Clock, Flame } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { WEEKLY_PLAN, WORKOUTS } from "../data/mockData";

export default function DailyPlanPage() {
  const [completedDays, setCompletedDays] = useState<Set<string>>(
    new Set(["Monday"]),
  );

  const toggleDay = (day: string) => {
    setCompletedDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  };

  const today = new Date().toLocaleDateString("en-IN", { weekday: "long" });

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold mb-2 flex items-center gap-3">
          <CalendarDays className="w-7 h-7 text-primary" /> 7-Day Workout Plan
        </h1>
        <p className="text-muted-foreground">
          Your personalized weekly fitness schedule
        </p>
      </div>

      <div className="space-y-4">
        {WEEKLY_PLAN.map((dayPlan, i) => {
          const isCompleted = completedDays.has(dayPlan.day);
          const isToday = dayPlan.day === today;
          const dayWorkouts = dayPlan.workouts
            .map((id) => WORKOUTS.find((w) => w.id === id))
            .filter(Boolean);

          return (
            <motion.div
              key={dayPlan.day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              data-ocid={`plan.item.${i + 1}`}
            >
              <Card
                className={`transition-all ${
                  isCompleted
                    ? "border-secondary/40 bg-secondary/5"
                    : isToday
                      ? "border-primary/60 shadow-saffron"
                      : ""
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={isCompleted}
                        onCheckedChange={() => toggleDay(dayPlan.day)}
                        className="w-5 h-5"
                        data-ocid={`plan.checkbox.${i + 1}`}
                      />
                      <CardTitle
                        className={`font-display text-lg ${isCompleted ? "line-through text-muted-foreground" : ""}`}
                      >
                        {dayPlan.day}
                      </CardTitle>
                      {isToday && (
                        <Badge className="bg-primary text-primary-foreground text-xs">
                          Today
                        </Badge>
                      )}
                    </div>
                    {isCompleted && (
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground ml-8">
                    {new Date(dayPlan.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </CardHeader>
                <CardContent className="pt-0 ml-8">
                  <div className="space-y-2">
                    {dayWorkouts.map(
                      (workout) =>
                        workout && (
                          <div
                            key={workout.id}
                            className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                          >
                            <img
                              src={workout.thumbnail}
                              alt={workout.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm truncate">
                                {workout.title}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {workout.duration} min
                                </span>
                                <span className="flex items-center gap-1">
                                  <Flame className="w-3 h-3" />
                                  {workout.calories} cal
                                </span>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {workout.category}
                            </Badge>
                          </div>
                        ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Summary */}
      <Card className="mt-8 bg-primary/5 border-primary/20">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <div className="font-display font-bold text-lg">
              {completedDays.size}/7 days completed
            </div>
            <div className="text-sm text-muted-foreground">
              Keep going, you're doing great!
            </div>
          </div>
          <Button
            className="bg-primary text-primary-foreground"
            onClick={() =>
              setCompletedDays(new Set(WEEKLY_PLAN.map((d) => d.day)))
            }
            data-ocid="plan.complete_all.button"
          >
            Complete All
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
