import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BarChart2,
  Calendar,
  Camera,
  CheckCircle,
  Dumbbell,
  Target,
} from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const features = [
  {
    icon: Target,
    title: "Goal Setting",
    desc: "Set your target: Weight Loss, Muscle Gain, or General Fitness with a custom timeline",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Calendar,
    title: "Daily Plans",
    desc: "Personalized workout + meal plans generated based on your specific fitness goal",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: CheckCircle,
    title: "Daily Check-In",
    desc: "Log your workout and meals every day to build consistency and track progress",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: BarChart2,
    title: "Progress Graph",
    desc: "Visual chart showing your daily progress, days done, and days remaining",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Camera,
    title: "Photo Tracking",
    desc: "Upload daily progress photos to visually track your body transformation",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Activity,
    title: "Smart Analytics",
    desc: "Know exactly how far you've come and what it'll take to hit your goal",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
];

const steps = [
  {
    n: "01",
    title: "Create Account",
    desc: "Sign in and tell us your fitness goals and timeline",
  },
  {
    n: "02",
    title: "Get Your Plan",
    desc: "Receive a personalized daily workout + meal plan",
  },
  {
    n: "03",
    title: "Check In Daily",
    desc: "Log your progress every day and upload photos",
  },
  {
    n: "04",
    title: "See Results",
    desc: "Track your transformation with detailed analytics",
  },
];

export default function LandingPage() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src="/assets/generated/hero-gym.dim_1200x500.jpg"
          alt="GymCoach Pro"
          className="w-full h-[480px] sm:h-[520px] object-cover"
        />
        <div className="absolute inset-0 hero-bg" />
        <div className="absolute inset-0 flex items-center">
          <div className="container max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="max-w-2xl"
            >
              <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                🏋️ AI-Powered Gym Trainer
              </Badge>
              <h1 className="font-display text-4xl sm:text-6xl font-bold text-white mb-5 leading-tight">
                Build the Body
                <br />
                <span className="text-amber-400">You Deserve</span>
              </h1>
              <p className="text-white/85 text-lg mb-8 max-w-lg">
                Personalized workout plans, daily meal guides, progress
                tracking, and photo check-ins — your complete gym trainer in one
                app.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button
                      size="lg"
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-base px-8"
                      data-ocid="landing.dashboard.button"
                    >
                      Go to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    size="lg"
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-base px-8"
                    onClick={login}
                    disabled={loginStatus === "logging-in"}
                    data-ocid="landing.login.button"
                  >
                    {loginStatus === "logging-in"
                      ? "Signing in..."
                      : "Start Free Today 🚀"}
                  </Button>
                )}
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/50 text-white bg-white/10 hover:bg-white/20 text-base px-8"
                  data-ocid="landing.learn_more.button"
                >
                  <Dumbbell className="mr-2 w-5 h-5" /> How It Works
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-8 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-6 text-center text-primary-foreground">
            {[
              { v: "10K+", l: "Active Users" },
              { v: "90%", l: "See Results in 90 Days" },
              { v: "4.9★", l: "User Rating" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl sm:text-3xl font-bold">
                  {s.v}
                </div>
                <div className="text-sm text-primary-foreground/80 mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to Transform
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A complete system designed to help you achieve your fitness goals
              with structure, consistency, and accountability.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Card className="h-full hover:shadow-card gym-card">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-4`}
                    >
                      <f.icon className={`w-6 h-6 ${f.color}`} />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">
                      {f.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-accent/40">
        <div className="container max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground font-display font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {s.n}
                </div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
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
              Ready to Start? 💪
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Join thousands building their best bodies. Your transformation
              starts today.
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
                {loginStatus === "logging-in"
                  ? "Signing in..."
                  : "Get Started Free"}
              </Button>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
