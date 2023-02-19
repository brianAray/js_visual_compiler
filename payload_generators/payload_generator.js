function generateVariablePayload(path){
    let id = path.node.id.name;
    let kind = path.parent.kind;
    let type = 'Uninitialized';
    let value;
    let payload;
    if(path.node.init){
        type = path.node.init.type;
        switch (type){
            case 'ObjectExpression':
                let properties = [];
                path.node.init.properties.forEach(prop => properties.push(generateObjectExpressionPayload(prop)));
                return {id, type, properties};
            case 'ArrayExpression':
                let elements = [];
                path.node.init.elements.forEach(prop => elements.push(generateArrayExpressionPayload(prop)));
                return {id, type, elements};
            case 'FunctionExpression':
                payload = generateFunctionDeclarationPayload(path);
                return {...payload, type};
            case 'ArrowFunctionExpression':
                payload = generateFunctionDeclarationPayload(path);
                return {...payload, type};
            case 'CallExpression':
                payload = generateCallExpressionPayload(path, true);
                return {id, kind, type, value: {...payload, type}}
            default:
                value = path.node.init.value;
                return {id, kind, type, value};
        }
    }
    return {id, kind, type, value}
}

function generateObjectExpressionPayload(propNode){
    let isMethod = propNode.method;
    let id;
    let type;
    let value;
    if(!isMethod){
        id = propNode.key.name;
        type = propNode.value.type;
        value = propNode.value.value;
        return {id, type, value};
    }
}

function generateArrayExpressionPayload(elemNode){
    let type = elemNode.type;
    let value = elemNode.value;
    return {type, value};
}

function generateAssignmentExpressionPayload(path){
    let operator = path.node.expression?.operator || path.node.operator;
    let left = path.node.expression?.left || path.node.left;
    let right = path.node.expression?.right || path.node.right;
    let properties = [];
    let elements = [];
    let payload = {operator};

    switch (left.type){
        case 'MemberExpression':
            if(left.object.type === 'ThisExpression'){
                payload = {...payload, left: {type: left.object.type,  property: left.property.name || left.property.value}};
            }else{
                payload = {...payload, left: {type: left.type, id: left.object.name, property: left.property.name || left.property.value}};
            }
            break;
        default:
            payload = {...payload, left: {type: left.type, id: left.name, value: left.value || left.name}};
            break;
    }

    switch (right.type) {
        case 'ObjectExpression':
            path.node.expression.right.properties.forEach((prop) => properties.push(generateObjectExpressionPayload(prop)))
            return {...payload, right: {isObject: true, properties}};
        case 'ArrayExpression':
            path.node.expression.right.elements.forEach((elem) => elements.push(generateArrayExpressionPayload(elem)));
            return {...payload, right: {isArray: true, elements}};
        case 'BinaryExpression':
            return generateBinaryExpressionPayload(right);
        default:
            return {...payload, right: {type: right.type, value: right.value || right.name}}
    }
}

function generateBinaryExpressionPayload(node){
    let type = node.type;
    let operator = node.operator;
    let leftNode = node.left;
    let rightNode = node.right;

    let left = {type: leftNode.type};
    let right = {type: rightNode.type};

    switch(leftNode.type){
        case 'Identifier':
            left = {...left, name: leftNode.name};
            break;
        case 'MemberExpression':
            left = {...left, name: leftNode.object.name, prop: leftNode.property.name, isComputed: leftNode.computed};
            break;
        default:
            break;
    }
    switch(rightNode.type){
        case 'Identifier':
            right = {...right, name: rightNode.name};
            return {type, operator, left, right};
        case 'MemberExpression':
            right = {...right, name: rightNode.object.name, prop: rightNode.property.name, isComputed: rightNode.computed};
            return {type, operator, left, right};
        default:
            return {type, operator, left: {type: leftNode.type, value: leftNode.value || leftNode.name}, right: {type: rightNode.type, value: rightNode.value || rightNode.name}}
    }
}

function generateFunctionDeclarationPayload(path){
    let id = path.node.id.name;
    if(path.node.init){
        let type = path.node.init.type;
        let isAsync = path.node.init.async;
        let isGenerator = path.node.init.generator;
        let params = [];
        path.node.init.params.forEach(param => params.push(param.name));
        let body = generateBlockStatementPayload(path.node.init.body);
        return {id, type, isAsync, isGenerator, params, body}
    }else{
        let isAsync = path.node.async;
        let isGenerator = path.node.generator;
        let params = [];
        path.node.params.forEach(param => params.push(param.name));
        return {id, isAsync, isGenerator, params};
    }
}

function generateBlockStatementPayload(body){
    if(!Array.isArray(body)){
        body = [body];
    }
    for(const bodyNode of body){
        let type = bodyNode.type;
        let payload;
        switch(type){
            case 'ReturnStatement':
                let argumentType = bodyNode.argument.type;
                switch(argumentType){
                    case 'BinaryExpression':
                        let payload = generateBinaryExpressionPayload(bodyNode.argument);
                        return {...payload, type};
                    default:
                        break;
                }
                break;
            case 'BinaryExpression':
                payload = generateBinaryExpressionPayload(bodyNode);
                return {...payload, type};
            case 'ExpressionStatement':
                break;
            default:
                break;
        }

    }
}

function generateUpdateExpressionPayload(path){
    let type = path.node.type;
    let operator = path.node.operator;
    let isPrefix = path.node.prefix;
    let argument = {name: path.node.argument.name};
    return {type, operator, isPrefix, argument}
}

function generateCallExpressionPayload(path, isInit=false){

    let node = isInit ? path.node.init : path.node;

    let type = node.type;
    let calleeType = node.callee.type;
    let arguments = [];
    node.arguments.forEach((arg) => {
        if(arg.type === 'MemberExpression'){
            let name = arg.object.name;
            let isComputed = arg.computed;
            let property = arg.property.name || arg.property.value;
            arguments.push({type: arg.type, name, isComputed, property});
        }else{
            arguments.push({type: arg.type, value: arg.value || arg.name})}
        }
    );
    switch (calleeType){
        case 'MemberExpression':
            let name = node.callee.object.name;
            let isComputed = node.callee.computed;
            let property = node.callee.property.name;
            let object = {name, isComputed, property}
            return {type, callee: {calleeType, object, arguments}}
        case 'Identifier':
            let calleeName = node.callee.name;
            return {type, callee: {calleeType, calleeName, arguments}};
        default:
            break;
    }
}

function generateClassDeclarationPayload(path){
    let type = path.node.type;
    let id = path.node.id.name;
    let hasSuperClass = path.node.superClass ? true : false;
    return ({type, id, hasSuperClass})
}

function generateClassBodyPayload(path){
    console.log(path.node);
}

function generateClassMethodPayload(path){
    console.log(path.node);
}

module.exports = {
    generateVariablePayload,
    generateObjectExpressionPayload,
    generateArrayExpressionPayload,
    generateAssignmentExpressionPayload,
    generateBinaryExpressionPayload,
    generateFunctionDeclarationPayload,
    generateUpdateExpressionPayload,
    generateCallExpressionPayload,
    generateBlockStatementPayload,
    generateClassDeclarationPayload,
    generateClassBodyPayload,
    generateClassMethodPayload
}