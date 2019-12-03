Overview
==
Texty is a sweet set of Text related utilities that makes you power user.

If you have any issues or feature requests, please create an issue at https://github.com/datasert/vscode-texty/issues. You can also use `Texty: Create Issue` command to open this url.

Install
==
To install this extension, follow these steps.

* Open VS code and goto Extensions side bar
* Search for `Texty`
* Click on `Install` Button

![Install](https://i.imgur.com/4n06Vp9.gif)


Commands
==
Texty has multiple modules, each of them with multiple utilities/commands.

Usually all commands within the module starts with same verb. For ex., `insert` or `Convert`.

Also all Texty commands are prefixed with `Texty:` to make it clear and avoid confusion. So to list all Texty commands, just enter `Texty: `.

Open
--
| Command                         | Description                                                                                                                                         |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Open file in Browser            | Opens the current file in previously selected browser                                                                                               |
| Open file in Browser...         | Opens the current file in browser selected by the user. Once selected, the browser preference is saved and then above command will use this browser |
| Open file in System default app | Opens the current file in System associated app.                                                                                                    |

Copy
--
| Command                         | Description                                                                                                                                         |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Copy text                       | Copies the selections in text only mode into clipboard                                                                                              |
| Copy text append                | Appends the selections in text only mode into current text contents of the clipboard |

Insert
--
| Command                          | Description                                                                                                                            |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Insert Number Series from 0      | Inserts number series starting from 0                                                                                                  |
| Insert Number Series from 1      | Inserts number series starting from 1                                                                                                  |
| Insert Number Series...          | Prompts user to enter various options and inserts series according to specified options.                                               |
| Insert Uuid                      | Inserts uuid into the selections. For ex., ece1953e-8bca-46d8-a701-56c6fe1c1aaa                                                        |
| Insert Uuid (No Dashes)          | Inserts uuid without dashes into selections. For ex., ece1953e8bca46d8a70156c6fe1c1aaa                                                 |
| Insert Uuid Key                  | Inserts uuid with {} and inserts into the selections. For ex., {ece1953e-8bca-46d8-a701-56c6fe1c1aaa}                                  |
| Insert Short Id                  | Inserts short ids. For ex.,                                                                                                            |
| Insert Lorem Ipsum Word          | Inserts one word of lorem ipsum text into selections                                                                                   |
| Insert Lorem Ipsum Line          | Inserts one sentense of lorem ipsum text into selections                                                                               |
| Insert Lorem Ipsum Paragraph     | Inserts one paragraph of lorem ipsum text into selections                                                                              |
| Insert Lorem Ipsum with Options  | Prompts user for options and generates the text according to that                                                                      |
| Insert Lorem Picsum              | Inserts image tag with image from Lorem Picsum with previosly specified or default options. Checkout [Picsum](https://picsum.photos/). |
| Insert Lorem Picsum with options | Shows options dialog box and then inserts random image based on specified options                                                      |
| Insert Time ISO Format           | Inserts current time in ISO 8601 format. For ex., 2019-11-30T04:25:12Z                                                                 |
| Insert Date ISO Format           | Inserts today in ISO 8601 format. For ex., 2019-11-29                                                                                  |

Convert
--
| Command                  | Description                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------- |
| Convert to Lower Case    | For ex., account number                                                             |
| Convert to Upper Case    | For ex., ACCOUNT NUMBER                                                             |
| Convert to Camel Case    | For ex., accountNumber                                                              |
| Convert to Pascal Case   | For ex., AccountNumber                                                              |
| Convert to Snake Case    | For ex., account_number                                                             |
| Convert to Kebab Case    | For ex., account-number                                                             |
| Convert to Constant Case | For ex., ACCOUNT_NUMBER                                                             |
| Convert to Dot Case      | For ex., Account.Number                                                             |
| Convert to Path Case     | For ex., Account/Number                                                             |
| Convert to Space Case    | For ex., Account Number                                                             |
| Convert to Sentense Case | For ex., Account number                                                             |
| Convert to Capital Case  | For ex., Account Number                                                             |
| Convert to Date/Time...  | Prompts user for options and converts the date/time to according to those options.  |
| Convert to relative time | Converts the date/times to relative times. For ex., 2 minutes ago, 5 days ago etc., |

Filter
--
| Command                                            | Description                                                   |
| -------------------------------------------------- | ------------------------------------------------------------- |
| Filter lines containing string                     | Filters lines containing user specified string                |
| Filter lines containing string into new editor     | Same as above but inserts the results into new text editor    |
| Filter lines not containing string                 | Filters lines not containing user specified string            |
| Filter lines not containing string into new editor | Same as above but inserts the results into new text editor    |
| Filter lines containing regex                      | Filters lines containing user specified regex pattern         |
| Filter lines containing regex into new editor      | Same as above but inserts the results into new text editor    |
| Filter lines not containing regex                  | Filters lines not containing the user specified regex pattern |
| Filter lines not containing regex into new editor  | Same as above but inserts the results into new text editor    |

Sort
--
| Command                             | Description                                                                                            |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Sort Lines                          | Sorts lines by ascending order                                                                         |
| Sort Lines (Descending)             | Sorts lines by descending order                                                                        |
| Sort Lines (Ignore Case)            | Sorts lines case insensitively by ascending order                                                      |
| Sort Lines (Ignore Case Descending) | Sorts lines case insensitively by descending order                                                     |
| Sort Lines (Length)                 | Sorts lines by length of each line (shortest first)                                                    |
| Sort Lines (Length Descending)      | Sorts lines by length of each line descending (long first)                                             |
| Sort Lines (Shuffle)                | Sorts lines by random order                                                                            |
| Sort Lines (Natural)                | Sorts lines by natural order. Natural order is where numbers with in the lines are sorted numerically. |
| Sort Lines (Natural Descending)     | Sorts Lines by natural order (see above) descending order                                              |

Remove
--
| Command                              | Description                                           |
| ------------------------------------ | ----------------------------------------------------- |
| Remove Blank Lines                   | Removes all blank lines (lines with only whitespaces) |
| Remove Blank Lines (Surplus)         | Removes all blank lines if there are more than one    |
| Remove Duplicate Lines               | Removes all duplicate lines                           |
| Remove Duplicate Lines (Ignore Case) | Removes all duplicate lines ignoring case             |

Split
--
| Command                     | Description                                                        |
| --------------------------- | ------------------------------------------------------------------ |
| Split by Sentences          | Splits the selection by sentences (separated by dot)               |
| Split by Length             | Prompts user to enter max length and splits the lines by that size |
| Split by Length (80 chars)  | Splits the lines by max 80 chars                                   |
| Split by Length (120 chars) | Splits the lines by max 120 chars                                  |

Join
--
| Command                  | Description                                                      |
| ------------------------ | ---------------------------------------------------------------- |
| Join lines for In clause | Joins the lines to SQL in clause format. For ex., `'foo', 'bar'` |
| Join lines to csv        | Joins the lines to csv                                           |
| Join lines with space    | Joins the lines with space in between                            |
| Join lines with options  | Prompts user for options and joins the lines with that options   |

Encoding/Decoding
--
| Command        | Description              |
| -------------- | ------------------------ |
| Url Encode     | Url Encodes the text     |
| Url Decode     | Url Decodes the text     |
| Base 64 Encode | Base 64 Encodes the text |
| Base 64 Decode | Base 64 Decodes the text |
| Html Encode    | Html Encodes the text    |
| Html Decode    | Html Decodes the text    |
| Xml Encode     | Xml Encodes the text     |
| Xml Decode     | Xml Decodes the text     |
| Jwt Decode     | Jwt Decodes the text     |

Encryption
--
| Command       | Description                                                                             |
| ------------- | --------------------------------------------------------------------------------------- |
| View MD5 Hash | Shows the Md5 hash of selections or all text                                            |
| Encrypt Text  | Prompts for password and replaces each selections with encrypted base64 encoded strings |
| Decrypt Text  | Prompts for password and replaces each selections with decrypted base64 encoded strings |

Translate
--
| Command                | Description                                        |
| ---------------------- | -------------------------------------------------- |
| Translate using Google | Opens the Google Translate url using selected text |

Guides
==

Number Series
--
Command `Insert Number Series...` can be used to generate number series of any kind using options below.

| Option      | Type         | Description                                                                                                                                                                                   |
| ----------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `start`     | int or float | The starting number of the series. It can be integer or float and can also be -ve value. For ex., 1 or 1.5 or -100                                                                                                             |
| `step`      | int or float | The amount to increment for each new number. This value will be added to previous value. This can be -ve value if you want to series to go back.                            |
| `count`     | int          | The maximum number of values to generate. After these many values are generated, series will start over from `start` value                                                                       |
| `format`    | string       | If you want to format the numbers, you can specify the format string here and it will be formatted using `numeral` npm package. See [here](http://numeraljs.com/) for formatting options.                                                                                                                                                                                              |
| `padSize`   | int          | If you want to pad the numbers, you can specify the size of total length of string. If generated series is smaller than this length, then it will be left padded with string specified below. |
| `padString` | string       | If number needs to be padded, it will use this pad string. This can be single char or multi char. If no pad string is specified, then defaults to space.                                      |

![](https://i.imgur.com/1rbkYNN.gif)

Credits
==
* Open source libraries: `lodash`, `jwt-decode`, `entities`, `lorem-ipsum`, `uuid`
* Logo from https://preview.freelogodesign.org/?lang=EN&autodownload=true&logo=fe445b5c-8f79-400b-8dd7-aaaf99959373
* Texty is dedicated to my wife Madhu (means honey in Indian)
