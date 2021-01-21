import { Component, OnInit, DoCheck } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotesLocalStorageService } from '../../notes-local-storage.service';
import { Note } from '../../models/note.model';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-compose-note',
  templateUrl: './compose-note.component.html',
  styleUrls: ['./compose-note.component.css']
})

export class ComposeNoteComponent implements OnInit {

  // Form Group: Original and Current
  composeNoteForm: FormGroup;
  originalForm: FormGroup;

  // Edit note
  noteID: number;
  currentNote: Note;
  isEdit: boolean = false;

  // Alert
  warnUser: boolean = false;
  warningMessage: string;

  hasChanges: boolean = false;
  enableReset: boolean = false;
  faChevronCircleLeft = faChevronCircleLeft;

  constructor(
    private notesLocalStorageService: NotesLocalStorageService,
    private router: Router,
    private _location: Location,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      switch (data.kind) {

        case 'add':
          this.composeNoteForm = new FormGroup({
            'title': new FormControl(null),
            'body': new FormControl(null, Validators.required),
            'category': new FormControl("Other"),
            'color': new FormControl("#ffff88")
          });
          this.originalForm = Object.assign({}, this.composeNoteForm);
          break;

        case 'edit':
          this.isEdit = true;
          this.route.params.subscribe((params: Params) => {
            let isValidID = this.notesLocalStorageService.getAllNotes().find((note: Note) => {
              return note.id == parseInt(params['id']);
            })
            isValidID ? this.noteID = parseInt(params['id']) : this.router.navigate(['/']);
          });

          if (this.noteID !== undefined) {
            this.currentNote = this.notesLocalStorageService.getNote(this.noteID);
            this.composeNoteForm = new FormGroup({
              'title': new FormControl(this.currentNote.title),
              'body': new FormControl(this.currentNote.body, Validators.required),
              'category': new FormControl(this.currentNote.category),
              'color': new FormControl(this.currentNote.color)
            });
            this.originalForm = Object.assign({}, this.composeNoteForm);
          }
          break;
        default:
          break;
      }
    });
  }

  ngDoCheck() {
    if (this.composeNoteForm) {
      for (let prop in this.composeNoteForm.value) {
        if (this.isDifferent(this.composeNoteForm, prop)) {
          this.enableReset = true;
          break;
        }
      }
    }
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
      this.toastr.success('Note Saved Successfully', "", {
        timeOut: 1000,
      });
      this.router.navigate(['/']);
    }
  }

  reset() {
    if (this.isEdit && this.noteID !== undefined && this.currentNote !== undefined) {
      this.composeNoteForm = new FormGroup({
        'title': new FormControl(this.currentNote.title),
        'body': new FormControl(this.currentNote.body, Validators.required),
        'category': new FormControl(this.currentNote.category),
        'color': new FormControl(this.currentNote.color)
      });
      this.originalForm = Object.assign({}, this.composeNoteForm);
      this.enableReset = false;
    } else {
      this.composeNoteForm = new FormGroup({
        'title': new FormControl(null),
        'body': new FormControl(null, Validators.required),
        'category': new FormControl("Other"),
        'color': new FormControl("#ffff88")
      });
      this.originalForm = Object.assign({}, this.composeNoteForm);
      this.enableReset = false;
    }
  }

  goBack() {
    // let hasChanges = false;
    for (let prop in this.composeNoteForm.value) {
      if (this.isDifferent(this.composeNoteForm, prop)) { this.hasChanges = true; break; }
    }
    if (this.hasChanges) {
      this.warningMessage = "You have unsaved changes, do you want to save the changes?";
      this.warnUser = true;
    } else {
      this._location.back();
    }
  }

  onSaveChanges(save) {
    if (save) {
      if (this.hasChanges) {
        if (this.composeNoteForm.value.body) {
          this.saveNote();
        } else {
          this.warnUser = false;
          this.toastr.error("Please Enter Note Content to Save the Note!", "");
        }
      } else {
        this.warnUser = false;
      }
    } else {
      this.reset();
      this._location.back();
    }
  }

  isDifferent(obj: any, prop: string) {
    return this.originalForm.value[prop] !== obj.value[prop];
  }
}
