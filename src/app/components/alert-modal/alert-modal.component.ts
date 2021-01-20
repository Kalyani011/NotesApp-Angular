import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {
  @Input() message: string;
  @Output() saveChanges = new EventEmitter<boolean>();
  faTimes = faTimes;
  faCheck = faCheck;
  constructor() { }

  ngOnInit(): void {
  }

  onOk() {
    this.saveChanges.emit(true);
  }

  onCancel() {
    this.saveChanges.emit(false);
  }
}
