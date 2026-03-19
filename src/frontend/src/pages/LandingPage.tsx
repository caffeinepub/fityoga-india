import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CalendarDays,
  Dumbbell,
  Flame,
  Salad,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const features = [
  {
    icon: Dumbbell,
    title: "100+ Workouts",
    description: "Yoga, Gym, Cardio — curated for Indian fitness goals",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: CalendarDays,
    title: "7-Day Plans",
    description: "Structured daily plans to build healthy habits",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Salad,
    title: "Indian Diet Tips",
    description: "Nutrition advice with desi food options",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Streak counters, stats, and achievement badges",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Flame,
    title: "Burn Calories",
    description: "HIIT, Dance Cardio, and power workouts",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Activity,
    title: "For All Levels",
    description: "Beginner to advanced — start wherever you are",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
];

const testimonials = [
  {
    name: "Priya Mehta",
    city: "Mumbai",
    text: "Lost 8kg in 3 months! The daily plans are so easy to follow.",
    rating: 5,
  },
  {
    name: "Rahul Singh",
    city: "Delhi",
    text: "The yoga sequences are authentic and really calming. Love the app!",
    rating: 5,
  },
  {
    name: "Sneha Patel",
    city: "Bangalore",
    text: "Finally a fitness app that uses Indian food in diet tips. Game changer!",
    rating: 5,
  },
];

export default function LandingPage() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-gradient text-white py-20 px-4">
        <div className="container max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-white/20 text-white border-white/30 text-sm px-4 py-1">
              🇮🇳 Made for India · Age 15–30
            </Badge>
            <h1 className="font-display text-4xl sm:text-6xl font-bold mb-6 leading-tight">
              Your Fitness Journey
              <br />
              <span className="text-yellow-200">Starts Today</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Yoga, Gym, Cardio — all in one app. Personalized plans, Indian
              diet tips, and progress tracking designed for young India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    className="bg-white text-primary font-bold hover:bg-white/90 text-base px-8"
                    data-ocid="landing.dashboard.button"
                  >
                    Go to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  className="bg-white text-primary font-bold hover:bg-white/90 text-base px-8"
                  onClick={login}
                  disabled={loginStatus === "logging-in"}
                  data-ocid="landing.login.button"
                >
                  {loginStatus === "logging-in"
                    ? "Logging in..."
                    : "Start Free 🚀"}
                </Button>
              )}
              <Link to="/workouts">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/60 text-white bg-white/10 hover:bg-white/20 text-base px-8"
                  data-ocid="landing.explore.button"
                >
                  Explore Workouts
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero image */}
      <div className="relative -mt-1 overflow-hidden">
        <img
          src="/assets/generated/hero-fitness.dim_1200x400.jpg"
          alt="Fitness yoga training"
          className="w-full object-cover max-h-64"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      {/* Stats banner */}
      <section className="bg-primary py-8 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-4 text-center text-primary-foreground">
            {[
              { value: "50K+", label: "Active Users" },
              { value: "200+", label: "Workouts" },
              { value: "4.9★", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl sm:text-3xl font-bold">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground text-lg">
              Built specifically for the young fitness enthusiast in India
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card className="h-full hover:shadow-card transition-shadow">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}
                    >
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-accent/30">
        <div className="container max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            What People Say
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex mb-3">
                      {Array.from(
                        { length: t.rating },
                        (_, j) => `star-${j}`,
                      ).map((starKey) => (
                        <Star
                          key={starKey}
                          className="w-4 h-4 text-primary fill-primary"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 italic">
                      "{t.text}"
                    </p>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.city}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="container max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Ready to Transform? 💪
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Join thousands of Indian youth building a healthier lifestyle.
            </p>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground font-bold px-10"
                  data-ocid="landing.cta.button"
                >
                  Open Dashboard <ArrowRight className="ml-2" />
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                className="bg-primary text-primary-foreground font-bold px-10"
                onClick={login}
                disabled={loginStatus === "logging-in"}
                data-ocid="landing.cta.button"
              >
                Join Free Today
              </Button>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
