import {Mongo} from 'meteor/mongo';
export const Branches = new Mongo.Collection('cleangate');

Branches.allow({
    insert(userId, branch){
        return userId && branch.owner === userId;
    },
    update(userId, branch, fields, modifier){
        return userId && branch.owner === userId;
    },
    remove(userId, branch){
        return userId && branch.owner === userId;
    }
});