import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';

import {FilesService} from './files.service';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FilesListComponent } from './files-list/files-list.component';
import { UploadComponent } from './upload/upload.component';
import {SearchPipe} from './search.pipe';

const appRoutes: Routes = [
  { path: 'files', component: FilesListComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FilesListComponent,
    UploadComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [FilesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
