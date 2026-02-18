# Momentum — Research & First Draft Vision
*Written: February 2026*

---

## 0. Why This Document Exists

We're starting from zero. Not because the previous prototype was bad — it was a sharp v1 with a clear philosophy ("Invisible Coach", Plan B protocol, constraint-aware workouts). We're starting over because we now want to think bigger and more deliberately before writing a single line of code. This document captures the research, the competitive landscape, the gaps, and the first-draft vision for what Momentum *could* be.

---

## 1. The Problem Worth Solving

People who care about their health use an average of **5–7 apps simultaneously**: one for sleep, one for food, one for workouts, one for meditation, one for tracking, one for running, maybe one for HRV. Each app is a silo. None of them talk to each other. None of them understand *you as a whole person*.

The result is a cognitive burden that ironically undermines health:
- You have a Whoop score, an Oura readiness score, a MyFitnessPal macro summary, and a Strava run log. **No single system tells you what to actually do today.**
- You've logged 30 days of sleep data but your app can't tell you that your HRV tanks every Thursday because of late-night meetings.
- You know you slept 5 hours but your fitness app still expects a 45-minute HIIT session.

**The fundamental insight:** Health is a system. But we've built tools, not a system.

The second problem is the **retention cliff**. Health and fitness apps have a 30-day retention rate of just **7.9%**. More than 90% of users abandon apps within 3 months. Why? Because most apps track behavior but don't change behavior. They're dashboards, not coaches.

---

## 2. The Market in 2026

- **Fitness App Market**: $10.6B in 2024 → projected $33.6B by 2033 (17% CAGR)
- **Digital Health Coaching**: $11B in 2024 → $22B by 2030 (12.5% CAGR)
- **Health Coaching Apps Specifically**: $4.1B in 2024 → $10.4B by 2035
- Holistic health coaching (fitness + nutrition + mental health combined) is **the fastest growing segment**
- North America dominates; Asia Pacific is the fastest growing new market

The market is large and growing. But it's also crowded at the commodity layer. The whitespace is at **the intersection of AI personalization + data synthesis + behavior change**.

---

## 3. Competitive Landscape

### The Incumbents

| App | What It Does Well | What It Misses |
|-----|-------------------|--------------------|
| **MyFitnessPal** | Food database, macro tracking, barcode scanner | No real AI adaptation, no workout planning, no recovery context |
| **Whoop** | Strain/recovery/sleep scores, HRV, coach insights | Hardware-locked, no nutrition, no workout generation, subscription fatigue |
| **Oura Ring** | Sleep architecture, readiness score, temperature tracking | Also hardware-locked, minimal coaching, data-rich but insight-poor |
| **Noom** | Behavior change psychology, coaching, food logging | Expensive, feels clinical, no fitness programming, primarily weight-loss focused |
| **Levels** | CGM + metabolic health, glucose tracking | $199/yr, CGM is expensive, niche audience, no workout or sleep integration |
| **Strava** | Social running/cycling, routes, kudos | Single modality, no nutrition, no recovery, social not health-first |
| **Calm / Headspace** | Meditation, sleep sounds, mental health | Completely disconnected from physical health data |

### The New Entrants (Watch Closely)

- **Blueprint (Bryan Johnson)**: Extreme longevity protocol as a product. Supplements, biomarker tracking, "Autonomous Health" vision. Expensive, extreme, but philosophically interesting as the endgame.
- **Peter Attia's Outlive App**: Built on Medicine 3.0 framework. VO2 max, strength, sleep, nutrition as longevity pillars. Credibility-first positioning.
- **Claude for Healthcare (Anthropic, Jan 2026)**: Claude can now connect to Apple Health on iPhone. Claude Pro/Max users can share lab results, wearable data, health records. Claude can detect patterns across fitness and health metrics. *This is both a competitor and a platform opportunity.*

### The Real Competitors Are Habits, Not Apps

Every "health app" competes with the user's existing behavior loop: open Instagram, skip the workout, order delivery. The actual competitor is **friction + temptation + inertia**, not Whoop.

---

## 4. The Gaps Nobody Has Filled

After mapping the landscape, here is the whitespace:

### Gap 1: No unified, AI-native Health OS
There is no single app that synthesizes sleep quality + recovery + nutrition + training + energy + mental clarity into **one coherent daily recommendation**. Everyone does one lane. Nobody orchestrates the whole system.

### Gap 2: Data is collected but not translated
Users with Oura, Whoop, or Apple Watch are drowning in numbers (HRV, VO2 max, sleep stages, strain scores) but have no one translating those numbers into plain-language decisions. The *insight-to-action gap* is massive.

### Gap 3: AI adaptation is still mostly static
Most apps that call themselves "AI-powered" run a prompt once during onboarding and forget it. Truly adaptive systems — ones that watch your patterns over time and change the plan before you realize you need a change — don't exist at the consumer level yet.

### Gap 4: The "context collapse" problem
Apps don't know that you had a stressful week, skipped sleep to hit a deadline, then tried to PR your deadlift. They send you the same push notification regardless. **Context (personal, temporal, environmental) is the missing ingredient.**

### Gap 5: Retention is broken by judgment
Apps that guilt you for missing a workout lose you. The ones that shame you about your macros lose you. The 7.9% 30-day retention rate is a UX and psychology failure, not a feature failure. Nobody has solved the tone problem at scale.

---

## 5. The Momentum Philosophy

These principles define what we're building. They are not features — they are constraints that shape every feature decision.

### Principle 1: Translate, Don't Just Track
Raw data (HRV, sleep score, calories, macros) is not useful to most people. Momentum's job is to translate the data into one clear signal: *"Here's what to do today, and here's why."*

### Principle 2: Adapt Before You're Asked
A great coach doesn't wait for you to say "I'm tired." They notice it. Momentum should detect patterns (3 bad sleep nights, HRV dropping, meals inconsistent) and adjust the plan proactively.

### Principle 3: Calm is a Feature
The design must be intentionally minimal. No red badges, no shame streaks, no overwhelming dashboards. Surface the one or two most important things. Hide everything else until needed.

### Principle 4: The Plan Serves the Life, Not the Other Way Around
If today is chaos, the plan adapts. A 10-minute walk is better than a skipped 45-minute workout. Momentum should always offer a smaller, doable alternative instead of a skip.

### Principle 5: Build the Long Game
Most health apps optimize for sessions. Momentum optimizes for years. The metrics that matter are not daily streaks — they are VO2 max trajectory, resting HRV trend over 6 months, body composition over a year. Longitudinal thinking, not daily guilt.

---

## 6. What Momentum Could Be — First Draft

### The Elevator Pitch
**Momentum is your health operating system. It reads your data, learns your patterns, and gives you one clear signal every day: what to do, why, and how hard. No guilt, no noise, no dashboards to decode.**

### The Core Experience (v1 Target)

**Morning Check-in**
- Momentum reads last night's sleep (Apple Health / Oura / Whoop)
- It assesses your recovery state: Fresh / Moderate / Low
- Based on this, it sets today's **Energy Budget** (not a calorie budget — an *energy* budget)
- It then generates a day plan: what kind of workout, what to eat, when to rest
- The plan comes with a one-sentence "why": *"Your HRV is down 18% from your baseline — this is a movement day, not a training day."*

**The Invisible Coach**
- Conversational AI (Claude-powered) available at any point
- Not a chatbot. A coach. It knows your history, your patterns, your constraints.
- Proactive nudges when it detects pattern breaks: *"You've had 3 consecutive poor sleep nights — want me to adjust the week?"*
- Reactive to your life: "I only have 20 minutes" → immediate plan modification

**The Plan B Protocol** *(carried forward from v1)*
- Every plan has a fallback built in
- "I'm tired" → 10-minute mobility flow, not a skip
- "I only have eggs and oats" → optimized meal from available ingredients
- "My knee is acting up" → full workout swap, constraint-aware

**Weekly Arc**
- Not just today. Momentum has a weekly rhythm.
- Monday: Set the week's training intent (strength focus / endurance week / recovery week)
- Midweek: Check-in, adjustments based on how the first half went
- Sunday: Weekly retrospective — patterns observed, next week's setup

**Longitudinal Insights** *(Phase 2)*
- "Your best sleep happens when you stop eating 3 hours before bed — your data shows this clearly."
- "Your HRV peaks on days you do Zone 2 cardio, not HIIT."
- "You've been consistent for 6 weeks. Here's what changed in your numbers."

---

## 7. The Data Layer

### Input Sources (v1)
- Manual onboarding: goals, constraints, experience, equipment
- Daily check-in: energy (1–5), sleep quality (1–5), stress (1–5)
- Manual workout/meal logging

### Input Sources (v2 — Wearable Integration)
- **Apple Health / HealthKit** (iOS native — HRV, sleep stages, active calories, VO2 max)
- **Oura API** (ring data: readiness, sleep score, temperature)
- **Whoop API** (strain, recovery, sleep)
- **Garmin Connect** (running, cycling, strength data)

> Note: Apple does not provide a backend HealthKit API. Native iOS app required for HealthKit access. Data must be read on-device and synced to backend with user consent. This is a key architectural constraint for mobile.

### AI Processing
- All data synthesized into a **Daily State** object: `{ recovery, energy, sleep_quality, stress_load, training_readiness }`
- AI (Claude) generates plan with `training_readiness` as the primary input
- Patterns stored longitudinally and referenced by AI for contextual coaching

---

## 8. Domains of Health to Cover

Momentum is not just a workout app. The domains it manages:

| Domain | What It Tracks | What It Plans |
|--------|---------------|--------------|
| **Movement** | Workouts, steps, active minutes | Daily workout, intensity, modality |
| **Nutrition** | Meals, macros, meal timing | Meal plan, snacks, hydration |
| **Recovery** | Sleep, HRV, rest days | Rest intensity, sleep hygiene tips |
| **Energy** | Energy budget, caffeine, stress load | Pacing, activity scheduling |
| **Mental** | Stress, mood, focus | Breathing, journaling, recovery |
| **Longevity** *(Phase 3)* | VO2 max, resting HR trend, body composition | Multi-month programming |

**v1 Scope**: Movement + Nutrition + Recovery (the original three from the PRD)
**v2 Scope**: + Energy + Mental awareness layer
**v3 Scope**: + Longevity metrics, biomarker integration, CGM-optional

---

## 9. User Profiles (Who Is This For?)

### Primary: The Driven Professional (25–45)
- Works hard, has limited time
- Owns a wearable (Apple Watch, Oura, Whoop)
- Wants to optimize, not just track
- Has tried 3–4 health apps, none stuck
- **Insight**: They don't lack motivation; they lack a system that works with their life

### Secondary: The Health-Curious Beginner
- Wants to start but doesn't know where
- Overwhelmed by the complexity of fitness + nutrition
- Needs gentle guidance, not optimization
- **Insight**: They need Momentum to lower the bar, not raise it

### Not (Yet): The High-Performance Athlete
- Already has coaches, custom programming, specialized apps
- Too specific, too demanding to generalize
- This segment may be v3+

---

## 10. Tech Stack Thinking (Early)

This is exploratory, not final.

| Layer | Options | Lean Toward |
|-------|---------|-------------|
| **Frontend** | React Native (Expo), Flutter, Swift | React Native (Expo) — fastest iteration, JS ecosystem |
| **Backend** | Supabase, Firebase, custom Node | Supabase — PostgreSQL, auth, real-time built-in |
| **AI** | Claude API, OpenAI, Gemini | Claude API — healthcare context, Apple Health integration precedent |
| **Wearable Data** | HealthKit (iOS), Oura API, Whoop API | HealthKit first, others as platform scales |
| **Auth** | Supabase Auth, Clerk | Supabase Auth (keeps stack minimal) |

### Key Architectural Constraints
- **HealthKit requires native iOS app** — React Native can access it via `react-native-health` or Expo's Health packages
- **Wearable APIs have rate limits and data freshness windows** — plan for async data sync, not real-time polling
- **Health data is sensitive** — HIPAA-lite mindset from day one: encryption at rest, no logging of raw health content, explicit user consent flows

---

## 11. What We Are NOT Building

Just as important as what we are building:

- ❌ Not a social fitness app (no Strava-style feeds)
- ❌ Not a telehealth or symptom-checker app
- ❌ Not another calorie counter
- ❌ Not a supplement shop
- ❌ Not a general wellness content platform (no articles, no videos... yet)
- ❌ Not a gamification-first app (no meaningless badges)
- ❌ Not an extreme longevity protocol (no Bryan Johnson vibes in v1)

---

## 12. The Name: Momentum

The name is earned through behavior, not branding. Momentum is the physics of consistent small action. It compounds. It's hard to start, but once you have it, it takes less energy to maintain. The product should embody this: every interaction is designed to reduce activation energy for the next healthy choice.

**Tagline candidates:**
- *"Your health, in motion."*
- *"The plan that moves with you."*
- *"Momentum: a health OS that fits your life."*

---

## 13. Open Questions (to Resolve in Spec Phase)

1. **Mobile-first or web-first?** Wearable integration pushes toward mobile. Web is faster to prototype.
2. **How much does the AI generate vs. the user configure?** More AI = more magic, more risk of wrong outputs. More configuration = more setup friction.
3. **What is the monetization model?** Freemium? Subscription? What's free, what's paid?
4. **When do we require wearable data vs. manual check-in?** Manual check-in is accessible to everyone. Wearables are the power layer.
5. **What's the Day 1 onboarding experience?** This is the most critical UX moment. It sets tone, trust, and expectations.
6. **Claude API vs. Gemini?** The prior prototype used Gemini. Claude now has explicit Apple Health integration precedent and a healthcare API posture. Worth reconsidering.

---

## 14. What Comes Next

This document is step zero. From here:

1. **Product Spec** — Turn the vision into a detailed spec with screens, flows, and feature breakdown
2. **Architecture Decision Record (ADR)** — Lock down tech stack choices with reasoning
3. **MVP Definition** — What is the smallest version of Momentum that is worth building?
4. **Build Iteration 1** — Ship something real

---

## Sources & References

- [Walturn: Best AI Apps for Health 2025](https://www.walturn.com/insights/best-ai-apps-for-health-in-2025)
- [Grand View Research: Digital Health Coaching Market](https://www.grandviewresearch.com/industry-analysis/digital-health-coaching-market-report)
- [UX Cam: Mobile App Retention Benchmarks 2025](https://uxcam.com/blog/mobile-app-retention-benchmarks/)
- [Lucid: Retention Metrics for Fitness Apps](https://www.lucid.now/blog/retention-metrics-for-fitness-apps-industry-insights/)
- [Apple Developer: HealthKit](https://developer.apple.com/documentation/healthkit)
- [Thryve: Apple HealthKit Integration](https://www.thryve.health/features/connections/apple-healthkit-integration)
- [MacRumors: Claude AI Connects to Apple Health (Jan 2026)](https://www.macrumors.com/2026/01/22/claude-ai-adds-apple-health-connectivity/)
- [Anthropic: Claude for Healthcare](https://www.anthropic.com/news/healthcare-life-sciences)
- [Vitalis Young: Oura vs Whoop for Longevity (2026)](https://vitalisyoung.com/oura-ring-vs-whoop-a-data-driven-comparison-for-longevity-2026/)
- [GlobeNewswire: Fitness Apps Global Industry Report 2025](https://www.globenewswire.com/news-release/2025/02/10/3023643/28124/en/Fitness-Apps-Global-Industry-Report-2025-with-Profiles-of-60-Key-Market-Players-including-Aaptiv-Azumio-MyfitnessPal-Nike-Noom-Polar-Electro-Strava-Wahoo-Fitness-and-More.html)
- [Diversido: UX/UI Impact on Health Apps](https://www.diversido.io/blog/how-does-ux-ui-impact-your-wellness-app)
- [Tekedia: Best Wellness App Features for Retention 2025](https://www.tekedia.com/best-wellness-app-features-for-user-retention-in-2025/)
- [SPSoft: The Rise of the AI Health Coach](https://spsoft.com/tech-insights/optimizing-workflows-with-ai-health-coach/)
- [I Won't Die: Longevity App Inspired by Bryan Johnson](https://iwontdie.com/news/miscellaneous/the-longevity-app-inspired-by-bryan-johnson-now-available-for-ios-and-android/)
