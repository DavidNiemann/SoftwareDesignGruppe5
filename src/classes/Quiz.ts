import prompts, { Answers, PromptType } from 'prompts';
import Console from './singletons/Console';
import FileHandler from '../classes/singletons/FileHandler';

import { Question } from './Question';
import { ChoiceQuestion } from './ChoiceQuestion';
import { NumberQuestion } from './NumberQuestion';
import { TextQuestion } from './TextQuestion';
import { QuizDao } from './dao/QuizDao';


export class Quiz {
    public creator: string = "User";
    public title: string = "";
    public questions: Question[] = [];

    constructor(_creator?: string) {
        if (_creator) {
            this.creator = _creator;
        }

    }

    public checkAnswers(): void {

    }

    public async createQuiz(): Promise<void> {
        let nextQuestion: boolean = true;
        let quizTitel: Answers<string> = await Console.askForAnAnswers("Gib einen Titel ein:", 'text');
        this.title = quizTitel.value;



        while (this.questions.length <= 10) {
            if (nextQuestion) {
                break
            }
            let answer: Answers<string> = await Console.showOptions(
                [
                    "Choice Question",
                    "Number Question",
                    "Text Question"
                ],
                "which question do you want to create?"
            );
            await this.hndQuizType(answer.value);
            if (this.questions.length > 3) {
                if (await this.askNextQuestion()) {
                    nextQuestion = false;
                }

            }

        }

        await this.saveQuiz();

    }

    private async hndQuizType(_answer: number): Promise<void> {
        let Question: Question;
        switch (_answer) {
            case 1:
                Question = new ChoiceQuestion();

                break;
            case 2:
                Question = new NumberQuestion();

                break;
            case 3:
                Question = new TextQuestion();
                break;
            default:
                Console.printLine("Option not available!");
                return;

        }

        await Question.setQuestion();
        await Question.setAnswers();

        this.questions.push(Question);

    }
    private async askNextQuestion(): Promise<boolean> {
        let antoherQuestion: Answers<string> = await Console.askForAnAnswers("another question?", 'confirm');

        return antoherQuestion.value;
    }

    private async saveQuiz(): Promise<void> {
        let publicQuiz: Answers<string> = await Console.askForAnAnswers("the quiz should be public?", 'confirm');
        FileHandler.writeJsonFile("./files/Quiz.json", new QuizDao(this.creator, this.title, publicQuiz.value, this.questions))


    }
}