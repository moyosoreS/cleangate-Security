import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import {name as StaffAdd} from '../staffAdd/staffAdd';
import {name as StaffSort} from "../staffSort/staffSort";

import templateUrl from './staffList.html';
import {Staffs} from "../../../api/staffs/index";

class StaffList{
    constructor($scope, $reactive){
        'ngInject';
        $reactive(this).attach($scope);     // Better way to code controller without having to invoke scope directly

        this.perPage = 3;
        this.page = 10;
        this.sort = {
            id: 1
        };
        this.searchText = '';

        this.subscribe('staffs', () => [{     // second parameter is to implement PAGINATION
            limit: parseInt(this.perPage),
            skip: parseInt((this.getReactively('page') - 1) * this.perPage),
            sort: this.getReactively('sort')
        }, this.getReactively('searchText')
        ]);

        this.subscribe('users');

        this.helpers({            // helpers help connect to database (Mongo)
            staffs(){
                return Staffs.find({}, {
                    sort : this.getReactively('sort')       // sorting collection data for PAGINATION
                });
            },
            staffsCount(){
                return Counts.get('numberOfStaffs');
            },
            isLoggedIn() {
                return !!Meteor.userId();
            },
            currentUserId() {
                return Meteor.userId();
            }
        });
    }

    isOwner(staff) {
        return this.isLoggedIn && staff.owner === this.currentUserId;
    }

    pageChanged(newPage) {
        this.page = newPage;
    }

    sortChanged(sort) {
        this.page = parseInt(1);
        this.sort = sort;
    }
}

const name = 'staffList';

export default angular.module(name, [
    angularMeteor,
    uiRouter,
    utilsPagination,
    StaffAdd,
    StaffSort
]).component(name, {
    templateUrl,
    controllerAs: name,
    controller:StaffList
});