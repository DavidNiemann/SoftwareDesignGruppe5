class TextQuestion {
  private _questionText: string;
  private _answers: Array<string> = [];
  private _correctAnswer: string;

  constructor(
    questionText: string,
    answers: Array<string>,
    correctAnswer: string
  ) {
    this._questionText = questionText;
    this._answers = answers;
    this._correctAnswer = correctAnswer;
  }

  public setAnswers(_answer: string): void {}

  public setQuestion(_questionText: string): void {}

  public clone(): TextQuestion {
    let clonedQuestion: TextQuestion = new TextQuestion(
      this._questionText,
      this._answers,
      this._correctAnswer
    );
    return clonedQuestion;
  }
}
