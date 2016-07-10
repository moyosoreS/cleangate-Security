import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import templateUrl from './cleangate.html';
import {name as BranchList} from '../branchList/branchList';
import {name as Navigation} from '../navigation/navigation';
import {name as BranchDetails} from '../branchDetails/branchDetails';
import { name as Auth } from '../auth/auth';

class Cleangate{}

const name = 'cleangate';

export default angular.module(name, [
    angularMeteor,
    ngMaterial,
    uiRouter,
    BranchList,
    BranchDetails,
    Navigation,
    Auth,
    'accounts.ui'
]).component(name,{
        templateUrl,
        controllerAs: name,
        controller: Cleangate}
    ).config(config)
    .run(run);

function config($locationProvider, $urlRouterProvider, $mdIconProvider){
    'ngInject';
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/branches');

    const iconPath =  '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/';

    $mdIconProvider
        .iconSet('social',
            iconPath + 'svg-sprite-social.svg')
        .iconSet('action',
            iconPath + 'svg-sprite-action.svg')
        .iconSet('communication',
            iconPath + 'svg-sprite-communication.svg')
        .iconSet('content',
            iconPath + 'svg-sprite-content.svg')
        .iconSet('toggle',
            iconPath + 'svg-sprite-toggle.svg')
        .iconSet('navigation',
            iconPath + 'svg-sprite-navigation.svg')
        .iconSet('image',
            iconPath + 'svg-sprite-image.svg');
}

function run($rootScope, $state){
    'ngInject';

    $rootScope.$on('$stateChangeError',
        (event, toState, toParams, fromState, fromParams, error) => {
            if (error === 'AUTH_REQUIRED') {
                $state.go('branches');
            }
        }
    );
}