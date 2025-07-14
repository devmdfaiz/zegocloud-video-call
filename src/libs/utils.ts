export function generateCallParams() {
    if (typeof window === "undefined") return;

    const urlStr = window.location.search;
    const urlSearchParams = new URLSearchParams(urlStr);
    const result = Object.fromEntries(urlSearchParams.entries());
    return result;
}