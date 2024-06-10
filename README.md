This project is a Node.js HTTP server that provides a RESTful API for managing employee records. The server includes the following features:

CRUD Operations: Supports Create, Read, Update, and Delete operations for employee records.

User Authentication and Authorization: Implements JWT-based authentication and authorization for secure access to protected routes.

Database Integration: Connects to a MongoDB database for persistent storage of employee data.

Middleware: Utilizes middleware for logging requests, handling errors, parsing cookies, and enabling CORS with specific options.

Routing: Defines routes for user registration, authentication, token refresh, and logout.

Static File Serving: Serves static files from the /public directory.

Custom Error Handling: Provides a custom 404 error page and centralized error handling middleware.
