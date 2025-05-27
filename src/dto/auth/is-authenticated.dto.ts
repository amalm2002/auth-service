export class IsAuthenticatedDto {
    token: string;
    role?: string;

    constructor(data: Partial<IsAuthenticatedDto>) {
        this.token = data.token || '';
        this.role = data.role;
        this.validate();
    }

    private validate(): void {
        if (!this.token) {
            throw new Error('Token is required');
        }
    }
}