export type WorkoutCategory = "Yoga" | "Gym" | "Cardio";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Workout {
  id: string;
  title: string;
  category: WorkoutCategory;
  difficulty: Difficulty;
  duration: number; // minutes
  thumbnail: string;
  description: string;
  exercises: string[];
  calories: number;
}

export interface DietTip {
  id: string;
  mealType: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  name: string;
  description: string;
  calories: number;
  nutrients: string[];
}

export interface DayPlan {
  day: string;
  date: string;
  workouts: string[]; // workout ids
}

export const WORKOUTS: Workout[] = [
  {
    id: "w1",
    title: "Surya Namaskar Flow",
    category: "Yoga",
    difficulty: "Beginner",
    duration: 20,
    thumbnail: "/assets/generated/workout-yoga.dim_400x300.jpg",
    description:
      "A classic sequence of 12 powerful yoga poses that warm up the entire body. Perfect for morning practice to energize and awaken your muscles.",
    exercises: [
      "Pranamasana",
      "Hasta Uttanasana",
      "Padahastasana",
      "Ashwa Sanchalanasana",
      "Dandasana",
      "Ashtanga Namaskara",
      "Bhujangasana",
      "Adho Mukha Svanasana",
    ],
    calories: 150,
  },
  {
    id: "w2",
    title: "Power Vinyasa",
    category: "Yoga",
    difficulty: "Intermediate",
    duration: 45,
    thumbnail: "/assets/generated/workout-yoga.dim_400x300.jpg",
    description:
      "A dynamic flowing yoga practice linking breath with movement. Build strength, flexibility, and mindfulness through challenging transitions.",
    exercises: [
      "Warrior I",
      "Warrior II",
      "Triangle Pose",
      "Crow Pose",
      "Wheel Pose",
      "Headstand prep",
    ],
    calories: 280,
  },
  {
    id: "w3",
    title: "Yin Yoga Deep Stretch",
    category: "Yoga",
    difficulty: "Beginner",
    duration: 35,
    thumbnail: "/assets/generated/workout-yoga.dim_400x300.jpg",
    description:
      "Slow-paced yoga with long-held poses targeting deep connective tissues. Ideal for stress relief and increasing flexibility over time.",
    exercises: [
      "Butterfly Pose",
      "Dragon Pose",
      "Sleeping Swan",
      "Sphinx",
      "Supported Fish",
      "Legs Up Wall",
    ],
    calories: 100,
  },
  {
    id: "w4",
    title: "Full Body Dumbbell Blast",
    category: "Gym",
    difficulty: "Intermediate",
    duration: 40,
    thumbnail: "/assets/generated/workout-gym.dim_400x300.jpg",
    description:
      "Hit every muscle group with this efficient dumbbell circuit. Builds strength and muscle tone while keeping your heart rate elevated.",
    exercises: [
      "Dumbbell Squat",
      "Romanian Deadlift",
      "Bench Press",
      "Bent-over Row",
      "Shoulder Press",
      "Bicep Curl",
      "Tricep Extension",
    ],
    calories: 320,
  },
  {
    id: "w5",
    title: "Beginner Bodyweight",
    category: "Gym",
    difficulty: "Beginner",
    duration: 25,
    thumbnail: "/assets/generated/workout-gym.dim_400x300.jpg",
    description:
      "No equipment needed! Build a solid fitness foundation with classic bodyweight exercises. Perfect for home workouts or gym beginners.",
    exercises: [
      "Push-ups",
      "Squats",
      "Lunges",
      "Plank",
      "Mountain Climbers",
      "Jumping Jacks",
    ],
    calories: 200,
  },
  {
    id: "w6",
    title: "Advanced Strength Circuit",
    category: "Gym",
    difficulty: "Advanced",
    duration: 60,
    thumbnail: "/assets/generated/workout-gym.dim_400x300.jpg",
    description:
      "Intense strength training circuit designed to maximize muscle hypertrophy and metabolic conditioning. Not for the faint-hearted!",
    exercises: [
      "Barbell Squat",
      "Deadlift",
      "Pull-ups",
      "Dips",
      "Overhead Press",
      "Cable Rows",
      "Face Pulls",
    ],
    calories: 480,
  },
  {
    id: "w7",
    title: "Morning Cardio Blast",
    category: "Cardio",
    difficulty: "Beginner",
    duration: 20,
    thumbnail: "/assets/generated/workout-cardio.dim_400x300.jpg",
    description:
      "Kickstart your metabolism with this energizing morning cardio session. Fun, fast-paced movements to get your blood pumping before the day begins.",
    exercises: [
      "High Knees",
      "Butt Kicks",
      "Star Jumps",
      "Speed Skaters",
      "Burpees",
      "Jump Rope",
    ],
    calories: 220,
  },
  {
    id: "w8",
    title: "HIIT Fat Burner",
    category: "Cardio",
    difficulty: "Advanced",
    duration: 30,
    thumbnail: "/assets/generated/workout-cardio.dim_400x300.jpg",
    description:
      "High-intensity interval training to maximize fat burning in minimum time. Push your limits with 40-second work periods and 20-second rest.",
    exercises: [
      "Sprint Intervals",
      "Box Jumps",
      "Battle Ropes",
      "Kettlebell Swings",
      "Jump Lunges",
      "Tuck Jumps",
    ],
    calories: 400,
  },
  {
    id: "w9",
    title: "Dance Cardio Dhamaka",
    category: "Cardio",
    difficulty: "Intermediate",
    duration: 35,
    thumbnail: "/assets/generated/workout-cardio.dim_400x300.jpg",
    description:
      "Groove your way to fitness with this Bollywood-inspired dance cardio session. Feel-good moves that make burning calories actually fun!",
    exercises: [
      "Bhangra Steps",
      "Garba Moves",
      "Hip Rolls",
      "Arm Circles",
      "Side Steps",
      "Jumping Turns",
    ],
    calories: 260,
  },
];

export const DIET_TIPS: DietTip[] = [
  // Breakfast
  {
    id: "d1",
    mealType: "Breakfast",
    name: "Moong Dal Chilla",
    description:
      "High-protein green moong pancakes with veggies. Fills you up for hours and provides steady energy for morning workouts.",
    calories: 280,
    nutrients: ["Protein: 18g", "Carbs: 32g", "Fat: 6g", "Fiber: 8g"],
  },
  {
    id: "d2",
    mealType: "Breakfast",
    name: "Overnight Oats with Chia",
    description:
      "Rolled oats soaked overnight with chia seeds, mango, and nuts. A power-packed breakfast ready when you wake up.",
    calories: 350,
    nutrients: ["Protein: 12g", "Carbs: 52g", "Fat: 10g", "Fiber: 12g"],
  },
  {
    id: "d3",
    mealType: "Breakfast",
    name: "Egg White Veggie Omelette",
    description:
      "Fluffy egg white omelette loaded with spinach, tomatoes, and bell peppers. Low-calorie, high-protein morning fuel.",
    calories: 220,
    nutrients: ["Protein: 22g", "Carbs: 8g", "Fat: 4g", "Fiber: 3g"],
  },
  {
    id: "d4",
    mealType: "Breakfast",
    name: "Banana Peanut Butter Smoothie",
    description:
      "Creamy blend of banana, peanut butter, milk, and whey protein. Perfect pre-workout or post-yoga breakfast.",
    calories: 380,
    nutrients: ["Protein: 25g", "Carbs: 45g", "Fat: 12g", "Fiber: 4g"],
  },
  {
    id: "d5",
    mealType: "Breakfast",
    name: "Poha with Peanuts",
    description:
      "Light flattened rice with peanuts, lemon, and coriander. Traditional Indian breakfast that's easy to digest.",
    calories: 260,
    nutrients: ["Protein: 8g", "Carbs: 42g", "Fat: 8g", "Fiber: 3g"],
  },
  // Lunch
  {
    id: "d6",
    mealType: "Lunch",
    name: "Rajma Chawal Bowl",
    description:
      "Classic kidney bean curry over brown rice. Complete protein combination loved across North India — filling and nutritious.",
    calories: 520,
    nutrients: ["Protein: 22g", "Carbs: 82g", "Fat: 8g", "Fiber: 16g"],
  },
  {
    id: "d7",
    mealType: "Lunch",
    name: "Grilled Paneer Salad",
    description:
      "Cubed grilled paneer over fresh greens with cucumber, chickpeas, and lemon-cumin dressing. Gym-goer approved!",
    calories: 380,
    nutrients: ["Protein: 28g", "Carbs: 20g", "Fat: 18g", "Fiber: 6g"],
  },
  {
    id: "d8",
    mealType: "Lunch",
    name: "Quinoa Khichdi",
    description:
      "Protein-rich quinoa cooked with lentils and vegetables, turmeric and cumin. A modern twist on a beloved Indian comfort food.",
    calories: 420,
    nutrients: ["Protein: 18g", "Carbs: 60g", "Fat: 8g", "Fiber: 10g"],
  },
  {
    id: "d9",
    mealType: "Lunch",
    name: "Chicken Tikka Wrap",
    description:
      "Lean grilled chicken tikka in a whole wheat roti with mint chutney and salad. High-protein portable lunch.",
    calories: 440,
    nutrients: ["Protein: 35g", "Carbs: 40g", "Fat: 12g", "Fiber: 5g"],
  },
  // Dinner
  {
    id: "d10",
    mealType: "Dinner",
    name: "Dal Palak with Millets",
    description:
      "Iron-rich lentil and spinach curry served with bajra roti. Light on the stomach, heavy on nutrition — perfect pre-sleep meal.",
    calories: 380,
    nutrients: ["Protein: 16g", "Carbs: 55g", "Fat: 6g", "Fiber: 12g"],
  },
  {
    id: "d11",
    mealType: "Dinner",
    name: "Baked Fish with Veggies",
    description:
      "Lemon-herb baked fish with roasted sweet potato and broccoli. Omega-3 rich, light dinner ideal after evening workouts.",
    calories: 340,
    nutrients: ["Protein: 32g", "Carbs: 28g", "Fat: 8g", "Fiber: 6g"],
  },
  {
    id: "d12",
    mealType: "Dinner",
    name: "Tofu Sabzi with Roti",
    description:
      "Spiced tofu stir-fry with mixed vegetables and whole wheat roti. Great vegan dinner that supports muscle recovery.",
    calories: 360,
    nutrients: ["Protein: 20g", "Carbs: 48g", "Fat: 10g", "Fiber: 8g"],
  },
  // Snacks
  {
    id: "d13",
    mealType: "Snack",
    name: "Roasted Chana Mix",
    description:
      "Spiced roasted chickpeas with peanuts and seeds. Crunchy, high-fiber snack to keep hunger away between meals.",
    calories: 180,
    nutrients: ["Protein: 10g", "Carbs: 22g", "Fat: 6g", "Fiber: 8g"],
  },
  {
    id: "d14",
    mealType: "Snack",
    name: "Greek Yogurt with Honey",
    description:
      "Thick Greek yogurt topped with honey, walnuts, and a pinch of cinnamon. Probiotic-rich post-workout recovery snack.",
    calories: 200,
    nutrients: ["Protein: 15g", "Carbs: 22g", "Fat: 6g", "Fiber: 1g"],
  },
  {
    id: "d15",
    mealType: "Snack",
    name: "Avocado Toast on Multigrain",
    description:
      "Creamy avocado on multigrain toast with cherry tomatoes and sesame seeds. Healthy fats to fuel your afternoon.",
    calories: 240,
    nutrients: ["Protein: 7g", "Carbs: 28g", "Fat: 14g", "Fiber: 7g"],
  },
];

export const WEEKLY_PLAN: DayPlan[] = [
  { day: "Monday", date: "2026-03-16", workouts: ["w1", "w7"] },
  { day: "Tuesday", date: "2026-03-17", workouts: ["w4"] },
  { day: "Wednesday", date: "2026-03-18", workouts: ["w3", "w8"] },
  { day: "Thursday", date: "2026-03-19", workouts: ["w5"] },
  { day: "Friday", date: "2026-03-20", workouts: ["w2", "w9"] },
  { day: "Saturday", date: "2026-03-21", workouts: ["w6"] },
  { day: "Sunday", date: "2026-03-22", workouts: ["w3"] },
];

export const COMPLETED_WORKOUTS = ["w1", "w7", "w4", "w3"];
