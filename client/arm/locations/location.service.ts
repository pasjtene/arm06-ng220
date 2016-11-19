import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { FormGroup } from '@angular/forms';
import { Location } from './location';
import { Router } from '@angular/router';


@Injectable()
export class LocationService {
    private headers = new Headers({ 'Content-Type': 'application/json', 'arm_auth_token': localStorage.getItem('arm_auth_token') });
    private locationUrl = '/api/locations';
    public locationToDelete: Location;

    private handleError(error: any): Promise<any> {
      console.log('An error has occured while connecting to the server ', error);
      return Promise.reject(error.message || error);
    }

    constructor(
        private http: Http,
        private router: Router
    ) { }

    create2(location: FormGroup) {
        console.log("location created");
        console.log(location);
        console.log(JSON.stringify(location));
        this.http.post(this.locationUrl, { location: location }, { headers: this.headers })
            .toPromise()
            .then((response) => {
                console.log("response for location: ", response);
            })
            .catch(() => {
                console.log("Errors while creating Location");
            })
        return;
    }

    create(location: Location) : Promise<Location> {
        var loc = this.http.post(this.locationUrl, { location }, { headers: this.headers })
            .toPromise()
            .then((response) => {
                this.router.navigate(['/locations']);
                return response.json();
            })
            .catch(() => {
                console.log("Errors while creating Location");


            })
              return loc;
    }

    deleteLocation(id: string) : Promise<Location> {
        const url = `${this.locationUrl}/${id}`;

        return  this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then((response) => {

                this.router.navigate(['/locations']);
                return response.json();
            })
            .catch((err) => {
                return err;

            });
    }

    delete(id: string): Promise<Location> {
      const url = `${this.locationUrl}/${id}`;
      return this.http.delete(url, {headers: this.headers})
             .toPromise().then((response) => response)
             .catch(this.handleError);
    }



    getLocations(): Promise<Location[]> {
        return this.http.get(this.locationUrl, { headers: this.headers })
            .toPromise()
            .then((locations) => {
                return locations.json() as Location[]
            })
            .catch((err) => {
                //console.log(err)
            })

    }
}
