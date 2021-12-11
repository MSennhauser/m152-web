import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'm152-picture-slider',
  templateUrl: './picture-slider.component.html',
  styleUrls: ['./picture-slider.component.scss']
})
export class PictureSliderComponent implements OnInit {


  @Input() srcOriginal: string;
  @Input() srcEdited: string;

  currentImgSrc = '';

  constructor() { }

  ngOnInit(): void {
    this.currentImgSrc = this.srcEdited;
  }

  changeImgSrc(): void {
    if (this.currentImgSrc === this.srcEdited) {
      this.currentImgSrc = this.srcOriginal;
    } else {
      this.currentImgSrc = this.srcEdited;
    }
  }
}
