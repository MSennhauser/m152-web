import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'm152-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit, OnDestroy {

  isSmall = false;

  private onDestroySubj: Subject<void> = new Subject();

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(map(result => result.matches), takeUntil(this.onDestroySubj))
      .subscribe((value) => {
        this.isSmall = value;
      });
  }
  ngOnDestroy(): void {
    this.onDestroySubj.next();
    this.onDestroySubj.complete();
  }
}
