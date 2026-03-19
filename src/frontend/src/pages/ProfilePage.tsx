import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import { Edit2, Flame, LogOut, Save, Trophy, User, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { COMPLETED_WORKOUTS } from "../data/mockData";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetCallerUserProfile } from "../hooks/useQueries";

export default function ProfilePage() {
  const { identity, clear } = useInternetIdentity();
  const { data: profile } = useGetCallerUserProfile();
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const router = useRouter();
  const isAuthenticated = !!identity;

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile?.name ?? "");
  const [age, setAge] = useState(profile?.age?.toString() ?? "");
  const [location, setLocation] = useState(profile?.location ?? "");

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
      toast.success("Profile updated!");
      setEditing(false);
    },
    onError: () => toast.error("Failed to update profile"),
  });

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    router.navigate({ to: "/" });
  };

  if (!isAuthenticated) {
    return (
      <div className="container max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="font-display text-2xl font-bold mb-4">
          Please login to view your profile
        </h2>
        <Link to="/">
          <Button className="bg-primary text-primary-foreground">
            Go to Home
          </Button>
        </Link>
      </div>
    );
  }

  const initials = (profile?.name ?? "U").charAt(0).toUpperCase();

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-display text-3xl font-bold mb-8 flex items-center gap-3">
          <User className="w-7 h-7 text-primary" /> My Profile
        </h1>

        {/* Profile card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-5 mb-6">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-display font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-display text-xl font-bold">
                  {profile?.name ?? "User"}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {profile?.location
                    ? `📍 ${profile.location}`
                    : "Location not set"}
                </p>
                <p className="text-muted-foreground text-sm">
                  {profile?.age ? `Age: ${profile.age}` : ""}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-muted/40 rounded-xl mb-6">
              <div className="text-center">
                <div className="font-display font-bold text-xl text-primary">
                  {COMPLETED_WORKOUTS.length}
                </div>
                <div className="text-xs text-muted-foreground">Workouts</div>
              </div>
              <div className="text-center">
                <div className="font-display font-bold text-xl text-orange-500">
                  4 🔥
                </div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="font-display font-bold text-xl text-secondary">
                  Level 2
                </div>
                <div className="text-xs text-muted-foreground">Rank</div>
              </div>
            </div>

            {/* Achievement badges */}
            <div>
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-primary" /> Achievements
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  🧘 First Yoga
                </Badge>
                <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                  🔥 3-Day Streak
                </Badge>
                <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                  💪 5 Workouts
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit profile */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-display text-lg">
                Edit Profile
              </CardTitle>
              {!editing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setName(profile?.name ?? "");
                    setAge(profile?.age?.toString() ?? "");
                    setLocation(profile?.location ?? "");
                    setEditing(true);
                  }}
                  data-ocid="profile.edit_button"
                >
                  <Edit2 className="w-4 h-4 mr-2" /> Edit
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditing(false)}
                  data-ocid="profile.cancel_button"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {editing ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  mutation.mutate();
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    data-ocid="profile.name.input"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Age</Label>
                  <Input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    data-ocid="profile.age.input"
                  />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    data-ocid="profile.location.input"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground"
                  disabled={mutation.isPending}
                  data-ocid="profile.save_button"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {mutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            ) : (
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Name:{" "}
                  <span className="text-foreground font-medium">
                    {profile?.name ?? "—"}
                  </span>
                </p>
                <p>
                  Age:{" "}
                  <span className="text-foreground font-medium">
                    {profile?.age?.toString() ?? "—"}
                  </span>
                </p>
                <p>
                  City:{" "}
                  <span className="text-foreground font-medium">
                    {profile?.location ?? "—"}
                  </span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full text-destructive border-destructive/30 hover:bg-destructive/5"
          onClick={handleLogout}
          data-ocid="profile.logout.button"
        >
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </Button>
      </motion.div>
    </div>
  );
}
