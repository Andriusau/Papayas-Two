/*
 * Determining how we know if someone is logged in.
 * We are going to use localStorage and store our token there.
 * 1. When the user opens our page, we check storage for the token. If they have one, we assume they are logged in or we can verify it’s a valid token.
 * 2. If they don’t have a token, we load our sign in and sign up form.
 * 3. When they sign in with valid credentials, we save a new token.
 */
export function getFromStorage(key) {
    if (!key) {
        return null;
    }
    try {
        const valueStr = localStorage.getItem(key);
        if (valueStr) {
            return JSON.parse(valueStr);
        }
        return null;
    } catch (err) {
        return null;
    }
}
export function setInStorage(key, obj) {
    if (!key) {
        console.error('Error: Key is missing');
    }
    try {
        localStorage.setItem(key, JSON.stringify(obj));
    } catch (err) {
        console.error(err);
    }
}

// We are going to put this retrieve / check for the token in the componentDidMount of the React lifecycle.