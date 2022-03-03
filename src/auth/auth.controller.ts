import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CognitoProviderService } from 'src/aws/aws-cognito.service';
import { AuthUserLoginDTO } from './dto/auth-login-user.dto';
import { AuthUserRegisterDTO } from './dto/auth-user-register.dto';

@Controller('auth')
export class AuthController {
    constructor(private cognitoService: CognitoProviderService){}
    @Post('/signup')
    @UsePipes(ValidationPipe)
    async register(
        @Body() authUserRegisterDTO: AuthUserRegisterDTO
    ) {
        return await this.cognitoService.userRegister(authUserRegisterDTO);
    }

    @Post('/login')
    @UsePipes(ValidationPipe)
    async login(@Body() loginDTO: AuthUserLoginDTO) {
        return await this.cognitoService.login(loginDTO);
    }
}
