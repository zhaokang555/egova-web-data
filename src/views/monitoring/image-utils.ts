export function loadImages(urls: Array<string>): Promise<Array<HTMLImageElement>> {
    let promises = urls.map(url => this.loadImage(url));
return Promise.all(promises);
}

function loadImage(url): Promise<HTMLImageElement> {
    return new Promise(resolve => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.src = url;
    });
}
