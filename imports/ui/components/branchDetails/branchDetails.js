import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import {Branches} from '../../../api/branches/index';
import {name as UserUninvited} from '../userUninvited/userUninvited';
import {name as StaffAdd } from '../staffAdd/staffAdd';
import {name as StaffList } from '../staffList/staffList';


import templateUrl from './branchDetails.html';

class BranchDetails{
    constructor($stateParams, $scope, $reactive){
        'ngInject';

        $reactive(this).attach($scope);

        this.branchId = $stateParams.branchId;

        this.subscribe('branches');
        this.subscribe('users');

        this.helpers({
            branch(){
                return Branches.findOne({id: $stateParams.branchId});
            },
            users() {
                return Meteor.users.find({});
            },
            isLoggedIn() {
            return !!Meteor.userId();
        }
        });
    }

    canInvite() {
        if (!this.branch) {
            return false;
        }

        return !this.branch.public && this.branch.owner === Meteor.userId();
    }

    save(){
        Branches.update({
            id: this.branch.id}, {
            $set: {
                street: this.branch.street,
                state: this.branch.state,
                tel: this.branch.tel,
                public: this.branch.public
            }
        }, (error) => {
            if (error){
                console.log('UNABLE TO UPDATE THE PARTY....');
            }
            else {
                console.log('SUCCESSFULLY UPDATED');
            }
        });
    }
}

const name = 'branchDetails';

export default angular.module(name, [
    angularMeteor, 
    uiRouter,
    StaffAdd,
    StaffList,
    UserUninvited
]).component(name, {
    templateUrl,
    controllerAs: name,
    controller: BranchDetails
}).config(config);

function config($stateProvider){
    'ngInject';
    
    $stateProvider.state('branchDetails', {
        url: '/branches/:branchId',
        template: '<branch-details></branch-details>',
        resolve: {
            currentUser($q) {
                if (Meteor.userId() === null) {
                    return $q.reject('AUTH_REQUIRED');
                } else {
                    return $q.resolve();
                }
            }
        }
    });
}