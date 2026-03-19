import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import ProfileSetupModal from "./components/ProfileSetupModal";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useGetCallerUserProfile } from "./hooks/useQueries";
import DailyPlanPage from "./pages/DailyPlanPage";
import DashboardPage from "./pages/DashboardPage";
import DietPage from "./pages/DietPage";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import ProgressPage from "./pages/ProgressPage";
import WorkoutsPage from "./pages/WorkoutsPage";

const queryClient = new QueryClient();

function AppShell() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const {
    data: profile,
    isLoading: profileLoading,
    isFetched,
  } = useGetCallerUserProfile();
  const showProfileSetup =
    isAuthenticated && !profileLoading && isFetched && profile === null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <AppFooter />
      <ProfileSetupModal open={showProfileSetup} />
      <Toaster richColors position="top-right" />
    </div>
  );
}

const rootRoute = createRootRoute({ component: AppShell });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});
const workoutsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/workouts",
  component: WorkoutsPage,
});
const dailyPlanRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/daily-plan",
  component: DailyPlanPage,
});
const progressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/progress",
  component: ProgressPage,
});
const dietRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/diet",
  component: DietPage,
});
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  workoutsRoute,
  dailyPlanRoute,
  progressRoute,
  dietRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
