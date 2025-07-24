import { IAuthRepository } from '../interfaces/auth.repository.interface';
import { verifyToken, signAccessToken, signRefreshToken } from '../../utilities/jwt.util';

export class AuthRepository implements IAuthRepository {
    async verifyAccessToken(token: string): Promise<{ id: string; role: string }> {
        try {
            const decoded = verifyToken(token, process.env.ACCESS_TOKEN || 'Amal');            
            return { id: decoded.clientId, role: decoded.role };
        } catch (error) {
            throw new Error('Invalid access token');
        }
    }

    async verifyRefreshToken(token: string): Promise<{ id: string; role: string }> {
        try {
            const decoded = verifyToken(token, process.env.REFRESH_TOKEN || 'Amal');
            return { id: decoded.clientId, role: decoded.role };
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }

    async generateTokens(userId: string, role: string): Promise<{ accessToken: string; refreshToken: string }> {
        console.log('generate the token :',userId);
        
        const payload = { id: userId, role };
        const accessToken = signAccessToken(payload, process.env.ACCESS_TOKEN || 'Amal');
        console.log(`Access token generated for user ${payload.id}: ${accessToken}`);
        const refreshToken = signRefreshToken(payload, process.env.REFRESH_TOKEN || 'Amal');
        console.log(`Refresh token generated for user ${userId}: ${refreshToken}`);
        return { accessToken, refreshToken };
    }
}




// import { IAuthRepository } from '../interfaces/auth.repository.interface';
// import { verifyToken, signAccessToken, signRefreshToken } from '../../utilities/jwt.util';
// import { createClient } from 'redis';

// const redisClient = createClient({ url: process.env.REDIS_URL });
// redisClient.on('error', (err: any) => console.error('Redis Client Error:', err));
// redisClient.connect();

// export class AuthRepository implements IAuthRepository {
//     async verifyAccessToken(token: string): Promise<{ id: string; role: string }> {
//         try {
//             const decoded = verifyToken(token, process.env.ACCESS_TOKEN || 'Amal');
//             const userId = decoded.clientId;
//             const role = decoded.role;

//             // Check if the token is blacklisted (for this specific user)
//             const blacklistedToken = await redisClient.get(`blacklist:token:${userId}`);
//             if (blacklistedToken === token) {
//                 throw new Error('Token is blacklisted');
//             }

//             return { id: userId, role };
//         } catch (error) {
//             throw new Error('Invalid access token');
//         }
//     }

//     async verifyRefreshToken(token: string): Promise<{ id: string; role: string }> {
//         try {
//             const decoded = verifyToken(token, process.env.REFRESH_TOKEN || 'Amal');
//             const isUserBlocked = await redisClient.get(`blocked_user:${decoded.clientId}`);
//             if (isUserBlocked === 'true') {
//                 throw new Error('User is blocked');
//             }
//             return { id: decoded.clientId, role: decoded.role };
//         } catch (error) {
//             throw new Error('Invalid refresh token');
//         }
//     }

//     async generateTokens(userId: string, role: string): Promise<{ accessToken: string; refreshToken: string }> {
//         const payload = { id: userId, role };
//         const accessToken = signAccessToken(payload, process.env.ACCESS_TOKEN || 'Amal');
//         const refreshToken = signRefreshToken(payload, process.env.REFRESH_TOKEN || 'Amal');
//         return { accessToken, refreshToken };
//     }

//     async blacklistToken(userId: string, role: string, accessToken: string): Promise<void> {
//         await redisClient.set(`blacklist:token:${userId}`, accessToken, { EX: 3600 }); // set expiry
//     }

//     async unblacklistToken(userId: string, role: string): Promise<void> {
//         await redisClient.del(`blacklist:token:${userId}`);
//     }
// }
