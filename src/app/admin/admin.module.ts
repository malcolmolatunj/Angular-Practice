import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileEntryComponent } from './profile-entry/profile-entry.component';
import { ProfileEntryRolesComponent } from './profile-entry/profile-entry-roles/profile-entry-roles.component';
import { ProfileEntryDetailComponent } from './profile-entry/profile-entry-detail/profile-entry-detail.component';
import { MaterialModule } from '../material/material.module';
import { UsersListComponent } from './users-list/users-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing/app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    ProfileEntryComponent,
    ProfileEntryRolesComponent,
    ProfileEntryDetailComponent,
    UsersListComponent
  ]
})
export class AdminModule { }