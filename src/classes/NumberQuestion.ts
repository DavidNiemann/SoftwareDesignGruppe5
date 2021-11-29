import prompts, { Answers, PromptType } from 'prompts';
class NumberQuestion extends Question {
  private _questionText: string;
  private _answers: Array<number> = [];
  private _correctAnswer: number;

  constructor(
    _questionText: string,
    _answers: Array<number>,
    _correctAnswer: number
  ) {
    super();
    this._questionText = _questionText;
    this._answers = _answers;
    this._correctAnswer = _correctAnswer;
  }

  public setAnswers(_answers: number, _type: PromptType): Promise<Answers<string>> {
    return prompts({
        type: _type,
        name: 'value',
        message: _answers.toString(),
        initial: 1
      })
  }

  public setQuestion(_questionText: string,  _type: PromptType): Promise<Answers<string>> {
    return prompts({
      type: _type,
      name: 'value',
      message: _questionText,
      initial: 1
    })
  }

  public clone(): NumberQuestion {
    let clonedQuestion: NumberQuestion = new NumberQuestion(
      this._questionText,
      this._answers,
      this._correctAnswer
    );
    return clonedQuestion;
  }
}
