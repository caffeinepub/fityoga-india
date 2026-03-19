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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dumbbell } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

interface ProfileSetupModalProps {
  open: boolean;
}

export default function ProfileSetupModal({ open }: ProfileSetupModalProps) {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      await actor.saveCallerUserProfile({
        name,
        age: BigInt(age || 20),
        location,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      toast.success("Profile saved! Welcome to FitYoga India 🙏");
    },
    onError: () => {
      toast.error("Could not save profile. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    mutation.mutate();
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md" data-ocid="profile_setup.dialog">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-primary-foreground" />
            </div>
            <DialogTitle className="font-display text-xl">
              Welcome to FitYoga India!
            </DialogTitle>
          </div>
          <DialogDescription>
            Set up your profile to get personalized workout plans and track your
            fitness journey.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="profile-name">Your Name *</Label>
            <Input
              id="profile-name"
              placeholder="Arjun Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              data-ocid="profile_setup.input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-age">Age</Label>
            <Input
              id="profile-age"
              type="number"
              placeholder="22"
              min="13"
              max="80"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              data-ocid="profile_setup.age.input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-location">City</Label>
            <Input
              id="profile-location"
              placeholder="Mumbai"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              data-ocid="profile_setup.location.input"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground"
            disabled={mutation.isPending || !name.trim()}
            data-ocid="profile_setup.submit_button"
          >
            {mutation.isPending ? "Saving..." : "Start My Fitness Journey 🚀"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
