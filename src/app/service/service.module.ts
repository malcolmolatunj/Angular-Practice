import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { CommonService } from './common.service';
import { PostResolver } from './post-resolver.service';
import { PostsService } from './posts.service';
import { UserService } from './user.service';

@NgModule({
  providers: [
    CommonService,
    UserService,
    PostsService,
    PostResolver,
    AuthService,
  ],
})
export class ServiceModule {}
