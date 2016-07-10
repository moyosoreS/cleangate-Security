import {Meteor} from 'meteor/meteor';
import {Branches} from '../api/branches';

Meteor.startup(()=> {
    if(Branches.find().count() === 0){
        const branches = [{'id':'1', 'street':'test street 1', 'state':'test state 1', 'tel':'01123434'},
            {'id':'2', 'street':'test street 2', 'state':'test state 2', 'tel':'01123434'},
            {'id':'3', 'street':'test street 3', 'state':'test state 3', 'tel':'01123434'}];

        branches.forEach((branch)=>{
            Branches.insert(branch)
        });
    }
});