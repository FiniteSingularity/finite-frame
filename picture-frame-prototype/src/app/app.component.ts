import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth/auth.service';
import { FrameStateService } from './services/frame-state/frame-state.service';
import { GalleriesService } from './services/galleries/galleries.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  view = 'P';
  activeSlideShow = 0;
  subs = new Subscription();
  slideShows = [
    [
      '/assets/images/Mighty_Mountains_with_Snow.jpg',
      '/assets/images/Monasterio_Khor_Virap,_Armenia,_2016-10-01,_DD_25.jpg'
    ],
    [
      'https://source.unsplash.com/Qh9Swf_8DyA',
      'https://source.unsplash.com/O453M2Liufs'
    ]
  ];

  images: string[] = [];

  title = 'picture-frame-prototype';
  authenticated = false;

  constructor(
    private auth: AuthService,
    private frameState: FrameStateService,
    private galleries: GalleriesService
  ) {}

  ngOnInit() {
    // this.authenticated = this.auth._authenticated;
    this.subs.add(
      this.auth.authorized$.subscribe(auth => {
        this.authenticated = auth;
        if(this.auth.username) {
          this.frameState.state$(this.auth.username).subscribe(res => {
            this.view = res.view;
            this.getGallery(res.gallery);
          });
        }
      })
    );
    this.subs.add(
      this.frameState.frameState$.subscribe(fs => {
        if(fs.view) {
          this.view = fs.view;
          if(this.view === 'P') {
            const id = fs.gallery;
            this.getGallery(id);
          }
        }
      })
    );
    console.log(this.authenticated);
  }

  getGallery(id: number) {
    this.images = [];
    this.galleries.galleryPictures(id).subscribe(res => {
      this.images = res.map(gp => `${environment.apiUrl}${gp.path}`)
      console.log(this.images);
    });
  }

  toggleSlideShow() {
    this.activeSlideShow = this.activeSlideShow === 0 ? 1 : 0;
  }

  cycleView() {
    this.view = this.view === 'P' ? 'C' : 
                this.view === 'C' ? 'R' :
                this.view === 'R'  ? 'V':
                'P';
  }
}
