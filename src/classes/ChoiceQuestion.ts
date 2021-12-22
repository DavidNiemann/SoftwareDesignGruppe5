import prompts, { Answers, PromptType } from 'prompts';
import Console from './singletons/Console';
import { Question } from './Question'

export class ChoiceQuestion extends Question {
    public questionText: string = "";
    public answers: Array<string> = [];
    public correctAnswer: string = "";
    public type: prompts.PromptType = 'text'
    constructor(
    ) {
        super();
    }

    public async setAnswers(): Promise<void> {
        await super.setAnswers();
        this.answers.push(this.correctAnswer);

        let nextAnswer: boolean= true;
        while(nextAnswer == true){
            let falseAnswer: Answers<string>= await Console.askForAnswers("Gib eine falsche Antwort ein:", this.type);
            this.answers.push(falseAnswer.value);
            if(this.answers.length>=4){
                nextAnswer = false;
                break;
            }
            let anotherAnswer: Answers<string>= await Console.askForAnswers("Willst du noch eine Antwort eingeben?:", 'confirm');
            nextAnswer=anotherAnswer.value;
        }
        Console.printLine("\nQuestion added!\n");
    }


    public clone(): ChoiceQuestion {
        let clonedQuestion: ChoiceQuestion = new ChoiceQuestion(
            
        );
        return clonedQuestion;
    }
}