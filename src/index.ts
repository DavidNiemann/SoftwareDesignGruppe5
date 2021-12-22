import * as readline from "readline";

import Console from "./classes/singletons/Console";
import { Answers } from "prompts";
import { User } from "./classes/User";

namespace Project {
  export class Main {
    public consoleLine: readline.ReadLine;
    private user: User;

    constructor() {
      this.consoleLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      this.user = new User();
    }

    public async showProgramStatus(): Promise<void> {
      //this.consoleLine.write("I'm running");
      this.showOptionsLogin();
      //let ques: ChoiceQuestion = new ChoiceQuestion()
      //await ques.setQuestion();
      //await ques.setAnswers();
    }

    public async showOptionsLogin(): Promise<void> {
      let answer: Answers<string> = await Console.showOptions(
        ["Register", "Login", "Continue as Guest"],
        "<------QuizApp------>"
      );

      this.handleAnswerLogin(answer.value);
    }

    public async handleAnswerLogin(_answer: number): Promise<void> {
      switch (_answer) {
        case 1:
          this.handleUser("register");

          break;
        case 2:
          this.handleUser("login");

          break;
        case 3:
          this.handleUser("guest");
          break;
        default:
          Console.printLine("Option not available!");
      }

      //this.showOptions();
    }
    public async handleUser(_task: string): Promise<void> {
      let userName: Answers<string>;
      let password: Answers<string>;
      if (_task != "guest") {
        userName = await Console.askForAnswers(
          "Gib dein Usernamen ein",
          "text"
        );
        password = await Console.askForAnswers(
          "Gib dein Passwort ein",
          "password"
        );
      }
      else {
        userName = password = {
          value: "temp"
        };
      }
      let success: Boolean = false;
      switch (_task) {
        case "register":
          success = await this.user.register(userName.value, password.value);
          if (success) {
            Console.printLine("\nRegistration complete! Please log in.\n");
            this.handleUser("login");
          }
          else {
            Console.printLine("\nUsername is already taken. Please try again.\n");
            this.handleUser("register");
          }
          break;
        case "login":
          success = await this.user.login(userName.value, password.value);
          if (success) {
            Console.printLine("\nHello " + userName.value + "!\n");
            this.showMainMenu(true);
          } else {
            Console.printLine(
              "\n Username or Password has been entered incorrectly. Please try again. \n"
            );
            this.handleUser("login");
          }
          break;
        case "guest":
          Console.printLine("\nContinuing as guest user\n");
          this.showMainMenu(false);
          break;
        default:
          Console.printLine("Task not available!");
      }
    }

    public async showMainMenu(registered: boolean): Promise<void> {
      if (registered) {
        let answer: Answers<string> = await Console.showOptions(
          ["Create Quiz", "Play Quiz", "View Statistic", "Logout"],
          "Welcome! What do you want to do?"
        );
        this.handleAnswerMainMenu(answer.value, registered);
      }
      else {
        let answer: Answers<string> = await Console.showOptions(
          ["Play Quiz", "View Statistic", "Logout"],
          "Welcome! What do you want to do?"
        );
        this.handleAnswerMainMenu(answer.value, registered);
      }
    }

    public async handleAnswerMainMenu(_answer: number, registered: boolean) : Promise<void> {
      switch (_answer) {
        case 1:
          if (registered)
            this.handleMainMenu("create", registered);
          else 
            this.handleMainMenu("play", registered);
          break;
        case 2:
          if (registered)
            this.handleMainMenu("play", registered);
          else 
            this.handleMainMenu("statistics", registered)
          break;
        case 3:
          if (registered)
            this.handleMainMenu("statistics", registered);
          else
            this.handleMainMenu("logout", registered);
          break;
        case 4: 
          this.handleMainMenu("logout", registered);
          break;
        default:
          Console.printLine("Option not available!");
          break;
      }
    }

    public async handleMainMenu(_task: string, _registered: boolean) : Promise<void> {
      switch (_task) {
        case "create":
          await this.user.createQuiz();
          this.showMainMenu(_registered);
          break;
        case "play":
          await this.user.startGame(await this.user.getQuiz(!_registered));
          this.showMainMenu(_registered);
          break;
        case "statistic":
          break;
        case "logout":
          Console.printLine("\nYou have been logged out.\n");
          this.showOptionsLogin();
          break;
        default:
          Console.printLine("Task not available!");
          break;
      }
    }
  }

  let main: Main = new Main();
  main.showProgramStatus();
}
