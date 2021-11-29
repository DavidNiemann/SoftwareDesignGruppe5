import * as readline from 'readline';

import Console from './classes/singletons/Console';
import FileHandler from './classes/singletons/FileHandler';
import { Answers } from 'prompts';

namespace Project {
  export class Main {
    public consoleLine : readline.ReadLine;

    constructor() {
      this.consoleLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })
    }


    public async showOptions() : Promise<void> {
      let answer: Answers<string> = await Console.showOptions(
        [
          "creade Quiz",
          "search Quiz",
        ], 
        "Which option do you want to choose?"
      );
  
      this.handleAnswer(answer.value);
    }
    
    public handleAnswer(answer : string) : void {
    switch(answer) {
      case "1":
        //this.readPersonFile();
        break;
      case "2":
        //this.writePersonFile();
        break;
      default:
        Console.printLine("Option not available!");
    }

    //this.showOptions();
  }

    public showProgramStatus() : void {
      this.consoleLine.write("I'm running");
      this.showOptions();
    }
    
    /* public writePersonFile() : void {

    }

    public readPersonFile() : void {
     
    } */
  }
  

  let main : Main = new Main();
  main.showProgramStatus();
}