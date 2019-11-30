Overview
==
Texty is a sweet set of Text related utilities that makes you power user.

All Texty commands are prefixed with `Texty:` to make it clear and avoid confusion.

If you have any issues or feature requests, please create an issue at https://github.com/datasert/vscode-texty/issues. You can also use `Texty: Create Issue` command to open this url.

Modules
==
Texty has multiple modules, each of them with multiple utilities. Usually all commands within the module starts with same verb. For ex., `insert` or `Convert`.

Insert
--
| Command                           | Description                                                                                                                            |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Insert Number Series from 0       | Inserts number series starting from 0                                                                                                  |
| Insert Number Series from 1       | Inserts number series starting from 1                                                                                                  |
| Insert Number Series with Options | Prompts user to enter various options and inserts series according to specified options.                                               |
| Insert Uuid                       | Inserts uuid into the selections. For ex., ece1953e-8bca-46d8-a701-56c6fe1c1aaa                                                        |
| Insert Uuid (No Dashes)           | Inserts uuid without dashes into selections. For ex., ece1953e8bca46d8a70156c6fe1c1aaa                                                 |
| Insert Uuid Key                   | Inserts uuid with {} and inserts into the selections. For ex., {ece1953e-8bca-46d8-a701-56c6fe1c1aaa}                                  |
| Insert Short Id                   | Inserts short ids. For ex.,                                                                                                            |
| Insert Lorem Ipsum Sentence       | Inserts one sentense of lorem ipsum text into selections                                                                               |
| Insert Lorem Ipsum Paragraph      | Inserts one paragraph of lorem ipsum text into selections                                                                              |
| Insert Lorem Picsum               | Inserts image tag with image from Lorem Picsum with previosly specified or default options. Checkout [Picsum](https://picsum.photos/). |
| Insert Lorem Picsum with Options  | Shows options dialog box and then inserts random image based on specified options                                                      |

Convert Case
--
| Command                  | Description             |
| ------------------------ | ----------------------- |
| Convert to Lower Case    | For ex., account number |
| Convert to Upper Case    | For ex., ACCOUNT NUMBER |
| Convert to Camel Case    | For ex., accountNumber  |
| Convert to Pascal Case   | For ex., AccountNumber  |
| Convert to Snake Case    | For ex., account_number |
| Convert to Kebab Case    | For ex., account-number |
| Convert to Constant Case | For ex., ACCOUNT_NUMBER |
| Convert to Dot Case      | For ex., Account.Number |
| Convert to Path Case     | For ex., Account/Number |
| Convert to Space Case    | For ex., Account Number |
| Convert to Sentense Case | For ex., Account number |
| Convert to Capital Case  | For ex., Account Number |

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

Credits
==
* Open source libraries: `lodash`, `jwt-decode`, `entities`, `lorem-ipsum`, `uuid`
* Logo from https://preview.freelogodesign.org/?lang=EN&autodownload=true&logo=fe445b5c-8f79-400b-8dd7-aaaf99959373
* Texty is dedicated to my wife Madhu (means honey in Indian)
