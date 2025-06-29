# Upkeep

> **Crowdsourced community cleanup**

Upkeep is a hackathon project we put together in 48 hours. It turns local cleanup into a game: drop pins on messes, earn points for cleaning them, and trade those points for small rewards.

## 🚀 The Big Idea

1. **Spot it.** You see graffiti, litter or fly-tipping.
2. **Pin it.** Drop a map pin with a photo. Set a point-value bounty.
3. **Clean it.** Anyone can pick up the task, do the job, and upload a proof photo.
4. **Earn it.** Complete tasks, earn points, climb the leaderboards.
5. **Spend it.** Swap points for perks (partner discounts or community kudos).

## 💡 Why It Matters

- **Community-driven:** Locals decide what needs fixing.
- **Low friction:** Photo evidence + simple validation = trust.
- **Open-ended:** Use points to create more bounties or claim rewards.

## 🛠 Tech Stack

- **Frontend:** Next.js + Tailwind + shadcn/ui
- **Mapping:** Google Maps API for interactive pins
- **Auth & Data:** Supabase (Postgres + Auth + Storage)
- **Backend:** FastAPI + Pydantic (reporting & validation)
- **Deployment:** Vercel (frontend) + Supabase + Google Cloud Functions

## ⚙️ Running Locally

1. **Clone & setup**

   ```bash
   git clone https://github.com/A9-dev/streetcleaner && cd streetcleaner
   ```

2. Run the **Frontend**

   ```bash
   cd frontend
   cp .env.example .env.local   # fill in SUPABASE & MAPS keys
   pnpm install && pnpm run dev
   ```

3. Run the **Backend**

   ```bash
   cd backend
   uv venv
   uv pip install .
   uvicorn src.main:app --reload
   ```

4. **Go clean!** Visit `http://localhost:3000` and drop your first pin.

## 🎉 Next Steps (Hackathon Roadmap)

- Add AI validation for photo proof.
- Implement user profiles & badges.
- Create a community feed for updates.
- Add team-based challenges & chat.
- Mobile build (React Native).
- Integrate local business APIs for better rewards.

## Authors

- Connor Brook - Backend
- Joshua Oyekunle - Frontend
- Henry Pearson - Frontend
- Felix Walton - Frontend
