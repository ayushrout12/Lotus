<div align="center">

# 🌸 Lotus

### Turn your ideas into working websites with AI.

**Lotus is an AI-powered website builder that transforms natural-language prompts into complete React applications — with live previews, iterative AI editing, project saving, and downloadable source code.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge\&logo=react\&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Powered-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)](https://vite.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Storage-FFCA28?style=for-the-badge\&logo=firebase\&logoColor=black)](https://firebase.google.com/)
[![E2B](https://img.shields.io/badge/E2B-Sandbox-111111?style=for-the-badge)](https://e2b.dev/)

[![SPONSORED BY E2B FOR STARTUPS](https://img.shields.io/badge/SPONSORED%20BY-E2B%20FOR%20STARTUPS-ff8800?style=for-the-badge)](https://e2b.dev/startups)

**[Try Lotus](https://trylotus.dev)**

</div>

---

## ✨ What is Lotus?

Building a website shouldn't begin with hours of boilerplate, configuration, and repetitive setup.

With **Lotus**, you simply describe what you want to build.

Lotus interprets your prompt, generates a complete React project, launches it inside a secure development sandbox, and gives you a live preview — allowing you to move from an idea to a working application in minutes.

From landing pages and dashboards to interactive web applications, Lotus is designed to make software creation faster and more accessible.

---

## 🚀 Features

### 🤖 AI Website Generation

Describe the website or application you want to create using natural language and let Lotus generate the project for you.

### ⚡ Streaming Generation

Watch your application come together as code is generated instead of waiting for the entire response to finish.

### 🖥️ Live Sandbox Preview

Generated applications run inside an **E2B sandbox** with a Vite development server and hot reload.

Changes can appear directly in the preview without requiring a full production build.

### 💬 AI-Powered Editing

Building doesn't stop after the first prompt.

Continue chatting with Lotus to modify, improve, and iterate on the generated application.

### 🔐 Authentication

Lotus integrates with **Firebase Authentication**, including:

* Email and password authentication
* Google Sign-In
* Persistent user sessions

### ☁️ Saved Projects

Authenticated users can save their projects using **Cloud Firestore**.

Projects can be loaded, continued, or deleted later.

### 🖼️ AI Image Generation

Generate visual assets directly from Lotus using Gemini-powered image generation.

### 📦 Export Your Code

Download generated projects as complete ZIP archives and continue development locally using your preferred tools.

---

## 🛠️ Technology

Lotus combines modern web-development and AI infrastructure:

| Technology                  | Purpose                      |
| --------------------------- | ---------------------------- |
| **React**                   | Frontend interface           |
| **Vite**                    | Development environment      |
| **Firebase Authentication** | User authentication          |
| **Cloud Firestore**         | Project persistence          |
| **E2B**                     | Secure application sandboxes |
| **Groq**                    | AI generation                |
| **Google Gemini**           | AI + image generation        |
| **Vercel**                  | Production deployment        |
| **Node.js**                 | Server-side services         |

---

## 🧠 How Lotus Works

```text
Your Idea
   ↓
Natural-Language Prompt
   ↓
Lotus AI Generation Engine
   ↓
React + Vite Project
   ↓
E2B Development Sandbox
   ↓
Live Interactive Preview
   ↓
Edit • Save • Export
```

Lotus uses a Vite development server running on **port 5173** inside an E2B sandbox.

This architecture allows generated files to update the running application with hot reload rather than rebuilding the entire project after every modification.

---

## 📂 Project Structure

```text
Lotus/
│
├── src/
│   ├── components/
│   ├── pages/
│   └── ...
│
├── api/
│   ├── AI routes
│   ├── sandbox routes
│   └── error handling
│
├── lib/
│   ├── E2B utilities
│   ├── chat utilities
│   └── request helpers
│
├── server/
│   └── Local E2B API server
│
├── docs/
│   └── Architecture documentation
│
├── FIREBASE_SETUP.md
├── FEATURES.md
└── README.md
```

For a more detailed technical overview, see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## 💻 Running Lotus Locally

### 1. Clone the repository

```bash
git clone https://github.com/530ayush12/Lotus.git
cd Lotus
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Lotus uses several external services.

Configure the required environment variables for the services you intend to use.

```env
VITE_GROQ_API_KEY=
VITE_GEMINI_API_KEY=

E2B_API_KEY=
E2B_TEMPLATE_ID=lotus-vite

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

> **Never commit real API keys or Firebase secrets to the repository.**

### 4. Build the E2B template

Before using the sandbox infrastructure for the first time:

```bash
npm run e2b:build
```

This creates the custom `lotus-vite` environment containing Node.js and Vite.

### 5. Start Lotus

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## 🔥 Firebase Setup

Firebase powers authentication and project persistence.

Lotus supports:

* Google authentication
* Email/password authentication
* Firestore project storage

Complete setup instructions are available in:

[`FIREBASE_SETUP.md`](FIREBASE_SETUP.md)

To deploy the Firestore configuration:

```bash
firebase deploy --only firestore
```

or:

```bash
npm run firebase:deploy
```

---

## ☁️ Deployment

Lotus is designed to run on **Vercel**.

The production deployment requires the appropriate AI, Firebase, and E2B environment variables to be configured under:

```text
Vercel
→ Project
→ Settings
→ Environment Variables
```

Environment variables should be enabled for:

```text
Production
Preview
Development
```

After modifying environment variables, redeploy the application so the new configuration is applied.

### Verify E2B

After deployment, check:

```text
https://your-domain.com/api/health
```

A properly configured deployment should report E2B as configured.

---

## 🔒 Security

API credentials should never be committed directly to GitHub.

Use:

* `.env.local` for local development
* Vercel Environment Variables for production
* Firebase configuration and security rules for authentication and stored projects

Before committing changes, always verify that credentials, tokens, and private configuration files are excluded by `.gitignore`.

---

## 🗺️ Vision

Lotus is built around a simple idea:

> **Software creation should start with the idea — not the boilerplate.**

The goal is to create an environment where anyone can move naturally between describing, generating, previewing, editing, and exporting software without breaking their creative flow.

---

## 🔮 What's Next

Future development for Lotus can include:

* More capable multi-file generation
* Improved AI code reasoning
* Smarter automatic debugging
* Faster sandbox startup
* Expanded deployment integrations
* Better project version history
* More AI models
* Richer visual editing
* Improved responsive previews

---

## 👨‍💻 Creator

**Ayush Rout**

Developer building AI-powered applications and tools focused on making technology more useful, accessible, and intuitive.

[GitHub](https://github.com/530ayush12)

---

## 🤝 Contributing

Contributions, ideas, and feedback are welcome.

If you'd like to improve Lotus:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit your work
5. Open a pull request

---

## 📄 License

Please refer to the repository's license file for licensing information.

---

<div align="center">

### 🌸 Lotus

**Imagine it. Describe it. Build it.**

[Website](https://trylotus.dev) · [GitHub](https://github.com/530ayush12/Lotus)

</div>
