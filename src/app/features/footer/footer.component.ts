import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'm152-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openGithubRepo(): void {
    window.open('https://github.com/MSennhauser/m152-web', '_blank');
  }
}
