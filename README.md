# JavaScript Sequence Generator

Express JS App that takes in code and returns back a JSON array describing the sequence of the code.

## Input 1

```javascript
let name = 'Mark';
```

## Output 1

```json
{
    "data": [
        {
            "id": 0,
            "type": "VariableDeclarator",
            "key": 0,
            "isExit": false,
            "payload": {
                "id": "name",
                "kind": "let",
                "type": "StringLiteral",
                "value": "Mark"
            }
        },
        {
            "id": 1,
            "type": "VariableDeclarator",
            "key": 0,
            "isExit": true,
            "payload": {
                "id": "name",
                "kind": "let",
                "type": "StringLiteral",
                "value": "Mark"
            }
        }
    ]
}
```

The steps are duplicated to describe when the sequence is beginning and when the sequence is ending. This is useful for describing block statements and knowing when block statements end and begin.

Objects can be represented and used.

## Input 2

```javascript
let person = {
    name: "John", 
    age: 55, 
    isAlive: true
};
console.log(person.name);
```

## Output 2

```json
{
    "data": [
        {
            "id": 0,
            "type": "VariableDeclarator",
            "key": 0,
            "isExit": false,
            "payload": {
                "id": "person",
                "type": "ObjectExpression",
                "properties": [
                    {
                        "id": "name",
                        "type": "StringLiteral",
                        "value": "John"
                    },
                    {
                        "id": "age",
                        "type": "NumericLiteral",
                        "value": 55
                    },
                    {
                        "id": "isAlive",
                        "type": "BooleanLiteral",
                        "value": true
                    }
                ]
            }
        },
        {
            "id": 1,
            "type": "VariableDeclarator",
            "key": 0,
            "isExit": true,
            "payload": {
                "id": "person",
                "type": "ObjectExpression",
                "properties": [
                    {
                        "id": "name",
                        "type": "StringLiteral",
                        "value": "John"
                    },
                    {
                        "id": "age",
                        "type": "NumericLiteral",
                        "value": 55
                    },
                    {
                        "id": "isAlive",
                        "type": "BooleanLiteral",
                        "value": true
                    }
                ]
            }
        },
        {
            "id": 2,
            "type": "CallExpression",
            "key": "expression",
            "isExit": false,
            "payload": {
                "type": "CallExpression",
                "callee": {
                    "calleeType": "MemberExpression",
                    "object": {
                        "name": "console",
                        "isComputed": false,
                        "property": "log"
                    },
                    "arguments": [
                        {
                            "type": "MemberExpression",
                            "name": "person",
                            "isComputed": false,
                            "property": "name"
                        }
                    ]
                }
            }
        },
        {
            "id": 3,
            "type": "CallExpression",
            "key": "expression",
            "isExit": true,
            "payload": {
                "type": "CallExpression",
                "callee": {
                    "calleeType": "MemberExpression",
                    "object": {
                        "name": "console",
                        "isComputed": false,
                        "property": "log"
                    },
                    "arguments": [
                        {
                            "type": "MemberExpression",
                            "name": "person",
                            "isComputed": false,
                            "property": "name"
                        }
                    ]
                }
            }
        }
    ]
}
```

We can also declare named, anonymous, and arrow functions.

## Input 3

```javascript
function greet(name){
    console.log(name);
}

greet("John Doe");
```

## Output 3
```json
{
    "data": [
        {
            "id": 0,
            "type": "FunctionDeclaration",
            "key": 0,
            "isExit": false,
            "payload": {
                "id": "greet",
                "isAsync": false,
                "isGenerator": false,
                "params": [
                    "name"
                ]
            }
        },
        {
            "id": 1,
            "type": "BlockStatement",
            "key": "body",
            "isExit": false
        },
        {
            "id": 2,
            "type": "CallExpression",
            "key": "expression",
            "isExit": false,
            "payload": {
                "type": "CallExpression",
                "callee": {
                    "calleeType": "MemberExpression",
                    "object": {
                        "name": "console",
                        "isComputed": false,
                        "property": "log"
                    },
                    "arguments": [
                        {
                            "type": "Identifier",
                            "value": "name"
                        }
                    ]
                }
            }
        },
        {
            "id": 3,
            "type": "CallExpression",
            "key": "expression",
            "isExit": true,
            "payload": {
                "type": "CallExpression",
                "callee": {
                    "calleeType": "MemberExpression",
                    "object": {
                        "name": "console",
                        "isComputed": false,
                        "property": "log"
                    },
                    "arguments": [
                        {
                            "type": "Identifier",
                            "value": "name"
                        }
                    ]
                }
            }
        },
        {
            "id": 4,
            "type": "BlockStatement",
            "key": "body",
            "isExit": true
        },
        {
            "id": 5,
            "type": "FunctionDeclaration",
            "key": 0,
            "isExit": true,
            "payload": {
                "id": "greet",
                "isAsync": false,
                "isGenerator": false,
                "params": [
                    "name"
                ]
            }
        },
        {
            "id": 6,
            "type": "CallExpression",
            "key": "expression",
            "isExit": false,
            "payload": {
                "type": "CallExpression",
                "callee": {
                    "calleeType": "Identifier",
                    "calleeName": "greet",
                    "arguments": [
                        {
                            "type": "StringLiteral",
                            "value": "John Do"
                        }
                    ]
                }
            }
        },
        {
            "id": 7,
            "type": "CallExpression",
            "key": "expression",
            "isExit": true,
            "payload": {
                "type": "CallExpression",
                "callee": {
                    "calleeType": "Identifier",
                    "calleeName": "greet",
                    "arguments": [
                        {
                            "type": "StringLiteral",
                            "value": "John Do"
                        }
                    ]
                }
            }
        }
    ]
}
```
