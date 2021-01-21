import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Note } from "../../../models/note.model";
import { NotesLocalStorageService } from '../../../services/notes-local-storage.service';
import { DeleteNoteService } from '../../../services/delete-note.service';
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

  constructor(
    private notesLocalStorageService: NotesLocalStorageService,
    private router: Router,
    private deleteNoteService: DeleteNoteService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  deleteNote() {
    let currentNotes = this.notesLocalStorageService.deleteNote(this.note.id);
    this.deleteNoteService.noteDeletedEmitter.next(currentNotes);
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
