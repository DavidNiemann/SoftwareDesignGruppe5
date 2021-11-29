import * as readline from 'readline';

import Console from './classes/singletons/Console';
//import NumberQuestion from './classes/NumberQuestion';
import FileHandler from './classes/singletons/FileHandler';
import { Answers } from 'prompts';
import { NumberQuestion } from './classes/NumberQuestion';

namespace Project {
  export class Main {
    public consoleLine: readline.ReadLine;

    constructor() {
      this.consoleLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })
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

    public handleAnswerLogin(_answer: number): void {
      switch (_answer) {
        case 1:
          this.writeUserFile();
          //this.readPersonFile();  
          break;
        case 2:
          //this.writePersonFile();   
          break;
        case 3:
          //this.writePersonFile();
          break;
        default:
          Console.printLine("Option not available!");
      }

      //this.showOptions();
    }

    public async showProgramStatus(): Promise<void> {
      this.consoleLine.write("I'm running");
      //let ques: NumberQuestion = new NumberQuestion()
      //await ques.setQuestion();
      //await ques.setAnswers();
    }

    public writeUserFile(): void {

    }

    public readPersonFile(): void {

    }
  }


  let main: Main = new Main();
  main.showProgramStatus();
}