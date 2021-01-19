import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeNoteComponent } from './compose-note.component';

describe('ComposeNoteComponent', () => {
  let component: ComposeNoteComponent;
  let fixture: ComponentFixture<ComposeNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComposeNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
