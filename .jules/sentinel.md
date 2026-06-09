## 2025-05-23 - NoSQL Injection in Auth
**Vulnerability:** NoSQL Injection via `req.body` in login and registration endpoints.
**Learning:** The application didn't validate that `email` and `password` were strings, allowing attackers to pass MongoDB query operators as objects to bypass authentication or probe the database.
**Prevention:** Always use a validation library like `express-validator` to enforce strict input types and formats (e.g., `isEmail()`, `isString()`) for all user-supplied data used in database queries.
