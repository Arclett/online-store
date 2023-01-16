export class Loader {
    public async load<T>(): Promise<T> {
        const res = await fetch("https://dummyjson.com/products?limit=100");
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        const json: Promise<T> = await res.json();
        return json;
    }
}
