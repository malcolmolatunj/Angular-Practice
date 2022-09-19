import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from '../../../service/common.service';
import { Role } from '../../../models';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';

@Component({
  selector: 'app-profile-entry-roles',
  templateUrl: './profile-entry-roles.component.html',
  styleUrls: ['./profile-entry-roles.component.css'],
})
export class ProfileEntryRolesComponent implements OnInit {
  roles$: Observable<Role[]>;
  parentForm: FormGroup;
  activeRoles: FormArray;

  constructor(
    private commonService: CommonService,
    private fg: FormGroupDirective
  ) {}

  ngOnInit() {
    this.parentForm = this.fg.control;
    this.activeRoles = this.parentForm.get('roles') as FormArray;
    this.roles$ = this.commonService.getRoles();
  }

  toggleRole(event, roleId: string | number): void {
    if (event.checked) {
      const role = new FormControl(roleId);
      this.activeRoles.push(role);
    } else {
      const roleIndex = this.activeRoles.controls.findIndex(
        (ctrl) => ctrl.value === roleId
      );
      this.activeRoles.removeAt(roleIndex);
    }
  }

  rolesInclude(roleId: string | number): boolean {
    return this.activeRoles.controls.some(role => role.value === roleId)
  }
}
