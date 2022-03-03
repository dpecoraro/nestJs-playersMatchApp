import { IsEmail, Matches } from "class-validator";

export class AuthUserLoginDTO {
    @IsEmail()
    email: string;

    /**
     *  - Minimo de 8 caractéres
     *  - Ao menos 1 letra maiúscula
     *  - Ao menos 1 letra minúscula
     *  - Ao menos 1 número
     */
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: 'senha inválida' })    
    password: string;
}