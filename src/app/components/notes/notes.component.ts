import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotesLocalStorageService } from '../../services/notes-local-storage.service';
import { DeleteNoteService } from '../../services/delete-note.service';

import { Note } from '../../models/note.model';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnDestroy {

  notes: Note[] = [];
  categories: string[] = ["All", "Work", "Personal", "ToDo", "Other"];
  colorsMap = new Map([["#ffffff", "All"], ["#ffff88", "Yellow"], ["#B5D8D6", "Blue"], ["#F6E7E0", "Pink"], ["#FBFAEC", "White"]]);
  selectedCategory: string = "All";
  selectedColor: string = "#ffffff";
  faFilter = faFilter;
  private deleteSubscription: Subscription;

  constructor(private notesLocalStorageService: NotesLocalStorageService, private deleteNoteService: DeleteNoteService) { }

  ngOnInit(): void {

    this.notes = this.notesLocalStorageService.getAllNotes();
    this.sortNotes();

    this.deleteSubscription = this.deleteNoteService.noteDeletedEmitter.subscribe(updatedNotes => {
      this.notes = updatedNotes;
      this.sortNotes();
    });

  }

  sortNotes(): void {
    this.notes.sort((a, b) => {
      return (new Date(b.modifiedDate).getTime()) - (new Date(a.modifiedDate).getTime())
    });
  }

  ngOnDestroy(): void {
    this.deleteSubscription.unsubscribe();
  }
}
