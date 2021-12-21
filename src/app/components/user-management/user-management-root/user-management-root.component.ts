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
  paramss: any = '';

  constructor(private dialog: MatDialog, public sharedService: SharedService,
    private activatedRoute: ActivatedRoute, private router: Router, private apiService: ApiService) {

  }

  public userDetails(user: User): void {
    this.dialog.open(UserDetailsDialogComponent, {
      width: '600px',
      data: { user },
      position: { bottom: '0', },
      panelClass: ['animated', 'fadeInUp', 'faster', 'dialog-rounded-none'],
    });
  }


  handleSearch = (searchVal: any): void => {
    this.loading = true;
    const data = searchVal;
    this.apiService.searchUser(data).pipe(takeUntil(this.unsubscriber$)).subscribe(
      res => {
        this.submitted = false;
        this.loading = false;
        console.log('Search result', res);
        this.sharedService.users = res.results;
      },
      err => {
        this.submitted = false;
        this.loading = false;
      }
    );
  }

  handleOnSearch = (searchVal: string): void => {
    this.sharedService.LOADING = true;
    this.handleSearch(searchVal)
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.q) {
          this.handleSearch(params.q.trim())
        }
      }
      );
  }

}
