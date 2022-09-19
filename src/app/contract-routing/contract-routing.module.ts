import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllContractsListComponent } from '../contracts/all-contracts-list/all-contracts-list.component';
import { ContractGenerationComponent } from '../contracts/contract-generation/contract-generation.component';

const routes: Routes = [
  {
    path: 'all',
    component: AllContractsListComponent,
  },
  {
    path: 'entry/:id',
    component: ContractGenerationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractRoutingModule {}
