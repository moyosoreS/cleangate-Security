import angular from 'angular';
import angularMeteor from 'angular-meteor';

import templateUrl from './branchImage.html';
import { Images } from '../../../api/images';

class BranchImage {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.helpers({
            mainImage() {
                const images = this.getReactively('images', true);
                if (images) {
                    return Images.findOne({
                        _id: images[0]
                    });
                }
            }
        });
    }
}

const name = 'branchImage';

// create a module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    templateUrl,
    bindings: {
        images: '<'
    },
    controllerAs: name,
    controller: BranchImage
});