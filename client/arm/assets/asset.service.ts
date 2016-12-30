/*
*Author: Pascal Tene
*Created: Sept 2016
*
*/
import { Injectable } from '@angular/core';
import { Http, Headers, Response }  from '@angular/http';
import { Asset } from './asset';
import { Observable } from 'rxjs';

@Injectable()
export class AssetService {
  assetToDelete = {};
  private assetUrl = '/api/assets';
  private headers = new Headers ({'Content-Type' : 'Application/json', 'arm_auth_token' : localStorage.getItem('arm_auth_token')});

  constructor(
    private http: Http
  ){}

  search(term: string): Observable<Asset[]> {
      var url = `${this.assetUrl}/?name=${term}`;
      return this.http
        .get(url)
        .map((res: Response) => res.json() as Asset[])
  }

  create(asset: Asset) : Promise<Asset> {
      return this.http.post(this.assetUrl, { asset }, {headers: this.headers })
              .toPromise()
              .then((res) => res.json())
              .catch((err) => {

              });
  }

  update(asset: Asset) {
    return this.http.put(this.assetUrl, JSON.stringify(asset), {headers: this.headers})
                .toPromise()
                .then(asset => {

                })
                .catch();
  }

  delete(asset: Asset) : Promise<Asset> {
    const url = `${this.assetUrl}/${asset._id}`;
      return this.http.delete(url, { headers: this.headers })
                  .toPromise()
                  .then((asset) => {
                    return asset;
                  })
                  .catch()
  }

  getAssets() : Promise<Asset[]> {
    return this.http.get(this.assetUrl, { headers: this.headers })
            .toPromise()
            .then((res) => res.json() as Asset[])
            .catch((err) => {
            })
  }
}
