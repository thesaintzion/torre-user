import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  isHandset = false;
  LOADING = false;
  users: User[]  = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
  private router: Router,
  private breakpointObserver: BreakpointObserver) { }


  initBreakPoint(){
    this.breakpointObserver
    .observe(['(max-width: 767px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isHandset = true;
      } else {
        this.isHandset = false;
      }
    });
}

}
