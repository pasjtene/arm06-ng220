import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


import { User, UserCredentials } from './user';



@Injectable()
export class UserService {
  userCount = 0;
  userToDelete: User = {
    id: 0,
    _id: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    location: '',
  };
  nnn = "";
  private headers = new Headers({'Content-Type': 'application/json' , 'arm_auth_token': localStorage.getItem('arm_auth_token')});

  private handleError(error: any): Promise<any> {
    console.log('An error has occured while connecting to the server ', error);
    return Promise.reject(error.message || error);
  }

  private usersUrl = '/api/users';

  constructor(
    private http: Http
  ){}

  getUsers(): Promise<User[]> {
    this.headers = new Headers({'Content-Type': 'application/json' , 'arm_auth_token': localStorage.getItem('arm_auth_token')});
    return this.http.get(this.usersUrl, {headers: this.headers})
                .toPromise()
                .then(response => {
                   return response.json() as User[];
                }, function(){

                  this.router.navigate(['/login']);
                  return;
                })
                //.catch(this.handleError);
}

  getUserCount(): Promise<User[]> {
    return this.http.get(this.usersUrl, {headers: this.headers})
                .toPromise()
                .then(response => {
                   return response.json() as User[];
                }, function(){

                  this.router.navigate(['/login']);
                  return;
                })
                //.catch(this.handleError);

  }

  getUser(id: number): Promise<User> {
    return this.getUsers()
    .then(users => users.find(user => user.id === id))
  }

  getUser2(id: string): Promise<User> {
    return this.getUsers()
    .then(users => users.find(user => user._id === id))
  }

  getUsersSlowly(): Promise<User[]> {
    return new Promise<User[]>(resolve =>
      setTimeout(resolve, 2000))
      .then(() => this.getUsers());
  }

  update(user: User): Promise<User> {
    const url = `${this.usersUrl}/${user._id}`;
    return this.http.put(url, JSON.stringify(user), {headers: this.headers})
                .toPromise()
                .then(response => {
                  return response;
                })
                .catch(this.handleError);
  }


  create(user: User): Promise<User> {
    return this.http
          .post(this.usersUrl,  {user}, {headers: this.headers})
          .toPromise()
          .then(response => response.json())
          .catch(this.handleError);
  }


  create2(firstName:string, userName:string, password:string): Promise<User> {
    return this.http
          .post(this.usersUrl, JSON.stringify({firstName:firstName, userName:userName, password:password}), {headers: this.headers})
          .toPromise()
          .then(response => {
            return response.json();
          })
          .catch(this.handleError);
  }

  getUserToDelete(): User {
    return this.userToDelete;
  }

  setUserToDelete(user: User){
    this.userToDelete = user;
  }


  delete(_id: string): Promise<void> {

    const url = `${this.usersUrl}/${_id}`;
    return this.http.delete(url, {headers: this.headers})
           .toPromise().then((response) => null)
           .catch(this.handleError);
  }

}
