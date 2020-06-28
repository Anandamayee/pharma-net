import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  slides: any[];
  carouselOption: OwlOptions;
  constructor() { }

  ngOnInit(): void {
    this.setCarouselOptions();
    this.setCarouselSlides();
  }

  setCarouselSlides() {
    this.slides = [
      {
        id: 1,
        src: '../../assets/image1.jpeg',
        alt: 'Image_1',
        title: 'Image_1'
      },
      {
        id: 2,
        src: '../../assets/imag2.jpeg',
        alt: 'Image_2',
        title: 'Image_3'
      },
      {
        id: 3,
        src: '../../assets/covid19.jpeg',
        alt: 'Image_3',
        title: 'Image_3'
      }
    ]
  }
  setCarouselOptions() {
    this.carouselOption = {
      loop: true,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: true,
      mergeFit: true,
      autoWidth: true,
      margin: 2,
      autoplaySpeed: 1000,
      // autoplay: true,
      autoHeight: false,
      center:true,
      nav:false,
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 1
        },
        740: {
          items: 1
        },
        940: {
          items: 1
        }
      },
    }
  }

}
