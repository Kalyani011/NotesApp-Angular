import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Note} from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class DeleteNoteService {
  noteDeletedEmitter = new Subject<Note[]>();
  constructor() { }
}
