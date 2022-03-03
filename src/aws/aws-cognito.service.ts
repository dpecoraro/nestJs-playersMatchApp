import { Injectable } from "@nestjs/common";
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from "amazon-cognito-identity-js";
import { AuthUserLoginDTO } from "src/auth/dto/auth-login-user.dto";
import { AuthUserRegisterDTO } from "src/auth/dto/auth-user-register.dto";
import { CognitoConfig } from "./aws-cognito.config";

@Injectable()
export class CognitoProviderService {
    
    private userPool: CognitoUserPool

    constructor(private cognitoConfig: CognitoConfig) {
        this.userPool = new CognitoUserPool({
            UserPoolId: cognitoConfig.userPoolId,
            ClientId: cognitoConfig.clientId
        })
    }
    
    async userRegister(userDTO: AuthUserRegisterDTO) {
        const { cellPhone, name, password, email } = userDTO;
        
        return new Promise((resolve, reject) => {
            this.userPool.signUp(
                email,
                password,
                [
                    new CognitoUserAttribute({
                        Name: 'phone_number',
                        Value: cellPhone
                    }),
                    new CognitoUserAttribute({
                        Name: 'name',
                        Value: name
                    })
                ], null, 
                (error, result) => {
                    if (!result) {
                        reject(error);
                    } else {
                        resolve(result.user);
                    }
                }
            )
        }) 
    }

    async login(loginDTO: AuthUserLoginDTO) {
        const { email, password } = loginDTO;

        const userData = {
            Username: email,
            Pool: this.userPool
        }
        const userCognito = new CognitoUser(userData);

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        });

        return new Promise((resolve, reject) => {
            userCognito.authenticateUser(authDetails, {
                onSuccess: (result) => {
                    resolve(result)
                },
                onFailure: (error) => {
                    reject(error)
                }
            });
        })        
    }
}