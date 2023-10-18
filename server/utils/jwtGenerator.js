const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();

function jwtGenerator(user_id) {
    const payload={
        user:user_id
    }
    // const refreshToken = jwt.sign(payload, process.env.jwtSecret, { expiresIn: "7d" }); // Refresh token expires in 7 days
    const token = jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });

    // return { accessToken, refreshToken };
    return { token };
   
}
module.exports=jwtGenerator;
