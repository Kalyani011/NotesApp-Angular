import { Component } from '@angular/core';
import { NotesLocalStorageService } from './notes-local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NotesLocalStorageService]
})

export class AppComponent{}
