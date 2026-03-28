# GymCoach Pro

## Current State
A partial GymCoach Pro app exists with:
- Backend: UserProfile, CheckIn, UserStats, adminGetAllUsers, saveUserProfile, saveCheckIn, getMyStats
- Frontend: basic pages exist (Dashboard, Admin, Landing, DailyPlan, Diet, Progress, Workouts)
- The backend.d.ts is outdated (still shows SkyLearn types), needs full regeneration
- Authorization and blob-storage components are present

## Requested Changes (Diff)

### Add
- Workout detail pages: chest/back/legs/arms/shoulders/cardio with exercise lists, sets, reps, tips
- Diet/Meal plan pages: breakfast/lunch/dinner/snack items with calories per goal type
- Progress photo upload with blob-storage (store assetId, display in UI)
- Progress estimation: % body improvement based on completed workouts vs target
- Visual progress graph: 30-day bar chart showing daily check-in activity
- Days completed / days remaining counters
- Motivational streak tracker
- Chat widget with FAQ answers for gym-related questions
- Admin panel enhancements: see per-user check-in history, progress %, photo count
- Onboarding flow: name, age, weight, height, goal (weight loss / muscle gain / general fitness), target days
- Mobile-optimized layout throughout

### Modify
- backend.d.ts must be regenerated to match actual main.mo API
- Dashboard to show full progress stats, graph, streak, photos uploaded
- LandingPage to be a professional gym app landing page with CTA
- App routing to include /workouts, /diet, /progress, /profile pages

### Remove
- All remnants of SkyLearn (drone training) types and references
- Old OldUserProfile / OldLesson / OldModule types from active use

## Implementation Plan
1. Regenerate backend with clean GymCoach Pro API: profile management, check-ins, admin queries, photo asset IDs
2. Select blob-storage + authorization components
3. Build frontend: Landing, Dashboard, Workouts, Diet, Progress, Profile, Admin pages
4. Wire blob-storage for photo uploads on check-in
5. Implement progress chart (recharts bar chart)
6. Add chat widget with gym FAQ
7. Validate and deploy
