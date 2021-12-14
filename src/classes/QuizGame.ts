import prompts, { Answers } from "prompts";
import Console from "./singletons/Console";
import { User } from "./User";


export class QuizGame {
    public static game: QuizGame = new QuizGame();
    private newUser: User = new User("user");
    
    public async startApp(): Promise<void> {

        await this.showOptionsLogIn();


    }
    public async showOptionsLogIn(): Promise<void> {
        let answer: Answers<string> = await Console.showOptions(
            [
                "register",
                "login",
                "continue as guest"
            ],
            "Which option do you want to choose?"
        );

        await this.handleAnswerLogin(answer.value);
    }

    private async handleAnswerLogin(_answer: number): Promise<void> {

        let userName = "User";
        switch (_answer) {
            case 1:
                userName = await this.newUser.handleUserLogin("register");// enum?
                if (userName != "User" && userName != "wrong") {
                    this.newUser.userName = userName;
                    this.newUser.registered = true;
                } else if (userName == "wrong") {
                    await this.showOptionsLogIn();
                }
                break;
            case 2:
                userName = await this.newUser.handleUserLogin("login");

                if (userName != "User" && userName != "wrong") {
                    this.newUser.userName = userName;
                    this.newUser.registered = true;
                }
                else if (userName == "wrong") {
                    await this.showOptionsLogIn();
                }
                break;
            case 3:

                break;
            default:
                Console.printLine("Option not available!");
        }
        await this.showOptionsPlay();


    }

    private async showOptionsPlay(): Promise<void> {
        let options: string[] = [];
        options.push("showStatistik");
        options.push("playQuiz");
        if (this.newUser.registered == true) {
            options.push("createQuiz");
        }

        let answer: Answers<string> = await Console.showOptions(
            options,
            "what do you want to do?"
        );
        await this.handleAnswerPlay(answer.value);

    }

    private async handleAnswerPlay(_answer: number): Promise<void> {

        switch (_answer) {
            case 1:
                this.newUser.showStatic();
                break;
            case 2:
                await this.newUser.playQuiz();
                break;
            case 3:
                await this.newUser.createQuiz();
                break;
            default:
                Console.printLine("Option not available!");
        }
        await this.showOptionsPlay();


    }

}