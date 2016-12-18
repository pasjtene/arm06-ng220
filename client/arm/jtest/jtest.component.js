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
var JtestComponent = (function () {
    function JtestComponent(formBuilder, userService) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.themes = [
            {
                bgColor: 'black',
                fColor: 'white',
                display: 'Dark'
            },
            {
                bgColor: 'black',
                fColor: 'white',
                display: 'Light'
            },
            {
                bgColor: 'black',
                fColor: 'white',
                display: 'Sleek'
            },
        ];
        this.users = {};
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
        this.juser = {
            name: '',
            theme: this.themes[0]
        };
    }
    JtestComponent.prototype.newContact = function () {
        return this.formBuilder.group({
            contactName: ['', forms_1.Validators.required],
            contactEmail: ['']
        });
    };
    JtestComponent.prototype.addContact = function () {
        var control = this.organizationForm.controls['contacts'];
        control.push(this.newContact());
    };
    JtestComponent.prototype.removeContact = function (i) {
        var control = this.organizationForm.controls['contacts'];
        control.removeAt(i);
    };
    JtestComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers().then(function (users) {
            _this.users = users;
            console.log(users);
        });
    };
    JtestComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    JtestComponent.prototype.save = function (organization) {
        this.organizations.push(organization);
    };
    JtestComponent.prototype.showDetails = function (organization) {
        this.currentOrganization = organization;
    };
    JtestComponent.prototype.moDown = function () {
        this.active_text = "Thank You";
        //obj.style.backgroundColor = "#1ec5e5";
        //obj.innerHTML = "Release Me";
    };
    JtestComponent.prototype.mUp = function (obj) {
        this.active_text = "Click me";
    };
    return JtestComponent;
}());
JtestComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'location-component',
        templateUrl: 'jtest.component.html',
        styleUrls: ['jtest.component.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        user_service_1.UserService])
], JtestComponent);
exports.JtestComponent = JtestComponent;
//# sourceMappingURL=jtest.component.js.map