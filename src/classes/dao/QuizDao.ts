import { Question } from '.././Question';
export class QuizDao {
    public creator: string = "User"
    public title: string = "Quiz";
    public public: boolean = false;
    public questions: Question[] = [];

    constructor(_creator: string, _titel: string, _public: boolean, _questions: Question[]) {
        this.creator = _creator;
        this.title = _titel;
        this.public = _public;
        this.questions = _questions;

    }
}