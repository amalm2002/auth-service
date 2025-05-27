export class RefreshTokenDto {
    token: string;

    constructor(data: Partial<RefreshTokenDto>) {
        this.token = data.token || '';
        this.validate();
    }

    private validate(): void {
        if (!this.token) {
            throw new Error('Refresh token is required');
        }
    }
}