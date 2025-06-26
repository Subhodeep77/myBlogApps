import { validateToken } from "../services/authentication.js"

function checkForAuthenticationCookie(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue = req.cookies?.[cookieName]
        console.log("tokenCookieValue",tokenCookieValue)
        if(!tokenCookieValue)return next()
        try {
            const userPayload = validateToken(tokenCookieValue)
            req.user = userPayload
        } catch (error) {}
        return next()
    }
}

export { checkForAuthenticationCookie }