import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractRoutingModule } from '../contract-routing/contract-routing.module';
import { AllContractsListComponent } from './all-contracts-list/all-contracts-list.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContractService } from './contract.service';
import { ContractGenerationComponent } from './contract-generation/contract-generation.component';
import { ContractHeaderComponent } from './contract-header/contract-header.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ContractRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    AllContractsListComponent,
    ContractGenerationComponent,
    ContractHeaderComponent
  ],
  providers: [ContractService],
})
export class ContractsModule {}
