// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// const fetch = require("node-fetch"); // Import fetch library or use a suitable alternative
// const refreshThreshold = 5 * 60; // Refresh when token expires in less than 5 minutes
// dotenv.config();

// module.exports = async (req, res, next) => {
//   try {
//     const jwtToken = req.header("token");
//     if (!jwtToken) {``
//       return res.status(401).json("Not Authorize");
//     }

//     const payload = jwt.verify(jwtToken, process.env.jwtSecret);
//     req.user = payload.user;

//     const { exp, refreshToken } = payload; // Assuming the refresh token is included in the payload

//     // Check if the access token is about to expire
//     const currentTime = Math.floor(Date.now() / 1000);
//     if (exp - currentTime < refreshThreshold) {
//       // Fetch the new access token using the refresh token
//       const response = await fetch("/auth/refresh", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ refreshToken }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const newAccessToken = data.accessToken;

//         // Update the current request's user with the new access token's payload
//         req.user = jwt.verify(newAccessToken, process.env.jwtSecret);
//       } else {
//         console.error("Token refresh failed");
//       }
//     }

//     next();
//   } catch (error) {
//     console.error(error.message);
//     return res.status(401).json("Not Authorize");
//   }
// };
const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage

module.exports = function(req, res, next) {
 try {
  const jwtToken=req.header("token")
  if(!jwtToken){
    return res.status(403).json("Not Authoeize")
  }
  const payload=jwt.verify(jwtToken,process.env.jwtSecret)
  req.user=payload.user;
 } catch (error) {
  console.error(error.message);
  return res.status(403).json("Not Authoeize")
 }
 next()
};
