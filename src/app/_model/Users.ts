export interface Users {
    username: string,
    password: string,
    name: string,
    email: string,
    phone: string,
    role: string,
    gender: string,
    isactive: boolean
    statusname: boolean
}
export interface Usercred {
    username: string,
    password: string
}

export interface Userregister {
    UserName: string;
    Name: string;
    Email: string;
    Phone: string;
    Password: string;
}

export interface APIResponse {
    responseCode: number
    result: string,
    message: string
}

export interface registerconfirm {
    userid: number;
    username: string;
    otptext: string;
}

export interface Usermenu {
    code: string;
    name: string;
}

export interface resetpassword {
    username: string;
    oldpassword: string;
    newpassword: string;
}

export interface updatepassword {
    username: string;
    password: string;
    otptext: string;
}

export interface updatestatus {
    username: string;
    status: boolean;
}

export interface updaterole {
    username: string;
    role: string;
}

export interface userrole {
    userrole: string;
    menucode: string;
    haveview: boolean;
    haveadd: boolean;
    haveedit: boolean;
    havedelete: boolean;
}

export interface menu {
    code: string;
    name: string;
    status: boolean
}

export interface roles {
    code: string;
    name: string;
    status: boolean
}

export interface rolepermission {
    code: string;
    name:string;
    haveview: boolean;
    haveadd: boolean;
    haveedit: boolean;
    havedelete: boolean;
}