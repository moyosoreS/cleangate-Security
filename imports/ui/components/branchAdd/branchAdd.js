import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {Meteor} from 'meteor/meteor';

import templateUrl from './branchAdd.html';
import {Branches} from '../../../api/branches/index';
import {name as BranchUpload} from '../branchUpload/branchUpload';

class BranchAdd{
    constructor(){
        this.branch = {};
    }
    
    submit(){
        console.log('submit:', this.party);
        this.branch.owner = Meteor.user()._id;
        Branches.insert(this.branch);
        if(this.done) {
            this.done();
        }
        this.reset();
    }

    reset(){
        this.branch = {};
    }
}

const name = 'branchAdd';

export default angular.module(name, [
    angularMeteor,
    BranchUpload
]).component(name, {
    templateUrl,
    bindings: {
        done: '&?'
    },
    controllerAs: name,
    controller: BranchAdd
});