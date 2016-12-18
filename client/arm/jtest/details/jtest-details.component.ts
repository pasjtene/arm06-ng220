import { Component, Input } from '@angular/core';
import { Organization } from '../../organizations/organization';

@Component({
  moduleId: module.id,
  selector: 'organization-details',
  templateUrl: 'jtest-details.component.html'
})

export class JtestDetailsComponent {
  @Input('details')
  public organizationDetails: Organization;
}
