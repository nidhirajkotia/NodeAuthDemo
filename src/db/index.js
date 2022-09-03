const { Client } = require('pg');
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

function save(email, password, isactive, otp) {

    return new Promise(function(resolve, reject) {

        client.query(`INSERT INTO employee (email, password, isactive, otp) VALUES 
        ($1, $2, $3, $4)`, [email,
            password,
            isactive,
            otp
        ], (err, resp) => {
            if (err) reject({ status: 500, IsSuccess: false, message: "fail" })

            resolve({ status: 200, IsSuccess: true, message: "success" })
        });
    });

}


function updateOTP(email, otp) {

    return new Promise(function(resolve, reject) {

        client.query("update employee set otp='" + otp + "' where email='" + email + "' ", (err, resp) => {
            if (err) reject({ status: 500, IsSuccess: false, message: "fail" })

            resolve({ status: 200, IsSuccess: true, message: "success" })
        });
    });

}

function setActiveUser(email, otp) {
    return new Promise(function(resolve, reject) {
        let setActive = "update employee set isactive=true  where email='" + email + "' and otp='" + otp + "';";
        client.query(setActive, (err, resp) => {
            if (err) reject({ status: 500, IsSuccess: false, message: "fail" })

            resolve({ status: 200, IsSuccess: true, message: "success" })
        });
    });
}

function validateOTP(email, otp) {
    return new Promise(function(resolve, reject) {
        let query = "select * from employee where email='" + email + "' and otp='" + otp + "';";
        client.query(query, async(err, resp) => {
            if (err) reject({ status: 500, IsSuccess: false, message: "fail" })

            if (resp.rows.length == 1) {
                resolve({ status: 200, IsSuccess: true, message: "success" })
            } else {
                resolve({ status: 200, IsSuccess: false, message: "Invalid OTP" })
            }
        });
    });
}

function get() {
    return new Promise(function(resolve, reject) {
        let query = "select * from employee;";
        client.query(query, async(err, resp) => {
            if (err) reject({ status: 500, IsSuccess: false, message: "fail" })

            resolve({ status: 200, IsSuccess: true, message: "success" })

        });
    });
}

function deleteEmp() {
    return new Promise(function(resolve, reject) {
        let query = "delete from employee;";
        client.query(query, async(err, resp) => {
            if (err) reject({ status: 500, message: "fail" })

            resolve({ status: 200, IsSuccess: true, message: "success" })

        });
    });
}

function verifykUser(email, password) {
    return new Promise(function(resolve, reject) {
        let query = "select * from employee where email='" + email + "' and password='" + password + "';";
        client.query(query, async(err, resp) => {
            if (err) reject({ status: 500, message: "fail" })

            if (resp.rows.length > 0)
                resolve({ status: 200, IsSuccess: true, message: "User logged in successfully" })
            else
                resolve({ status: 200, IsSuccess: false, message: "Username or password is wrong" })

        });
    });
}

function checkUserExist(email) {
    return new Promise(function(resolve, reject) {
        let query = "select * from employee where email='" + email + "';";
        client.query(query, async(err, resp) => {
            if (err) reject({ status: 500, message: "fail" })

            if (resp.rows.length > 0)
                resolve({ status: 200, IsSuccess: false, message: "User already exists" })
            else
                resolve({ status: 200, IsSuccess: true, message: "New user" })

        });
    });
}
module.exports = {
    save,
    setActiveUser,
    validateOTP,
    get,
    deleteEmp,
    verifykUser,
    checkUserExist,
    updateOTP
}