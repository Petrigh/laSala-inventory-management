interface CredentialsInterface{
    username: string;
    password: string;
}

export class Credentials {
    username: string;
    password: string;

    constructor (obj: Partial<CredentialsInterface>) {
        this.username = (obj && obj.username) ? obj.username : "";
        this.password = (obj && obj.password) ? obj.password : "";
    }
}

interface TokenInterface{
    usr: string;
    token: string;
}

export class Token {
    usr: string;
    token: string;

    constructor (obj: Partial<TokenInterface>) {
        this.usr = (obj && obj.usr) ? obj.usr : "";
        this.token = (obj && obj.token) ? obj.token : "";
    }
}

export interface UserToken{
    username: string,
    token: string,
    expiry: number | null
  }