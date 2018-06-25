export function loadImages(urls: Array<string>): Promise<Array<HTMLImageElement>> {
    const promises = urls.map(url => loadImage(url));
    return Promise.all(promises);
}

function loadImage(url): Promise<HTMLImageElement> {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = url;
    });
}
