import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotesLocalStorageService } from '../../notes-local-storage.service';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-compose-note',
  templateUrl: './compose-note.component.html',
  styleUrls: ['./compose-note.component.css']
})

export class ComposeNoteComponent implements OnInit {

  composeNoteForm: FormGroup = new FormGroup({
    'title': new FormControl(null),
    'body': new FormControl(null, Validators.required),
    'category': new FormControl(null),
    'color': new FormControl(null)
  });
  categories: any = ['school', 'work', 'home', 'official', 'people'];
  colors: any = ['yellow', 'pink', 'black', 'white', 'blue'];
  colorsMap = new Map([['#ffff88', 'yellow'], ['#B5D8D6','blue'], ['#FBFAEC', 'white'], ['#F6E7E0', 'pink'], ['#BFBFBF', 'grey']]);

  constructor(private notesLocalStorageService: NotesLocalStorageService, private router: Router) { }

  ngOnInit(): void {
  }

  saveNote() {
    if (this.composeNoteForm.valid) {
      let id  = this.notesLocalStorageService.getAllNotes() + 1 || 0;

      this.notesLocalStorageService.addNote(
        new Note(id, this.composeNoteForm.value.title,
          this.composeNoteForm.value.body,
          new Date().toLocaleString(),
          new Date().toLocaleString(),
          this.composeNoteForm.value.category,
          this.composeNoteForm.value.color)
      );
      this.router.navigate(['/']);
    }
  }
}
