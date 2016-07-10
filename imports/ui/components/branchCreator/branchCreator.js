import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import templateUrl from './branchCreator.html';
import {name as DisplayNameFilter} from '../../filters/displayNameFilter';

class BranchCreator{
    constructor($scope){
        'ngInject';
        
        $scope.viewModel(this);
        
        this.helpers({
            creator(){
                if (!this.branch){
                    return '';
                }
                
                const owner = this.branch.owner;
                
                if(Meteor.userId() !==null && owner === Meteor.userId()){
                    return 'me';
                }
                
                return Meteor.users.findOne(owner) || 'nobody';
            }
        });
    }
}

const name = 'branchCreator';

export default angular.module(name, [
    angularMeteor,
    DisplayNameFilter
]).component(name, {
    templateUrl,
    controllerAs: name,
    bindings: {
        branch: '<'
    },
    controller: BranchCreator
});