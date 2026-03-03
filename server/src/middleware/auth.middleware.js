const { verifyToken } = require("../utils/jwt");

module.exports = function auth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const payload = verifyToken(token);
    req.user = payload; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid/expired token" });
  }
};