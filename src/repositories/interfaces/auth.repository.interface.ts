export interface IAuthRepository {
    verifyAccessToken(token: string): Promise<{ id: string; role: string }>;
    verifyRefreshToken(token: string): Promise<{ id: string; role: string }>;
    generateTokens(userId: string, role: string): Promise<{ accessToken: string; refreshToken: string }>;
    // blacklistToken(userId: string, role: string, accessToken: string): Promise<void>;
    // unblacklistToken(userId: string, role: string): Promise<void>;
}