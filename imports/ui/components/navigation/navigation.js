import angular from 'angular';
import angularMeteor from 'angular-meteor';

import templateUrl from './navigation.html';

const name = 'navigation';

export default angular.module(name, [angularMeteor]).component(name,{
    templateUrl,
    controllerAs: name
});