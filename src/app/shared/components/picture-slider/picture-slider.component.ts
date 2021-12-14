import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'm152-picture-slider',
  templateUrl: './picture-slider.component.html',
  styleUrls: ['./picture-slider.component.scss']
})
export class PictureSliderComponent implements OnInit {


  @Input() srcOriginal: string;
  @Input() srcEdited: string;

  showEdited = true;

  constructor() { }

  ngOnInit(): void {
    
  }

  changeImgSrc(): void {
   this.showEdited = !this.showEdited;
  }
}
