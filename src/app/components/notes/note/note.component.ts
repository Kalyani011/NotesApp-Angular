import { Component, OnInit, Input } from '@angular/core';
import { Note } from "../../../models/note.model";
import {NotesLocalStorageService} from '../../../notes-local-storage.service';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

export class NoteComponent implements OnInit {
  @Input('thisNote') note : Note;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  constructor(private notesLocalStorageService : NotesLocalStorageService) { }

  ngOnInit(): void {
  }

  deleteNote(){
    this.notesLocalStorageService.deleteNote(this.note.id);
    location.reload();
  }
  editNote(){
    console.log("going to edit note here");

  }
}
