// ES5

var expense = {
    type: 'Business',
    amount: '$50'
};
var type = expense.type;
var amount = expense.amount;

// ES6

const expense = {
    type: 'Business',
    amount: '$50'
};
const { type , amount } = expense