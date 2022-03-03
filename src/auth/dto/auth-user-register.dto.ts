import { IsEmail, IsMobilePhone, IsNotEmpty, IsString, Matches } from "class-validator";

export class AuthUserRegisterDTO {
    
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsEmail()
    email: string;

    /**
     *  - Minimo de 8 caractéres
     *  - Ao menos 1 letra maiúscula
     *  - Ao menos 1 letra minúscula
     *  - Ao menos 1 número
     */
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {message: 'senha inválida'})
    password: string;

    @IsMobilePhone('pt-BR')
    cellPhone: string;
}