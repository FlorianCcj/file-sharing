import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {FilesService} from '../files.service';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss']
})
export class FilesListComponent implements OnInit {

  filesList: Observable<any>;
  mainUrl = this.filesService.mainUrl;
  
  constructor(private filesService: FilesService) {}

  ngOnInit() {
    this.getFiles();
  }

  getFiles() {
    this.filesList = this.filesService.list();
  }

  deleteFile(file) {
    this.filesService.deleteData(file.id).subscribe(
      () => this.getFiles()
    );
  }

}
