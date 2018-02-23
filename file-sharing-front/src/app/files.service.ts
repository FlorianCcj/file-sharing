import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment'

@Injectable()
export class FilesService {

  mainUrl: string = environment.backendUrl;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(`${this.mainUrl}/files/`);
  }

  postFiles(formData) {
    return this.http.post(`${this.mainUrl}/upload/`, formData);
  }

  deleteData(file) {
    return this.http.delete(`${this.mainUrl}/file/${file}`)
  }

  filterListOfFile(entityList, pattern) {
    if (typeof(pattern) === typeof('')) {
      return entityList.filter((entity) => {
        return entity.id.toLowerCase().indexOf(pattern.toLowerCase()) !== -1;
      });
    } else {
      return entityList;
    }
  }
}
