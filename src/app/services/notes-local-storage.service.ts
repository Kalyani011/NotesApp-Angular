import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})

export class NotesLocalStorageService {
  notes: Note[] = [];

  constructor() {
    this.notes = JSON.parse(localStorage.getItem("Notes") || "[]");
  }


  public addNote(newNote: Note) {
    this.notes.push(newNote);
    localStorage.setItem("Notes", JSON.stringify(this.notes));
  }

  public editNote(editNote: Note) {
    let index = this.notes.findIndex((note:Note)=>{
      return note.id === editNote.id;
    });
    this.notes[index] = editNote;
    localStorage.setItem("Notes", JSON.stringify(this.notes));
  }

  public getAllNotes() {
    return JSON.parse(localStorage.getItem("Notes") || "[]");
  }

  public getNote(id: number) {
    return (this.notes.find((note: Note) => {
      return note.id === id;
    }));
  }

  public deleteNote(id: number) {

    let index = this.notes.findIndex((note:Note)=>{
      return note.id === id;
    });
    this.notes.splice(index, 1);

    localStorage.setItem("Notes", JSON.stringify(this.notes));
    return this.getAllNotes();
  }

}
