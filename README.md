# HARTECHO Official Website

**Live demo:** https://www.hartecho.com

## Overview

The HARTECHO website showcases our expertise in building custom e‑commerce stores designed to improve conversions for online retailers. By leveraging Nuxt 3’s server‑side rendering, we deliver maximum speed optimization and SEO performance. Our bespoke UX/UI and tailored feature set ensure a seamless, high‑impact shopping experience that drives sales and growth. The site also includes a blog for sharing insights and an admin dashboard for managing products, orders, and user accounts.

## Tech Stack

- **Frontend:** Nuxt 3 (Vue 3 with SSR), Pinia  
- **Backend:** Node.js, Nuxt Server Routes, Mongoose, MongoDB Atlas  
- **Marketing Integrations:** Meta Pixel & Conversions API, Klaviyo  
- **DevOps:** Vercel (CI/CD), GitHub  

## Key Features

- **Server‑side rendering** for fast load times and SEO  
- **Modular components** with auto‑imports  
- **JSON‑LD metadata** for rich search results  
- **WCAG‑compliant** responsive design  
- **Meta Pixel & Conversions API** for tracking  
- **Klaviyo** waitlist signup and email flows  
- **Blog** section with markdown‑based posts and SEO metadata  
- **Admin dashboard** for:
  - Blog creation and editing
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
