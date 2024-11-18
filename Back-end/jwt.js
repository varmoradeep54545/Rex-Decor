const jwt = require("jsonwebtoken");
const jwtAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, 'ff08hd');
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
};


const generateToken = (userData) => {
  return jwt.sign(userData,'ff08hd');
};

module.exports = { jwtAuthMiddleware, generateToken };
// const jwt = require('jsonwebtoken');

// const jwtAuthMiddleware = (req, res, next) => {
//   const token = req.headers['authorization']?.split(' ')[1];  // Extract token from the Authorization header

//   if (!token) {
//     return res.status(403).json({ error: 'Token is required' });
//   }

//   const secretKey = 'ff08fe82f8615b2e346a941bf30f2e25186cf7e864c8bc7baa84d29b771ccb6ab7c3e74cfb3afb1b7ed350f38844d590ae5042964ef041427b76f84374412f5d'; // Replace with your actual secret key

//   // Ensure that the secret key is available
//   if (!secretKey) {
//     return res.status(500).json({ error: 'Secret key is missing' });
//   }

//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       console.log("Token verification failed", err);
//       return res.status(401).json({ error: 'Invalid token' });
//     }
//     req.user = decoded;  // Attach decoded user info to request
//     next();  // Proceed to the next middleware or route handler
//   });
// };

// module.exports = { jwtAuthMiddleware };
