"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var user_service_1 = require("../users/user.service");
function showDate() {
    //showdateandTime is a closure as it contains a function.
    // this function is run at the interval 1000 tu return the time
    var showDateAndTime = getDate();
    window.setInterval(showDateAndTime, 1000);
}
//getDate creates a closure by returning a function
function getDate() {
    return function () {
        document.getElementById("date_and_time").innerHTML = new Date();
    };
}
var OrganizationComponent = (function () {
    function OrganizationComponent(formBuilder, userService) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.formSubmitted = false;
        this.users = [];
        this.contactList = [
            {
                id: 0,
                _id: "testtt",
                username: 'teststststststsst',
                password: 'sshshshshshshs',
                firstName: 'Select a new contact',
                lastName: '',
                email: '',
                organization: 'hsgsfsfsfsfs',
                location: 'hshsghsssgh'
            }
        ];
        this.active_text = "Click me";
        this.currentOrganization = {};
        this.organizationForm = this.formBuilder.group({
            name: ['', forms_1.Validators.required],
            id: ['', forms_1.Validators.required],
            head: '',
            contacts: this.formBuilder.array([
                this.newContact(),
            ])
        });
        this.organizations = [];
        showDate();
        this.getUsers();
    }
    //The fist contact in dropdown list is initialized to the fake user with name "Select a new user"
    OrganizationComponent.prototype.newContact = function () {
        return this.formBuilder.group({
            user: [this.contactList[0], forms_1.Validators.required],
            contactEmail: ['']
        });
    };
    OrganizationComponent.prototype.addContact = function () {
        var control = this.organizationForm.controls['contacts'];
        console.log("New contact: ", control.controls[0]);
        control.push(this.newContact());
    };
    OrganizationComponent.prototype.removeContact = function (i) {
        var control = this.organizationForm.controls['contacts'];
        control.removeAt(i);
    };
    OrganizationComponent.prototype.getUsers = function () {
        var _this = this;
        return this.userService.getUsers().then(function (users) {
            _this.users = users;
            return users;
        });
    };
    OrganizationComponent.prototype.ngOnInit = function () {
        var _this = this;
        //control.controls[0].value.contactName.firstName = "Select"
        this.getUsers().then(function (users) {
            _this.users = users;
            //we transfer all users into contactList for manipulation.
            //contacList contains the dropdown list for contact selection.
            //contactlist[0] is initialized with the default value: A fake user with name = "Select a new user"
            for (var i = 1; i <= users.length; i++) {
                _this.contactList[i] = users[i - 1];
            }
        });
    };
    OrganizationComponent.prototype.onChangeUser = function (user, Obj) {
        //console.log("The user is: ", user);
    };
    OrganizationComponent.prototype.save = function (organization) {
        this.organizations.push(organization);
        console.log("Organization...", this.organizations);
        this.formSubmitted = true;
    };
    OrganizationComponent.prototype.showDetails = function (organization) {
        this.currentOrganization = organization;
    };
    return OrganizationComponent;
}());
OrganizationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'location-component',
        templateUrl: 'organization.component.html',
        styleUrls: ['organization.component.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        user_service_1.UserService])
], OrganizationComponent);
exports.OrganizationComponent = OrganizationComponent;
//# sourceMappingURL=organization.component.js.map