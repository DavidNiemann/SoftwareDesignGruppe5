import prompts, { Answers, PromptType } from 'prompts';
import Console from './singletons/Console';

export abstract class Question {
  protected abstract questionText: string;
  protected abstract correctAnswer: string | number;
  protected abstract type: prompts.PromptType;

  constructor(

  ) {

  }

  public async setQuestion(): Promise<void> {
    let questionText: Answers<string> = await Console.askForAnAnswers("Gib eine Frage ein:", 'text');
    this.questionText = questionText.value;
  }

  public async setAnswers(): Promise<void> {
    let correct: Answers<string> = await Console.askForAnAnswers("Gib die korrekte Antwort ein:", this.type);
    this.correctAnswer = correct.value;
  }

}
