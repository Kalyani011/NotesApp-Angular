import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

import { Note } from "../../../models/note.model";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

export class NoteComponent implements OnInit {
  @Input('thisNote') note: Note;
  @Output() noteDeleted = new EventEmitter<number>();

  showNoteDetails: boolean = false;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  deleteNote() {
    this.noteDeleted.emit(this.note.id);
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
