export class Question {
public viewed: boolean = false;
  constructor(
    public questionText: string,
    public answerText: string,
    public difficulty: number,
    public bookmark: boolean,
    public category: string,
    public adminCreated: boolean,
    public userEmail: string
  ) { }
}
