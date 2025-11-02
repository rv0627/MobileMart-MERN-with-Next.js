# MobileMart-MERN-with-Next.js

A modern, full-stack e-commerce platform for mobile devices and accessories built with Next.js and Node.js/Express.

## 🚀 Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Icons** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- Additional backend technologies as implemented

## ✨ Features

- 🛍️ **Product Catalog** - Browse and filter products with search functionality
- 🛒 **Shopping Cart** - Add to cart with quantity management and localStorage persistence
- 📱 **Product Details** - Detailed product pages with specifications and related products
- 🔐 **User Authentication** - Sign in and sign up pages with Oauth 2.0
- 📄 **About & Contact** - Modern about page and contact form
- 🎨 **Modern UI** - Responsive design with smooth animations and transitions
- 📱 **Mobile Responsive** - Optimized for all device sizes

## 📁 Project Structure

```
mobile-mart/
├── app/                      # Next.js app directory
│   ├── (component)/          # Shared components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── (login)/              # Authentication pages
│   ├── about/                # About page
│   ├── cart/                 # Shopping cart
│   ├── contact/              # Contact page
│   ├── products/             # Product pages
│   │   └── [productId]/     # Individual product details
│   └── page.tsx              # Home page
├── backend/                  # Node.js/Express backend
│   ├── routes/               # API routes
│   ├── models/               # Database models
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Express middleware
│   └── server.js             # Entry point
├── public/                   # Static assets
└── package.json
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the server:
```bash
npm start
# or for development
npm run dev
```

## 📝 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 🎯 Key Features Implementation

- **Product Management**: Browse products with filtering, sorting, and pagination
- **Shopping Cart**: Full cart functionality with quantity controls and order summary
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **State Management**: localStorage for cart persistence
- **Image Optimization**: Next.js Image component for optimized images
- **Type Safety**: Full TypeScript implementation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

Your Name - [Your GitHub](https://github.com/yourusername)

---

Built with ❤️ using Next.js and Express.js
