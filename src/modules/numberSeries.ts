import padStart from 'lodash.padstart';
import * as vscode from 'vscode';
import numeral from 'numeral';
import * as utils from '../utils';

export class Options {
    start: number = 0;
    step: number = 1;
    count?: number;
    padSize?: number;
    padString: string = '0';
    format?: string;
}

export function generateFrom0(count: number) {
    return generate(count, new Options());
}

export function generateFrom1(count: number) {
    const options = new Options();
    options.start = 1;
    return generate(count, options);
}

function formatNumber(value: number, format: string) {
    return numeral(value).format(format);
}

export function generate(count: number, options?: Options) {
    if (!options) {
        return undefined;
    }

    const values: string[] = [];
    let value = options.start;
    let loopCount = 0;
    
    for (let index = 0; index < count; index++) {
        const formattedNumber = formatNumber(value, options.format || '#');
        values.push(options.padSize ? padStart(formattedNumber, options.padSize, options.padString || ' ') : formattedNumber);
        value += options.step;
        
        loopCount++;
        if (options.count && loopCount >= options.count) {
            loopCount = 0;
            value = options.start;
        }
    }

    return values;
}

export async function getOptions(): Promise<Options> {
    const options = await utils.getOptions({
        placeHolder: 'Specify options with comma separated key=value pairs',
        message: 'Enter Number Series Options. Defaults to [start=0, step=1, format=#, count=, padSize=0, padString=0]. Where ' 
            + 'start=Number to start the series with. It can be any number; '
            + 'step=Number to add for each series. It can be -ve value; '
            + 'format=Number format according to numeral npm package. Defaults to no decimal places; '
            + 'count=If you want series to stop at some point, you can set max. If maxed out, then series will start over; '
            + 'padSize=If you want to pad the series, specify the size of the padding; '
            + 'padString=Padding string to use; ',
        settingsKey: 'series.numberSeriesOptions',
        settingsDefault: 'start=0, step=1, format=#, count=, padSize=0, padString=0',
        showPrompt: true,
        properties: [
            'start:float',
            'step:float',
            'format',
            'count:int',
            'padSize:int',
            'padString'
        ],
        trimValues: true,
    });

    return options as Options;
}