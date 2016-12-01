/*
*Author: Pascal Tene
*Created: Sept 2016
*
*/
import { Injectable } from '@angular/core';
import { Http, Headers }  from '@angular/http';
import { Asset } from './asset';

@Injectable()
export class AssetService {
  assetToDelete = {};
  private assetUrl = '/api/assets';
  private headers = new Headers ({'Content-Type' : 'Application/json', 'arm_auth_token' : localStorage.getItem('arm_auth_token')});

  constructor(
    private http: Http
  ){}

  create(asset: Asset) : Promise<Asset> {
      return this.http.post(this.assetUrl, { asset }, {headers: this.headers })
              .toPromise()
              .then((res) => res.json())
              .catch((err) => {
                console.log(err);
              });
  }

  delete(asset: Asset) : Promise<Asset> {
    const url = `${this.assetUrl}/${asset._id}`;
      return this.http.delete(url, { headers: this.headers })
                  .toPromise()
                  .then((asset) => {
                    console.log("Asset deleted: ",asset);
                    return asset;
                  })
                  .catch()
  }

  getAssets() : Promise<Asset[]> {
    return this.http.get(this.assetUrl, { headers: this.headers })
            .toPromise()
            .then((res) => res.json() as Asset[])
            .catch((err) => {
              console.log(err);
            })
  }

}
