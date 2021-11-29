import readline from 'readline';
import prompts, { Answers } from 'prompts';

class Console {
  private static _instance : Console = new Console();

  public consoleLine : readline.ReadLine = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

  constructor() {
    if(Console._instance) 
      throw new Error("Instead of using new Console(), please use Console.getInstance() for Singleton!")
    Console._instance = this;
  }

  public static getInstance() : Console {
    return Console._instance;
  }

  public printLine(line : string) : void {
    this.consoleLine.write(line);
    this.consoleLine.write("\n");
  }

  public showOptions(options : string[], question: string) : Promise<Answers<string>> {

    let choices: any[] = []

    for(let i: number = 1; i <= options.length; i++) {
      choices.push( { title: options[i-1], value: i })
    }
    return prompts({
      type: 'select',
      name: 'value',
      message: question,
      choices: choices,
      initial: 1
    })
  }

}

export default Console.getInstance();