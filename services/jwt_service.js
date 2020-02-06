const JWT = require("jsonwebtoken");
const expiry = "1d";

//generates the user token after authetication of a valid username/password. 
function generateToken(user) {
    const token = JWT.sign(
        {
            email: user.email
        },
        process.env.SESSION_SECRET,
        {
            subject: user._id.toString(),
            expiresIn: expiry
        }
    );
    return token;
}

module.exports = {
    generateToken
}