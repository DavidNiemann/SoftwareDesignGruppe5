import FileHandler from "./singletons/FileHandler";
import { StatisticDao } from "./dao/StatisticDao";

export class Statistic {

    public playedQuizes: number;
    public submittedAnswers: number;
    public correctAnswers: number;
    public userID: string;

    constructor(_userID: string) {
        this.playedQuizes = 0;
        this.submittedAnswers = 0;
        this.correctAnswers = 0;
        this.userID = _userID;
    }

    public saveAsRegisteredUser(): void {
        let statics: StatisticDao[] = FileHandler.readJsonFile("./files/Statistic.json")
        for (let nstatisc: number = 0; nstatisc < statics.length; nstatisc++) {
            if (statics[nstatisc].userID == this.userID) {
                statics[nstatisc] = new StatisticDao(this.playedQuizes, this.submittedAnswers, this.correctAnswers, this.userID);
                FileHandler.overwriteJsonFile("./files/Statistic.json", statics);
                return;
            }

        }
        statics.push(new StatisticDao(this.playedQuizes, this.submittedAnswers, this.correctAnswers, this.userID));
        FileHandler.overwriteJsonFile("./files/Statistic.json", statics);

    }

    public getStatistic(): StatisticDao {
        let statics: StatisticDao[] = FileHandler.readJsonFile("./files/Statistic.json")
        for (let nstatisc: number = 0; nstatisc < statics.length; nstatisc++) {
            if (statics[nstatisc].userID == this.userID) {
                return statics[nstatisc]
            }

        }
        return new StatisticDao(this.playedQuizes, this.submittedAnswers, this.correctAnswers, this.userID);
    }
}