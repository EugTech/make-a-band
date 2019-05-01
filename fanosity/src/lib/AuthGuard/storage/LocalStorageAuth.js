import Storage from './Storage';

const DEFAULT_STORAGE_KEY = 'auth';

export default class LocalStorageAuth extends Storage {
    serialize = JSON.stringify;
    deserialize = JSON.parse;

    constructor(config) {
        super(config);

        // This is for handling changes made on other pages (aka tabs)
        window.addEventListener('storage', (event) => {
            if (event.storageArea === localStorage) {
                this.refreshCache();
            }
        }, false);
    }

    refreshCache() {
        return this.retrieveAuth()
            .then((auth) => {
                this.cachedAuth = auth;
                return this.cachedAuth;
            });
    }

    persistAuth(authPayload) {
        try {
            const localStorageKey = this.config.getSetting('storageKey', DEFAULT_STORAGE_KEY);
            localStorage.setItem(localStorageKey, this.serialize(authPayload));
            return this.refreshCache()
                .then(() => authPayload);
        } catch (e) {
            return Promise.reject(new Error('Unable to persist auth state to localStorage'));
        }
    }

    clearAuth() {
        this.clearCache();

        const localStorageKey = this.config.getSetting('storageKey', DEFAULT_STORAGE_KEY);
        localStorage.removeItem(localStorageKey);

        return Promise.resolve({});
    }

    retrieveAuth() {
        try {
            const localStorageKey = this.config.getSetting('storageKey', DEFAULT_STORAGE_KEY);
            const storedAuthString = localStorage.getItem(localStorageKey);
            if (storedAuthString) {
                try {
                    return Promise.resolve(this.deserialize(storedAuthString));
                } catch (e) {
                    console.warn('Error deserializing auth state from localStorage, reseting state...', e);
                    localStorage.removeItem(localStorageKey);
                }
            }
            return Promise.resolve({});
        } catch (e) {
            console.log(e);
            return Promise.reject(new Error('Unable to retrieve auth state from localStorage'));
        }
    }
}