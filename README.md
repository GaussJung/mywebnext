## MyWebNext v1.39
- This project with Next.JS is set up to use the built source as a static web.
- Library versions used: Node 22.13.1, Next.js 15.3.5- Environment files: .env.production, .env.development, .env.local
- The environment file must contain the following: 
```bash
NEXT_PUBLIC_BACKEND_URL=https://backend.example.com
```

## Remarks 
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
First, run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Notices for setting Static Web 
- This Project created with below options.
```bash
npx create-next-app@lates 
Input project name 
# ESLint --> Yes 
# Tailwind CSS--> Yes 
# App Router --> Yes
# Code inside 'src/' directory --> Yes 
# Turbopack --> No 
# import alias --> No
```
- "next.config.ts" should be renamed to "next.config.js".
```bash
# next.config.js for static web --> important block is [output: 'export']  
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, 
  },
};
module.exports = nextConfig;
```
- CORS needs to be set up in the backend.

## Running Build Source  
```bash
# Install local web server : [serve] 
npm install -g serve
# Run development source
npm run dev
# Build source (after checking source validation) 
npm run build 
(After build, 'out' directory will be created )
# Run build source 
npx server out  (for port 3000)
npx server out  -l 80  (for port 80)
# Check function using web brower 
http://localhost:3000 (default port 3000)
http://localhost:80 or http://localhost (custom port 80) 

```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
