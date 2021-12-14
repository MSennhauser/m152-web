import { Component, ElementRef, OnInit } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'm152-youtube-video',
  templateUrl: './youtube-video.component.html',
  styleUrls: ['./youtube-video.component.scss']
})
export class YoutubeVideoComponent implements OnInit {

  constructor(private scrollService: ScrollService,
    private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.scrollService.observeIsElementViewable(this.elementRef.nativeElement);
  }

}
