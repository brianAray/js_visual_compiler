# JavaScript Sequence Generator

Express JS App that takes in code and returns back a JSON array describing the sequence of the code.

## Input

```javascript
let name = 'Mark';
```

## Output

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
