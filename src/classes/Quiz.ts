import prompts, { Answers, PromptType } from 'prompts';
import { Question } from './Question';
import Console from './singletons/Console';

export class Quiz {
    public id: string = "";
    public title: string = "";
    public public: boolean = false;
    public question: Question[] = [];
    protected type: prompts.PromptType = 'text'
    
    constructor(
    ) {
    
    }

    public checkAnswers(_questionNr: number, _answer: string | number): boolean {
        
        if (this.question[_questionNr].correctAnswer == _answer)
            return true;
        return false;
    }
}