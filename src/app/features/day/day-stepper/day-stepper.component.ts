import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ScrollActiveStep, ScrollService } from 'src/app/shared/services/scroll.service';

@Component({
  selector: 'm152-day-stepper',
  templateUrl: './day-stepper.component.html',
  styleUrls: ['./day-stepper.component.scss']
})
export class DayStepperComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('cozy', { static: true }) matStepCozy: MatStep;
  @ViewChild('playing', { static: true }) matStepPlaying: MatStep;
  @ViewChild('walking', { static: true }) matStepWalking: MatStep;
  @ViewChild('television', { static: true }) matStepTelevision: MatStep;
  @ViewChild('stepper', { static: true }) matStepper: MatStepper;

  matStepArray: MatStep[] = [];

  isSmall = false;
  isScrolling = false;

  private onDestroySubj: Subject<void> = new Subject();

  constructor(private breakpointObserver: BreakpointObserver, private scrollService: ScrollService) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(map(result => result.matches), takeUntil(this.onDestroySubj))
      .subscribe((value) => {
        this.isSmall = value;
      });

    this.scrollService.currentActiveStep.subscribe((activeStep) => {
      this.isScrolling = true;
      switch (activeStep) {
        case ScrollActiveStep.Cozy:
          this.resetAllSteps();
          this.matStepCozy.select();
          break;
        case ScrollActiveStep.Playing:
          this.resetAllSteps();
          this.matStepPlaying.select();
          break;
        case ScrollActiveStep.Walking:
          this.resetAllSteps();
          this.matStepWalking.select();
          break;
        case ScrollActiveStep.Television:
          this.resetAllSteps();
          this.matStepTelevision.select();
          break;
        default:
          this.resetAllSteps();
          this.matStepCozy.select();
          break;
      }
      this.isScrolling = false;
    });
  }

  ngAfterViewInit(): void {
    this.matStepArray = [
      this.matStepCozy,
      this.matStepPlaying,
      this.matStepWalking,
      this.matStepTelevision
    ];
    this.matStepper.selectionChange.subscribe((value) => {
      // skip if scrolling to prevent stuttering
      if (this.isScrolling) {
        return;
      }
      if (this.isSmall) {
        this.resetAllSteps();
        return;
      }
      switch (value.selectedStep) {
        case this.matStepCozy:
          this.scrollService.scrollToStep(ScrollActiveStep.Cozy);
          break;
        case this.matStepPlaying:
          this.scrollService.scrollToStep(ScrollActiveStep.Playing);
          break;
        case this.matStepWalking:
          this.scrollService.scrollToStep(ScrollActiveStep.Walking);
          break;
        case this.matStepTelevision:
          this.scrollService.scrollToStep(ScrollActiveStep.Television);
          break;
        default:
          break;
      }
    });
    this.matStepArray.forEach(matStep => {
      matStep.editable = true;
    });
  }

  private resetAllSteps(): void {
    this.matStepArray.forEach((step) => {
      step.completed = false;
      step.interacted = false;
    });
  }

  ngOnDestroy(): void {
    this.onDestroySubj.next();
    this.onDestroySubj.complete();
  }
}
