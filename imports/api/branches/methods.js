import _ from 'underscore';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';

import { Branches } from './collection';

function getContactEmail(user){
    if(user.emails && user.emails.length) {
        return user.emails[0].address;
    }
    if (user.services && user.services.facebook && user.services.facebook.email){
        return user.services.facebook.email;
    }

    return null;
}

export function invite(branchId, userId){
    check(branchId, String);
    check(userId, String);

    if(!this.userId){
        throw new Meteor.Error(400, 'You have to be logged in!');
    }

    const branch = Branches.findOne(branchId);

    if(!branch){
        throw new Meteor.Error(404, 'No such branch!');
    }

    if (branch.owner !== this.userId){
        throw new Meteor.Error(404, 'No permissions!');
    }

    if(branch.public){
        throw new Meteor.Error(400, 'That branch is public. No need to invite people')
    }

    if(userId !== branch.owner && ! _.contains(branch.invited, userId)){
        Branches.update(branchId, {
            $addToSet: {
                invited: userId
            }
        });

        const replyTo = getContactEmail(Meteor.users.findOne(this.userId));
        const to = getContactEmail(Meteor.users.findOne(userId));

        if(Meteor.isServer && to){
            Email.send({
                to,
                replyTo,
                from: 'noreply@cleangate.com',
                subject: `BRANCH: ${branch.title}`,
                text:`
                    Hey, I just invited you to ${branch.title} on Cleangate.
                    Come check it out: ${Meteor.absoluteUrl()}
                    `
            });
        }
    }
}

export function rsvp(branchId, rsvp) {
    check(branchId, String);
    check(rsvp, String);

    if (!this.userId) {
        throw new Meteor.Error(403, 'You must be logged in to RSVP');
    }

    if (!_.contains(['yes', 'no', 'maybe'], rsvp)) {
        throw new Meteor.Error(400, 'Invalid RSVP');
    }

    const branch = Branches.findOne({
        _id: branchId,
        $or: [{
            // is public
            $and: [{
                public: true
            }, {
                public: {
                    $exists: true
                }
            }]
        },{
            // is owner
            $and: [{
                owner: this.userId
            }, {
                owner: {
                    $exists: true
                }
            }]
        }, {
            // is invited
            $and: [{
                invited: this.userId
            }, {
                invited: {
                    $exists: true
                }
            }]
        }]
    });

    if (!branch) {
        throw new Meteor.Error(404, 'No such branch');
    }

    const hasUserRsvp = _.findWhere(branch.rsvps, {
        user: this.userId
    });

    if (!hasUserRsvp) {
        // add new rsvp entry
        Branches.update(branchId, {
            $push: {
                rsvps: {
                    rsvp,
                    user: this.userId
                }
            }
        });
    } else {
        // update rsvp entry
        const userId = this.userId;
        Branches.update({
            _id: branchId,
            'rsvps.user': userId
        }, {
            $set: {
                'rsvps.$.rsvp': rsvp
            }
        });
    }
}


Meteor.methods({
    invite,
    rsvp
});