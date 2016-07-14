import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {Meteor} from 'meteor/meteor';

import templateUrl from './staffAdd.html';
import {Staffs} from '../../../api/staffs/index';

class StaffAdd{
    constructor(){
        this.staff = {};

    }

    submit(){
        console.log('submit:', this.staff);
        this.staff.owner = Meteor.user()._id;
        Staffs.insert(this.staff);
        
        this.reset();
    }

    reset(){
        this.staff = {};
    }
}

const name = 'staffAdd';

export default angular.module(name, [
    angularMeteor
]).component(name, {
    templateUrl,
    controllerAs: name,
    controller: StaffAdd
});