import * as readline from 'readline';

import { QuizGame } from './classes/QuizGame';



namespace Project {
  export class Main {
    public consoleLine: readline.ReadLine;

    constructor() {
      this.consoleLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })
    }

   

   

    public async start(): Promise<void> {
      this.consoleLine.write("I'm running");
      await QuizGame.game.showOptionsLogIn();
      //this.showOptionsLogin();
      //let newQuiz = new Quiz("user");
      //let newQuiz2 = new Quiz("user");
      //await newQuiz.createQuiz();
      //await newQuiz2.createQuiz();
      //await newQuiz.showQuiz();
    }
   

  }


  let main: Main = new Main();
  main.start();
}