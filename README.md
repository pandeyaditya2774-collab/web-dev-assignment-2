# Student Management REST API

REST API built with Node.js and Express to manage student records (CRUD). Data is stored in an in-memory array (no database).

## Setup

```
npm install
npm start
```

Server runs on `http://localhost:3000`

## Project Structure

```
app.js
routes/studentRoutes.js
middleware/logger.js
data/students.js
```

## Endpoints

| Method | URL             | Description        | Success |
|--------|-----------------|--------------------|---------|
| GET    | /students       | Get all students   | 200     |
| GET    | /students/:id   | Get student by ID  | 200     |
| POST   | /students       | Add a new student  | 201     |
| PUT    | /students/:id   | Update a student   | 200     |
| DELETE | /students/:id   | Delete a student   | 200     |

Errors: `400` for invalid input, `404` when student / route is not found.

## Sample Body (POST / PUT)

```json
{
  "name": "Neha",
  "course": "BCA"
}
```
