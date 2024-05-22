class TarjanArray {
    private B: number;
    private N: number;
    private arrays: (number[] | null)[][];

    constructor() {
        this.N = 0;
        this.B = 1;
        this.arrays = [
            new Array(this.B).fill(null),
            new Array(this.B).fill(null),
        ];
    }

    private calculateB(): number {
        return Math.max(1, Math.floor(Math.pow(this.N, 1 / 3)));
    }

    private allocate(size: number): number[] {
        return new Array(size).fill(null);
    }

    private rebuild(newB: number): void {
        const newArrays: (number[] | null)[][] = [
            new Array(newB).fill(null),
            new Array(newB).fill(null)
        ];

        let currentN = 0;
        for (let i = 0; i < this.arrays[0].length; i++) {
            if (this.arrays[0][i] !== null) {
                for (let j = 0; j < this.arrays[0][i]!.length; j++) {
                    if (this.arrays[0][i]![j] !== null) {
                        this.addElementToNewArray(newArrays, this.arrays[0][i]![j]!, newB);
                        currentN++;
                    }
                }
            }
        }

        for (let i = 0; i < this.arrays[1].length; i++) {
            if (this.arrays[1][i] !== null) {
                for (let j = 0; j < this.arrays[1][i]!.length; j++) {
                    if (this.arrays[1][i]![j] !== null) {
                        this.addElementToNewArray(newArrays, this.arrays[1][i]![j]!, newB);
                        currentN++;
                    }
                }
            }
        }

        this.B = newB;
        this.arrays = newArrays;
        this.N = currentN;
    }

    private addElementToNewArray(newArrays: (number[] | null)[][], element: number, newB: number): void {
        for (let i = 0; i < newArrays[0].length; i++) {
            if (newArrays[0][i] === null) {
                newArrays[0][i] = this.allocate(newB);
            }
            if (newArrays[0][i]!.includes(null)) {
                newArrays[0][i]![newArrays[0][i]!.indexOf(null)] = element;
                return;
            }
        }

        for (let i = 0; i < newArrays[1].length; i++) {
            if (newArrays[1][i] === null) {
                newArrays[1][i] = this.allocate(newB * newB);
            }
            if (newArrays[1][i]!.includes(null)) {
                newArrays[1][i]![newArrays[1][i]!.indexOf(null)] = element;
                return;
            }
        }
    }

    addElement(element: number): void {
        if (this.N === this.B * this.B * this.B) {
            this.rebuild(this.calculateB() * 2);
        }

        for (let i = 0; i < this.arrays[0].length; i++) {
            if (this.arrays[0][i] === null) {
                this.arrays[0][i] = this.allocate(this.B);
            }
            if (this.arrays[0][i]!.includes(null)) {
                this.arrays[0][i]![this.arrays[0][i]!.indexOf(null)] = element;
                this.N++;
                return;
            }
        }

        for (let i = 0; i < this.arrays[1].length; i++) {
            if (this.arrays[1][i] === null) {
                this.arrays[1][i] = this.allocate(this.B * this.B);
            }
            if (this.arrays[1][i]!.includes(null)) {
                this.arrays[1][i]![this.arrays[1][i]!.indexOf(null)] = element;
                this.N++;
                return;
            }
        }
    }

    shrink(): void {
        if (this.N === 0) return;

        const newB = this.calculateB();
        if (this.N === Math.pow(newB / 4, 3)) {
            this.rebuild(newB / 2);
            return;
        }

        for (let i = this.arrays[0].length - 1; i >= 0; i--) {
            if (this.arrays[0][i] !== null) {
                const index = this.arrays[0][i]!.lastIndexOf(null) - 1;
                if (index >= 0) {
                    this.arrays[0][i]![index] = null;
                    this.N--;
                    return;
                } else {
                    this.arrays[0][i] = null;
                }
            }
        }

        for (let i = this.arrays[1].length - 1; i >= 0; i--) {
            if (this.arrays[1][i] !== null) {
                const index = this.arrays[1][i]!.lastIndexOf(null) - 1;
                if (index >= 0) {
                    this.arrays[1][i]![index] = null;
                    this.N--;
                    this.redistributeFromIndex1();
                    return;
                } else {
                    this.arrays[1][i] = null;
                }
            }
        }
    }

    private redistributeFromIndex1(): void {
        const elements: number[] = [];

        for (let i = 0; i < this.arrays[1].length; i++) {
            if (this.arrays[1][i] !== null) {
                for (let j = 0; j < this.arrays[1][i]!.length; j++) {
                    if (this.arrays[1][i]![j] !== null) {
                        elements.push(this.arrays[1][i]![j]!);
                    }
                }
                this.arrays[1][i] = null;
            }
        }

        elements.forEach(element => this.addElement(element));
    }

    getElementCount(): number {
        return this.N;
    }

    getArray(): (number[] | null)[][] {
        return this.arrays;
    }

    copyFrom(other: TarjanArray): void {
        this.B = other.B;
        this.N = other.N;
        this.arrays = other.getArray().map(blocks => blocks ? blocks.map(block => block ? [...block] : null) : []);
    }
}

export default TarjanArray;
