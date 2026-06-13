## 2025-05-15 - NoSQL Injection Protection in Auth Routes
**Vulnerability:** NoSQL injection via JSON objects in authentication inputs (email, password, username).
**Learning:** Using `express-validator` with `.isString()` is an effective way to prevent MongoDB from interpreting JSON objects as query operators when passed directly to `findOne` or `create`.
**Prevention:** Always validate that user-controlled inputs are of the expected type (usually strings) before passing them to Mongoose or MongoDB queries.
