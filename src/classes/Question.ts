import prompts, { Answers, PromptType } from 'prompts';
import Console from './singletons/Console';
abstract class Question {
    public _typeOfQuestion: string;/**typeOfQuestion*/
    private _questionText: string = "";
    private _correctAnswer: string = "";
    private answers: Array<number> = [];
    private type: prompts.PromptType = 'number'

    constructor(
        typeOfQuestion: string,
        questionText: string,
        correctAnswer: string
      ) {
        this._typeOfQuestion = typeOfQuestion;
        this._questionText = questionText;
        this._correctAnswer = correctAnswer;
      }
    
    public async setQuestion(): Promise<void> {
        let questionText: Answers<string> = await Console.askForAnAnswers("Gib eine Frage ein:", 'text');
    }
    
    public async setAnswers(): Promise<void> {
      let correct: Answers<string> = await Console.askForAnAnswers("Gib die korrekte Antwort ein:", this.type);
      this._correctAnswer = correct.value;
      this.answers.push(correct.value);

      let nextAnswer: boolean= true;
      while(nextAnswer == true){
          let falseAnswer: Answers<string>= await Console.askForAnAnswers("Gib eine falsche Antwort ein:", this.type);
          this.answers.push(falseAnswer.value);
          if(this.answers.length>=4){
              nextAnswer = false;
              break;
          }
          let antoherAnswer: Answers<string>= await Console.askForAnAnswers("Willst du noch eine Frage eingeben?:", 'confirm');
          nextAnswer=antoherAnswer.value;
      }
    }

}
/**setAnswer und setQuestion von Samu übernehmen in Abstract*/