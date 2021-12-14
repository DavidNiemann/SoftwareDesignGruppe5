import prompts, { Answers, PromptType } from 'prompts';
import Console from './singletons/Console';
import { Question } from './Question'

export class ChoiceQuestion extends Question {
    public questionText: string = "";
    public answers: string[] = [];
    public correctAnswer: string = "";
    public type: prompts.PromptType = 'text'
    constructor(
    ) {
        super();
    }

    public async setAnswers(): Promise<void> {
        await super.setAnswers();
        this.answers.push(this.correctAnswer);

        let nextAnswer: boolean = true;
        while (nextAnswer == true) {
            let falseAnswer: Answers<string> = await Console.askForAnAnswers("Gib eine falsche Antwort ein:", this.type);
            this.answers.push(falseAnswer.value);
            if (this.answers.length >= 4) {
                nextAnswer = false;
                break;
            }
            let antoherAnswer: Answers<string> = await Console.askForAnAnswers("Willst du noch eine Frage eingeben?:", 'confirm');
            nextAnswer = antoherAnswer.value;
        }
    }
    public async askTheQuestion(): Promise<boolean> {
        let anwer: Answers<string> = await Console.showOptions(this.answers, this.type);
        if (this.answers[anwer.value + 1] == this.correctAnswer) {
            return true;
        }
        else {
            return false;
        }

    }


    public clone(): ChoiceQuestion {
        let clonedQuestion: ChoiceQuestion = new ChoiceQuestion(

        );
        return clonedQuestion;
    }
}