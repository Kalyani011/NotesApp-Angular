import { Pipe, PipeTransform } from '@angular/core';
import { Note } from './models/note.model';

@Pipe({
  name: 'filterNotes'
})
export class FilterNotesPipe implements PipeTransform {

  transform(value: Note[], filterString: string, propName: string): Note[] {
    if (value.length === 0 || filterString === "" || filterString === "All" || filterString==="Category" || filterString === "Color" || filterString === "#ffffff") {
      return value;
    }
    let result = value.filter((item) => {
      return item[propName] === filterString;
    });
    return result;
  }
}
