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

module.exports = Step;