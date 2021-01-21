export class Note {
  constructor(
    public id: number,
    public title: string,
    public body: string,
    public createdDate: Date,
    public modifiedDate: Date,
    public category: string,
    public color: string
  ){}
}
