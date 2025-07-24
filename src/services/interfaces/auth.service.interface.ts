import { IsAuthenticatedDto } from '../../dto/auth/is-authenticated.dto';
import { RefreshTokenDto } from '../../dto/auth/refresh-token.dto';

export interface IAuthService {
    isAuthenticated(dto: IsAuthenticatedDto): Promise<{ userId: string; role: string }>;
    refreshToken(dto: RefreshTokenDto): Promise<{ accessToken: string; refreshToken: string }>;
    // blacklistToken(userId: string, role: string, accessToken: string): Promise<void>;
    // unblacklistToken(userId: string, role: string): Promise<void>;
}