const router = require('express').Router();
const users = require("../controllers");

module.exports = app => {

    // Login page
    router.get("/", users.login);

    // While login from login screen, check user already exists or not
    router.post("/loginUser", users.loginUser);

    // Signup page to register the new user
    router.get("/signup", users.signup);

    // After submitting details from Signup, generate OTP and send mail to user
    router.post("/signup", users.generateOTP);   

    // Verify OTP and make user active in database
    router.post("/verifyOTP", users.setactive);

    // Resend OTP 
    router.post("/resendOTP", users.resendOTP);

    // Home 
    router.get("/home", users.home);

    app.use(router);
};