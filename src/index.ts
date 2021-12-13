import * as readline from 'readline';

import Console from './classes/singletons/Console';
//import {NumberQuestion} from './classes/NumberQuestion';
//import {TextQuestion} from './classes/TextQuestion';
//import {ChoiceQuestion} from './classes/ChoiceQuestion';
import {Quiz} from './classes/Quiz';
import { Answers } from 'prompts';
import { User } from './classes/User';

namespace Project {
  export class Main {
    public consoleLine: readline.ReadLine;
    private user: User;

    constructor() {
      this.consoleLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

      this.user = new User();
    }

    public async showOptionsLogin(): Promise<void> {
      let answer: Answers<string> = await Console.showOptions(
        [
          "register",
          "login",
          "continue as guest"
        ],
        "Which option do you want to choose?"
      );

      this.handleAnswerLogin(answer.value);
    }

    public async handleAnswerLogin(_answer: number): Promise<void> {
      switch (_answer) {
        case 1:
          this.handleUser("register")

          break;
        case 2:
          this.handleUser("login")

          break;
        case 3:

          break;
        default:
          Console.printLine("Option not available!");
      }

      //this.showOptions();
    }

    public async showProgramStatus(): Promise<void> {
      this.consoleLine.write("I'm running");
      //this.showOptionsLogin();
      let newQuiz = new Quiz("user");

      newQuiz.createQuiz();
      
    }
    public async handleUser(_task: string): Promise<void> {
      let userName: Answers<string> = await Console.askForAnAnswers("gib dein UserNamen ein", 'text')
      let password: Answers<string> = await Console.askForAnAnswers("gib dein Passwort ein", 'password')
      switch (_task) {
        case "register":
          this.user.register(userName.value, password.value);
          break;
        case "login":
          let success = await this.user.login(userName.value, password.value);
          Console.printLine(success + "");
          break;
        default:
          Console.printLine("task not available!");
      }


    }

  }


  let main: Main = new Main();
  main.showProgramStatus();
}