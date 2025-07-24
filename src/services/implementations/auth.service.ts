import { IAuthService } from '../interfaces/auth.service.interface';
import { IAuthRepository } from '../../repositories/interfaces/auth.repository.interface';
import { IsAuthenticatedDto } from '../../dto/auth/is-authenticated.dto';
import { RefreshTokenDto } from '../../dto/auth/refresh-token.dto';

export class AuthService implements IAuthService {
    constructor(private authRepository: IAuthRepository) { }

    async isAuthenticated(dto: IsAuthenticatedDto): Promise<{ userId: string; role: string }> {
        const decoded = await this.authRepository.verifyAccessToken(dto.token);
        return { userId: decoded.id, role: decoded.role };
    }

    async refreshToken(dto: RefreshTokenDto): Promise<{ accessToken: string; refreshToken: string }> {
        const decoded = await this.authRepository.verifyRefreshToken(dto.token);
        return this.authRepository.generateTokens(decoded.id, decoded.role);
    }
}


// import { IAuthService } from '../interfaces/auth.service.interface';
// import { IAuthRepository } from '../../repositories/interfaces/auth.repository.interface';
// import { IsAuthenticatedDto } from '../../dto/auth/is-authenticated.dto';
// import { RefreshTokenDto } from '../../dto/auth/refresh-token.dto';

// export class AuthService implements IAuthService {
//     constructor(private authRepository: IAuthRepository) { }

//     async isAuthenticated(dto: IsAuthenticatedDto): Promise<{ userId: string; role: string }> {
//         const decoded = await this.authRepository.verifyAccessToken(dto.token);
//         return { userId: decoded.id, role: decoded.role };
//     }


//     async refreshToken(dto: RefreshTokenDto): Promise<{ accessToken: string; refreshToken: string }> {
//         const decoded = await this.authRepository.verifyRefreshToken(dto.token);
//         return this.authRepository.generateTokens(decoded.id, decoded.role);
//     }

//     async blacklistToken(userId: string, role: string, accessToken: string): Promise<void> {
//         await this.authRepository.blacklistToken(userId, role, accessToken);
//     }

//     async unblacklistToken(userId: string, role: string): Promise<void> {
//         await this.authRepository.unblacklistToken(userId, role);
//     }
// }