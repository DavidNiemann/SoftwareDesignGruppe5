import prompts, { Answers, PromptType } from 'prompts';
import Console from './singletons/Console';
import { Question } from './Question';

export class NumberQuestion extends Question {
    protected questionText: string = "";
    protected correctAnswer: number = 0;
    protected type: prompts.PromptType = 'number'

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