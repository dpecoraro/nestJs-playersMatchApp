import { ConfigService } from '@nestjs/config';

export class CognitoConfig {
    constructor(private configService: ConfigService) { }
    
    public userPoolId: string = this.configService.get<string>('COGNITO_USER_POOL_ID');
    public clientId: string = this.configService.get<string>('COGNITO_CLIENT_ID');
    public region: string = this.configService.get<string>('AWS_REGION');
    public authority: string = this.configService.get<string>('COGNITO_AUTHORITY');

}