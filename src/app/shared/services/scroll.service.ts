import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

export interface ScrollElement{
  element: Element,
  isViewable: boolean
};


@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private _elementArray: ScrollElement[] = [];
  private currentElementShown: Observable<ScrollElement>;


  constructor() {
    this.isScrolledIntoView
   }

  private isScrolledIntoView(){
    this.currentElementShown = new Observable((subscriber) => {
      window.addEventListener('scroll', () => {
        if (this._elementArray.length > 0){
          this._elementArray.forEach((scrollElement) => {
            const rect = scrollElement.element.getBoundingClientRect();
            const topShown = rect.top + (rect.height / 2) >= 0;
            const bottomShown = rect.bottom - (rect.height / 2) <= window.innerHeight;
            const shown = (topShown && bottomShown);
            if (scrollElement.isViewable != shown){
              scrollElement.isViewable = shown;
              if(scrollElement.isViewable){
                subscriber.next(scrollElement);
              }
              console.log(scrollElement.isViewable);
            }
          })
        }
      });
    });
    
  }

  observeIsElementViewable(element: Element): Observable<ScrollElement>{
    this._elementArray.push({
      element: element,
      isViewable: false
    });
    return this.currentElementShown.pipe()
  }

}
