import _ from './lowLodash';
import AsyncStorageAuth from './storage/AsyncStorageAuth';

let instance;

export const AUTH_URL = '/auth-gateway/v1';
export const AUTH_PATH_LOGIN = '/emailpassword/login';
export const AUTH_PATH_LOGIN_WITH_BALLOT_QR_CODE = '/eventballot/login';
export const AUTH_PATH_LOGOUT = '/logout';
export const AUTH_PATH_REFRESH = '/refresh';
export const AUTH_PATH_TOKEN_LOGIN = '/token_login';
export const REFRESH_THRESHOLD_SECONDS = 120;
export const ACCOUNTS_URL = 'https://api.fanosity.com/account';
export const ACCOUNTS_PATH_USER = '/oauth2/user';

export default class Config {

    settings = {};

    constructor() {
        if (instance) {
            return instance;
        }

        this.env = _.get(window, 'ENV_CONFIGURATION.env', 'prod');

        instance = this;
    }

    update(newSettings = {}) {
        const defaultSettings = {
            // Settings
            authUrl: AUTH_URL,
            authPathLogin: AUTH_PATH_LOGIN,
            authPathLoginWithBallotQrCode: AUTH_PATH_LOGIN_WITH_BALLOT_QR_CODE,
            authPathLogout: AUTH_PATH_LOGOUT,
            authPathRefresh: AUTH_PATH_REFRESH,
            authPathTokenLogin: AUTH_PATH_TOKEN_LOGIN,
            accountsUrl: ACCOUNTS_URL,
            accountsPathUser: ACCOUNTS_PATH_USER,
            refreshThresholdSeconds: REFRESH_THRESHOLD_SECONDS,

            // Persist storage
            storage: new AsyncStorageAuth(this),
            storageKey: `${this.env}_authentication`
        };

        this.settings = {
            ...defaultSettings,
            ...this.settings,
            ...newSettings
        };
    }

    getSetting(name, fallback = '') {
        return _.get(this.settings, name, fallback);
    }
}