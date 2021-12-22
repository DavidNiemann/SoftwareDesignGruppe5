import prompts, { Answers, PromptType } from 'prompts';
import Console from './singletons/Console';

export abstract class Question {
  public abstract questionText: string;
  public abstract correctAnswer: string | number;
  public abstract type: prompts.PromptType;

  constructor(

  ) {

  }

  public async setQuestion(): Promise<void> {
    let questionText: Answers<string> = await Console.askForAnswers("Enter your question:", 'text');
    this.questionText = questionText.value;
  }

  public async setAnswers(): Promise<void> {
    let correct: Answers<string> = await Console.askForAnswers("Enter the correct answer:", this.type);
    this.correctAnswer = correct.value;
  }

}
/**setAnswer und setQuestion von Samu übernehmen in Abstract*/