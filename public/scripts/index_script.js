/* jslint white: true */
/* eslint-disable */

/*eslint-env browser */
class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function checkPrecedence(operator) {
    "use strict";
    if (!operator.localeCompare("*") || !operator.localeCompare("/")) {
        return 2;
    }
    return 1;
}

function isOperator(string) {
    "use strict";
    if (!string.localeCompare("+") || !string.localeCompare("-") || !string.localeCompare("*") || !string.localeCompare("/") || !string.localeCompare("(") || !string.localeCompare(")")) {
        return true;
    }
    return false;
}

function calculate(l, op, r) {
    if (op.localeCompare("+") === 0) {
        return parseInt(l, 10) + parseInt(r, 10);
    }
    else if (op.localeCompare("-") === 0) {
        return parseInt(l, 10) - parseInt(r, 10);
    }
    else if (op.localeCompare("*") === 0) {
        return parseInt(l, 10) * parseInt(r, 10);
    }
    else if (op.localeCompare("/") === 0) {
        return parseInt(l, 10) / parseInt(r, 10);
    }
    return 0;
}

function evaluate(n) {
    if (n.left !== null && n.right !== null) {
        n.left = evaluate(n.left);
        n.right = evaluate(n.right);
        
        var v = calculate(n.left, n.val, n.right);
        return v;
    }
    return n.val;
}

function parseProblem(problem) {
    
    /*  Separates terms with spaces.  Places Problem into postfix order.                        */
    
    "use strict";
    var op_stack = new Array();
    var postfix = new Array();
    var sep_problem = problem.split(" ");
    for (var i = 0; i < sep_problem.length; i++) {
        if (!isOperator(sep_problem[i])) {
            postfix.push(sep_problem[i]);
        }
        else if (op_stack.length === 0) {
            op_stack.push(sep_problem[i]);
        }
        else if (op_stack[op_stack.length - 1].localeCompare("(") === 0) {
            op_stack.push(sep_problem[i]);
        }
        else if (sep_problem[i].localeCompare("(") === 0) {
            op_stack.push(sep_problem[i]);
        }
        else if (sep_problem[i].localeCompare(")") === 0) {
            while (op_stack[op_stack.length - 1].localeCompare("(")) {
                postfix.push(op_stack.pop());
            }
            op_stack.pop();
        }
        else if (checkPrecedence(sep_problem[i]) > checkPrecedence(op_stack[op_stack.length - 1])) {
            op_stack.push(sep_problem[i]);
        }
        else if (checkPrecedence(sep_problem[i]) === checkPrecedence(op_stack[op_stack.length - 1])) {
            postfix.push(op_stack.pop);
            op_stack.push(sep_problem[1]);
        }
        else if (checkPrecedence(sep_problem[i]) < checkPrecedence(op_stack[op_stack.length - 1])) {
            postfix.push(op_stack.pop);
            i--;
        }
    }
    
    while (op_stack.length > 0) {
        postfix.push(op_stack.pop());
    }
    
    /*  Puts the now postfix problem into a tree.
        Tree is evaluated recursively.  Solution and problem are displayed                    */
    
    var tree = new Array();
    
    for (var j = 0; j < postfix.length; j++) {
        if (isOperator(postfix[j])) {
            var o = new Node(postfix[j]);
            o.right = tree.pop();
            o.left = tree.pop();
            tree.push(o);
        }
        else {
            var n = new Node(postfix[j]);
            n.left = null;
            n.right = null;
            tree.push(n);
        }
    }

    var answer = evaluate(tree[0]);
    
    display_prob.innerHTML = "The problem you entered was: " + problem;
    solution.innerHTML = "The solution is: " + answer;
    display_prob.style.display = "block";
    solution.style.display = "block";
}

function getProblem() {
    "use strict";
    
    /*  Receives the input from user.  Checks to make sure submitted field was not blank.
        If field was blank sends message prompting user to give input                       
        If not blank, attempts to parse the problem                                         */
    
    var problem = document.getElementById("problem");
    if (problem.value.localeCompare("") === 0) {
        solution.innerHTML = "Field was empty";
        solution.style.display = "block";
    }
    else {
        parseProblem(problem.value);
    }
}