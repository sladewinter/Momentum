# Momentum — Product Blueprint
*Living document. Start date: February 2026.*

---

## 0. What This Document Is

This is the founding product document for Momentum. Not a spec — a blueprint. It captures what we're building, why every decision exists, and what success looks like. Every future feature, design choice, and technical tradeoff should be traceable back to something in here.

It is allowed to be ambitious. Implementation will be constrained by time and resources. The blueprint should not be.

---

## 1. The One-Sentence Mission

**Momentum exists to give every person — regardless of income, schedule, body type, or background — access to the kind of personalized health guidance that used to cost thousands of dollars a month.**

Not an app. Not a tracker. A system that works with your life, not against it.

---

## 2. Who We Are Building For

Not a demographic. A situation.

### The Primary User: The Person Who Keeps Failing Existing Systems

They are 25–50. They want to be healthier — genuinely, not performatively. They've downloaded apps, started plans, had good weeks. And then life happened. Work got intense, sleep fell apart, they ordered delivery three nights in a row, and suddenly the streak was broken and the shame spiral began and they quietly deleted the app.

They didn't fail. **The system failed them.** It demanded consistency it never helped them build. It tracked their behavior without understanding their life. It showed them a broken streak instead of a way forward.

This person is not lazy. They are time-pressed, information-overloaded, and allergic to being made to feel worse about themselves than they already do.

This is who we build for first.

### Secondary: The Curious Beginner

They know they should do something. They have no idea where to start. The fitness world is intimidating — full of people who already look the way they want to look, speaking a language they haven't learned yet (macros, VO2 max, periodization). They don't need optimization. They need a door that isn't locked.

### Secondary: The Burned-Out High Performer

They know how to work hard. They've applied that work ethic to health and burned out on it too. Perfect week, then crash. They need permission to do less, more consistently. They need to understand that the minimum effective dose is not failure — it's wisdom.

### Who We Are NOT Building For (Yet)

- The competitive athlete with a specialist coach
- The person in active medical treatment who needs clinical guidance
- The extreme optimizer (Bryan Johnson territory) — not because they're wrong, but because their needs are too specific for v1

---

## 3. The Philosophy, Made Concrete

Every philosophical principle translates to a product constraint. These are not guidelines — they are rules.

### "Meet you where you are" →
Onboarding collects **context**, not measurements. We do not ask for weight, BMI, or body fat percentage on first open. We ask: what does your average day look like? What gets in the way? What does a good week feel like to you? The starting point is your life, not your body.

### "No shame" →
The product contains no guilt mechanics. No red badges for missing workouts. No streaks that break. No language that implies the user did something wrong. The welcome-back experience when someone returns after two weeks is warm and forward-looking — not a recap of what they missed.

A rule of thumb: **if a sentence could make someone feel worse about themselves, rewrite it.**

### "Minimum effective dose" →
Every recommendation must have a floor. Not a 45-minute workout — a 45-minute workout *and* a 10-minute version *and* a 5-minute version. The 5-minute version is not the consolation prize. It is a real, valid choice that Momentum endorses without reservation. The science supports it.

### "Food reality, not food perfection" →
Nutrition advice must work with what the user actually has access to — in terms of time, money, location, and kitchen. The app should be usable at a gas station, a hotel, a fast food restaurant. **No food is bad. No choice is shameful.** Every situation has a best next move.

No language of "cheat meals," "bad foods," "clean eating," or "treating yourself." Food is fuel, pleasure, culture, and comfort — all of those are valid.

### "Mental load is a health variable" →
Stress is not a soft metric. It is physiological. It changes cortisol, suppresses immune function, disrupts sleep architecture, affects hunger signals and decision-making. Momentum treats mental and emotional load as a primary input — on equal footing with sleep and movement.

### "Gold standard, not influencer standard" →
When Momentum gives information, it is accurate. When the evidence is strong, we say so. When the evidence is mixed, we say that too. We do not chase trends, sell supplements, or amplify fads. We are the antidote to fitness misinformation — delivered gently, without superiority.

---

## 4. The Five Domains

Momentum covers five interconnected areas of health. They are not tabs. They are a system. Changes in one affect recommendations in all others.

### Domain 1: Movement
*Not just "workouts." All physical activity counts.*

The philosophy here is that movement is a spectrum, not a binary. A walk is movement. A 5-minute stretch is movement. The goal is not to maximize — it is to maintain a relationship with your body that is positive and sustainable.

What Momentum manages:
- Daily movement intent (what kind of movement fits today's state)
- Workout generation (constraint-aware: time, equipment, limitations)
- Intensity calibration (based on recovery state, energy, mental load)
- Variety and progression over time

What Momentum doesn't do:
- Rank you against others
- Set arbitrary step count goals without context
- Shame missed sessions

### Domain 2: Nutrition
*Food for real people, not food for Instagram.*

This is the domain with the most mythology to undo. Momentum's nutrition layer is built on a few simple truths:
- Protein is the most important macronutrient for body composition and satiety
- Consistency over weeks matters more than perfection on any given day
- Hunger is information, not weakness
- Eating within budget, location, and time constraints is not a compromise — it's real life

What Momentum manages:
- Meal suggestions based on what you have available
- Macro awareness (not obsessive tracking — awareness)
- Practical nutrition for busy days, travel, limited budgets
- "Best move" guidance for any eating context
- Timing suggestions (not rigid rules — gentle patterns)

What Momentum doesn't do:
- Require logging every meal
- Calculate exact calories as the primary metric
- Make any food feel forbidden

### Domain 3: Recovery
*The most underrated domain. Also the one with the most actionable science.*

Sleep is medicine. Active recovery is training. Rest days are not lazy days. This is the domain where Momentum can be most contrarian and most correct simultaneously, because the wellness world dramatically undervalues recovery relative to what the evidence shows.

What Momentum manages:
- Sleep quality tracking (manual check-in, or via wearable)
- Recovery state assessment — how ready is your body today?
- Rest day programming (active recovery, mobility, breathwork)
- Sleep hygiene guidance (practical, not preachy)
- Stress-recovery balance over time

### Domain 4: Energy
*The synthesized signal. The output of everything else.*

Energy is what you actually feel. It is a function of sleep, nutrition, movement, stress, and mental load. Most apps track inputs but never tell you what the output means in human terms.

Momentum's energy model: before generating any daily plan, it synthesizes all available signals into a simple human readout — not a score, a statement. *"Your body is in a low-energy state today. This changes what we recommend."*

What Momentum manages:
- Daily energy state assessment
- Caffeine and stimulant awareness (optional)
- Energy patterns over time (when are you typically high/low?)
- Pacing recommendations (when to schedule hard things vs. easy things)

### Domain 5: Mental Wellbeing
*Not a meditation module. A first-class health domain.*

Burnout, anxiety, low mood, and chronic stress are health conditions with physical consequences. Momentum doesn't replace therapy. But it acknowledges mental health as part of the health system, treats it seriously, and responds to it meaningfully.

What Momentum manages:
- Mood and stress as daily inputs that change all other recommendations
- Burnout early warning (pattern recognition over time: sustained high stress + poor recovery)
- Breathing and grounding tools — simple, evidence-based, never forced
- The language of the app adapts to mental state (a stressed user gets a different tone than a rested one)
- Honest acknowledgment: "This is a hard week. The right move is less, not more."

---

## 5. The Rhythm

Momentum operates on three time horizons. Each has its own experience.

### The Daily Loop

**Morning (The Briefing)**
The most important product moment. User opens Momentum. It has already synthesized last night's sleep, yesterday's activity, and current stress level. It presents a simple, calm daily plan: here's your movement for today, here's your nutrition intent, here's your recovery priority. One sentence for each. And a one-sentence "why" that explains the reasoning.

This is not a dashboard. It is a briefing. You read it in 30 seconds and know what to do.

**During the Day (The Coach)**
The Invisible Coach is available whenever needed. Not pushed on you — present when you want it. You can tell it "I only have 15 minutes" and get an adjusted workout. You can say "I'm at a drive-through" and get the best option on the menu. You can say "I'm overwhelmed" and get a different kind of support.

It can also be proactive — but only when there's something genuinely worth saying. Not notifications for the sake of engagement.

**Evening (The Wind-Down)**
Optional, gentle. A prompt to check in: how did the day actually go? This is not mandatory. But for users who engage with it, it builds the longitudinal data that makes Momentum smarter over time. The tone is reflective, not evaluative. Not "did you hit your goals" — more like "how are you feeling?"

### The Weekly Loop

**Monday (Intent Setting)**
Not a plan — an intent. What kind of week is this? Crushing it / Normal / Survive mode. Three options. This single input changes the entire week's recommendations. A "survive mode" week gets a gentler plan. A "crushing it" week might push slightly harder. This is how the plan serves the life.

**Wednesday (Check-In)**
Mid-week pulse. Two questions maximum. Is the plan working? Do we need to adjust? If the user hasn't interacted much, Momentum might proactively adjust based on patterns.

**Sunday (Retrospective)**
What happened this week? Not a grade. A reflection. What went well? What got in the way? What did we learn about you? This is where Momentum starts to feel like it genuinely knows you — because it's building a model of your patterns, not just your averages.

### The Monthly Loop

**Monthly Insight**
This is the longitudinal layer. Not a report card — a letter. "Here's what we noticed this month. Here's what changed. Here's what we think that means." Delivered conversationally by the AI. Might say: "Your sleep has been consistently better on days you do Zone 2 cardio. You might not have noticed — the data shows it clearly."

This is the magic moment when Momentum earns deep trust. It saw something the user couldn't see.

---

## 6. Signature Experiences

These are the moments that define the product. If we get these right, everything else follows.

### The First Open
The most important 3 minutes in the product. No scales. No BMI. No "before" photos. The app opens with a warm welcome and a simple question: *"Tell us about your life — not your body."* The onboarding collects context: what does a typical week look like, what has gotten in the way before, what does "healthy" mean to you personally, what are your constraints. By the end, the user feels understood, not assessed.

### The Briefing
Every morning, a calm, clear synthesis. Not a checklist of 12 things to do. One movement recommendation. One nutrition intent. One recovery note. Total read time: under a minute. This is the thing that builds habit — because it's fast, useful, and never makes you feel bad.

### The Plan B Moment
Life interrupts. User says: "I'm exhausted, I can't do this workout." Without hesitation, Momentum offers a real alternative — not a lesser version offered apologetically, but a genuinely valuable alternative delivered as the right call. "Here's what actually makes sense for today." No guilt. No "but try to do the full one if you can." Just: this is the right move.

### The Welcome Back
User hasn't opened the app in two weeks. The app's response is: *"Good to see you. A lot can happen in two weeks — let's not worry about that. Where are you today?"* Fresh start. Full reset. No streak counter visible. Just an invitation to begin again from right now.

### The Pattern Reveal
After enough data, Momentum surfaces something the user didn't consciously know. "We've noticed your energy is consistently lower on Tuesdays — and it correlates with late Monday nights. This might be worth looking at." Or: "Your mood ratings are notably better on weeks you got 7+ hours of sleep at least 4 nights. The data on this is clear." This is the moment where the app becomes a mirror for your life.

### The Knowledge Moment
User asks "why protein?" or "does this workout actually help?" Momentum answers in plain language, with the actual evidence, at the right level of depth. Not a Wikipedia dump. Not an oversimplified platitude. A real explanation from a knowledgeable friend. And if the evidence is uncertain, it says so.

---

## 7. The Invisible Coach

This is the AI layer. It is the core of the product.

### Personality
The Coach is not a chatbot. It has a specific personality: warm, direct, occasionally dry, never fake-cheerful, never preachy. It sounds like a brilliant friend who happens to know a lot about health — not a customer service agent, not a fitness influencer, not a medical professional hiding behind liability language.

It does not say "Great question!" It does not add excessive exclamation marks. It does not lecture. It gives you the answer and moves on.

When it needs to raise something uncomfortable — like a pattern of poor sleep or sustained high stress — it does so directly but without drama. "Your recovery data has been concerning for two weeks. I want to flag this." Not alarming. Not minimizing. Just honest.

### What the Coach Knows

At any given moment, the Coach has access to:
- Your current state (energy, mood, sleep quality)
- Your history (patterns over weeks and months)
- Your constraints (time, equipment, injuries, food access)
- Your goals (stated, and inferred from patterns)
- Your preferences (what has and hasn't worked)
- The current context (time of day, day of week, recent activity)

It synthesizes all of this. A user who says "what should I eat right now" gets an answer that accounts for their macro situation today, their energy state, what they've had recently, and what they said about their food access during onboarding. Not a generic "have a salad."

### Proactive vs. Reactive

The Coach is reactive by default — it responds to what you ask. But it is proactively present in two situations:

1. **Pattern breaks**: When it detects something meaningful that the user probably hasn't noticed (sustained stress, declining sleep, repeated meal skipping)
2. **Scheduled touch points**: The morning briefing, mid-week check-in, weekly retrospective

It does not send push notifications to drive engagement. Notifications are reserved for things that are genuinely worth interrupting you for.

### What the Coach Does Not Do

- Diagnose illness or medical conditions
- Replace professional medical advice (it says so clearly when relevant)
- Promise specific outcomes
- Shame or judge
- Give confident answers where the science is uncertain

---

## 8. The Language System

The words Momentum uses are not interchangeable. Language is the primary way the philosophy manifests in the product.

### Words We Use
- **Movement** (not "exercise" — more inclusive)
- **Nourishment** or **Eating** (not "diet" — carries too much weight)
- **Recovery** (not "rest" — more intentional, more respected)
- **Energy** (the output signal, synthesized from everything)
- **Intent** (not "goal" — less pressure, more direction)
- **Today's plan** (not "your program" — feels alive, not fixed)
- **Best move** (not "correct choice" — eliminates shame)

### Words We Never Use
- Cheat meal, cheat day
- Clean eating, dirty eating
- Failing, missed, broken (streak)
- Should (as in "you should have")
- Perfect (as in "the perfect diet")
- Lazy, excuse
- Before / After (no transformation framing)

### The Tone Equation
- 30% warmth (this is a relationship, not a tool)
- 40% directness (give the answer, don't hedge)
- 20% intelligence (show the reasoning, briefly)
- 10% dry humor (where appropriate — never forced)

---

## 9. The Phase Roadmap

Not a timeline — a logical sequence. Each phase builds on the last.

### Phase 1 — The Foundation

The smallest version of Momentum that still embodies the full philosophy.

**Onboarding**: Context-first, no measurements, sets the right tone
**Daily State Check-In**: Energy, mood, sleep quality — three simple inputs
**The Briefing**: AI-generated daily plan (movement + nutrition intent + recovery note)
**The Invisible Coach**: Conversational AI, reactive, constraint-aware
**Plan B Protocol**: Immediate adaptation when life interrupts
**Welcome Back**: Zero-shame re-entry experience
**Basic Pattern Recognition**: Simple observations from daily check-in data

What Phase 1 does not have: wearable integration, longitudinal insights, weekly loops, food logging, community

### Phase 2 — The Intelligence Layer

**Weekly Loop**: Intent setting, mid-week check-in, retrospective
**Wearable Integration**: Apple Health (HealthKit) first — sleep, HRV, active energy
**Food Reality Mode**: Situation-based nutrition ("I'm at Chipotle" → best order)
**Mental Load Tracking**: Stress as primary input, burnout early warning
**Pattern Reveals**: AI surfaces longitudinal insights the user couldn't see
**The Knowledge Engine**: Robust, accurate "why" answers for any recommendation
**Richer Personalization**: Coach learns and adapts to individual patterns

### Phase 3 — The Depth Layer

**Monthly Insight**: The conversational monthly letter
**Community (Optional)**: Private, non-competitive accountability pairs or small groups
**Longevity Metrics**: VO2 max trend, resting HR trajectory, body composition over time
**Biomarker Integration**: Blood work, labs (if user wants to share)
**Provider Mode**: Option to generate a summary to share with a doctor or therapist
**Budget-Aware Nutrition**: Specific grocery and meal suggestions within a weekly food budget
**Additional Wearables**: Oura, Whoop, Garmin

---

## 10. What Success Looks Like

We track some standard metrics. But we also track human ones.

### Standard Metrics
- Day 7 retention / Day 30 retention (target: significantly above the 7.9% industry average)
- Daily active check-in rate
- Coach conversation frequency
- Plan B usage rate (how often users adapt vs. skip)
- Weekly loop engagement

### Human Metrics
These require occasional surveys and qualitative research, but they are the ones that actually matter:

- *"The app never made me feel bad about myself."* — this is a KPI.
- *"I'm still using it after 3 months."* — compounding consistency is the whole mission.
- *"I learned something true about health I didn't know before."* — the knowledge equity mission.
- *"The plan actually worked with my life."* — the democratization mission.
- *"I feel better than I did 3 months ago."* — the only metric that matters at the end.

### The Metric We Explicitly Don't Optimize For
**Time in app.** Momentum is not trying to maximize screen time. A user who opens the app for 90 seconds, reads the briefing, and closes it has had a successful session. The goal is a healthier life, not a more engaged app user.

---

## 11. Open Architecture Questions

These don't need answers yet. But they shape what we build next.

**The Measurement Question**: Do we ever ask for weight or body measurements? If so, when, why, and with what framing? Our instinct is: only if the user brings it up, and only in service of their stated goal — not as a baseline requirement.

**The Data Ownership Question**: User health data is sensitive. Momentum's posture should be: you own your data, you can export or delete it at any time, and we never use it to train AI models without explicit opt-in consent.

**The Revenue Question**: What's free? What's paid? Our instinct is: the core daily briefing and basic coach should be accessible to everyone. The intelligence layer (wearable integration, longitudinal insights, richer personalization) is the subscription tier. The mission requires that the basic product is genuinely useful, not a teaser.

**The Clinical Boundary Question**: Where exactly is the line between health guidance and medical advice? We need a clear answer to this before launch. Our posture: Momentum gives you accurate, evidence-based health information and personalized recommendations. It is not a medical provider. When something is outside our lane, we say so clearly and warmly.

**The Wearable Dependency Question**: The ideal version of Momentum is dramatically better with wearable data. But we cannot require it — that immediately excludes the users we most want to serve. The manual check-in must be a complete, dignified experience. Wearables are a power-up, not a prerequisite.

---

## 12. What We Explicitly Don't Build

As important as what we do build.

- ❌ **Social fitness feeds** — no Strava-style kudos, no comparing yourself to others
- ❌ **Streak mechanics that shame** — any streak system must survive gracefully when broken
- ❌ **Calorie obsession** — awareness yes, daily logging as the core loop no
- ❌ **Transformation framing** — no before/after, no "new you," no weight loss marketing language
- ❌ **Supplement recommendations** — too many conflicts of interest, too much misinformation in the space
- ❌ **Content platform** — not an article feed, not a video library (maybe Phase 4, not now)
- ❌ **Symptom checking** — not our lane, not our expertise, not our liability
- ❌ **Excessive gamification** — badges and points that don't connect to real health outcomes
- ❌ **Notification spam** — every notification must pass the "is this worth interrupting someone's day?" test

---

*This document is the product's conscience. When in doubt about any decision — feature, design, language, business model — come back to Section 1 and Section 3. If the decision serves the mission and respects the philosophy, ship it. If it doesn't, don't.*
