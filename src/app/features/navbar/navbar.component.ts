import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'm152-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isHandset = false;

  private onDestroySubj: Subject<void> = new Subject();

  @ViewChild(MatSidenav) matSidenav: MatSidenav;

  @ViewChild(MatSidenav, { read: ElementRef }) matSidenavRef: ElementRef;
  @ViewChild(MatSidenavContainer, { read: ElementRef }) matSidenavContainerRef: ElementRef;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver.observe(Breakpoints.XSmall)
      .pipe(map(result => result.matches), takeUntil(this.onDestroySubj))
      .subscribe((value) => {
        this.isHandset = value;
      });
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutsideMatSidenav(target: HTMLElement): void {
    if (this.matSidenav?.opened) {
      if (!this.matSidenavRef.nativeElement.contains(target) && !this.matSidenavContainerRef.nativeElement.contains(target)) {
        this.matSidenav.close();
      }
    }
  }

  ngOnDestroy(): void {
    this.onDestroySubj.next();
    this.onDestroySubj.complete();
  }
}
