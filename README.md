# MobileMart-MERN-with-Next.js

A modern, full-stack e-commerce platform for mobile devices and accessories built with Next.js and Node.js/Express.

## 🚀 Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router and Server-Side Rendering
- **React 19** - Modern UI library with latest features
- **TypeScript** - Type-safe JavaScript for better development experience
- **Tailwind CSS 4** - Utility-first CSS framework for rapid UI development
- **React Icons** - Comprehensive icon library (Fi, Fa icons)
- **Axios** - HTTP client for API requests
- **@stripe/stripe-js** - Stripe.js for payment processing

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 5** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling for Node.js
- **Mongoose-Sequence** - Auto-increment plugin for MongoDB

### Authentication & Security
- **Passport.js** - Authentication middleware for Node.js
- **Passport Google OAuth 2.0** - Google OAuth authentication strategy
- **JSON Web Token (JWT)** - Secure token-based authentication
- **Bcrypt** - Password hashing for secure user authentication
- **Cookie Parser** - Parse HTTP cookies

### Payment Processing
- **Stripe** - Payment processing platform
- **Stripe Checkout** - Hosted payment page integration

### File Upload & Media
- **Multer** - Middleware for handling multipart/form-data (file uploads)

### Utilities
- **dotenv** - Environment variable management
- **CORS** - Cross-Origin Resource Sharing middleware
- **Body Parser** - Parse incoming request bodies

## ✨ Features

- 🛍️ **Product Catalog** - Browse and filter products with search functionality
- 🛒 **Shopping Cart** - Add to cart with quantity management and localStorage persistence
- 📱 **Product Details** - Detailed product pages with specifications and related products
- 💳 **Payment Processing** - Secure payment integration with Stripe Checkout
- 📦 **Order Management** - Automatic order creation and stock management after payment
- 📊 **Inventory Management** - Real-time stock updates when products are purchased
- 🔐 **User Authentication** - Sign in and sign up with email/password and Google OAuth 2.0
- 👤 **User Management** - User registration, login, and profile management
- 📤 **Product Upload** - Admin functionality to add new products with image uploads
- 📄 **About & Contact** - Modern about page and contact form
- 🎨 **Modern UI** - Responsive design with smooth animations and transitions
- 📱 **Mobile Responsive** - Optimized for all device sizes
- 🔒 **Secure Payments** - PCI-compliant payment processing through Stripe

## 📁 Project Structure

```
mobile-mart/
├── app/                      # Next.js app directory
│   ├── (component)/          # Shared components
│   │   ├── AuthProvider.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── userLoginForm.tsx
│   ├── (login)/              # Authentication pages
│   │   ├── signIn/
│   │   └── signUp/
│   ├── about/                # About page
│   ├── addProduct/           # Admin product upload
│   ├── auth/                 # Auth success page
│   ├── cart/                 # Shopping cart
│   ├── contact/              # Contact page
│   ├── products/             # Product pages
│   │   ├── [productId]/     # Individual product details
│   │   └── page.tsx         # Products listing
│   ├── success/              # Payment success page
│   └── page.tsx              # Home page
├── backend/                  # Node.js/Express backend
│   ├── routes/               # API routes
│   │   └── checkout.js       # Payment routes
│   ├── controller/           # Route controllers
│   │   ├── paymentController.js
│   │   └── productController.js
│   ├── models/               # Database models
│   │   ├── orderModel.js
│   │   ├── productModel.js
│   │   └── userModel.js
│   ├── middlewares/          # Express middleware
│   │   └── upload.js         # File upload middleware
│   ├── uploads/              # Uploaded product images
│   ├── authRoutes.js         # Authentication routes
│   ├── router.js             # Main API router
│   └── server.js             # Entry point
├── config/                   # Configuration files
│   └── passport.js          # Passport.js configuration
├── public/                   # Static assets
│   ├── carousel/             # Carousel images
│   └── products_img/         # Product images
├── .env                      # Environment variables (not in git)
├── package.json
├── tsconfig.json
└── README.md
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
Create a `.env` file in the root directory with the following variables:
```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback

# Stripe Payment
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Frontend URL
FRONTEND_URL=http://localhost:3000
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
- **Payment Integration**: Stripe Checkout for secure payment processing
- **Order System**: Automatic order creation with product details after successful payment
- **Stock Management**: Real-time inventory updates when products are purchased
- **File Upload**: Multer middleware for product image uploads
- **Authentication**: JWT-based authentication with Google OAuth support
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **State Management**: localStorage for cart persistence
- **Image Optimization**: Next.js Image component for optimized images
- **Type Safety**: Full TypeScript implementation
- **Database Models**: Mongoose schemas for Products, Users, and Orders

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

Ravindu Maleesha - [GitHub](https://github.com/rv0627)

---

Built with ❤️ using Next.js and Express.js
