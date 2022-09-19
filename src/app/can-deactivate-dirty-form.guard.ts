import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanDeactivate,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { BaseComponent } from './base-component';

@Injectable()
export class CanDeactivateDirtyFormGuard
  implements CanDeactivate<BaseComponent>
{
  
  canDeactivate(
    component: BaseComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return component.isFormPristine() || window.confirm('Leave?');
  }
}
