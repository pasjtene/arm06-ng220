import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Organization } from './organization'

@Injectable()
export class OrganizationService {
  private organizationUrl = 'api/organizations';
  private headers = new Headers({'Content-Type':'application/json', 'arm_auth_token':localStorage.getItem('arm_auth_token')});
  constructor(private http: Http){

  }

  create(organization){
    console.log("The organiza...is: ", organization);
    this.http.post(this.organizationUrl, {organization}, {headers:this.headers})
        .toPromise()
        .then((organization) => {
          console.log(organization);
        })
  }

  getOrganizations(): Promise<Organization[]> {
      return this.http.get(this.organizationUrl, {headers: this.headers})
                      .toPromise()
                      .then((organizations) => {
                        console.log("db organization: ", organizations);
                        return organizations.json() as Organization[];
                      })
                      .catch(//troubleshoot for errors
                      );
  }
}
