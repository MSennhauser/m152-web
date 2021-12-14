import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ScrollActiveStep, ScrollService } from 'src/app/shared/services/scroll.service';

@Component({
  selector: 'm152-day-stepper',
  templateUrl: './day-stepper.component.html',
  styleUrls: ['./day-stepper.component.scss']
})
export class DayStepperComponent implements OnInit, AfterViewInit {

  @ViewChild('cozy', { static: true }) matStepCozy: MatStep;
  @ViewChild('playing', { static: true }) matStepPlaying: MatStep;
  @ViewChild('walking', { static: true }) matStepWalking: MatStep;
  @ViewChild('television', { static: true }) matStepTelevision: MatStep;
  @ViewChild('stepper', { static: true }) matStepper: MatStepper;

  matStepArray: MatStep[] = [];

  isHandset = false;

  private onDestroySubj: Subject<void> = new Subject();

  constructor(private breakpointObserver: BreakpointObserver, private scrollService: ScrollService) { }

  ngOnInit(): void {
    this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(map(result => result.matches), takeUntil(this.onDestroySubj))
      .subscribe((value) => {
        this.isHandset = value;
      });

    this.scrollService.currentActiveStep.subscribe((activeStep) => {
      console.log(activeStep);
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
}
