import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Note } from "../../../models/note.model";
import { NotesLocalStorageService } from '../../../services/notes-local-storage.service';

import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

export class NoteComponent implements OnInit {
  @Input('thisNote') note: Note;
  @Output() noteDeleted = new EventEmitter<Note[]>();

  showNoteDetails: boolean = false;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  constructor(
    private notesLocalStorageService: NotesLocalStorageService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  deleteNote() {
    let currentNotes = this.notesLocalStorageService.deleteNote(this.note.id);
    this.noteDeleted.emit(currentNotes);
    this.toastr.success('Note Deleted Successfully');
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
