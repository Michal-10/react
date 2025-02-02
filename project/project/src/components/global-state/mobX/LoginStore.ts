import { makeAutoObservable } from "mobx"
import { LoginStatus } from "../../../types/LoginStatus";

class LoginStore {

    private isLogin: LoginStatus = 'before';
    private userId!: number;

    constructor() {
        makeAutoObservable(this);
    }

    get IsLogged() {
        return this.isLogin;
    }
    set IsLogged(status: LoginStatus) {
        this.isLogin = status;
    }

    get UserId() {
        return this.userId;
    }

    set UserId(userId: number) {
        this.userId = userId;
    }
}

export default new LoginStore();
