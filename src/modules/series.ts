import padStart from 'lodash.padstart';
import * as vscode from 'vscode';
import * as utils from '../utils';

export class NumberSeriesOptions {
    start: number = 0;
    step: number = 1;
    max?: number;
    paddingSize?: number;
    paddingString: string = '0';
}

export function generateFrom0(count: number) {
    return generate(count, new NumberSeriesOptions());
}

export function generateFrom1(count: number) {
    const options = new NumberSeriesOptions();
    options.start = 1;
    return generate(count, options);
}

export function generate(count: number, options?: NumberSeriesOptions) {
    if (!options) {
        return undefined;
    }

    const values: string[] = [];
    
    let value = options.start;
    for (let index = 0; index < count; index++) {
        values.push(options.paddingSize ? padStart(value.toString(), options.paddingSize, options.paddingString) : value.toString());
        value += options.step;
        
        if (options.max && value > options.max) {
            value = options.start;
        }
    }

    return values;
}

export async function getNumberSeriesOptions(context: vscode.ExtensionContext): Promise<NumberSeriesOptions> {
    const options = await utils.getOptions(context, {
        placeHolder: 'Specify options with comma separated key=value pairs',
        message: 'Enter Number Series Options. Defaults to [start=0, step=1, max=, paddingSize=0, paddingString=0]. Where ' 
            + 'start=Number to start the series with. It can be any number; '
            + 'step=Number to add for each series. It can be -ve value; '
            + 'max=If you want series to stop at some point, you can set max. If maxed out, then series will start over; '
            + 'paddingSize=If you want to pad the series, specify the size of the padding; '
            + 'paddingString=Padding string to use; ',
        settingsKey: 'series.numberSeries',
        settingsDefault: 'start=0, step=1, max=, paddingSize=0, paddingString=0',
        showPrompt: true,
        properties: [
            'start:float',
            'step:float',
            'max:float',
            'paddingSize:int',
            'paddingString'
        ],
    });

    return options as NumberSeriesOptions;
}