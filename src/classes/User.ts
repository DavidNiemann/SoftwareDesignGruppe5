import { SuperUser } from "./SuperUser";
import FileHandler from '../classes/singletons/FileHandler';
import { UserDao } from '../classes/dao/UserDao';


import Console from '../classes/singletons/Console';

export class User extends SuperUser {

    private userName: string = "";
    public register(_userName: string, _passwort: string): void {

        FileHandler.writeJsonFile("./files/User.json", new UserDao(_userName, _passwort))

    }

    public async login(_userName: string, _passwort: string): Promise<Boolean> {
        let User: UserDao = await FileHandler.readJsonFile("./files/User.json");

        if (User.userName == _userName && User.password == _passwort) {
            return true
        }
        /*  for (let i: number = 0; i< allUser.length; i++) {
             if (allUser[i].userName == _userName && allUser[i].password == _passwort) { 
                 return true
             }
         } */
        return false;
    }
}

