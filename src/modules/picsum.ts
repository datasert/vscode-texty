import * as vscode from 'vscode';

export class Options {
  id = 0;
  width = 600;
  height = 400;
  blur = 0;
  grayscale = 0;
}

function getRandomId() {
  const min = 1;
  const max = 1085;
  return parseInt('' + (Math.random() * (max - min) + min), 10);
}

export function generatePicsum(options: Options | undefined) {
  if (!options) {
    return undefined;
  }

  let tag = `<img src="https://picsum.photos`;
  if (options.id === 0) {
    tag += '/id/' + getRandomId();
  } else if (options.id > 0) {
    tag += '/id/' + options.id;
  }

  tag += `/${options.width}/${options.height}?`;

  let query = '';
  if (options.grayscale > 0) {
    query += '&grayscale';
  }
  if (options.blur > 0) {
    query += '&blur=' + options.blur;
  }

  if (query) {
    tag += query.substr(1);
  }

  tag += '"/>';
  return tag;
}

export async function getPicsumOptions(context: vscode.ExtensionContext, prompt: boolean = false) {
  let value = context.globalState.get<string>('picsum.options', 'id=0, width=600, height=400, blur=0, grayscale=0');

  if (prompt) {
    const resp = await vscode.window.showInputBox({
      value,
      prompt: 'Enter the options for Picsum images. If id=0, random id will be substituted. If id = -1, '
        + 'tag will be generated without id so it will load with random image each time it is rendered.\n\n',
      placeHolder: 'For ex., `id=0, width=600, height=400, blur=0, grayscale=0`',
    });

    if (!resp) {
      return undefined;
    }

    context.globalState.update('picsum.options', resp);
    value = resp;
  }

  const options = new Options();

  value.split(',').forEach(pair => {
    try {
      const parts = pair.split('=');
      const key = parts[0].trim();
      const value = parts[1].trim();

      if (key === 'id') {
        options.id = parseInt(value);

      } else if (key === 'width') {
        options.width = parseInt(value);

      } else if (key === 'height') {
        options.height = parseInt(value);

      } else if (key === 'blur') {
        options.blur = parseInt(value);

      } else if (key === 'grayscale') {
        options.grayscale = parseInt(value);
      }

    } catch (error) {
      console.error(error);
      // ignore
    }
  });

  return options;
}

