import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import 'ken-burns-carousel';

/*
 * Code for ken burns, from https://github.com/Festify/ken-burns-carousel
 */

@Component({
  selector: 'app-ken-burns',
  templateUrl: './ken-burns.component.html',
  styleUrls: ['./ken-burns.component.scss']
})
export class KenBurnsComponent implements OnInit, OnChanges {
  // @ViewChild('slideShow', {static: true})
  // slideShow: ElementRef;

  @ViewChild('images', {static: true})
  imagesEle: ElementRef;

  @Input() images: string[] = [];
  @Input() slideDuration: number = 5000;
  @Input() fadeDuration: number = 4000;

  currentImageId: number = null;
  currentImage: HTMLElement = null;
  nextImage: HTMLElement = null;
  currentTimeout = null;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.images.length > 0) {
      this.shuffleImages();
      this.grabFirstImage();
    } else {
      this.currentImageId = null;
    }
  }

  shuffleImages() {
    for(let i = this.images.length -1; i > 0; i--) { 
      const j = Math.floor(Math.random() * i);
      const tmp = this.images[i];
      this.images[i] = this.images[j];
      this.images[j] = tmp; 
    }
  }

  setupSlides(): void {
    // const slideEle = this.slideShow.nativeElement;
    // slideEle.images = this.images;
    // slideEle.fadeDuration = this.fadeDuration;
    // slideEle.slideDuration = this.slideDuration;
  }

  clearImages() {
    const childElements = this.imagesEle.nativeElement.children;
    for (const child of childElements) {
      this.renderer.removeChild(this.imagesEle.nativeElement, child);
    }
    if(this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
  }

  grabFirstImage(): void {
    this.clearImages();
    this.currentImageId = 0;
    const image = new Image();
    image.src = this.images[this.currentImageId];
    this.currentImage = this.renderer.createElement('div');
    this.renderer.addClass(this.currentImage, 'image-holder');
    this.renderer.setStyle(this.currentImage, 'animation-duration', `${this.fadeDuration}ms`)

    this.renderer.addClass(image, 'img-fill');
    this.renderer.appendChild(this.currentImage, image);
    this.renderer.appendChild(this.imagesEle.nativeElement, this.currentImage);

    const nextImg = new Image();
    nextImg.src = this.images[this.currentImageId+1];
    this.currentImageId += 2;
    this.nextImage = this.renderer.createElement('div');
    this.renderer.addClass(this.nextImage, 'image-holder');
    this.renderer.setStyle(this.nextImage, 'animation-duration', `${this.fadeDuration}ms`)
    this.renderer.addClass(nextImg, 'img-fill');
    this.renderer.appendChild(this.nextImage, nextImg);
    this.currentTimeout = setTimeout(() => {this.setNextImage()}, this.slideDuration);
  }

  setNextImage() {
    this.renderer.addClass(this.currentImage, 'fadeOut');
    const oldImg = this.currentImage;
    this.currentImage = this.nextImage;
    this.renderer.appendChild(this.imagesEle.nativeElement, this.currentImage);
    this.currentTimeout = setTimeout(() => {
      this.renderer.removeChild(this.imagesEle.nativeElement, oldImg);
    }, this.fadeDuration);
    if(this.currentImageId === this.images.length) {
      this.currentImageId = 0;
    }

    const nextImg = new Image();
    nextImg.src = this.images[this.currentImageId];
    this.nextImage = this.renderer.createElement('div');
    this.renderer.addClass(this.nextImage, 'image-holder');
    this.renderer.setStyle(this.nextImage, 'animation-duration', `${this.fadeDuration}ms`)
    this.renderer.addClass(nextImg, 'img-fill');
    this.renderer.appendChild(this.nextImage, nextImg);
    this.currentImageId += 1;
    setTimeout(() => {this.setNextImage()}, this.slideDuration);
  }
}
