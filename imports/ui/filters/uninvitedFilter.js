import angular from 'angular';
import _ from 'underscore';

const name = 'uninvitedFilter';

function UninvitedFilter(users, branch){        // Creating filter. users is the object being filtered, branch is what we want to check
    if(!branch){
        return false;
    }

    return users.filter((user) => {     // filters always require at least one parameter-the object being filtered
        //if not the owner and is not invited
        return user._id !== branch.owner && !_.contains(branch.invited, user._id);
    });
}

export default angular.module(name, [])
.filter(name, () => {
    return UninvitedFilter;
})