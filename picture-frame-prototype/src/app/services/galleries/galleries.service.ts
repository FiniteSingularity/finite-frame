import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GalleryPicture } from 'src/app/models/gallery.models';
import { ApiService } from '../api/api.service';

interface GalleryPicturesResponse {
  pictures: GalleryPicture[];
}


@Injectable({
  providedIn: 'root'
})
export class GalleriesService {

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) { }

  list(): Observable<any> {
    return this.http.get<any>(
      `${this.api.url}/galleries/`
    );
  }

  galleryPictures(id: number): Observable<GalleryPicture[]> {
    return this.http.get<GalleryPicturesResponse>(
      `${this.api.url}/galleries/${id}/pictures/`
    ).pipe(
      map(res => res.pictures)
    );
  }
}
