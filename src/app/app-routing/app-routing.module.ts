import { Injectable, NgModule } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ProfileEntryComponent } from '../admin/profile-entry/profile-entry.component';
import { UsersListComponent } from '../admin/users-list/users-list.component';
import { RequisitionEntryComponent } from '../requisition/requisition-entry/requisition-entry.component';
import { User } from '../models';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';
import { CanDeactivateDirtyFormGuard } from '../can-deactivate-dirty-form.guard';
import { PostEntryComponent } from '../post-entry/post-entry.component';
import { PostDetailComponent } from '../post-detail/post-detail.component';
import { PostResolver } from '../service/post-resolver.service'

@Injectable({ providedIn: 'root' })
class AllUserResolver implements Resolve<User[]> {
  constructor(private service: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): User[] | Observable<User[]> | Promise<User[]> {
    return this.service.getUsers();
  }
}

const routes: Routes = [
  { path: 'users/entry/:id', component: ProfileEntryComponent },
  { path: 'users/entry', component: ProfileEntryComponent },
  {
    path: 'users',
    component: UsersListComponent,
    resolve: { users: AllUserResolver },
  },
  {
    path: 'posts/entry',
    component: PostEntryComponent,
    canDeactivate: [CanDeactivateDirtyFormGuard]
  },
  {
    path: 'posts/:id',
    component: PostDetailComponent,
    resolve: { post: PostResolver }
  },
  {
    path: 'requisition/entry',
    component: RequisitionEntryComponent,
    canDeactivate: [CanDeactivateDirtyFormGuard],
  },
  {
    path: 'contracts',
    loadChildren: () => import('../contracts/contracts.module').then(m => m.ContractsModule)
  },
  { path: '', pathMatch: 'full', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanDeactivateDirtyFormGuard],
})
export class AppRoutingModule {}
