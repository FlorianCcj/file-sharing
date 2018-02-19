import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FilesService {

  mainUrl: string = 'http://localhost:3003/api'

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(`${this.mainUrl}/files/`);
  }

  postFiles(formData) {
    return this.http.post(`${this.mainUrl}/upload/`, formData);
  }
}
