import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {FilesService} from '../files.service';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss']
})
export class FilesListComponent implements OnInit {

  filesList: Observable<any>;
  filesListLength: number;
  mainUrl = this.filesService.mainUrl;

  numberOfDataPerPage = 10;
  page = 0;
  maxPage = 0;
  
  constructor(private filesService: FilesService) {}

  ngOnInit() {
    this.getFiles();
  }

  getFiles() {
    this.filesList = this.filesService.list()
    .map(
      (filesList: {files: any[]}) => {
        this.filesListLength = filesList.files.length;
        this.calculMaxPage()
        return filesList;
      }
    )
  }

  deleteFile(file) {
    this.filesService.deleteData(file.id).subscribe(
      () => this.getFiles()
    );
  }

  switchPage (newPage: number) {
    if (typeof(newPage) === typeof(+newPage) && +newPage >= 0) {
      this.page = newPage;
    }
  }

  setNumberOfDataPerPage(countData: number) {
    if (+countData) {
      if (countData > 0) {
        this.numberOfDataPerPage = countData;
      }
      if (countData > this.filesListLength) {
        this.numberOfDataPerPage = this.filesListLength;
      }
      this.calculMaxPage();
    }

    this.switchPage(0);
  }

  calculMaxPage() {
    const perPage = this.numberOfDataPerPage;
    const filesLength = this.filesListLength;
    this.maxPage = filesLength % perPage === 0 ? (filesLength / perPage) - 1 : (filesLength - filesLength % perPage) / perPage; 
  }

}
