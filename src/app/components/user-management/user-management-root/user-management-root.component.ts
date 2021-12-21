import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserDetailsDialogComponent } from '../_dialogs/user-details-dialog/user-details-dialog.component';

@Component({
  selector: 'app-user-management-root',
  templateUrl: './user-management-root.component.html',
  styleUrls: ['./user-management-root.component.scss']
})
export class UserManagementRootComponent implements OnInit {

  public unsubscriber$ = new Subject<void>();
  submitted: boolean = false;
  loading: boolean = false;
  paramss:any = ''

  constructor(private dialog: MatDialog, public sharedService: SharedService, 
    private activatedRoute: ActivatedRoute, private router: Router, private apiService: ApiService) { }

  public userDetails(user: User): void {  
  this.dialog.open(UserDetailsDialogComponent, {
      width: '530px',
      data: { user},
      // position: { bottom: '0' },
      // panelClass: ['animated', 'fadeInUp', 'faster', 'dialog-rounded-none'],
      //  panelClass: ['animated', 'zoomIn', 'faster', 'dialog-rounded-none'],
    });
  }


  handleSearch = (searchVal: any) => {
      this.sharedService.LOADING = true;
      const data = searchVal;  
      this.apiService.searchUser(data).pipe(takeUntil(this.unsubscriber$)).subscribe(
        res => {
          this.sharedService.LOADING = false;
          this.submitted = false;
          this.loading = false;
          console.log('Search result', res);
          this.sharedService.users = res.results;
        },
        err => {
          this.sharedService.LOADING = false;
          this.submitted = false;
          this.loading = false;
        }
      );
    
  }

  handleOnSearch = (searchVal: string) => {
    const data = {and:[{name:{term: searchVal}}]};
    this.handleSearch(data)
  }


  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        if(params.q){
          const data = {and:[{name:{term: params.q}}]};
          this.handleSearch(data)
        }
      
      }
    );
  }

}
