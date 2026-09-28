# LaunchPad: internship recruitment & feedback platform

A full-stack web app where students track their internship applications and leave structured reviews of employers, and recruiters see aggregated feedback trends. Built in 8 weeks by a 6-person team for NUS BT3103 (Application Systems Development) and used by 50+ students.

## Features

- Email sign-in and personalised onboarding (Firebase Authentication)
- Application-tracking dashboard for students
- 5-star ratings plus free-text feedback on employers, stored in Firestore
- AI-generated summaries and sentiment (OpenAI API) that turn free-text reviews into employer scorecards for 20+ employers
- Recruiter-side analytics on hiring and feedback trends

## Stack

Vue 3 · Vite · Firebase Authentication & Firestore · Firebase Hosting · OpenAI API

## Run locally

```bash
npm install
npm run dev
```

Requires your own Firebase project config and an OpenAI API key.
