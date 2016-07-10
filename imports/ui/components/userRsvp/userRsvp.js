import angular from 'angular';
import angularMeteor from 'angular-meteor';
import _ from 'underscore';

import { Meteor } from 'meteor/meteor';

import templateUrl from './userRsvp.html';

class UserRsvp {
    yes() {
        this.answer('yes');
    }

    isYes() {
        return this.isAnswer('yes');
    }

    maybe() {
        this.answer('maybe');
    }

    isMaybe() {
        return this.isAnswer('maybe');
    }

    no() {
        this.answer('no');
    }

    isNo() {
        return this.isAnswer('no');
    }

    answer(answer) {
        Meteor.call('rsvp', this.branch.id, answer, (error) => {
            if (error) {
                console.error('Oops, unable to rsvp!');
            } else {
                console.log('RSVP done!')
            }
        });
    }

    isAnswer(answer) {
        if(this.branch) {
            return !!_.findWhere(this.branch.rsvps, {
                user: Meteor.userId(),
                rsvp: answer
            });
        }
    }
}

const name = 'userRsvp';

// create a module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    templateUrl,
    controllerAs: name,
    bindings: {
        party: '<'
    },
    controller: UserRsvp
});