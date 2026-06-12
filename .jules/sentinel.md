# Sentinel's Journal - Critical Security Learnings

## 2025-05-22 - NoSQL Injection in Auth Routes
**Vulnerability:** Authentication routes (login/register) lacked input validation, allowing potential NoSQL injection via JSON objects in body parameters (e.g., `{"email": {"$gt": ""}}`).
**Learning:** Mongoose queries can be manipulated if user input is not explicitly validated as a string or expected format.
**Prevention:** Use `express-validator`'s `.isString()` and `.isEmail()` to strictly validate inputs before they reach database queries.
