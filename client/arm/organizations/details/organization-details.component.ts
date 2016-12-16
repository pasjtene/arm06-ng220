import { Component, Input } from '@angular/core';
import { Organization } from '../organization';

@Component({
  moduleId: module.id,
  selector: 'organization-details',
  templateUrl: 'organization-details.component.html'
})

export class OrganizationDetailsComponent {
  @Input('details')
  public organizationDetails: Organization;
}
