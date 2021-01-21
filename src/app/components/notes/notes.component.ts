import { Component, OnInit } from '@angular/core';
import { NotesLocalStorageService } from '../../notes-local-storage.service';
import { Note } from '../../models/note.model';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes: Note[] = [];
  categories: string[] = ["All", "Work", "Personal", "ToDo", "Other"];
  colorsMap = new Map([["#ffffff", "All"], ["#ffff88", "Yellow"], ["#B5D8D6", "Blue"], ["#F6E7E0", "Pink"], ["#FBFAEC", "White"]]);
  selectedCategory: string = "All";
  selectedColor: string = "#ffffff";
  faFilter = faFilter;

  constructor(private notesLocalStorageService: NotesLocalStorageService) { }

  ngOnInit(): void {
    this.notes = this.notesLocalStorageService.getAllNotes();
    this.notes.sort((a, b) => {
      return (new Date(b.modifiedDate).getTime()) - (new Date(a.modifiedDate).getTime())
    });
  }
}
