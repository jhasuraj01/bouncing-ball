class Vector {
    constructor(x, y) {
        this.x = x; // px per sec
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
}