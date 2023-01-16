export function isElement(elem: HTMLElement | null): elem is HTMLElement {
    return elem instanceof HTMLElement;
}
