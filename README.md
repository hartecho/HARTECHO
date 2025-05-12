# HARTECHO Official Website

**Live demo:** https://www.hartecho.com

## Overview

The HARTECHO site is the public face of HARTECHO LLC—a boutique digital marketing and web development agency. It demonstrates our full‑stack expertise, from SEO‑optimized server‑side rendering to secure API routes, marketing integrations (Meta Pixel + Conversions API, Klaviyo), and automated deployments.

## Tech Stack

- **Frontend:** Nuxt 3 (Vue 3 with SSR), Pinia  
- **Backend:** Node.js, Nuxt Server Routes, Mongoose, MongoDB Atlas  
- **Marketing Integrations:** Meta Pixel & Conversions API, Klaviyo  
- **DevOps:** Vercel (CI/CD), GitHub  

## Key Features

- **Server‑side rendering** for fast load times and SEO  
- **Modular components** with auto‑imports  
- **JSON‑LD metadata** for rich search results  
- **WCAG‑compliant** mobile‑first design  
- **Secure contact form** and API endpoints  
- **Meta Pixel & Conversions API** for tracking  
- **Klaviyo** waitlist signup and email flows  
- **Automatic deployment** on push to `main`  

## Getting Started

### Prerequisites

- Node.js v16 or higher  
- npm, yarn, or pnpm  
- MongoDB Atlas account  
- Klaviyo account  
- Meta Pixel setup in Facebook Business Manager  

### Installation & Running Locally

    git clone https://github.com/hartecho/hartecho-website.git
    cd hartecho-website
    npm install

Create a `.env` file in the project root with:

    DB_URI=your_mongodb_connection_string
    NUXT_PUBLIC_SITE_URL=https://www.hartecho.com
    META_PIXEL_ID=your_meta_pixel_id
    KLAVIYO_WAITLIST_ID=your_klaviyo_waitlist_list_id
    KLAVIYO_PUBLIC_KEY=your_klaviyo_public_api_key
    KLAVIYO_PRIVATE_KEY=your_klaviyo_private_api_key

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
