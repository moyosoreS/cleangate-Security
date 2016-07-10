import angular from 'angular';
import angularMeteor from 'angular-meteor';

import templateUrl from './branchSort.html';

class BranchSort {
    constructor(){
        this.changed();
    }
    
    changed(){
        this.onChange({
            sort: {
                [this.property]: parseInt(this.order)
            }
        });
    }
}

const name ='branchSort';

export default angular.module([
    angularMeteor
]).component(name,{
    templateUrl,
    bindings: {
        onChange: '&',
        property: '@',
        order: '@'
    },
    controllerAs: name,
    controller: BranchSort
});