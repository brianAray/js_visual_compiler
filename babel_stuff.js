const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

const babel = require("@babel/core");

const inputCode = `const n = 1;
let firstName = "Mike";
let surname = "Jones";
let suffix = 3;
let age;
age = 55;
{
    const name = "lol";
    firstName = "Jim";
}`;
// const ast = parser.parse(inputCode);

// traverse(ast, {
//     enter(path){
//         if(path.isIdentifier({name: 'n'})){
//             path.node.name = 'x';
//         }
//     }
// })

// const output = generate(ast, inputCode);
// console.log(output.code);

let variables = [];
let events = [];

function addVariables(variable){
    if (!variables.includes(variable)) variables.push(variable);
}

const output = babel.transformSync(inputCode, {
    plugins: [
        function customPlugin(){
            return{
                visitor: {
                    VariableDeclaration(path){
                        let kind = path.node.kind;
                        let name = path.node.declarations[0].id.name;
                        let type;
                        let value;
                        let scope;
                        if(path.node.declarations[0].init){
                            type = path.node.declarations[0].init.type;
                            value = path.node.declarations[0].init.value;
                        }
                        if(path.scope.path.parentPath === null){
                            scope = "Global"
                        }else{
                            // console.log(path.scope.path.node.type)
                            scope = path.scope.path.node.type;
                        }
                        let variable = {id: name, kind, type, value, scope};
                        addVariables(variable);
                    },
                    ExpressionStatement(path){
                        // console.log(path.node);
                        // console.log(path.node.expression.type);
                        if(path.node.expression.type === 'AssignmentExpression'){
                            let left = path.node.expression.left;
                            let right = path.node.expression.right;
                            console.log(right.value)

                            console.log(path.scope.bindings)
                            // console.log(path.scope)
                            // console.log(path.scope.bindings)
                            // console.log(left)
                            // console.log(right)
                        }
                    }
                }
            }
        }
    ]
})

//console.log(output.code);
//variables.forEach((variable) => console.log(variable));