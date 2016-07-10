import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngFileUpload from 'ng-file-upload';

import { Meteor } from 'meteor/meteor';

import templateUrl from './branchUpload.html';

class BranchUpload {}

const name = 'branchUpload';

// create a module
export default angular.module(name, [
    angularMeteor,
    ngFileUpload
]).component(name, {
    templateUrl,
    controllerAs: name,
    controller: BranchUpload
});