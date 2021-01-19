import { Component, OnInit } from '@angular/core';
import {NotesLocalStorageService} from '../../notes-local-storage.service';
import {Note} from '../../models/note.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes : Note[] = [];

  constructor(private notesLocalStorageService : NotesLocalStorageService) { }

  ngOnInit(): void {
    this.notes = this.notesLocalStorageService.getAllNotes();
  }

}
