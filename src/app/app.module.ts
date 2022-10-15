import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HomeComponent } from './home/home.component';
import { ItemListComponent } from './home/item-list/item-list.component';
import { AdminModule } from './admin/admin.module';
import { ServiceModule } from './service/service.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RequisitionEntryComponent } from './requisition/requisition-entry/requisition-entry.component';
import { RequisitionHeaderComponent } from './requisition/requisition-header/requisition-header.component';
import { RequisitionLinesComponent } from './requisition/requisition-lines/requisition-lines.component';
import { CreateItemsComponent } from './requisition/create-items/create-items.component';
import { PostEntryComponent } from './post-entry/post-entry.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';


@NgModule({
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AdminModule,
    ServiceModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ItemListComponent,
    RequisitionEntryComponent,
    RequisitionHeaderComponent,
    RequisitionLinesComponent,
    CreateItemsComponent,
    PostEntryComponent,
    PostDetailComponent,
    PostListComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
