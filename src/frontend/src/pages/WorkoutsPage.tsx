import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Dumbbell, Flame, Play } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  type Difficulty,
  WORKOUTS,
  type Workout,
  type WorkoutCategory,
} from "../data/mockData";

const categoryColors: Record<string, string> = {
  Yoga: "bg-primary/10 text-primary border-primary/20",
  Gym: "bg-secondary/10 text-secondary border-secondary/20",
  Cardio: "bg-orange-100 text-orange-700 border-orange-200",
};

const difficultyColors: Record<string, string> = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-yellow-100 text-yellow-700",
  Advanced: "bg-red-100 text-red-700",
};

function WorkoutCard({
  workout,
  onClick,
}: { workout: Workout; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="workout-card cursor-pointer"
      onClick={onClick}
    >
      <Card className="overflow-hidden h-full">
        <div className="relative">
          <img
            src={workout.thumbnail}
            alt={workout.title}
            className="w-full h-44 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className={categoryColors[workout.category]}>
              {workout.category}
            </Badge>
            <Badge className={difficultyColors[workout.difficulty]}>
              {workout.difficulty}
            </Badge>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
              <Play className="w-6 h-6 text-primary-foreground ml-1" />
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-display font-bold text-base mb-2 line-clamp-1">
            {workout.title}
          </h3>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {workout.duration} min
            </span>
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3" /> {workout.calories} cal
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function WorkoutsPage() {
  const [category, setCategory] = useState<"All" | WorkoutCategory>("All");
  const [difficulty, setDifficulty] = useState<"All" | Difficulty>("All");
  const [selected, setSelected] = useState<Workout | null>(null);

  const filtered = WORKOUTS.filter(
    (w) =>
      (category === "All" || w.category === category) &&
      (difficulty === "All" || w.difficulty === difficulty),
  );

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold mb-2">
          Workout Library
        </h1>
        <p className="text-muted-foreground">
          Choose from yoga, gym, and cardio workouts for every level
        </p>
      </div>

      {/* Category filter */}
      <div className="mb-4">
        <Tabs
          value={category}
          onValueChange={(v) => setCategory(v as typeof category)}
        >
          <TabsList className="bg-muted/60" data-ocid="workouts.category.tab">
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Yoga">🧘 Yoga</TabsTrigger>
            <TabsTrigger value="Gym">💪 Gym</TabsTrigger>
            <TabsTrigger value="Cardio">🏃 Cardio</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Difficulty filter */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {(["All", "Beginner", "Intermediate", "Advanced"] as const).map((d) => (
          <Button
            key={d}
            size="sm"
            variant={difficulty === d ? "default" : "outline"}
            className={
              difficulty === d ? "bg-primary text-primary-foreground" : ""
            }
            onClick={() => setDifficulty(d)}
            data-ocid={`workouts.difficulty_${d.toLowerCase()}.button`}
          >
            {d}
          </Button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="workouts.empty_state"
        >
          <Dumbbell className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>No workouts match your filters</p>
        </div>
      ) : (
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="workouts.list"
        >
          {filtered.map((workout, i) => (
            <div key={workout.id} data-ocid={`workouts.item.${i + 1}`}>
              <WorkoutCard
                workout={workout}
                onClick={() => setSelected(workout)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Workout detail dialog */}
      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="max-w-2xl" data-ocid="workouts.detail.dialog">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl flex items-center gap-3">
                  <Badge className={categoryColors[selected.category]}>
                    {selected.category}
                  </Badge>
                  {selected.title}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Workout details
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {/* Video placeholder */}
                <div className="relative w-full bg-muted rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Video Tutorial
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selected.title}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <Badge className={difficultyColors[selected.difficulty]}>
                    {selected.difficulty}
                  </Badge>
                  <Badge variant="outline">
                    <Clock className="w-3 h-3 mr-1" />
                    {selected.duration} min
                  </Badge>
                  <Badge variant="outline">
                    <Flame className="w-3 h-3 mr-1" />
                    {selected.calories} cal
                  </Badge>
                </div>

                <p className="text-muted-foreground text-sm">
                  {selected.description}
                </p>

                <div>
                  <h4 className="font-semibold mb-2">Exercises</h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.exercises.map((ex) => (
                      <Badge key={ex} variant="secondary" className="text-xs">
                        {ex}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full bg-primary text-primary-foreground"
                  data-ocid="workouts.start.button"
                >
                  <Play className="w-4 h-4 mr-2" /> Start Workout
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
