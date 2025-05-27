import { IsAuthenticatedDto } from '../../dto/auth/is-authenticated.dto';
import { RefreshTokenDto } from '../../dto/auth/refresh-token.dto';

export interface IAuthController {
    isAuthenticated(call: any, callback: any): Promise<void>;
    refreshToken(call: any, callback: any): Promise<void>;
}