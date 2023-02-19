const t = require('@babel/types');

const babel = require("@babel/core");


// Constructs

// Primitives
/**
 * To be able to find and store primitives
 * To be able to check where the primitive is stored and if it is being referenced
 * Update the primitive if it is accessed
 * 
 * Refer back to created primitives
 * 
 * Once out of scope, delete the primitive
 */

const inputCode = `
// var name = "mike";
// let age = 10;
// const isAlive = true;
let value;
value = 34;

// function hello(){
//     let greg = 124;
//     {
//         greg = 55;
//     }
// }`;

class Primitive {
    id;
    value;
    dataType;
    kind;
    scope;
    constructor(id, value, dataType, kind, scope){
        this.id = id;
        this.value = value;
        this.dataType = dataType;
        this.kind = kind;
        this.scope = scope;
    }
}

let primitives = [];

let globalVariables = [];

function addPrimitive(primitive){
    if(!primitives.includes(primitive)) primitives.push(primitive);
}

function updatePrimitive(primitive){
    if(primitives.includes(primitive)){
        let index = primitives.indexOf(primitive);
        primitives[index] = primitive;
    }
}

function deletePrimitive(primitive){
    if(primitives.includes(primitive)){
        let index = primitives.indexOf(primitive);
        primitives.splice(index, 1);
    }
}

function addGlobalVariable(variable){
    if(!globalVariables.includes(variable)) globalVariables.push(variable);
}

const output = babel.transformSync(inputCode, {
    plugins: [
        function findPrimitivesPlugin(){
            return {
                visitor: {
                    VariableDeclarator: function(path){
                        let id = path.node.id.name;
                        let kind = path.parent.kind;
                        let scope = path.parentPath.scope.path.type;
                        let value;
                        let dataType;

                        // let primitive = new Primitive(id, value, dataType, kind);
                        // addPrimitive(primitive);
                        // console.log("Is the variable binded to its parents path: " + path.scope.parentHasBinding(path.node.id.name));
                        // if(!path.scope.parentHasBinding(id));
                        // console.log("Is the variable binded to its own location: " + path.scope.hasOwnBinding(path.node.id.name));
                        // console.log(path.scope.path)

                        console.log(path.parentPath.scope.path.type);

                        // If it is a global variable
                        // Store it in the global variables array
                        if(path.parentPath.scope.path.type === "Program"){
                            // Check to see if it has been instantiated
                            if(path.node.init){
                                value = path.node.init.value;
                                dataType = path.node.init.type;
                            }
                            let primitive = new Primitive(id, value, dataType, kind, scope);
                            addGlobalVariable(primitive);
                        }
                    },
                    ExpressionStatement: function(path) {
                        // if(t.isAssignmentExpression(path)){
                        //     console.log("Assignment!")
                        // }
                        if(path.node.expression.type === "AssignmentExpression"){
                            console.log(path.node)
                            let left = path.node.expression.left;
                            let right = path.node.expression.right;
                            console.log(left)
                        }
                    }
                }
            }
        }
    ]
})

console.log(globalVariables);