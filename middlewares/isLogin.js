const {AuthenticationError} = require("apollo-server-express")

const isLoggedIn = (parent,args, {user} ,info) => {
   if(!user) {
        throw new AuthenticationError("يحب تسجيل الدخول")
    }
}
module.exports = {isLoggedIn}