import path from "path";
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import 'dotenv/config';
import { AuthController } from "./controllers/implementations/auth.controller";
import { AuthService } from "./services/implementations/auth.service";
import { AuthRepository } from "./repositories/implementations/auth.repository";


const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);


const packageDef = protoLoader.loadSync(path.resolve(__dirname, './proto/auth.proto'), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const grpcObject = grpc.loadPackageDefinition(packageDef) as unknown as any;
const authPackage = grpcObject.authpackage;

if (!authPackage || !authPackage.Auth || !authPackage.Auth.service) {
    console.error("Failed to load the Auth service from the proto file.");
    process.exit(1);
}


const server = new grpc.Server();

server.addService(authPackage.Auth.service, {
    IsAuthenticated: authController.isAuthenticated.bind(authController),
    RefreshToken: authController.refreshToken.bind(authController)
});


const grpcServer = () => {
    const port = process.env.PORT || '50051';
    const domain = process.env.NODE_ENV === "dev" ? process.env.DEV_DOMAIN : process.env.PRO_DOMAIN_AUTH;

    server.bindAsync(`${domain}:${port}`, grpc.ServerCredentials.createInsecure(), (err, bindPort) => {
        if (err) {
            console.error("Error starting gRPC server:", err);
            return;
        }
        console.log(`gRPC auth server started on ${domain}:${bindPort}`);
    });
};

grpcServer();