import momenttz from 'moment-timezone';
import * as vscode from 'vscode';
import * as utils from '../utils';

export class ConvertTimeOptions {
    fromFormat?: string;
    fromTz?: string;
    toFormat?: string;
    toTz?: string;
}

export function convertDateTime(values: string[], options?: ConvertTimeOptions) {
    if (!options) {
        return undefined;
    }

    return values.map(value => {
        if (!value) {
            return value;
        }

        let moment;
        if (options.fromTz && options.fromFormat) {
            moment = momenttz.tz(value, options.fromFormat, options.fromTz);
        
        } else if (options.fromTz) {
            moment = momenttz.tz(value, options.fromTz);
        
        } else if (options.fromFormat) {
            moment = momenttz(value, options.fromFormat);
        } else {
            moment = momenttz(value);
        }

        if (options.toTz) {
            moment = moment.tz(options.toTz);
        }
    
        return moment.format(options.toFormat || 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    });
}

export function convertDateTimeToRelative(values: string[]) {
    return values.map(value => {
        if (!value) {
            return value;
        }

        let moment = momenttz(value);
        return moment.fromNow();
    });
}

export function addDateTime(values: string[], addValue?: string) {
    if (!addValue) {
        return;
    }

    const nve = addValue.startsWith('-');
    let amount = parseFloat(utils.extractNumbers(addValue));
    amount = nve ? -amount : amount;
    const unit = addValue.endsWith('ms') ? 'ms' : addValue.substring(addValue.length - 1);
    
    return values.map(value => {
        if (!value) {
            return value;
        }

        return momenttz(value).add(amount as any, unit);
    });
}

export function getDateTimeIsoString() {
    return new Date().toISOString();
}

export function getDateIsoString() {
    return new Date().toISOString().substring(0, 10);
}

export async function getConvertTimeOptions(context: vscode.ExtensionContext): Promise<ConvertTimeOptions> {
    const options = await utils.getOptions(context, {
        placeHolder: 'Specify options with comma separated key=value pairs',
        message: 'Enter Convert Time Options. Where ' 
            + 'fromTz=If date string doesnot have tz info embedded, you can specify this as timezone; '
            + 'fromFormat=How to parse the existing date; '
            + 'toTz=To timezome; '
            + 'toFormat=Format string. Defaults to ISO 8601 format; ',
        settingsKey: 'datetime.convertTimeOptions',
        settingsDefault: 'fromTz=, fromFormat=, toTz=, toFormat=',
        showPrompt: true,
        properties: [
            'fromFormat',
            'fromTz',
            'toTz',
            'toFormat',
        ],
    });

    return options as ConvertTimeOptions;
}