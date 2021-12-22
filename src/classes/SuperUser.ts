import { Answers } from "prompts";
import { Quiz } from "./Quiz";
import Console from "./singletons/Console";
import FileHandler from "./singletons/FileHandler";

export class SuperUser {
  constructor() {}

  public async startGame(_quiz: Quiz): Promise<void> {
    let curQuiz: Quiz = _quiz;
    let correctAnswers: number = 0;
    Console.printLine(
      "\nWelcome to the quiz: " +
        curQuiz.title +
        "\nLet's start with the first question!"
    );
    for (
      let curQuestion = 0;
      curQuestion < curQuiz.question.length;
      curQuestion++
    ) {
      let curAnswer = await Console.askForAnswers(
        curQuiz.question[curQuestion].questionText,
        curQuiz.question[curQuestion].type
      );
      if (curQuiz.checkAnswers(curQuestion, curAnswer.value)) correctAnswers++;
    }
    // this.refreshStatistic(curQuiz.question.length+1, correctAnswers);
  }

  public refreshStatistic(
    _numberOfAnswers: number,
    _correctAnswers: number
  ): void {}

  public async getQuiz(_public: boolean): Promise<Quiz> {
    let allQuizzes: Quiz[] = await FileHandler.readJsonFile(
      "./files/Quiz.json"
    );
    let quizNames: string[] = [];
    if (_public) {
      for (let i: number = 0; i < allQuizzes.length; i++) {
        quizNames.push(allQuizzes[i].title);
      }
      let answer: Answers<string> = await Console.showOptions(
        quizNames,
        "Select a quiz that you want to play!"
      );
      return allQuizzes[answer.value];
    } else {
      for (let i: number = 0; i < allQuizzes.length; i++) {
        if (allQuizzes[i].public == false) {
          allQuizzes.splice(i);
        } else {
          quizNames.push(allQuizzes[i].title);
        }
      }
      let answer: Answers<string> = await Console.showOptions(
        quizNames,
        "Select a quiz that you want to play!"
      );
      return allQuizzes[answer.value];
    }
  }
}
