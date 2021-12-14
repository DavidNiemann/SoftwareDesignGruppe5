export class UserDao {
  public userName: string;
  public password: string;


  constructor(_unserName: string, _password: string) {
    this.userName = _unserName;
    this.password = _password;
  }

}