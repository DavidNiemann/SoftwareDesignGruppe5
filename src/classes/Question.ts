class Question {
    public _typeOfQuestion: string;/**typeOfQuestion*/
    private _questionText: string = "";
    private _correctAnswer: string = "";

    constructor(
        typeOfQuestion: string,
        questionText: string,
        correctAnswer: string
      ) {
        this._typeOfQuestion = typeOfQuestion;
        this._questionText = questionText;
        this._correctAnswer = correctAnswer;
      }
    
    public setQuestion(_questionText: string): void {

    }
    
    public setAnswers(_answer: string): void {

    }

    public clone(): Question{
        let clonedQuestion: Question = new Question(
          this._typeOfQuestion,
          this._questionText,
          this._correctAnswer
        );
        return clonedQuestion;
      }

}
/**setAnswer und setQuestion von Samu übernehmen in Abstract*/