class Doubling {
    private arr: (number | null)[];
    private used: number;

    constructor(initialSize: number = 1) {
        this.arr = new Array<number | null>(initialSize).fill(null);
        this.used = 0;
    }

    addElement() {
        if (this.used === this.arr.length) {
            this.expandArray();
        }
        this.arr[this.used] = this.used;
        this.used++;
    }

    removeElement() {
        if (this.used === 0) throw new Error("Array is already empty");
        this.used--;
        this.arr[this.used] = null;

        if (this.used <= this.arr.length / 4 && this.arr.length >= 2) {
            this.shrinkArray();
        }
    }

    private expandArray() {
        const newArr = new Array<number | null>(this.arr.length * 2).fill(null);
        for (let i = 0; i < this.used; i++) {
            newArr[i] = this.arr[i];
        }
        this.arr = newArr;
    }

    private shrinkArray() {
        const newSize = Math.max(this.arr.length / 2, 1);
        const newArr = new Array<number | null>(newSize).fill(null);
        for (let i = 0; i < this.used; i++) {
            newArr[i] = this.arr[i];
        }
        this.arr = newArr;
    }

    getArray() {
        return this.arr;
    }

    copyFrom(other: Doubling) {
        this.arr = [...other.getArray()];
        this.used = other.getElementCount();
    }

    getElementCount() {
        return this.used;
    }

    getCapacity() {
        return this.arr.length;
    }
}

export default Doubling;
