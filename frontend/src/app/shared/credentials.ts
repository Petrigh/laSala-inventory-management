interface CredentialsInterface{
    usuario: string;
    password: string;
}

export class Credentials {
    usuario: string;
    password: string;

    constructor (obj: Partial<CredentialsInterface>) {
        this.usuario = (obj && obj.usuario) ? obj.usuario : "";
        this.password = (obj && obj.password) ? obj.password : "";
    }
}

export interface TokenInterface{
    rol: string;
    nombre: string;
}