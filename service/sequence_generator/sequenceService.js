const Step = require('./models/step');
const Promise = require('bluebird');
const parser = require('@babel/parser');
const traverse = Promise.promisify(require('@babel/traverse').default);
const { 
    generateVariablePayload, 
    generateAssignmentExpressionPayload,
    generateFunctionDeclarationPayload,
    generateUpdateExpressionPayload,
    generateCallExpressionPayload,
    generateClassDeclarationPayload,
    generateClassMethodPayload 
} = require('./payload_generators/payload_generator.js');

let sequence = [];
let origId = 0;
function generateSequence(data){
    sequence = [];
    origId = 0;
    let inputCode = data;
    const ast = parser.parse(inputCode);
    traverse(ast, Visitor).then();
    return sequence;
}

const nextId = () => {
    return () => origId++;
}
let id = nextId();

function addSequence(step){
    let sequenceStep = new Step(id(), step.type, step.key, step.isExit, step.payload);
    sequence.push(sequenceStep);
}

const Visitor = {
    enter(path){
        handleEnterOrExit(path, false);
    },
    exit(path){
        handleEnterOrExit(path, true);
    }
}

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

module.exports = {generateSequence};