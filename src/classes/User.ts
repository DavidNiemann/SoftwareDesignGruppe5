
import FileHandler from '../classes/singletons/FileHandler';
import { UserDao } from '../classes/dao/UserDao';
import Console from '../classes/singletons/Console';
import { Answers } from 'prompts';
import { Quiz } from "./Quiz";

export class User {

    public userName: string = "";
    public registered: boolean = false;
    constructor(_username: string) {
        this.userName = _username;
        
    }

    public async createQuiz():  Promise<void> {
        let newQuiz: Quiz = new Quiz(this.userName);
       await newQuiz.createQuiz();
    }

    public async playQuiz(): Promise<void> {
        let quiz: Quiz = new Quiz();
        await  quiz.showQuiz();
    }

    public register(_userName: string, _passwort: string): void {

        FileHandler.writeJsonFile("./files/User.json", new UserDao(_userName, _passwort))

    }

    private async login(_userName: string, _passwort: string): Promise<Boolean> {

        let allUser: UserDao[] = await FileHandler.readJsonFile("./files/User.json");
        for (let i: number = 0; i < allUser.length; i++) {
            if (allUser[i].userName == _userName && allUser[i].password == _passwort) {
                return true
            }
        }
        return false;
    }
    public async handleUserLogin(_task: string): Promise<string> {
        let userName: Answers<string> = await Console.askForAnAnswers("gib dein UserNamen ein", 'text')
        let password: Answers<string> = await Console.askForAnAnswers("gib dein Passwort ein", 'password')

        switch (_task) {
            case "register":
                this.register(userName.value, password.value);
                return userName.value;
            case "login":
                let success = await this.login(userName.value, password.value);
                if (success) {
                    return userName.value;
                }
                Console.printLine("User dont exis");
                break;
            default:
                Console.printLine("task not available!");
        }
        return "User";
    }

}

