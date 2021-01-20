import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.css']
})
export class NoteModalComponent implements OnInit {

  @Output() close = new EventEmitter<boolean>();
  @Input() backgroundColor : string = "#ffff88"
  faTimes = faTimes;

  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    console.log("we are here");

    this.close.emit(false);
  }
}
