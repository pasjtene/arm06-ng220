/*
Organization or department is the business entity in which a given user works
example: Finance, Human Resource, Sales, etc.
We can have several organizations with same name, located at different locations.
Each organization must have a different Id to differentiate it from other organization.
the Head is the person with highest responability: The Director, VP, etc.
We can identify additional key people in an organization to help facilitate contacts
*/
"use strict";
var Organization = (function () {
    function Organization() {
    }
    return Organization;
}());
exports.Organization = Organization;
/* dbOrganization is the organization formated to meet database requirements */
var dbOrganization = (function () {
    function dbOrganization() {
    }
    return dbOrganization;
}());
exports.dbOrganization = dbOrganization;
//# sourceMappingURL=organization.js.map