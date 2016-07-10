import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import templateUrl from './rsvpUsers.html';
import {name as DisplayNameFilter} from '../../filters/displayNameFilter';

class RsvpUsers{
    getUserById(userId){
        return Meteor.users.findOne(userId);
    }
}

const name = 'rsvpUsers';

export default angular.module(name, [
    angularMeteor,
    DisplayNameFilter
]).component(name, {
    templateUrl,
    controllerAs: name,
    bindings: {
        rsvps: '<',
        type: '@'
    },
    controller: RsvpUsers
});