# Backend - Role-Based Admin & Project Management System (Backend)

This is the backend for the Role-Based Admin & Project Management System, built with Node.js, Express, and TypeScript.


## Live link: https://project-management-system-backend-six.vercel.app/


## Tech Stack

- **Backend**: Node.js, Express, TypeScript, MongoDB, Mongoose
- **Frontend**: React, TypeScript, Redux Toolkit, Tailwind CSS
- **Validation**: Zod (Request validation)
- **Authentication**: JWT, bcryptjs
- **Engineering**: Clean Architecture (Controllers, Services, Validations), Standardized Error Handling
- Admin gmail: admin@gmail.com, Admin Password:admin123 



## Folder Structure

```text
src/
├── config/         # Database configuration
├── controllers/    # Route handlers (Thin Controllers)
├── interfaces/     # TypeScript Interfaces & Types
├── middleware/     # Auth, Role, Validation & Error middlewares
├── models/         # Mongoose schemas & models
├── routes/         # Express route definitions
├── services/       # Business logic (Fat Services)
├── utils/          # Helper utilities (AppError, catchAsync)
├── validations/    # Zod schemas for request validation
└── index.ts        # App entry point
```



  
### **🛠️ Environment Setup**

To get the project running locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Rika4698/Project-Management-System-Backend.git
    cd Project-Management-System-Backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the necessary variables. Follow the `.env.example` file as a template.

4.  **Start the server:**
    ```bash
    npm run seed
    npm run dev
    ```
    The API will be available at `http://localhost:5000`.



---

## API Endpoints

### Auth
- `POST /api/auth/login` - User login
- `POST /api/auth/invite` - Generate user invite (ADMIN only)
- `POST /api/auth/register-via-invite` - Complete registration
- `POST /api/auth/refresh-token` - Refresh access token

### Users
- `GET /api/users?page=1&limit=10&search=john` - Get all users (ADMIN only, paginated, searchable)
- `PATCH /api/users/:id/role` - Update user role (ADMIN only)
- `PATCH /api/users/:id/status` - Update user status (ADMIN only)

### Projects
- `POST /api/projects` - Create project
- `GET /api/projects?search=myproject` - Get projects (Searchable)
- `PATCH /api/projects/:id` - Edit project (ADMIN only)
- `DELETE /api/projects/:id` - Soft delete (ADMIN only)

--- 

## Key Implementation Details

- **Validation**: Every POST/PATCH request is validated against a Zod schema before reaching the controller.
- **Error Handling**: Operational errors use the `AppError` class. Asynchronous errors are caught globally via `catchAsync`.
- **RBAC**: Middleware checks for user role permissions on specific routes.
- The server will run on `http://localhost:5000`.
- **Soft Delete**: Projects are never removed from DB; `isDeleted` flag is used along with a status update.
- **Type Safety**: Models, interfaces, and services are fully typed to minimize runtime errors.

---

### **🧪 API Testing**

You can use **Postman** or any other API client to test the endpoints. Remember to:

1.  Register and log in to get a access token.
2.  Include the `Authorization: Bearer <your_token>` headers for all protected routes.
3.  For endpoints that require a different role , make sure to log in with the appropriate user to get the correct token.

---
<br/>

## Sample API Usage

<br/>

### 1. Login admin

**Request:** `POST /api/auth/login`

```json
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

**Response:**

```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "user": {
            "_id": "697d02c91f91517c58f58952",
            "name": "Admin",
            "email": "admin@gmail.com",
            "role": "ADMIN"
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...."
    }
}
```
<br/>

### 2. Invite User (Only Admin)




**Request:** `POST /api/auth/invite`
**Header:** Authorization: Bearer <ADMIN_TOKEN>

```json
{
  "email": "staff@gmail.com",
  "role": "STAFF"
}
```

**Response:**

```json
{
   {
    "success": true,
    "message": "Invite generated successfully",
    "data": {
        "inviteToken": "e16113f4de6a9b8ea373b404da366047ec21e493",
        "inviteLink": "http://localhost:5173/register?token=e16113f4de6a9b8ea373b404da366047ec21e493",
        "email": "staff@gmail.com"
    }
}
}
```
<br/>

### 3. Complete Registration (Via Invite)
URL: 
Method: POST
Body:

**Request:** `POST /api//auth/register-via-invite`

```json
{
  "token": "REPLACE_WITH_INVITE_TOKEN_FROM_DB_OR_ADMIN_RESPONSE",
  "name": "Staff User",
  "password": "password123"
}
```

**Response:**

```json
{
    "success": true,
    "message": "Registration successful",
    "data": {
        "user": {
            "_id": "697e0d34f93c601647900e7f",
            "name": "Staff User",
            "email": "staff@gmail.com",
            "role": "STAFF"
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2UwZDM0ZjkzYzYwMTY0NzkwM..."
    }
}
```
<br/>

## 👤 Author & Contact

### Name: Sharmin Akter Reka
### Role: Frontend Developer
### Portfolio: https://my-portfolio-df10f.web.app/

*Thanks for exploring the Role-Based Admin & Project Management System!*