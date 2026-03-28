import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { useSaveCallerProfile } from "../hooks/useQueries";
import type { FitnessGoal } from "../types";

const GOALS: { id: FitnessGoal; label: string; emoji: string; desc: string }[] =
  [
    {
      id: "weightLoss",
      label: "Weight Loss",
      emoji: "🔥",
      desc: "Burn fat, feel lighter",
    },
    {
      id: "muscleGain",
      label: "Muscle Gain",
      emoji: "💪",
      desc: "Build strength & size",
    },
    {
      id: "generalFitness",
      label: "General Fitness",
      emoji: "⚡",
      desc: "Stay active & healthy",
    },
  ];

const TARGET_DAYS = [30, 60, 90, 180];

export default function OnboardingModal({ open }: { open: boolean }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState<FitnessGoal>("generalFitness");
  const [targetDays, setTargetDays] = useState(60);

  const saveProfile = useSaveCallerProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await saveProfile.mutateAsync({
        name: name.trim(),
        age: Number(age) || 20,
        weight: Number.parseFloat(weight) || 70,
        height: Number.parseFloat(height) || 170,
        goal,
        targetDays,
        startTime: Date.now(),
      });
      toast.success("Welcome to GymCoach Pro! Let's build your body! 💪");
    } catch {
      toast.error("Could not save profile. Please try again.");
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-lg" data-ocid="onboarding.dialog">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground text-xl">
              🏋️
            </div>
            <DialogTitle className="font-display text-xl">
              Welcome to GymCoach Pro!
            </DialogTitle>
          </div>
          <DialogDescription>
            Set up your profile to get a personalized training plan.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {step === 1 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="on-name">Your Name *</Label>
                  <Input
                    id="on-name"
                    placeholder="Alex Johnson"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    data-ocid="onboarding.name.input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="on-age">Age</Label>
                  <Input
                    id="on-age"
                    type="number"
                    placeholder="25"
                    min="13"
                    max="80"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    data-ocid="onboarding.age.input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="on-weight">Weight (kg)</Label>
                  <Input
                    id="on-weight"
                    type="number"
                    placeholder="70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    data-ocid="onboarding.weight.input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="on-height">Height (cm)</Label>
                  <Input
                    id="on-height"
                    type="number"
                    placeholder="175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    data-ocid="onboarding.height.input"
                  />
                </div>
              </div>
              <Button
                type="button"
                className="w-full bg-primary text-primary-foreground"
                onClick={() => name.trim() && setStep(2)}
                disabled={!name.trim()}
                data-ocid="onboarding.next.button"
              >
                Next: Set Your Goal →
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-3">
                <Label>Your Fitness Goal</Label>
                <div className="grid grid-cols-3 gap-3">
                  {GOALS.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGoal(g.id)}
                      data-ocid={`onboarding.goal.${g.id}.button`}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        goal === g.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      <div className="text-2xl mb-1">{g.emoji}</div>
                      <div className="text-xs font-semibold">{g.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {g.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Target Timeline</Label>
                <div className="grid grid-cols-4 gap-2">
                  {TARGET_DAYS.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setTargetDays(d)}
                      data-ocid={`onboarding.days.${d}.button`}
                      className={`py-2 px-3 rounded-lg border-2 text-center text-sm font-medium transition-all ${
                        targetDays === d
                          ? "border-secondary bg-secondary/10 text-secondary-foreground"
                          : "border-border hover:border-secondary/50"
                      }`}
                    >
                      {d} days
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                  data-ocid="onboarding.back.button"
                >
                  ← Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  disabled={saveProfile.isPending}
                  data-ocid="onboarding.submit.button"
                >
                  {saveProfile.isPending ? "Saving..." : "Start My Journey 🚀"}
                </Button>
              </div>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
