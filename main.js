var stateList = [
    {
        name: 'user.admin',
        roles: ['admin'],
        data: {
            title: 'User Admin'
        }
    },
    {
        name: 'user.edit',
        roles: ['user-manager', 'admin'],
        data: {
            title: 'User Edit'
        }
    },
    {
        name: 'user.edit-custom',
        roles: ['user-manager', 'admin'],
        data: {
            title: 'User Edit'
        }
    },
    {
        name: 'user.list',
        data: {
            title: 'Users'
        }
    },
    {
        name: 'home',
        data: {
            title: 'Home'
        }
    }
];
/*
 var stateListMap = {
 'admin': ['user.admin'],
 'user-manager': ['user.edit', 'user.edit-custom'],
 '*': ['user.list','home']
 };
 */

function StateService(stateList) {
    this.stateList = stateList;
}

StateService.prototype = {

    getStateList: function () {
        return this.stateList;
    },

    getState: function (stateName) {
        var list = this.getStateList();

        for (var i = 0; i < list.length; i++) {
            if (list[i].name === stateName) {
                return list[i];
            }
        }

        return -1;
    },

    getStateListMap: function () {
        var stateList = this.getStateList(),
            listMap = {},
            role;

        stateList.forEach(function (item) {
            (!item.roles) ? role = '*' : role = item.roles[0];
            listMap[role] ? listMap[role].push(item.name) : listMap[role] = [item.name];
        });

        return listMap;
    },

    getFullStateListMap: function () {
        var stateList = this.getStateList(),
            listMap = {};

        stateList.forEach(function (item) {
            if (item.roles) {
                item.roles.forEach(function (user) {
                    listMap[user] = [];
                })
            } else {
                listMap['*'] = [];
            }
        });

        stateList.forEach(function (item) {
            var name = item.name;

            if (item.roles) {
                item.roles.forEach(function (user) {
                    listMap[user].push(name);
                })
            } else {
                for (var role in listMap) {
                    listMap[role].push(name);
                }
            }
        });

        return listMap;
    },

    getAvailableStates: function (role) {
        var map = this.getFullStateListMap();

        !role ? role = '*' : role;
        return map[role];
    },

    isStateAvailable: function (stateName, role) {
        var obj = this.getState(stateName);

        return obj.roles ? obj.roles.indexOf(role) >= 0 : true;
    }
};

var stateService = new StateService(stateList);

console.info('stateService.getStateList()');
console.log(stateService.getStateList()); // returns this.stateList

console.info('stateService.getState("user.admin")');
console.log(stateService.getState('user.admin')); // returns state with name === 'user.admin'\
console.info('stateService.getState("user.edit")');
console.log(stateService.getState('user.edit')); // returns state with name === 'user.edit'
console.info('stateService.getStateListMap()');
console.log(stateService.getStateListMap()); // returns stateListMap (see below)
console.info('stateService.getFullStateListMap()');
console.log(stateService.getFullStateListMap());

console.info('stateService.getAvailableStates()');
console.log(stateService.getAvailableStates()); // returns ['user.list', 'home']

console.info('stateService.getAvailableStates("admin")');
console.log(stateService.getAvailableStates("admin"));

console.info('stateService.getAvailableStates("user-manager")');
console.log(stateService.getAvailableStates('user-manager')); //

console.info('stateService.isStateAvailable("user.admin", "user-manager")');
console.log(stateService.isStateAvailable('user.admin', 'user-manager')); // returns false

console.info('stateService.isStateAvailable("user.admin")');
console.log(stateService.isStateAvailable('user.admin')); // returns false

console.info('stateService.isStateAvailable("user.edit", "user-manager")');
console.log(stateService.isStateAvailable('user.edit', 'user-manager')); // returns true

console.info('stateService.isStateAvailable("home", "user-manager")');
console.log(stateService.isStateAvailable('home', 'user-manager')); // returns true

console.info('stateService.isStateAvailable("home")');
console.log(stateService.isStateAvailable('home'));

