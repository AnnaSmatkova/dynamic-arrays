import { toPng } from 'html-to-image';

export const captureElement = (element: HTMLElement) => {
    return toPng(element)
        .then((dataUrl) => {
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'array-container.png';
            link.click();
        })
        .catch((error) => {
            console.error('Failed to capture element:', error);
        });
};
