import { SuperUser } from "./SuperUser";
import FileHandler from '../classes/singletons/FileHandler';
import { UserDao } from '../classes/dao/UserDao';

export class User extends SuperUser {

    private userName: string = "";
    public register(_userName: string, _passwort: string): void {

        FileHandler.writeJsonFile("./files/User.json", new UserDao(_userName, _passwort))

    }

    public async login(_userName: string, _passwort: string): Promise<Boolean> {

        let allUser: UserDao[] = await FileHandler.readJsonFile("./files/User.json");
         for (let i: number = 0; i< allUser.length; i++) {
             if (allUser[i].userName == _userName && allUser[i].password == _passwort) { 
                 return true
             }
         }
        return false;
    }

    
}

