import prompts, { Answers, PromptType } from 'prompts';
import Console from './singletons/Console';
import { Question } from './Question';

export class TextQuestion extends Question {
    public questionText: string = "";
    public correctAnswer: string = "";
    public type: prompts.PromptType = 'text'
    constructor(
    ) {
        super();
    }

    public clone(): TextQuestion {
        let clonedQuestion: TextQuestion = new TextQuestion(

        );
        return clonedQuestion;
    }
}