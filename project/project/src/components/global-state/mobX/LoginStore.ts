import { makeAutoObservable } from "mobx"
import { LoginStatus } from "../../../types/LoginStatus";

class LoginStore{

    isLogin :LoginStatus = 'before' ;
    userId! : number;
   
    constructor() {
        makeAutoObservable(this);
    }

    get getIsLogged(){
        return this.isLogin;
    }

    get getUserId(){
        return this.userId;
    }
}

export default new LoginStore();
