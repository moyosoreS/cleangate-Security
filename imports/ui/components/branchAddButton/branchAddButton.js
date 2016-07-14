import angular from 'angular';
import angularMeteor from 'angular-meteor';

import buttonTemplateUrl from './branchAddButton.html';
import modalTemplate from './branchAddModal.html';
import {name as BranchAdd} from "../branchAdd/branchAdd";

class BranchAddButton{
    constructor($mdDialog, $mdMedia){
        'ngInject';

        this.$mdDialog = $mdDialog;
        this.$mdMedia = $mdMedia
    }

    open(event) {
        this.$mdDialog.show({
            controller($mdDialog) {
                'ngInject';

                this.close = () => {
                    $mdDialog.hide();
                }
            },
            controllerAs: 'branchAddModal',
            template: modalTemplate,
            targetEvent: event,
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
        });
    }
}
    
const name ='branchAddButton';

export default angular.module(name, [
    angularMeteor,
    BranchAdd
]).component(name, {
    template: buttonTemplateUrl,
    controllerAs: name,
    controller: BranchAddButton
});