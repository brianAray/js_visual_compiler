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

Here is a more complex example

## Input 2

```javascript
class Person {
    constructor(name){
        this.name = name;
    }
}

let person = new Person("Mark");

person.name = "Jim";

console.log(person.name);
```

## Output 2

```json
{
    "data": [
        {
            "id": 0,
            "type": "ClassDeclaration",
            "key": 0,
            "isExit": false,
            "payload": {
                "type": "ClassDeclaration",
                "id": "Person",
                "hasSuperClass": false
            }
        },
        {
            "id": 1,
            "type": "ClassBody",
            "key": "body",
            "isExit": false
        },
        {
            "id": 2,
            "type": "ClassMethod",
            "key": 0,
            "isExit": false,
            "payload": {
                "id": "constructor",
                "kind": "constructor",
                "isComputed": false,
                "isAsync": false,
                "params": [
                    "name"
                ]
            }
        },
        {
            "id": 3,
            "type": "BlockStatement",
            "key": "body",
            "isExit": false
        },
        {
            "id": 4,
            "type": "AssignmentExpression",
            "key": "expression",
            "isExit": false,
            "payload": {
                "operator": "=",
                "left": {
                    "type": "ThisExpression",
                    "property": "name"
                },
                "right": {
                    "type": "Identifier",
                    "value": "name"
                }
            }
        },
        {
            "id": 5,
            "type": "AssignmentExpression",
            "key": "expression",
            "isExit": true,
            "payload": {
                "operator": "=",
                "left": {
                    "type": "ThisExpression",
                    "property": "name"
                },
                "right": {
                    "type": "Identifier",
                    "value": "name"
                }
            }
        },
        {
            "id": 6,
            "type": "BlockStatement",
            "key": "body",
            "isExit": true
        },
        {
            "id": 7,
            "type": "ClassMethod",
            "key": 0,
            "isExit": true,
            "payload": {
                "id": "constructor",
                "kind": "constructor",
                "isComputed": false,
                "isAsync": false,
                "params": [
                    "name"
                ]
            }
        },
        {
            "id": 8,
            "type": "ClassBody",
            "key": "body",
            "isExit": true
        },
        {
            "id": 9,
            "type": "ClassDeclaration",
            "key": 0,
            "isExit": true,
            "payload": {
                "type": "ClassDeclaration",
                "id": "Person",
                "hasSuperClass": false
            }
        },
        {
            "id": 10,
            "type": "VariableDeclarator",
            "key": 0,
            "isExit": false,
            "payload": {
                "id": "person",
                "callee": {
                    "type": "Identifier",
                    "name": "Person"
                },
                "arguments": [
                    {
                        "type": "StringLiteral",
                        "value": "Mark"
                    }
                ],
                "type": "NewExpression"
            }
        },
        {
            "id": 11,
            "type": "VariableDeclarator",
            "key": 0,
            "isExit": true,
            "payload": {
                "id": "person",
                "callee": {
                    "type": "Identifier",
                    "name": "Person"
                },
                "arguments": [
                    {
                        "type": "StringLiteral",
                        "value": "Mark"
                    }
                ],
                "type": "NewExpression"
            }
        },
        {
            "id": 12,
            "type": "AssignmentExpression",
            "key": "expression",
            "isExit": false,
            "payload": {
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "id": "person",
                    "property": "name"
                },
                "right": {
                    "type": "StringLiteral",
                    "value": "Jim"
                }
            }
        },
        {
            "id": 13,
            "type": "AssignmentExpression",
            "key": "expression",
            "isExit": true,
            "payload": {
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "id": "person",
                    "property": "name"
                },
                "right": {
                    "type": "StringLiteral",
                    "value": "Jim"
                }
            }
        },
        {
            "id": 14,
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
            "id": 15,
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
