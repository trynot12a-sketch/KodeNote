## 2026-06-11 - [NoSQL Injection in Auth]
**Vulnerability:** Authentication routes accepted raw JSON objects as input, allowing for NoSQL injection bypasses.
**Learning:** Even with Mongoose, unsanitized req.body properties can be interpreted as query operators if passed directly to findOne().
**Prevention:** Always validate and sanitize user-controlled inputs using a library like express-validator to ensure they are strings or expected formats.
