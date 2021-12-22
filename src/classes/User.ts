import { SuperUser } from "./SuperUser";
import FileHandler from "../classes/singletons/FileHandler";
import { UserDao } from "../classes/dao/UserDao";
import Console from "./singletons/Console";
import { Answers } from "prompts";
import { ChoiceQuestion } from "./ChoiceQuestion";
import { TextQuestion } from "./TextQuestion";
import { Quiz } from "./Quiz";
import { Question } from "./Question";
import { NumberQuestion } from "./NumberQuestion";

export class User extends SuperUser {
  public async register(
    _userName: string,
    _passwort: string
  ): Promise<Boolean> {
    let allUser: UserDao[] = await FileHandler.readJsonFile(
      "./files/User.json"
    );
    for (let i: number = 0; i < allUser.length; i++) {
      if (allUser[i].userName == _userName) {
        return false;
      }
    }
    FileHandler.writeJsonFile(
      "./files/User.json",
      new UserDao(_userName, _passwort)
    );
    return true;
  }

  public async login(_userName: string, _passwort: string): Promise<Boolean> {
    let allUser: UserDao[] = await FileHandler.readJsonFile(
      "./files/User.json"
    );
    for (let i: number = 0; i < allUser.length; i++) {
      if (
        allUser[i].userName == _userName &&
        allUser[i].password == _passwort
      ) {
        return true;
      }
    }
    return false;
  }

  public async createQuiz(): Promise<Boolean> {
    let success: Boolean = true;
    let questions: Question[] = [];

    Console.printLine(
      "\nTime to create a new quiz!\nFirst, tell me if the quiz is supposed to be public or not.\n"
    );
    let publicQuiz: Answers<string> = await Console.askForAnswers(
      "Make the quiz public and available to everyone?",
      "confirm"
    );
    Console.printLine(
      "\nAlright, now that that is out of the way, give the quiz a name.\n"
    );
    let quizName: Answers<string> = await Console.askForAnswers(
      "Name of the quiz",
      "text"
    );
    Console.printLine(
      "\nNice! " +
      quizName.value +
      " is a great name!\nNext, add at least 3 questions!\n"
    );
    for (let questionNr: number = 1; questionNr < 11; questionNr++) {
      if (questionNr > 3) {
        if (
          (await Console.askForAnswers("Add another question?", "confirm"))
            .value == false
        ) {
          if (success) {
            let createdQuiz: Quiz = new Quiz();
            createdQuiz.id = "" + Math.floor(Math.random() * 10000);
            createdQuiz.public = publicQuiz.value;
            createdQuiz.title = quizName.value;
            createdQuiz.question = questions;

            FileHandler.writeJsonFile("./files/Quiz.json", createdQuiz);
            Console.printLine("\nQuiz " + createdQuiz.title + " added!\n");
            return true;
          }
        }
      }
      let questionType: Answers<string> = await Console.showOptions(
        ["Different Choices", "Text Question", "Number Question"],
        "Question " +
        questionNr +
        " - Which kind of question do you want to add?"
      );
      switch (questionType.value) {
        case 1:
          let choiceQuestion: ChoiceQuestion = new ChoiceQuestion();
          await choiceQuestion.setQuestion();
          await choiceQuestion.setAnswers();
          questions.push(choiceQuestion);
          break;
        case 2:
          let textQuestion: TextQuestion = new TextQuestion();
          await textQuestion.setQuestion();
          await textQuestion.setAnswers();
          questions.push(textQuestion);
          break;
        case 3:
          // success wird auf false gesetzt?? correctAnswer ist nicht richtig
          let numberQuestion: NumberQuestion = new NumberQuestion();
          await numberQuestion.setQuestion();
          await numberQuestion.setAnswers();
          questions.push(numberQuestion);
        default:
          success = false;
          break;
      }
    }

    if (success) {
      let createdQuiz: Quiz = new Quiz();
      createdQuiz.id = "" + Math.floor(Math.random() * 1000);
      createdQuiz.public = publicQuiz.value;
      createdQuiz.title = quizName.value;
      createdQuiz.question = questions;

      FileHandler.writeJsonFile("./files/Quiz.json", createdQuiz);
      Console.printLine("\nQuiz " + createdQuiz.title + " added!\n");
      return true;
    }

    return false;
  }
}
