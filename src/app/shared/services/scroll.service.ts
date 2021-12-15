import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

export enum ScrollActiveStep {
  Cozy = 0,
  Playing = 1,
  Walking = 2,
  Television = 3
}

interface ScrollElement {
  element: Element;
  isViewable: boolean;
  step: ScrollActiveStep;
}

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private _elementArray: ScrollElement[] = [];
  private currentElementShown: BehaviorSubject<ScrollElement[]> = new BehaviorSubject([]);
  private _currentActiveStep: BehaviorSubject<ScrollActiveStep> = new BehaviorSubject(ScrollActiveStep.Cozy);

  isSmall = false;

  private onDestroySubj: Subject<void> = new Subject();


  constructor(private breakpointObserver: BreakpointObserver) {
    this.isScrolledIntoView();
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(map(result => result.matches), takeUntil(this.onDestroySubj))
      .subscribe((value) => {
        this.isSmall = value;
        window.dispatchEvent(new Event('scroll'));
      });
  }

  private isScrolledIntoView(): void {
    window.addEventListener('scroll', () => {
      if (this.isSmall) {
        return;
      }
      if (this._elementArray.length > 0) {
        let hasChanges = false;
        this._elementArray.forEach((scrollElement) => {
          const rect = scrollElement.element.getBoundingClientRect();
          const minHeightViewable = (rect.height / 2);
          const topShown = rect.top + minHeightViewable >= 0;
          const bottomShown = rect.bottom - minHeightViewable <= window.innerHeight;
          const shown = (topShown && bottomShown);
          if (scrollElement.isViewable !== shown) {
            scrollElement.isViewable = shown;
            hasChanges = true;
          }
        });
        if (hasChanges) {
          this.currentElementShown.next(this._elementArray);
        }
      }
    });
  }

  observeIsElementViewable(element: Element, step: ScrollActiveStep): void {
    this._elementArray.push({
      element,
      isViewable: false,
      step
    });
    const elementViewable = new BehaviorSubject(false);
    this.currentElementShown
      .pipe(
        filter(scEl => scEl.some(scrollElement => scrollElement.element === element)),
        map(scEl => scEl.find(scrollElement => scrollElement.element === element).isViewable)
      )
      .subscribe(value => elementViewable.next(value));
    elementViewable
      .pipe(filter(value => value))
      .subscribe(() => {
        if (this.isSmall) {
          return;
        }
        this._currentActiveStep.next(step);
      });
  }


  scrollToStep(step: ScrollActiveStep): void {
    const element = this._elementArray.find(scrollElement => scrollElement.step === step)?.element;
    if (element) {
      element.scrollIntoView(false);
    }
  }

  get currentActiveStep(): BehaviorSubject<ScrollActiveStep> {
    return this._currentActiveStep;
  }
}
