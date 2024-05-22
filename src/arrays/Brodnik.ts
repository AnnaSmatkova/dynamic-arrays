class Brodnik {
    private array: (number[] | null)[];
    private capacity: number;
    private elementCount: number;
    private dataBlockCount: number;
    private dataBlockLength: number;

    constructor() {
        this.array = [null];
        this.capacity = 1;
        this.elementCount = 0;
        this.dataBlockCount = 1;
        this.dataBlockLength = 1;
    }

    private locate(position: number): [number, number] {
        return [this.getReferenceIndex(position - 1), this.getDataIndex(position)];
    }

    private getSuperblock(position: number): number {
        return position.toString(2).length - 1;
    }

    private getReferenceIndex(position: number): number {
        let superblock = (position + 1).toString(2).length - 1;
        let p = this.getDiInSb(position + 1);
        let b = superblock === 0 ? 0 : this.getB(superblock);
        return b + p;
    }

    private getB(i: number): number {
        if (i === 0) {
            return 0;
        }
        let index = Math.floor(i / 2);
        let value = 2 * (Math.pow(2, index) - 1);
        if (i % 2 === 1) {
            value += Math.pow(2, index);
        }
        return value;
    }

    private getDiInSb(position: number): number {
        let r = position.toString(2);
        let superblock = this.getSuperblock(position);
        let b = r.substring(1, Math.floor(superblock / 2) + 1);
        return b === '' ? 0 : parseInt(b, 2);
    }

    private getDataIndex(position: number): number {
        let r = position.toString(2);
        let e = r.substring(Math.floor(this.getSuperblock(position) / 2) + 1);
        return e === '' ? 0 : parseInt(e, 2);
    }

    private expand(): void {
        let superblock = this.getSuperblock(this.elementCount + 1);
        if (superblock % 2 === 1) {
            this.dataBlockLength *= 2;
        } else {
            this.dataBlockCount *= 2;
        }
    }

    addElement(element: number): void {
        let [referenceIndex, dataIndex] = this.locate(this.elementCount + 1);
        if (referenceIndex === this.array.length) {
            this.array.push(null);
        }
        if (dataIndex === 0) {
            if (this.getSuperblock(this.elementCount) !== this.getSuperblock(this.elementCount + 1)) {
                this.expand();
            }
            if (this.array[referenceIndex] === null) {
                this.array[referenceIndex] = new Array(this.dataBlockLength).fill(null);
            }
        }
        if (this.array[referenceIndex] !== null) {
            this.array[referenceIndex][dataIndex] = element;
        }
        this.elementCount++;
    }

    addMultiple(element: number, count: number): void {
        for (let i = 0; i < count; i++) {
            this.addElement(element);
        }
    }

    removeElement(): void {
        if (this.elementCount === 0) {
            return;
        }
    
        const [referenceIndex, dataIndex] = this.locate(this.elementCount);
        const superblock = this.getSuperblock(this.elementCount);
    
        this.array[referenceIndex][dataIndex] = null;
        this.elementCount--;
    
        if (dataIndex === 0) {
            if (this.array.length > referenceIndex + 1) {
                console.log("Hello!!!");
                this.array[referenceIndex + 1] = null;
                console.log(this.array[referenceIndex + 1]);
            }
    
            const [_, newDataIndex] = this.locate(this.elementCount);
    
            if (newDataIndex + 1 !== this.dataBlockLength) {
                this.dataBlockLength = Math.floor(this.dataBlockLength / 2);
            } else if (superblock !== this.getSuperblock(this.elementCount)) {
                this.dataBlockCount = Math.floor(this.dataBlockCount / 2);
            }
        }
    }

    removeMultiple(count: number): void {
        for (let i = 0; i < count; i++) {
            this.removeElement();
        }
    }

    getElementCount(): number {
        return this.elementCount;
    }

    getArray(): (number[] | null)[] {
        return this.array;
    }

    copyFrom(other: Brodnik): void {
        this.array = other.array.map(block => block ? [...block] : null);
        this.capacity = other.capacity;
        this.elementCount = other.elementCount;
        this.dataBlockCount = other.dataBlockCount;
        this.dataBlockLength = other.dataBlockLength;
    }

    getInfo(): void {
        console.log(this.capacity, this.elementCount, this.dataBlockCount, this.dataBlockLength);
    }
}

export default Brodnik
