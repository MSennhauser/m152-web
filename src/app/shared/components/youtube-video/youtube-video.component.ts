import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'm152-youtube-video',
  templateUrl: './youtube-video.component.html',
  styleUrls: ['./youtube-video.component.scss']
})
export class YoutubeVideoComponent implements OnInit {

  videoId = 'QdFlOnLm9E8';

  constructor() { }

  ngOnInit(): void {
  }

}
