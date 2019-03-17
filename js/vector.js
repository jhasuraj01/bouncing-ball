class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(vector) {
        this.x = vector.x;
        this.y = vector.y;
    }
    reverse() {
        this.x = -this.x;
        this.y = -this.y;
    }
    magnitude(m) {
        if(m === undefined) {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        }
        let temp = this.unitVector();
        this.x = m*temp.x;
        this.y = m*temp.y;
    }
    unitVector() {
        let temp = this.magnitude();
        return { x: this.x / temp, y: this.y / temp };
    }
}