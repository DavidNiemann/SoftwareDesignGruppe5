import prompts, { Answers, PromptType } from 'prompts';
import Console from './singletons/Console';
import { Question } from './Question';

export class TextQuestion extends Question {
    questionText: string = "";
    correctAnswer: string = "";
    type: prompts.PromptType = 'text'
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