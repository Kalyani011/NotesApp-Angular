export class Note {
  constructor(
    public id: number,
    public title: string,
    public body: string,
    public createdDate: string,
    public modifiedDate: string,
    public category: string,
    public color: string
  ){}
}
