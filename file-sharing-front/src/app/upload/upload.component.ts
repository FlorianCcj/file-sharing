import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FilesService} from '../files.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  // filesToUpload: File[] = [];
  @Output() onDrop = new EventEmitter<any>();

  constructor(private filesService: FilesService) {}

  ngOnInit() {}

  /* upload() {
    const formData: any = new FormData();
    const files: File[] = this.filesToUpload;
    for(let i =0; i < files.length; i++){
        formData.append("uploads[]", files[i], files[i]['name']);
    }    
    this.filesService.postFiles(formData)
      .subscribe(files => true)
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <File[]>fileInput.target.files;
  } */

  handleDrop(e) {
    e.preventDefault(); // évite d'ouvrir le fichier recherché
    const files: File[] = e.dataTransfer.files;
    const formData: any = new FormData();

    for(let i =0; i < files.length; i++){
      formData.append("uploads[]", files[i], files[i]['name']);
    }
    this.filesService.postFiles(formData)
      .subscribe(files => this.onDrop.emit());
  }
}

