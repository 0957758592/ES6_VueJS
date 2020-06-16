// i) Will the above code block return an error?
// ii) If yes, then why and how do we fix it?


const team = {
    members: ['Superman', 'Batman', 'Wonder Woman'],
    teamName: 'Justice league',
    teamSummary: function () {
        return this.members.map(function (member) {
            return `${member} is on team ${this.teamName}`;
        });
    }
};
team.teamSummary();


/**
 * the above code block return an undefined data
 * 
 * the reason is in the function keyword 'this' will refer to global window obect in browser and can't find in current context (but should be bind)
 * 
 * to solve it has to change 'function(member)' to arrow function as 'member =>' 
 */

const team = {
    members: ['Superman', 'Batman', 'Wonder Woman'],
    teamName: 'Justice league',
    teamSummary: function () {
        return this.members.map(member => {
            return `${member} is on team ${this.teamName}`;
        });
    }
};
team.teamSummary();