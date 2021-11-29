class NumberQuestion extends Question{

    private _questionText: string;
    private _answers: Array<number> = [];
    private _correctAnswer: number;

    constructor(_questionText: string, _answers: Array<number>, _correctAnswer: number) {
        super();
        this._questionText = _questionText;
        this._answers = _answers;
        this._correctAnswer = _correctAnswer;
      }
    
    public setAnswers(_answer: number): void{

    }

    public setQuestion(_questionText: string): void{

    }

    public clone(): NumberQuestion {
        let clonedQuestion: NumberQuestion = new NumberQuestion(this._questionText, this._answers, this._correctAnswer);
        return clonedQuestion;
      }
}