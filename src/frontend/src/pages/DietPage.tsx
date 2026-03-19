import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, Salad } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { DIET_TIPS, type DietTip } from "../data/mockData";

const mealIcons: Record<string, string> = {
  Breakfast: "🌅",
  Lunch: "☀️",
  Dinner: "🌙",
  Snack: "🍎",
};

const mealColors: Record<string, string> = {
  Breakfast: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Lunch: "bg-orange-100 text-orange-800 border-orange-200",
  Dinner: "bg-blue-100 text-blue-800 border-blue-200",
  Snack: "bg-green-100 text-green-800 border-green-200",
};

function DietCard({ tip }: { tip: DietTip }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full hover:shadow-card transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <Badge className={`${mealColors[tip.mealType]} mb-2`}>
                {mealIcons[tip.mealType]} {tip.mealType}
              </Badge>
              <h3 className="font-display font-bold text-base">{tip.name}</h3>
            </div>
            <div className="flex items-center gap-1 text-primary font-semibold text-sm ml-2">
              <Flame className="w-4 h-4" />
              <span>{tip.calories}</span>
              <span className="text-xs text-muted-foreground">kcal</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            {tip.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tip.nutrients.map((n) => (
              <Badge key={n} variant="secondary" className="text-xs">
                {n}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function DietPage() {
  const [mealType, setMealType] = useState<"All" | DietTip["mealType"]>("All");

  const filtered = DIET_TIPS.filter(
    (t) => mealType === "All" || t.mealType === mealType,
  );

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold mb-2 flex items-center gap-3">
          <Salad className="w-7 h-7 text-secondary" /> Diet Tips
        </h1>
        <p className="text-muted-foreground">
          Healthy Indian food options to fuel your fitness journey
        </p>
      </div>

      {/* Hero image */}
      <div className="rounded-2xl overflow-hidden mb-8 h-48">
        <img
          src="/assets/generated/diet-healthy.dim_400x300.jpg"
          alt="Healthy Indian food"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Filter */}
      <div className="mb-6">
        <Tabs
          value={mealType}
          onValueChange={(v) => setMealType(v as typeof mealType)}
        >
          <TabsList className="bg-muted/60" data-ocid="diet.mealtype.tab">
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Breakfast">🌅 Breakfast</TabsTrigger>
            <TabsTrigger value="Lunch">☀️ Lunch</TabsTrigger>
            <TabsTrigger value="Dinner">🌙 Dinner</TabsTrigger>
            <TabsTrigger value="Snack">🍎 Snack</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {filtered.length === 0 ? (
        <div
          className="text-center py-16 text-muted-foreground"
          data-ocid="diet.empty_state"
        >
          No tips available for this category.
        </div>
      ) : (
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="diet.list"
        >
          {filtered.map((tip, i) => (
            <div key={tip.id} data-ocid={`diet.item.${i + 1}`}>
              <DietCard tip={tip} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
