"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var users = [
            { id: 11, userName: 'tene', password: 'jt.pas', email: 'jtene@yahoo.com', firstName: 'Pascal', lastName: 'Tene', organization: 'EService', location: 'chertsey' },
            { id: 12, userName: 'brian', password: 'jt.pas', email: 'brian@yahoo.com', firstName: 'Brian', lastName: 'Tene', organization: 'Holly Spring', location: 'Bracknell' },
            { id: 13, userName: 'dylan', password: 'jt.pas', email: 'dylan@yahoo.com', firstName: 'Dylan', lastName: 'Jondzo', organization: 'St joseph', location: 'Bracknell' },
            { id: 14, userName: 'celine', password: 'jt.pas', email: 'celine@yahoo.com', firstName: 'Celine', lastName: 'Jondzo', organization: 'Rowney', location: 'Bracknell' }
        ];
        return { users: users };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map