import prompts, { Answers, PromptType } from 'prompts';
import Console from './singletons/Console';
export class NumberQuestion /*extends Question*/ {
    private questionText: string ="";
    private answers: Array<number> = [];
    private correctAnswer: number = 0;

    constructor(
    ) {
        //super();
    }

    public async setAnswers(): Promise<void> {
        let correct: Answers<string> = await Console.askForAnAnswers("Gib die korrekte Antwort ein:", 'number');
        this.correctAnswer = correct.value;
        this.answers.push(correct.value);

        let nextAnswer: boolean= true;
        while(nextAnswer == true){
            let falseAnswer: Answers<string>= await Console.askForAnAnswers("Gib eine falsche Antwort ein:", 'number');
            this.answers.push(falseAnswer.value);
            if(this.answers.length>=4){
                nextAnswer = false;
                break;
            }
            let antoherAnswer: Answers<string>= await Console.askForAnAnswers("Willst du noch eine Frage eingeben?:", 'confirm');
            nextAnswer=antoherAnswer.value;
        }
    }

    public async setQuestion(): Promise<void> {
        let questionText: Answers<string> = await Console.askForAnAnswers("Gib eine Frage ein:", 'text');
    }

    public clone(): NumberQuestion {
        let clonedQuestion: NumberQuestion = new NumberQuestion(
            
        );
        return clonedQuestion;
    }
}