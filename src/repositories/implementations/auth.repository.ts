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
        const payload = { id: userId, role };
        const accessToken = signAccessToken(payload, process.env.ACCESS_TOKEN || 'Amal');
        console.log(`Access token generated for user ${userId}: ${accessToken}`);
        const refreshToken = signRefreshToken(payload, process.env.REFRESH_TOKEN || 'Amal');
        console.log(`Refresh token generated for user ${userId}: ${refreshToken}`);
        return { accessToken, refreshToken };
    }
}