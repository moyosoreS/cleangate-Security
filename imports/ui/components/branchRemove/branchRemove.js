import angular from 'angular';
import angularMeteor from 'angular-meteor';

import templateUrl from './branchRemove.html';
import {Branches} from '../../../api/branches/index';

class BranchRemove {
    remove(){
        console.log('remove branch');
        if(this.branch){
            Branches.remove(this.branch._id);
        }
    }
}

const name = 'branchRemove';

export default angular.module(name, [angularMeteor]).component(name, {
    templateUrl,
    bindings: {
        branch: '<'
    },
    controllerAs: name,
    controller: BranchRemove
});