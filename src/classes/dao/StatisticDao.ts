export class StatisticDao{
    public playedQuizes: Number;
    public submittedAnswers: Number;
    public correctAnswers: Number;
    public userID: string;
  
    constructor(_playedQuizes: Number, _submittedAnswers: Number, _correctAnswers: Number, _userID: string) {
      this.playedQuizes = _playedQuizes;
      this.submittedAnswers = _submittedAnswers; 
      this.correctAnswers = _correctAnswers;
      this.userID = _userID;
    }

}