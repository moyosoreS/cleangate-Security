import angular from 'angular';
import angularMeteor from 'angular-meteor';

import templateUrl from './staffSort.html';

class StaffSort {
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

const name ='staffSort';

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
    controller: StaffSort
});