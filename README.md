# HARTECHO Official Website

**Live demo:** https://www.hartecho.com

## Overview

The HARTECHO site is the public face of HARTECHO LLC—a boutique digital marketing and web development agency. It showcases our full‑stack expertise, from SEO‑optimized server‑side rendering to secure API routes and automated deployments.

## Tech Stack

- **Frontend:** Nuxt 3 (Vue 3 with SSR), Pinia  
- **Backend:** Node.js, Nuxt Server Routes, Mongoose, MongoDB Atlas  
- **DevOps & Deployment:** Vercel (CI/CD), GitHub  

## Key Features

- **Server‑side rendering** for fast load times and SEO  
- **Modular components** with auto‑imports  
- **JSON‑LD metadata** for rich search results  
- **WCAG‑compliant** mobile‑first design  
- **Secure contact form** and API endpoints  
- **Automatic deployment** on push to `main`  

## Getting Started

### Prerequisites

- Node.js v16 or higher  
- npm, yarn, or pnpm  
- MongoDB Atlas connection string  

### Installation & Running Locally

    git clone https://github.com/hartecho/hartecho-website.git
    cd hartecho-website
    npm install

Create a `.env` file in the project root with:

    MONGODB_URI=your_mongodb_connection_string
    NUXT_PUBLIC_SITE_URL=https://www.hartecho.com

Start the development server:

    npm run dev

### Build & Production

    npm run build
    npm run start

## Deployment

This repository is connected to Vercel. Any push to the `main` branch triggers the CI/CD pipeline and publishes the latest version at https://www.hartecho.com.

## License

© 2025 HARTECHO LLC. All rights reserved.

## Contact

Thomas Hart  
Email: thomas@hartecho.com  
Website: https://www.hartecho.com  
