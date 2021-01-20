import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ComposeNoteComponent } from './components/compose-note/compose-note.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: 'home', component: HomeComponent },
  { path: 'compose', component: ComposeNoteComponent, data: { kind: 'add' } },
  { path: 'compose/:id', component: ComposeNoteComponent, data: { kind: 'edit' }},
  { path: "**", redirectTo: 'home' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
