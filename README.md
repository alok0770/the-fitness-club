# 🏋️ The Fitness Club — Full-Stack Gym & Fitness Platform

<p align="center">
  <img src="https://img.shields.io/badge/Backend-Spring%20Boot%203-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot 3"/>
  <img src="https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18"/>
  <img src="https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Security-Spring%20Security%206%20+%20JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/Media-Cloudinary%20API-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary"/>
  <img src="https://img.shields.io/badge/Deployment-Docker%20%7C%20Vercel-0969DA?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
</p>

---

## 📖 Overview

**The Fitness Club** is an enterprise-grade, full-stack fitness club management and showcase web platform engineered for **The Fitness Club (Joshiyara Road HQ • Uttarkashi)**. 

The application merges a high-conversion, visually striking client-facing Single Page Application (SPA) with a secure, authenticated Administrative Content Management System (CMS) powered by a decoupled **Spring Boot 3 REST API**.

---

## 🏛️ System Architecture

```
                    ┌────────────────────────────────────────────────────────┐
                    │                   Client Browser                       │
                    │      React 18 + Vite + Tailwind CSS + Framer Motion    │
                    └───────────────────────────┬────────────────────────────┘
                                                │
                                    REST APIs (JSON / Bearer JWT)
                                                ▼
                    ┌────────────────────────────────────────────────────────┐
                    │               Spring Boot 3 Backend                    │
                    ├────────────────────────────────────────────────────────┤
                    │  Security: Stateless JwtAuthenticationFilter (Auth)   │
                    │  Routing:  Public & Secured Admin REST Controllers     │
                    │  Services: CloudinaryService, DataSeeder, CRUD Logic   │
                    └───────────────┬────────────────────────┬───────────────┘
                                    │                        │
                    Cloudinary API  │                        │  JDBC / JPA
                    (Image Uploads) ▼                        ▼
                          ┌──────────────────┐     ┌──────────────────┐
                          │ Cloudinary Media │     │ Relational DB    │
                          │     Storage      │     │  (H2 / SQLite)   │
                          └──────────────────┘     └──────────────────┘
```

---

## ✨ Key Features & Capabilities

### 1. 🎨 Client Experience (Frontend)
- **High-Impact Hero Section**: Cinematic ambient video background, dynamic text hierarchy, and rapid conversion call-to-actions.
- **Interactive Transformation Gallery**: Real-world member transformations featuring interactive before-and-after image comparisons.
- **Tiered Membership Plans**: Flexible duration toggle (1, 3, 6, 12 months) with dynamically calculated pricing and feature check-lists.
- **Merchandise & Supplements Catalog**: Curated store grid displaying fitness apparel, protein supplements, and accessories with live availability badges.
- **Invitational Events & Workshops**: Calendar of gym workshops, powerlifting meets, and community fitness challenges.
- **Instant Inquiry Dispatch**: Deep-linked WhatsApp integration generating structured, pre-filled inquiry parameters for instant conversion.
- **Modern Micro-Interactions**: Lenis smooth scrolling, custom magnetic cursor, and Framer Motion viewport reveal animations.

### 2. ⚡ Administrative Back-Office (Backend)
- **Role-Based JWT Security**: Stateless authentication securing all management operations (`POST`, `PUT`, `DELETE`).
- **Dynamic Content CMS**: Complete administration dashboard to create, update, or remove membership tiers, merchandise, events, and transformations on the fly without redeploying code.
- **Cloudinary Asset Pipeline**: Multipart image upload endpoint (`/api/admin/upload`) directly offloading transformation photos to cloud storage.
- **Single-Flight Bootstrap Endpoint**: `/api/public/bootstrap` serves all public catalog data in a single network round-trip for sub-second page loads.
- **Automated Data Seeder**: Pre-populates default plans, transformations, and merchandise on first boot.

---

## 📡 REST API Reference

### Public Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/public/bootstrap` | Retrieves all active plans, products, transformations, and events |
| `POST` | `/api/auth/login` | Authenticates administrator credentials and returns Bearer JWT |

### Admin Endpoints (Requires `Authorization: Bearer <TOKEN>`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/admin/upload` | Uploads multipart image to Cloudinary and returns secure URL |
| `GET` / `POST` | `/api/admin/plans` | Fetch all membership plans / Create new membership tier |
| `PUT` / `DELETE` | `/api/admin/plans/{id}` | Update existing plan / Delete membership plan |
| `GET` / `POST` | `/api/admin/products` | Fetch inventory / Add new product |
| `PUT` / `DELETE` | `/api/admin/products/{id}` | Update product details / Delete product |
| `GET` / `POST` | `/api/admin/transformations`| Fetch transformation stories / Create new story |
| `PUT` / `DELETE` | `/api/admin/transformations/{id}`| Update transformation / Delete transformation |
| `GET` / `POST` | `/api/admin/events` | Fetch all scheduled events / Create new event |
| `PUT` / `DELETE` | `/api/admin/events/{id}` | Update event schedule / Delete event |

---

## 📁 Repository Directory Structure

```
the-fitness-club/
├── backend/                               # Spring Boot 3 REST API Service
│   ├── src/main/java/com/thefitnessclub/
│   │   ├── config/                        # Security, JWT, Database & Cloudinary config
│   │   ├── controller/                    # Public & Admin REST Controllers
│   │   ├── dto/                           # Request & Response Data Transfer Objects
│   │   ├── entity/                        # JPA Entities (Plan, Product, Transformation, Event)
│   │   └── repository/                    # Spring Data JPA Repositories
│   ├── src/main/resources/
│   │   └── application.properties         # Server & Datasource Configuration
│   ├── Dockerfile                         # Container definition for backend
│   └── pom.xml                            # Maven dependencies & build lifecycle
├── frontend/                              # React 18 + Vite Frontend Application
│   ├── src/
│   │   ├── components/                    # Modular UI components (Hero, Admin, Pricing, etc.)
│   │   ├── config/                        # Global site constants & WhatsApp deep-links
│   │   ├── lib/                           # Centralized Axios API client & token interceptors
│   │   └── data/                          # Fallback mock data structures
│   ├── public/                            # Static assets, branding, and video files
│   ├── tailwind.config.js                 # Design system theme extensions
│   ├── vite.config.js                     # Vite build configuration
│   └── package.json                       # Frontend dependencies & scripts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.x or higher
- **JDK**: Java Development Kit 17 or higher
- **Maven**: 3.8+ (or use the provided Maven wrapper)

---

### 1. Backend Setup (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Configure environment variables in `.env` (or set in `application.properties`):
   ```properties
   JWT_SECRET=your_base64_or_hex_jwt_secret_key
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_secure_password
   CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
   ```

3. Build and launch the Spring Boot service:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   👉 Backend will run on **`http://localhost:8080`** (or configured port).

---

### 2. Frontend Setup (React + Vite)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure API base URL in `.env`:
   ```properties
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

4. Launch the local development server:
   ```bash
   npm run dev
   ```
   👉 Access the application in your browser at **`http://localhost:5173`**!

---

## 🐳 Docker Deployment

The backend can be built and executed in an isolated Docker container:

```bash
cd backend
docker build -t the-fitness-club-backend .
docker run -p 8080:8080 the-fitness-club-backend
```

---

## 👨‍💻 Author & Engineering Credits

**Alok Rana**  
- 🐙 GitHub: [@alok0770](https://github.com/alok0770)  
- 🌐 Portfolio: [portfolio-alok-2b96.vercel.app](https://portfolio-alok-2b96.vercel.app/)  
- 💼 LeetCode: [@Alok_0770](https://leetcode.com/u/Alok_0770/)  
- 📍 Uttarakhand, India  
