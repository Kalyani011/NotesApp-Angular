import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ComposeNoteComponent } from './components/compose-note/compose-note.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'compose', component: ComposeNoteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
