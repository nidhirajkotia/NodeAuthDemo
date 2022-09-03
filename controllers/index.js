const {
    save,
    setActiveUser,
    validateOTP,
    get,
    deleteEmp,
    verifykUser,
    checkUserExist,
    updateOTP
} = require('../src/db');

const { sendmail } = require('../src/mail')

exports.login = async(req, res) => {
    //deleteEmp();
    res.render("login");
}

exports.loginUser = async(req, res) => {
    try {
        let { email, password } = req.body;
        let check = await verifykUser(email, password);
        res.send(check);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

exports.signup = (req, res) => {
    res.render("signup");
}

exports.generateOTP = async(req, res) => {
    try {
        // make user inactive by default
        let isactive = false;

        let { email, password } = req.body;

        //save user details in db
        let checkUserExists = await checkUserExist(email);
        if (!checkUserExists.IsSuccess) {
            res.render("signup", { message: 'User already exists' });
            return;
        }
        // generate new otp
        let otp = parseInt(Math.random() * 1000000);

        //save user details in db
        let savedata = await save(email, password, isactive, otp);
        // send otp to user on email address 
        let mail = await sendmail(email, otp);

        res.render("verifyOTP", { email: email, message: 'OTP sent successfully on your email address' })
    } catch (e) {
        console.log(e);
        throw e;
    }
}

exports.setactive = async(req, res) => {
    try {
        let { email, otp } = req.body;
        let verifyOTP = await validateOTP(email, otp);
        if (!verifyOTP.IsSuccess) {
            res.render("verifyOTP", { message: verifyOTP.message, email: email });
            return;
        }
        let setActive = await setActiveUser(email, otp);

        res.render('home',{email: email});
    } catch (e) {
        console.log(e);
        throw e;
    }
}


exports.resendOTP = async(req, res) => {
    try {
        // generate new otp
        let otp = parseInt(Math.random() * 1000000);
        let { email } = req.body;
        //save user details in db
        let savedata = await updateOTP(email, otp);
        let mail = await sendmail(email, otp);

        res.send('Success');
    } catch (e) {
        console.log(e);
        throw e;
    }
}