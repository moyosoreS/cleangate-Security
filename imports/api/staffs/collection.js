import {Mongo} from 'meteor/mongo';
export const Staffs = new Mongo.Collection('staffs');

function loggedIn(userId) {
    return !!userId;
}

Staffs.allow({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
});