export class Question {
  public viewed: boolean = false;
  public bookmark: boolean = false;
  public adminCreated: boolean = false;

  constructor(
    public questionText: string,
    public answerText: string,
    public difficulty: number,
    public category: string,
    public userEmail: string
  ) { }
}
