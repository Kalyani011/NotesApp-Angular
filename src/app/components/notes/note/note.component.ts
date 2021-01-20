import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Note } from "../../../models/note.model";
import { NotesLocalStorageService } from '../../../notes-local-storage.service';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

export class NoteComponent implements OnInit {
  @Input('thisNote') note: Note;
  showNoteDetails: boolean = false;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  constructor(private notesLocalStorageService: NotesLocalStorageService, private router: Router) { }

  ngOnInit(): void {
  }

  deleteNote() {
    this.notesLocalStorageService.deleteNote(this.note.id);
    location.reload();
  }
  editNote() {
    this.router.navigate(['/compose', this.note.id]);
  }

  showDetails() {
    this.showNoteDetails = true;
  }

  closeDetails() {
    this.showNoteDetails = false;
  }
}
