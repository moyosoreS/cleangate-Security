import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Counts } from 'meteor/tmeasday:publish-counts';

import templateUrl from './branchList.html';
import {Branches} from '../../../api/branches/index';
import {name as BranchSort} from '../branchSort/branchSort';
import {name as BranchAddButton} from '../branchAddButton/branchAddButton';
import {name as BranchAdd} from '../branchAdd/branchAdd';
import {name as BranchRemove} from '../branchRemove/branchRemove';
import {name as BranchCreator} from '../branchCreator/branchCreator';
import {name as UserRsvp} from '../userRsvp/userRsvp';
import {name as UserRsvpsList} from '../userRsvpsList/userRsvpsList';


class BranchList{
    constructor($scope, $reactive){
        'ngInject';
        $reactive(this).attach($scope);     // Better way to code controller without having to invoke scope directly

        this.perPage = 3;
        this.page = 9;
        this.sort = {
            id: 1
        };
        this.searchText = '';

        this.subscribe('branches', () => [{     // second parameter is to implement PAGINATION
            limit: parseInt(this.perPage),
            skip: parseInt((this.getReactively('page') - 1) * this.perPage),
            sort: this.getReactively('sort')
        }, this.getReactively('searchText')
        ]);

        this.subscribe('users');

        this.helpers({            // helpers help connect to database (Mongo)
            branches(){
                return Branches.find({}, {
                    sort : this.getReactively('sort')       // sorting collection data for PAGINATION
                });
            },
            branchesCount(){
                return Counts.get('numberOfBranches');
            },
            isLoggedIn() {
                return !!Meteor.userId();
            },
            currentUserId() {
                return Meteor.userId();
            }
        });
    }

    isOwner(branch) {
        return this.isLoggedIn && branch.owner === this.currentUserId;
    }
    
    pageChanged(newPage) {
        this.page = newPage;
    }
    
    sortChanged(sort) {
        this.sort = sort;
    }
}

const name = 'branchList';

export default angular.module(name, [
    angularMeteor,
    uiRouter,
    utilsPagination,
    BranchSort,
    BranchRemove,
    BranchAdd,
    BranchCreator,
    UserRsvp,
    UserRsvpsList
]).component(name, {
    templateUrl,
    controllerAs: name,
    controller:BranchList
}).config(config);

function config($stateProvider){
    'ngInject';
    $stateProvider.state('branches', {
        url: '/branches',
        template: '<branch-list></branch-list>',
        controller: BranchList,
        authenticate: true
    });
}