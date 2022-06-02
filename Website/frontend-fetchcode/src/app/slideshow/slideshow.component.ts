import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit {
  constructor() {}

  slideIndex = 1;

  ngOnInit(): void {
    this.showSlides(this.slideIndex);
  }

  plusSlides(n: number) {
    this.showSlides((this.slideIndex += n));
  }

  currentSlide(n: number) {
    this.showSlides((this.slideIndex = n));
  }

  showSlides(n: number) {
    let i;

    let slides = Array.from(document.getElementsByClassName('mySlides') as HTMLCollectionOf<HTMLElement>);
    let dots = Array.from(document.getElementsByClassName('dot') as HTMLCollectionOf<HTMLElement>);

    if (n > slides.length) {
      this.slideIndex = 1;
    }

    if (n < 1) {
      this.slideIndex = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }

    slides[this.slideIndex - 1].style.display = 'block';
    dots[this.slideIndex - 1].className += ' active';
  }
}
