import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'm152-day-stepper',
  templateUrl: './day-stepper.component.html',
  styleUrls: ['./day-stepper.component.scss']
})
export class DayStepperComponent implements OnInit {

  isHandset = false;

  private onDestroySubj: Subject<void> = new Subject();

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(map(result => result.matches), takeUntil(this.onDestroySubj))
      .subscribe((value) => {
        this.isHandset = value;
      });
  }

}
