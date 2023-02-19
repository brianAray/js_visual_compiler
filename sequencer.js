const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const { generateVariablePayload, generateObjectExpressionPayload, generateArrayExpressionPayload,
generateAssignmentExpressionPayload,
generateBinaryExpressionPayload,
generateFunctionDeclarationPayload,
generateUpdateExpressionPayload,
generateCallExpressionPayload,
generateBlockStatementPayload,
generateClassDeclarationPayload,
generateClassBodyPayload,
generateClassMethodPayload} = require('./payload_generators/payload_generator.js');
const t = require('@babel/types');

const inputCode = `
class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
}
`
const nextId = () => {
    let id = 0;
    return () => id++;
}
let id = nextId();

class Step {
    id;
    type;
    key;
    isExit;
    payload;
    constructor(id, type, key, isExit, payload){
        this.id = id;
        this.type = type;
        this.key = key;
        this.isExit = isExit;
        this.payload = payload;
    }
}

let sequence = []

function addSequence(step){
    let sequenceStep = new Step(id(), step.type, step.key, step.isExit, step.payload);
    sequence.push(sequenceStep);
}

function findSequence(type, key){
    let foundSequence = sequence.filter((seq) => seq.type === type && seq.key === key)[0];
    return foundSequence;
}

const ast = parser.parse(inputCode);

function handleEnterOrExit(path, isExit=false){
    let type = path.node.type;
    let key = path.key;
    let payload;
    if(isExit){
        console.log(`   exit ${path.type}(${path.key})`);
    }else{
        console.log(`enter ${path.type}(${path.key})`);
    }
    switch (path.node.type) {
        case 'VariableDeclarator':
            payload = generateVariablePayload(path);
            addSequence({type, key, isExit, payload})
            break;
        case 'AssignmentExpression':
            payload = generateAssignmentExpressionPayload(path);
            addSequence({type, key, isExit, payload})
            break;
        case 'FunctionDeclaration':
            payload = generateFunctionDeclarationPayload(path);
            addSequence({type, key, isExit, payload})
            break;
        case 'BlockStatement':
            // payload = generateBlockStatementPayload(path.node.body);
            addSequence({type, key, isExit, payload});
            break;
        case 'UpdateExpression':
            payload = generateUpdateExpressionPayload(path);
            addSequence({type, key, isExit, payload})
            break;
        case 'CallExpression':
            payload = generateCallExpressionPayload(path);
            addSequence({type, key, isExit, payload});
            break;
        case 'ClassDeclaration':
            payload = generateClassDeclarationPayload(path);
            addSequence({type, key, isExit, payload});
            break;
        case 'ClassBody':
            addSequence({type, key, isExit, payload});
            break;
        case 'ClassMethod':
            payload = generateClassMethodPayload(path);
            addSequence({type, key, isExit, payload});
            break;
        default:
            break;
    }
}
const Visitor = {
    enter(path){
        handleEnterOrExit(path, false);
    },
    exit(path){
        handleEnterOrExit(path, true);
    }
}

traverse(ast, Visitor);
// console.log(sequence);
sequence.forEach((step) => console.log(step))
console.log(sequence[0].payload);