import angular from 'angular';
import angularMeteor from 'angular-meteor';

import templateUrl from './userRsvpsList.html';
import {name as RsvpUsers} from '../rsvpUsers/rsvpUsers'

class UserRsvpsList{}

const name = 'userRsvpsList';

export default angular.module(name, [
    angularMeteor
]).component(name,{
    templateUrl,
    controllerAs: name,
    bindings: {
        rsvps: '<'
    },
    controller: UserRsvpsList
});