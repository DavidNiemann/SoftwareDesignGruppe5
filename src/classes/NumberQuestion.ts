import prompts, { Answers, PromptType } from 'prompts';
import Console from './singletons/Console';
import { Question } from './Question';

export class NumberQuestion extends Question {
    public questionText: string = "";
    public correctAnswer: number = 0;
    public type: prompts.PromptType = 'number'

    constructor(
    ) {
        super();
    }

    public clone(): NumberQuestion {
        let clonedQuestion: NumberQuestion = new NumberQuestion(

        );
        return clonedQuestion;
    }
}