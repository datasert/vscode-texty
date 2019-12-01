import open from 'open';
import * as utils from '../utils';

const browserNamesByOs: any = {
    chrome: {
        win32: 'chrome',
        darwin: 'google chrome',
        linux: 'google-chrome',
    },
    firefox: {
        any: 'firefox',
    },
    edge: {
        any: 'MicrosoftEdge',
    },
    safari: {
        any: 'safari',
    }
};

function getBrowserName(browser: string) {
    const browserName = browserNamesByOs[browser][utils.getOs()] || browserNamesByOs[browser]['any'] || browser;
    return browserName;
}

export async function openFileInSystemDefaultApp(file?: string): Promise<undefined> {
    if (!file) {
        return;
    }

    try {
        await open(file);
    } catch (err) {
        utils.showError(`Error opening file in system default app. ${err.message}`);
    }
}

export async function openFileInBrowser(file?: string, browser?: string): Promise<undefined> {
    if (!file) {
        return;
    }

    if (!browser) {
        browser = await getPreferredBrowser(true);
    }

    if (!browser) {
        return;
    }

    try {
        await open(file, {app: getBrowserName(browser)});
    } catch (err) {
        utils.showError(`Error opening ${browser} browser. ${err.message}`);
    }
}

export async function getPreferredBrowser(prompt: boolean) {
    return utils.getQuickPick(prompt, {
        settingsKey: 'general.preferredBrowser',
        placeholder: 'Please select your preferred browser',
        items: [
            {value: 'chrome', label: 'Chrome'},
            {value: 'firefox', label: 'Firefox'},
            {value: 'safari', label: 'Safari'},
            {value: 'edge', label: 'Edge'},
        ],
    });
}
