import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotesLocalStorageService } from '../../notes-local-storage.service';
import { Note } from '../../models/note.model';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-compose-note',
  templateUrl: './compose-note.component.html',
  styleUrls: ['./compose-note.component.css']
})

export class ComposeNoteComponent implements OnInit {

  noteID: number;
  currentNote: Note;
  composeNoteForm: FormGroup;
  faChevronCircleLeft = faChevronCircleLeft;
  isEdit: boolean = false;

  constructor(
    private notesLocalStorageService: NotesLocalStorageService,
    private router: Router,
    private _location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      switch (data.kind) {
        case 'add':
          this.composeNoteForm = new FormGroup({
            'title': new FormControl(null),
            'body': new FormControl(null, Validators.required),
            'category': new FormControl(null),
            'color': new FormControl('#ffff88')
          });
          break;
        case 'edit':
          this.isEdit = true;
          this.route.params.subscribe((params: Params) => {
            this.noteID = parseInt(params['id']);
          });
          if (this.noteID !== undefined) {
            this.currentNote = this.notesLocalStorageService.getNote(this.noteID);
            this.composeNoteForm = new FormGroup({
              'title': new FormControl(this.currentNote.title),
              'body': new FormControl(this.currentNote.body, Validators.required),
              'category': new FormControl(this.currentNote.category),
              'color': new FormControl(this.currentNote.color)
            });
          }
          break;
        default:
          break;
      }
    });
  }

  saveNote() {
    if (this.composeNoteForm.valid) {

      if (this.isEdit && this.noteID !== undefined && this.currentNote !== undefined) {

        this.notesLocalStorageService.editNote(
          new Note(this.noteID,
            this.composeNoteForm.value.title,
            this.composeNoteForm.value.body,
            this.currentNote.createdDate,
            new Date().toLocaleString(),
            this.composeNoteForm.value.category,
            this.composeNoteForm.value.color)
        );
      } else {
        let id = new Date().getTime();
        this.notesLocalStorageService.addNote(
          new Note(id, this.composeNoteForm.value.title,
            this.composeNoteForm.value.body,
            new Date().toLocaleString(),
            new Date().toLocaleString(),
            this.composeNoteForm.value.category,
            this.composeNoteForm.value.color)
        );
      }
      this.router.navigate(['/']);
    }
  }

  // onItemChange(e) {
  //     console.log(e.target.id);
  // }
  // setBackgroundColor(value) {
  //   console.log(document.getElementById(value).checked);
  //   return document.getElementById(value).checked ? '#DDD' : '#ffff88';
  // }
  reset() {
    if (this.isEdit && this.noteID !== undefined && this.currentNote !== undefined) {
      this.composeNoteForm = new FormGroup({
        'title': new FormControl(this.currentNote.title),
        'body': new FormControl(this.currentNote.body, Validators.required),
        'category': new FormControl(this.currentNote.category),
        'color': new FormControl(this.currentNote.color)
      });
    } else {
      this.composeNoteForm.reset();
    }
  }

  goBack() {
    this._location.back();
  }
}
