import { OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core/store/app.state';
import { Subscription } from 'rxjs';

export abstract class BaseComponent implements OnDestroy {
  protected subscriptions: Subscription[] = [];

  protected constructor(protected store$: Store<AppState>) {
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe());
  }
}
