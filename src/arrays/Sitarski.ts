class Sitarski {
    private hat: (number | null)[][] = [null];
    private capacity: number = 1;
    private elementCount: number = 0;

    locate(position: number): [number, number] {
        const zeroBased = position - 1;
        const hatSize = this.hat.length;
        const referenceIndex = Math.floor(zeroBased / hatSize);
        const dataBlockIndex = zeroBased % hatSize;
        return [referenceIndex, dataBlockIndex];
    }

    addElement(element: number): void {
        if (this.elementCount === this.capacity) {
            this.expandHat();
        }

        const hatSize = this.hat.length;
        const [referenceIndex, dataBlockIndex] = this.locate(this.elementCount + 1);

        // create data block if needed
        if (this.hat[referenceIndex] === null) {
            this.hat[referenceIndex] = new Array(hatSize).fill(null);
        }

        this.hat[referenceIndex][dataBlockIndex] = element;
        this.elementCount++;
    }

    addMultiple(element: number, count: number): void {
        for (let i = 0; i < count; i++) {
            this.addElement(element);
        }
    }

    removeElement(): void {
        if (this.elementCount == 1) {
            this.capacity = 1;
            this.hat = [null]
            this.elementCount = 0;
            return;
        }

        const hatSize = this.hat.length;
        const [referenceIndex, blockIndex] = this.locate(this.elementCount);

        this.hat[referenceIndex][blockIndex] = null;

        // if there are two empty data blocks remove the last one
        if (blockIndex === 0 && referenceIndex + 1 < hatSize && this.hat[referenceIndex] !== null) {
            this.hat[referenceIndex + 1] = null;
        }

        if (Math.floor(this.capacity / 4) >= this.elementCount - 1 ) {
            this.shrinkHat();
        }

        this.elementCount--;
    }

    removeMultiple(count: number): void {
        for (let i = 0; i < count; i++) {
            this.removeElement();
        }
    }

    private expandHat(): void {
        const oldHatSize = this.hat.length;
        const newHat: (number | null)[][] = new Array(oldHatSize * 2).fill(null);

        for (let referenceIndex = 0; referenceIndex < oldHatSize; referenceIndex++) {
            const newHatReferenceIndex = Math.floor(referenceIndex / 2);

            // create new data block
            if (newHat[newHatReferenceIndex] === null) {
                newHat[newHatReferenceIndex] = new Array(newHat.length).fill(null);
            }

            const newHatStart = referenceIndex % 2 === 0 ? 0 : oldHatSize;
            for (let dataIndex = 0; dataIndex < oldHatSize; dataIndex++) {
                newHat[newHatReferenceIndex][newHatStart + dataIndex] = this.hat[referenceIndex][dataIndex];
            }
        }

        this.hat = newHat;
        this.capacity = (oldHatSize * 2) ** 2;
    }

    private shrinkHat(): void {
        const oldHatSize = this.hat.length;
        const newHat: (number | null)[][] = new Array(oldHatSize / 2).fill(null);

        for (let newReferenceIndex = 0; newReferenceIndex < oldHatSize / 2; newReferenceIndex++) {
            const oldReferenceIndex = Math.floor(newReferenceIndex / 2);

            if (newHat[newReferenceIndex] === null) {
                newHat[newReferenceIndex] = new Array(oldHatSize / 2).fill(null);
            }

            const start = oldReferenceIndex % 2 === 0 ? 0 : oldHatSize / 2;
            for (let newDataIndex = 0; newDataIndex < oldHatSize / 2; newDataIndex++) {
                newHat[newReferenceIndex][newDataIndex] = this.hat[oldReferenceIndex][start + newDataIndex];
            }
        }

        this.hat = newHat;
        this.capacity = this.hat.length ** 2;
    }

    copyFrom(other: Sitarski): void {
        this.capacity = other.capacity;
        this.elementCount = other.elementCount;
        this.hat = other.hat.map(block => block ? block.slice() : null);
    }

    getElementCount(): number {
        return this.elementCount;
    }

    getArray(): ((number | null)[] | null)[] {
        return this.hat;
    }
}

export default Sitarski;
