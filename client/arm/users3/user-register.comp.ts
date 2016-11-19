import { Component, Input, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User, UserCredentials } from './user';

@Component({
    moduleId: module.id,
    templateUrl: 'user-register.comp.html',
    styleUrls: ['user-register.comp.css']
})

export class userRegisterComponent {
    //@Input()
    //user: User;

    user: User = {
        id: 0,
        _id: '', // Not needed but . not adding this triggers a type Script error.
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        organization: '',
        location: ''
    }
    confirmPassword = '';
    passwordMissMatch = '';

    constructor(
        private userService: UserService
    ) { }

    save(user: User, confirmPassword: string): void {
        if (confirmPassword.trim() === user.password.trim()) {
            this.passwordMissMatch = "";
        } else {
            this.passwordMissMatch = "Passwords don't match";
            return;
        }

        // the _id property is added be the mongo db and should not be send when creating an object.
        delete user._id;
        this.userService.create(user).then((res) => {
            console.log("User created successfully...");
        }, (err) => {
            console.log("Could not save the user...");
        });
    }

}
