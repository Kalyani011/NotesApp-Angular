import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotesComponent } from './components/notes/notes.component';
import { NoteComponent } from './components/notes/note/note.component';
import { ComposeNoteComponent } from './components/compose-note/compose-note.component';
import { HomeComponent } from './components/home/home.component';
import { NoteModalComponent } from './components/notes/note-modal/note-modal.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { FilterNotesPipe } from './filter-notes.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotesComponent,
    NoteComponent,
    ComposeNoteComponent,
    HomeComponent,
    NoteModalComponent,
    AlertModalComponent,
    FilterNotesPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
    timeOut: 5000,
    positionClass: 'toast-bottom-right',
    preventDuplicates: true,
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
