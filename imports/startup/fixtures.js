import {Meteor} from 'meteor/meteor';
import {Branches} from '../api/branches';
import {Staffs} from '../api/staffs';


Meteor.startup(()=> {
    if(Branches.find().count() === 0){
        const branches = [{'id':'1', 'street':'test street 1', 'state':'test state 1', 'tel':'01123434'},
            {'id':'2', 'street':'test street 2', 'state':'test state 2', 'tel':'01123434'},
            {'id':'3', 'street':'test street 3', 'state':'test state 3', 'tel':'01123434'}];

        branches.forEach((branch)=>{
            Branches.insert(branch)
        });
    }

    if(Staffs.find().count() === 0){
        const staffs = [{'id':'1', 'fName':'test street 1', 'lName':'test state 1', 'sex':'Female', 'dob':'01123434', 'tel':'01123434', 'salary':'01123434', 'serviced':'01123434'},
            {'id':'2', 'fName':'test street 2', 'lName':'test state 2', 'sex':'Male', 'dob':'01123434', 'tel':'01123434', 'salary':'01123434', 'serviced':'01123434'},
            {'id':'3', 'fName':'test street 3', 'lName':'test state 3', 'sex':'Male', 'dob':'01123434', 'tel':'01123434', 'salary':'01123434', 'serviced':'01123434'}];

        staffs.forEach((staff)=>{
            Staffs.insert(staff)
        });
    }
});