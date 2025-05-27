import * as grpc from '@grpc/grpc-js'; 
import { IAuthController } from '../interfaces/auth.controller.interface';
import { AuthService } from '../../services/implementations/auth.service';
import { IsAuthenticatedDto } from '../../dto/auth/is-authenticated.dto';
import { RefreshTokenDto } from '../../dto/auth/refresh-token.dto';

export class AuthController implements IAuthController {
    constructor(private authService: AuthService) {}

    async isAuthenticated(call: any, callback: any): Promise<void> {
        try {
           
            const dto = new IsAuthenticatedDto(call.request);
            const result = await this.authService.isAuthenticated(dto);
            
            callback(null, { userId: result.userId, role: result.role });
        } catch (error: any) {
            callback({ code: grpc.status.UNAUTHENTICATED, message: error.message }, null);
        }
    }

    async refreshToken(call: any, callback: any): Promise<void> {
        try {
            const dto = new RefreshTokenDto(call.request);           
            const result = await this.authService.refreshToken(dto);            
            callback(null, { access_token: result.accessToken, refresh_token: result.refreshToken });
        } catch (error: any) {
            console.log("error",error);
            
            callback({ code: grpc.status.UNAUTHENTICATED, message: error.message }, null);
        }
    }
}