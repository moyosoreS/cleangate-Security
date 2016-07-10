import { Meteor } from 'meteor/meteor';

import {Branches} from './collection';

if (Meteor.isServer) {
    Meteor.publish('branches', function(options, searchString) {
        const selector = {
            $or: [{
                // the public branches
                $and: [{
                    public: true
                }, {
                    public: {
                        $exists: true
                    }
                }]
            }, {
                // when logged in user is the owner
                $and: [{
                    owner: this.userId
                }, {
                    owner: {
                        $exists: true
                    }
                }]
            }, {
                    // when logged in user is one of invited
                    $and: [{
                        invited: this.userId
                    }, {
                        invited: {
                            $exists: true
                        }
                    }]
            }]
        };

        if (typeof searchString === 'string' && searchString.length) {
            selector.name = {
                $regex: `.*${searchString}.*`,
                $options : 'i'
            };
        }

        Counts.publish(this, 'numberOfBranches', Branches.find(selector), {
            noReady: true
        });
        
        return Branches.find(selector,options);
    });
}