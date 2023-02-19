const parser = require(`@babel/parser`);
const { ModuleDetectionKind } = require('typescript');
const traverse = require('@babel/traverse').default;

const inputCode = `
let name = "Mike";
`;

const ast = parser.parse(inputCode);

const Visitor = {
    enter(path){
        console.log(`enter ${path.type}(${path.key})`);
        console.log(path);
    },
    exit(path){
        console.log(`   exit ${path.type}(${path.key})`);
    }
};

traverse(ast, Visitor);

