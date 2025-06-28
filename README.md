# Poll App - Fullstack Voting System

![React](https://img.shields.io/badge/React-19.1.0-blue) ![.NET Core](https://img.shields.io/badge/.NET_Core-8.0-purple) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)   ![SQL Server](https://img.shields.io/badge/SQL_Server-2022-red) ![Docker](https://img.shields.io/badge/Docker-24.0-blue) ![Vite](https://img.shields.io/badge/Vite-5.0-yellow) ![EF Core](https://img.shields.io/badge/EF%20Core-8.0-green)

A complete polling system with features:
-   Quick poll creation
-   Shareable poll links
-   Interactive results visualization
-   Modern Fullstack architecture
    

## 🚀 Key Features

### Frontend (React + TypeScript)

-   Responsive UI with React 19
-   TypeScript component architecture
-   Dynamic charts with Chart.js
-   Routing with React Router DOM
-   Fast development with Vite
    

### Backend (.NET Core)

-   RESTful API with ASP.NET Core 8
    
-   Layered architecture (Controllers, Services, Models)
    
-   SQL Server integration
    
-   Database migrations with Entity Framework Core
    
-   JWT Authentication (extendable)
    

### Infrastructure

-   Docker containerization
    
-   Multi-container setup with docker-compose
    
-   CI/CD ready configuration
    
-   Multi-environment support (Dev/Prod)
    

## 🛠️ Setup

### Prerequisites

-   Node.js 18+
    
-   .NET Core SDK 8.0
    
-   Docker Desktop (for containerized setup)
    
-   SQL Server 2022 (optional)
    

### Installation

#### 1. Clone repository
git clone https://github.com/hamidmehralizade/PollApp-React-Dotnet.git
cd pollapp-react-dotnet

#### 2. Setup Backend
cd PollApp
dotnet restore
dotnet run

#### 3. Setup Frontend
cd pollapp.client
npm install
npm run dev

#### Or run with Docker
docker-compose up --build

## 📂 Project Structure

```
poll-app/
├── ClientApp/          # Frontend (React)
│   ├── public/         # Static assets
│   ├── src/            # Source code
│   │   ├── components/ # React components
│   │   ├── pages/      # Main pages
│   │   └── styles/     # CSS files
│   └── vite.config.ts  # Vite config
│
├── PollApp/            # Backend (.NET Core)
│   ├── Controllers/    # API Endpoints
│   ├── Models/         # Database models
│   ├── Services/       # Business logic
│   └── appsettings.json # Configuration
│
├── docker-compose.yml  # Multi-container setup
├── Dockerfile          # Docker files
└── README.md           # Documentation
```
## 🌟 Features in Detail

### Frontend

-   **Poll Creation**: Intuitive form with dynamic options
    
-   **Real-time Results**: Interactive charts with Chart.js
    
-   **Responsive Design**: Works on all devices
    
-   **Shareable Links**: Copy poll URL with one click
    

### Backend

-   **REST API**: Clean endpoints for all operations
    
-   **Data Validation**: Secure input handling
    
-   **JWT Support**: Ready for authentication
    
-   **Migrations**: Easy database updates
    

### DevOps

-   **Docker Support**: Isolated environments
    
-   **CI/CD Ready**: GitHub Actions config included
    
-   **Environment Variables**: Safe configuration
        
