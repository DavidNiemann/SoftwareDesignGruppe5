
import FileHandler from '../classes/singletons/FileHandler';
import { UserDao } from '../classes/dao/UserDao';
import Console from '../classes/singletons/Console';
import { Answers } from 'prompts';
import { Quiz } from "./Quiz";
import { Statistic } from "./Statistic";

export class User {

    public userName: string = "";
    public registered: boolean = false;
    public static: Statistic = new Statistic(this.userName);
    constructor(_username: string) {
        this.userName = _username;

    }

    public async createQuiz(): Promise<void> {
        let newQuiz: Quiz = new Quiz(this.userName);
        await newQuiz.createQuiz();
    }

    public showStatic(): void {
        let daoStatict = this.static.getStatistic();
        Console.printLine("played Quizes: " + daoStatict.playedQuizes);
        Console.printLine("submitted Answers: " + daoStatict.submittedAnswers);
        Console.printLine("correct Answers: " + daoStatict.correctAnswers);
    }
    public async playQuiz(): Promise<void> {
        let quiz: Quiz = new Quiz();
        let results = await quiz.showQuiz();
        this.static.playedQuizes++;
        this.static.submittedAnswers += results.length;
        for (let nResilt: number = 0; nResilt < results.length; nResilt++) {
            if (results[nResilt] == true)
                this.static.correctAnswers++;

        }

        if (this.registered == true) {
            this.static.saveAsRegisteredUser();
        }

    }

    public register(_userName: string, _passwort: string): boolean {
        let User: UserDao[] = FileHandler.readJsonFile("./files/User.json")

        for (let nUser = 0; nUser < User.length; nUser++) {
            if (User[nUser].userName == _userName) {
                return false;
            }

        }
        FileHandler.writeJsonFile("./files/User.json", new UserDao(_userName, _passwort));
        return true;

    }

    private async login(_userName: string, _passwort: string): Promise<boolean> {

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
        let success: boolean = false;
        switch (_task) {
            case "register":
                success = this.register(userName.value, password.value);
                if (success) {
                    return userName.value;
                }
                else {
                    Console.printLine("the username is taken");
                    return "wrong"
                }
            case "login":
                success = await this.login(userName.value, password.value);
                if (success) {
                    return userName.value;
                } else {
                    Console.printLine("User dont exis");
                    return "wrong";
                }

            default:
                Console.printLine("task not available!");
        }
        return "User";
    }

}

