import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import templateUrl from './userUninvited.html';
import { name as UninvitedFilter } from '../../filters/uninvitedFilter';
import {name as DisplayNameFilter} from '../../filters/displayNameFilter';

class UserUninvited{
    constructor($scope){
        'ngInject';

        $scope.viewModel(this);

        this.helpers({
            users(){
                return Meteor.users.find({});
            }
        });
    }

    invite(user) {
        Meteor.call('invite', this.branch._id, user._id,
            (error) => {
                if (error) {
                    console.log('Oops, unable to invite!');
                } else {
                    console.log('Invited!');
                }
            }
        );
    }
}

const name = 'userUninvited';

export default angular.module(name, [
    angularMeteor,
    UninvitedFilter,
    DisplayNameFilter
]).component(name, {
    templateUrl,
    controllerAs: name,
    bindings: {
        branch: '<'
    },
    controller: UserUninvited
});