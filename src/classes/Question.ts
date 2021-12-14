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
    let questionText: Answers<string> = await Console.askForAnAnswers("Gib eine Frage ein:", 'text');
    this.questionText = questionText.value;
  }

  public async setAnswers(): Promise<void> {
    let correct: Answers<string> = await Console.askForAnAnswers("Gib die korrekte Antwort ein:", this.type);
    this.correctAnswer = correct.value;
  }

  public static async  askTheQuestion(_question: Question): Promise<boolean> {
    let anwer: Answers<string> = await Console.askForAnAnswers(_question.questionText, _question.type);
    if (anwer.value == _question.correctAnswer) {
      return true;
    }
    else {
      return false;
    }

  }


}
