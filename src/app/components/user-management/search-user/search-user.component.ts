import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit, OnDestroy {
  userSearchForm: FormGroup;
  public unsubscriber$ = new Subject<void>();
  submitted: boolean = false;
  loading: boolean = false;
  @Output() handleOnSearch: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
    public sharedService: SharedService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.userSearchForm = this.formBuilder.group({
      name: ['']
    })
  }

  onSubmit = (): void => {
    const val = this.userSearchForm.value.name.trim();
    if (val) {
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: { q: val },
          queryParamsHandling: 'merge',
        });

      this.handleOnSearch.emit([val])
    }
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
