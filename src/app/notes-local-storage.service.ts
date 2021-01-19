import { Injectable } from '@angular/core';
import { Note } from './models/note.model';

@Injectable({
  providedIn: 'root'
})

export class NotesLocalStorageService {
  notes : Note[] = [];

  constructor() {
    this.notes = JSON.parse(localStorage.getItem("Notes") || "[]");
  }


  public addNote(newNote: Note) {
    this.notes.push(newNote);
    localStorage.setItem("Notes", JSON.stringify(this.notes));
  }

  public getAllNotes(){
    return JSON.parse(localStorage.getItem("Notes") || "[]");
  }

  public getNote(id : number){
    // let notes = this.getAllNotes();
    // let note = notes.find(function (note:Note) {
    //   return note.id === id;
    // });
    // return note;
  }

  public deleteNote(id : number){
    let newNotes = this.notes.filter((note)=>{
      return note.id !== id;
    });
    localStorage.setItem("Notes", JSON.stringify(newNotes));    
  }
  // public removeItem(key:string) {
  //   localStorage.removeItem(key);
  // }
  //
  // public clear(){
  //   localStorage.clear();
  // }
}
