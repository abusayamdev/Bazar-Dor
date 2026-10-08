# বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজারদর, দামের পরিবর্তন এবং বাজারভিত্তিক তুলনা দেখার জন্য একটি responsive Bengali web application।

## প্রযুক্তি

- Next.js 16 App Router, React 19 এবং TypeScript
- Tailwind CSS 4 ও DaisyUI 5
- Better Auth ও MongoDB
- Lucide React এবং React Hot Toast

## প্রধান বৈশিষ্ট্য

- API থেকে হালনাগাদ পণ্য ও ক্যাটাগরি
- বাংলা সংখ্যা, মুদ্রা ও responsive product cards
- ক্যাটাগরিভিত্তিক filtering এবং price sorting
- দাম বৃদ্ধি ও হ্রাসের আলাদা তালিকা
- বাজারভিত্তিক সর্বনিম্ন, সর্বোচ্চ ও গড় দাম
- Email/password, Google ও GitHub authentication
- Protected product details এবং profile routes
- Responsive mobile navigation, loading, empty এবং error states

## লোকাল সেটআপ

```bash
git clone https://github.com/abusayamdev/Bazar-Dor.git
cd Bazar-Dor
npm install
cp .env.example .env.local
npm run dev
```

তারপর [http://localhost:3000](http://localhost:3000) খুলুন।

## Environment variables

`.env.example` কপি করে `.env.local` তৈরি করুন।

```env
MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
BAZARDOR_API_URL=https://api.abcz.workers.dev/api/bazardor
```

`BETTER_AUTH_SECRET` একটি শক্তিশালী random secret হতে হবে। Google/GitHub provider ব্যবহার করতে সংশ্লিষ্ট OAuth app-এ callback URL হিসেবে নিচের URL দিন:

- `http://localhost:3000/api/auth/callback/google`
- `http://localhost:3000/api/auth/callback/github`

## API

Default fallback API: `https://api.abcz.workers.dev/api/bazardor`

- `GET /products`
- `GET /products?category=chal`
- `GET /products/:id`
- `GET /categories`
- `GET /categories/:slug`

## যাচাই

```bash
npm run lint
npm run build
```

## Deployment

Vercel project settings-এ production environment variables যোগ করে repository deploy করুন। MongoDB Atlas ব্যবহার করলে Vercel runtime থেকে database access অনুমোদন করতে হবে।

- Live link: _deployment-এর পর যোগ করুন_
- Repository: https://github.com/abusayamdev/Bazar-Dor
