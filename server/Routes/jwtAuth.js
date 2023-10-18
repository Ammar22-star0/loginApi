const router = require("express").Router();
const pool = require("../db.js");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator.js");
const validInfo=require("../middleware/validInfo.js");
const authorization=require("../middleware/authorization.js");
// const jwt=require("jsonwebtoken");
//registering

router.post("/register",validInfo, async (req, res) => {
  try {
    // 1. destructure the req.body (name,email,password)

    const { name, email, password } = req.body;

    // 2. check if user exist (if user exist then throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email=$1", [
      email,
    ]);
    if (user.rows.length !== 0) {
      return res.status(401).json("user already exist");
    }
    // 3. Bcrypt thr users password

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);
    // 4.enter the new user inside our database
    const newUser = await pool.query(
      "INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *",
      [name, email, bcryptPassword]
    );

    // 5.generating our jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//login route

router.post("/login",validInfo, async (req, res) => {
  try {
    // 1. destructure req.body

    const {email,password}=req.body;

    // 2. check user doesn't exist (if not then throw error)
    const user =await pool.query("SELECT * FROM users WHERE user_email=$1",[email]);

    if(user.rows.length == 0){
      return res.status(401).json("Password or Email is incorrect");
    }
    // 3. check if incoming password is the same the database password

    const validPassword= await bcrypt.compare(password,user.rows[0].user_password); //true or false
    if(!validPassword){
      return res.status(401).json("Password or Email is incorrect");
    }
  
    // 4. give them the jwt token
    else if (validPassword) {
      const { accessToken, refreshToken } = jwtGenerator(user.rows[0].user_id);
      return res.json({ accessToken, refreshToken });
  }
    

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/is-verify",authorization,async(req,res)=>{
  try {
    res.json(true);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
})

//   لست متأكداَ منها بعد لدي حل أن أطيل مدة token أفضل من عمل ريفريش(refresh) لقد عمل التحقق من المستخدم في لوحة التحكم ولكن عملية 
// router.post("/refresh", async (req, res) => {
//   const { refreshToken } = req.body;

//   if (!refreshToken) {
//       return res.status(401).json("Refresh token missing");
//   }

//   try {
//       const decoded = jwt.verify(refreshToken, process.env.jwtSecret);
//       const { user } = decoded;

//       const newAccessToken = jwtGenerator(user);

//       return res.json({ accessToken: newAccessToken });
//   } catch (error) {
//       console.error(error.message);
//       return res.status(403).json("Invalid refresh token");
//   }
// });


module.exports = router;
