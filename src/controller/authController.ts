import jwt, { Secret } from 'jsonwebtoken'
import 'dotenv/config'

export class AuthController {
    isAuthenticated = async (call: any, callback: any) => {
        try {
            const token = call.request.token || ''
            // console.log(token);

            const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN || 'Amal' as Secret)
            // console.log(decoded);

            if (!decoded) {
                throw new Error('invalid token')
            }
            callback(null, { userId: decoded.id, role: decoded.role })
        } catch (error: any) {
            console.log('error on auth service :', error);

            callback(error, { mesaage: 'somthing gone wrong in authentication' })
        }
    }

    verifyToken = async (call: any, callback: any) => {
        try {
            // console.log('---------------------------------------');

            const refreshtoken = call.request.token as string
            console.log(refreshtoken, '---------------------------------------');
            const decoded: any = jwt.verify(refreshtoken, process.env.REFRESH_TOKEN || 'Amal' as Secret)
            console.log("token refreshed ");
            if (!decoded) {
                throw new Error("invalid token  ");
            }

            const refresh_token = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.REFRESH_TOKEN || "Amal" as Secret, {
                expiresIn: "7d"
            });

            const access_token = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.ACCESS_TOKEN || "Amal" as Secret, {
                expiresIn: "15m"
            });


            const response = { access_token, refresh_token }
            callback(null, response)

        } catch (error) {
            console.log('the erro while show on the verify token side auth-service', (error as Error).message);
            callback(error, { message: "something gone wrong in authentication" })
        }
    }
}