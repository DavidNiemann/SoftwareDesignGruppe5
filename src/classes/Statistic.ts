import FileHandler from "./singletons/FileHandler";
import { StatisticDao } from "./dao/StatisticDao";

class Statistic {

    private tempStatistic: StatisticDao;
    private playedQuizes: Number;
    private submittedAnswers: Number;
    private correctAnswers: Number;
    private userID: string;

    constructor(_userID: string) {
        this.playedQuizes = 0;
        this.submittedAnswers = 0;
        this.correctAnswers = 0;
        this.userID = _userID;
        this.tempStatistic = new StatisticDao(0, 0, 0, "temp");
    }

    public saveAsRegisteredUser(): void {
        FileHandler.writeJsonFile("./files/Statistic.json", new StatisticDao(this.playedQuizes, this.submittedAnswers, this.correctAnswers, this.userID));
    }

    public saveAsTempUser(): void {
        this.tempStatistic = new StatisticDao(this.playedQuizes, this.submittedAnswers, this.correctAnswers, "temp");
    }

    public returnStatistic(temporaryUser: boolean): StatisticDao {
        if (temporaryUser)
            return new StatisticDao(this.playedQuizes, this.submittedAnswers, this.correctAnswers, this.userID);
        else
            return this.tempStatistic;
    }
}