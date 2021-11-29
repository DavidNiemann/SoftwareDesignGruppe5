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
    return prompts({
      type: 'select',
      name: 'value',
      message: question,
      choices: [
        { title: options[0], value: '1' },
        { title: options[1], value: '2' },
        { title: options[2], value: '3' }
      ],
      initial: 1
    })
  }

}

export default Console.getInstance();