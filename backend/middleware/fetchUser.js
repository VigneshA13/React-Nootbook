const jwt = require("jsonwebtoken");
const JWT_SCRECT = "vignesh13$13";

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ error: "Inavalid Token" });
  }
  try {
    const data = jwt.verify(token, JWT_SCRECT);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Inavalid Token" });
  }
};
module.exports = fetchUser;
