import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@tanstack/react-router";
import { Shield, ShieldAlert, Users } from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useAdminGetAllUsers, useIsAdmin } from "../hooks/useQueries";
import {
  backendGoalToString,
  parseBackendCheckIn,
  parseBackendProfile,
} from "../types";

export default function AdminPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: allUsers = [], isLoading: usersLoading } =
    useAdminGetAllUsers();

  if (!isAuthenticated) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-20 text-center">
        <ShieldAlert className="w-16 h-16 mx-auto mb-4 text-destructive opacity-50" />
        <h2 className="font-display text-2xl font-bold mb-4">
          Authentication Required
        </h2>
        <Link to="/">
          <span className="text-primary underline">Sign in to continue</span>
        </Link>
      </div>
    );
  }

  if (adminLoading) {
    return (
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-20 text-center">
        <ShieldAlert className="w-16 h-16 mx-auto mb-4 text-destructive opacity-50" />
        <h2 className="font-display text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-muted-foreground">
          You don't have admin privileges.
        </p>
      </div>
    );
  }

  const totalCheckIns = allUsers.reduce(
    (sum: number, [, stats]: [any, any]) => {
      return sum + (stats?.checkIns?.length ?? 0);
    },
    0,
  );

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="admin-banner rounded-2xl p-6 text-white mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">Admin Panel</h1>
            <p className="text-white/70 text-sm">
              GymCoach Pro — User Management & Analytics
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[
            { label: "Total Users", value: allUsers.length, icon: "👥" },
            { label: "Total Check-ins", value: totalCheckIns, icon: "✅" },
            { label: "Platform Status", value: "Online", icon: "🟢" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3"
            >
              <div className="text-lg">{s.icon}</div>
              <div className="font-display font-bold text-xl">{s.value}</div>
              <div className="text-xs text-white/70">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <Card data-ocid="admin.users.table">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> All Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          {usersLoading ? (
            <div className="space-y-3" data-ocid="admin.users.loading_state">
              {["a", "b", "c", "d", "e"].map((k) => (
                <Skeleton key={k} className="h-12 w-full" />
              ))}
            </div>
          ) : allUsers.length === 0 ? (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="admin.users.empty_state"
            >
              <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No users registered yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Goal</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Days Left</TableHead>
                    <TableHead>Check-ins</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allUsers.map(
                    ([principal, rawStats]: [any, any], i: number) => {
                      const profile = parseBackendProfile(rawStats?.profile);
                      const checkIns = (rawStats?.checkIns ?? []).map(
                        parseBackendCheckIn,
                      );
                      const progressPercent = Number(
                        rawStats?.progressPercent ?? 0,
                      );
                      const daysRemaining = Number(
                        rawStats?.daysRemaining ?? 0,
                      );
                      const goalStr = profile
                        ? backendGoalToString(rawStats?.profile?.goal)
                        : "—";
                      return (
                        <TableRow
                          key={principal.toString()}
                          data-ocid={`admin.users.row.${i + 1}`}
                        >
                          <TableCell className="text-muted-foreground text-sm">
                            {i + 1}
                          </TableCell>
                          <TableCell>
                            <code className="text-xs bg-muted px-2 py-0.5 rounded">
                              {principal.toString().slice(0, 16)}...
                            </code>
                          </TableCell>
                          <TableCell className="font-medium">
                            {profile?.name ?? "—"}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="text-xs capitalize"
                            >
                              {goalStr.replace(/([A-Z])/g, " $1").trim()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-2 bg-primary rounded-full"
                                  style={{ width: `${progressPercent}%` }}
                                />
                              </div>
                              <span className="text-xs font-semibold text-primary">
                                {progressPercent}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {daysRemaining}d
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="text-xs">
                              {checkIns.length}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    },
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
