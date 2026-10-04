# Harini V | Portfolio

Dark, animated personal portfolio built with React + Vite, Tailwind CSS and Framer Motion.

## 1. Run it on your computer

You need Node.js 18 or newer (download from https://nodejs.org).

```bash
cd harini-portfolio
npm install        # installs everything (first time only)
npm run dev        # opens a live dev server at http://localhost:5173
```

Other commands:

```bash
npm run build      # makes the production version in /dist
npm run preview    # serves /dist locally to check the final build
```

## 2. Folder structure

```
harini-portfolio/
├── public/
│   ├── resume.pdf                 downloadable resume
│   ├── favicon.svg
│   └── images/
│       ├── harini.webp            profile photo (About section)
│       ├── proofs/                achievement proofs shown in "View proof"
│       ├── certificates/          course certificates (Certificates section)
│       └── projects/              put project screenshots here
├── src/
│   ├── components/                Navbar, Footer, Loader, CodeBackground, CursorGlow,
│   │                              Avatar, Companion, SectionHeading, ProofViewer, ...
│   ├── sections/                  Home, About, Achievements, Experience, Clubs, Skills,
│   │                              Projects, Certificates, Languages, Links, Contact
│   ├── data/                      ALL text content lives here (JSON)
│   ├── context/SiteContext.jsx    active section, avatar mood, guided tour
│   ├── hooks/                     useScrollSpy, useTyping
│   ├── App.jsx  main.jsx  index.css
├── tailwind.config.js  vite.config.js  package.json
```

## 3. Editing content (no component changes needed)

| File | What it controls |
| --- | --- |
| `src/data/profile.json` | Name, typing roles, quote, About text, stats, contact statement, avatar speech bubbles |
| `src/data/achievements.json` | Achievement cards and their proof images |
| `src/data/experience.json` | Timeline entries and dates |
| `src/data/clubs.json` | Club cards (`"active": true` shows the green badge) |
| `src/data/skills.json` | Skill groups |
| `src/data/projects.json` | Project cards and case studies |
| `src/data/certificates.json` | Certificate cards (title, issuer, date, description, image) |
| `src/data/languages.json` | Languages and proficiency (score out of 5) |
| `src/data/links.json` | Social icons, the Links section (GitHub, LeetCode) and which links show under Contact |

**Adding project screenshots:** save them in `public/images/projects/` (WebP or JPG, under ~300 KB each), then in `projects.json` set
`"thumbnail": "/images/projects/formwork-1.webp"` and add paths to `"screenshots": [ ... ]`.

**Replacing the resume:** overwrite `public/resume.pdf` (keep the same name).

**Adding a certificate:** save the image in `public/images/certificates/` and add an entry to `certificates.json`.

**Changing the theme colours:** edit `ink` and `accent` in `tailwind.config.js`.

## 4. Contact form with Formspree

1. Go to https://formspree.io and sign up with **harinivettri2811@gmail.com**. Confirm the verification email.
2. Click **+ New Form**, name it "Portfolio contact", and set the email to harinivettri2811@gmail.com.
3. Formspree shows an endpoint like `https://formspree.io/f/abcdwxyz`. The part after `/f/` (`abcdwxyz`) is your **form ID**.
4. Local testing: copy `.env.example` to a new file called `.env` and put your ID in it:
   ```
   VITE_FORMSPREE_ID=abcdwxyz
   ```
   Restart `npm run dev`, send a test message, and check your Gmail (also check Spam the first time and mark it "Not spam").
5. In the Formspree form settings, add your live site address (e.g. `harini-portfolio.vercel.app`) under **Restrict to domain** once deployed, to block spam from elsewhere.

The `.env` file is ignored by git on purpose. On Vercel you add the same value as an environment variable (step 5 below).
Until the ID is set, the form shows a message asking visitors to email you directly, so nothing breaks.

## 5. Deploy: GitHub → Vercel

**Push to GitHub**
1. On https://github.com/new create a repository named `harini-portfolio` (Public, no README).
2. In the project folder:
   ```bash
   git init
   git add .
   git commit -m "Portfolio v1"
   git branch -M main
   git remote add origin https://github.com/Harini-2811/harini-portfolio.git
   git push -u origin main
   ```

**Deploy on Vercel**
1. Go to https://vercel.com and **Continue with GitHub**.
2. **Add New → Project**, then **Import** `harini-portfolio`.
3. Vercel detects Vite automatically (Build command `npm run build`, Output `dist`). Leave these.
4. Open **Environment Variables** and add `VITE_FORMSPREE_ID` = your form ID.
5. Click **Deploy**. In about a minute you get a link like `https://harini-portfolio.vercel.app`.
6. Optional: **Settings → Domains** to rename the `.vercel.app` address or connect a custom domain.

From now on, every `git push` to `main` redeploys the site automatically.
If you change the Formspree ID later, update it in Vercel and click **Redeploy**.

**Netlify alternative:** Add new site → Import from GitHub → build `npm run build`, publish directory `dist`,
and add `VITE_FORMSPREE_ID` under Site configuration → Environment variables.

## 6. Launch checklist

- [ ] Contact form test message arrives in Gmail
- [ ] Resume downloads correctly
- [ ] All social, GitHub and live-demo links open
- [ ] Checked on phone, tablet and laptop
- [ ] Lighthouse (Chrome DevTools → Lighthouse) performance and accessibility above 90
- [ ] Link added to LinkedIn and resume
