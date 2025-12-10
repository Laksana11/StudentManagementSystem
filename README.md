# Student Management System

A full-stack CRUD application for managing student records, built with **ASP.NET Core Web API** (backend) and **React + Vite** (frontend).


### Backend
- ASP.NET Core 9.0 Web API
- **Dapper** for data access
- **MSSQL Server** with stored procedures
- **Microsoft.Data.SqlClient** for SQL Server connectivity
- **AutoMapper** for DTO mapping
- C# 12

### Frontend
- React 18
- Vite 5
- **Material-UI (MUI)** - React component library
- **@mui/icons-material** - Material Design icons
- Axios for API calls


##  Setup Instructions

### 1. Database Setup

**Important:** You must set up the database before running the backend.


### 2. Backend Setup

# Navigate to backend directory
cd StudentManagement.API

# Restore dependencies
dotnet restore

# Run the backend API
dotnet run


The API will start at: **http://localhost:5202**


### 3. Frontend Setup

Open a **new terminal** and run:

# Navigate to frontend directory
cd frontend

# Install dependencies (already done if you followed along)
npm install

# Start the development server
npm run dev


The frontend will start at: **http://localhost:5173**

---

## API Endpoints

### Base URL: `http://localhost:5202/api`


 `GET` | `/students` | Get all students (supports `?search=` query) 
 `GET` | `/students/{id}` | Get student by ID 
 `POST` | `/students` | Create a new student 
 `PUT` | `/students/{id}` | Update an existing student 
 `DELETE` | `/students/{id}` | Delete a student 

### Example Request Bodies

**Create Student (POST /students)**
```json
{
  "name": "Hentry ",
  "email": "hentry@example.com",
  "age": 20
}
```

**Update Student (PUT /students/{id})**
```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "age": 21
}
```

### Validation Rules
- **Name**: Required
- **Email**: Required, must be valid email format, must be unique
- **Age**: Optional, must be between 1-150 if provided

### Error Response Format
```json
{
  "success": false,
  "message": "Email already exists"
}
```


##  Tools Used

### Backend
- **ASP.NET Core 9.0** - Web API framework
- **Dapper** - Lightweight ORM for data access
- **Microsoft.Data.SqlClient** - SQL Server connectivity
- **MSSQL Server** - Relational database with stored procedures
- **AutoMapper** - Object-to-object mapping
- **Swagger/OpenAPI** - API documentation (available in dev mode)

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool and dev server
- **Material-UI (MUI)** - React component library with Material Design
- **@mui/icons-material** - Material Design icon library
- **Axios** - HTTP client for API calls


## Troubleshooting

### Backend won't start
- Ensure .NET 9.0 SDK is installed: `dotnet --version`
- Verify SQL Server is running
- Check connection string in `appsettings.json` matches your SQL Server instance
- Ensure database and stored procedures are created (run `SETUP_DATABASE.sql`)
- Check if port 5202 is available

### Frontend won't start
- Ensure Node.js is installed: `node --version`
- Delete `node_modules` and run `npm install` again
- Check if port 5173 is available

### API calls failing
- Ensure backend is running on port 5202
- Check browser console for CORS errors
- Verify API base URL in `frontend/src/services/api.js`
- Check SQL Server connection and database existence

### Database connection errors
- Verify SQL Server is running
- Check connection string server name matches your instance
- Ensure Windows Authentication is enabled (Trusted_Connection=Yes)
- Try connecting to SQL Server using SSMS with the same credentials

