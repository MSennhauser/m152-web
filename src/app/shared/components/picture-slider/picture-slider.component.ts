import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ScrollActiveStep, ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'm152-picture-slider',
  templateUrl: './picture-slider.component.html',
  styleUrls: ['./picture-slider.component.scss']
})
export class PictureSliderComponent implements OnInit {


  @Input() srcOriginal: string;
  @Input() srcEdited: string;
  @Input() step: ScrollActiveStep;

  showEdited = true;

  constructor(private scrollService: ScrollService,
    private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.scrollService.observeIsElementViewable(this.elementRef.nativeElement, this.step);
  }

  changeImgSrc(): void {
    this.showEdited = !this.showEdited;
  }
}
