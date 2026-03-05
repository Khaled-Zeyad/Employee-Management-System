function sanitizeBody(body, allowedFields) {
  const sanitized = {};
  for (const key of Object.keys(body)) {
    // Prevent NoSQL Injection (Mongo operators)
    if (key.startsWith("$") || key.includes(".")) continue;
    // Prevent Mass Assignment (Whitelist check on array)
    if (allowedFields.includes(key)) {
      sanitized[key] = body[key];
    }
  }
  return sanitized;
}
module.exports = { sanitizeBody };
