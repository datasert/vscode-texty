Overview
==
Texty is a set of Text related utilities that could be used, in general, in all languages.

All Texty commands are prefixed with `Texty: ` to make it clear and avoid confusion.

If you have any issues, please create an issue at https://github.com/datasert/vscode-texty/issues

Insert
--
| Command                          | Description                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------------ |
| Insert Uuid                      | Generates a uuid and inserts into the selections. For ex.,                                 |
| Insert Uuid Key                  | Generates a uuid with {} guards and inserts into the selections                            |
| Insert Lorem Ipsum Paragraph     | Inserts one paragraph of lorem ipsum text into selections                                  |
| Insert Lorem Ipsum Sentence      | Inserts one sentense of lorem ipsum text into selections                                   |
| Insert Lorem Picsum              | Inserts image tag with image from Lorem Picsum with previosly specified or default options |
| Insert Lorem Picsum with Options | Shows options dialog box and then inserts random image based on specified options          |
|                                  |                                                                                            |

Convert Case
--
| Command                  | Description                                 |
| ------------------------ | ------------------------------------------- |
| Convert to Lower Case    | For ex., `Account Number => account number` |
| Convert to Upper Case    | For ex., `Account Number => ACCOUNT NUMBER` |
| Convert to Camel Case    | For ex., `Account Number => accountNumber`  |
| Convert to Pascal Case   | For ex., `account number => AccountNumber`  |
| Convert to Snake Case    | For ex., `Account Number => account_number` |
| Convert to Kebab Case    | For ex., `Account Number => account-number` |
| Convert to Constant Case | For ex., `Account Number => ACCOUNT_NUMBER` |
| Convert to Dot Case      | For ex., `Account Number => Account.Number` |
| Convert to Path Case     | For ex., `Account Number => Account/Number` |
| Convert to Space Case    | For ex., `Account-Number => Account Number` |
| Convert to Sentense Case | For ex., `Account Number => Account number` |
| Convert to Capital Case  | For ex., `account number => Account Number`                                            |

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
|                |                          |

Encryption
--
| Command       | Description                                                                             |
| ------------- | --------------------------------------------------------------------------------------- |
| View MD5 Hash | Shows the Md5 hash of selections or all text                                            |
| Encrypt Text  | Prompts for password and replaces each selections with encrypted base64 encoded strings |
| Decrypt Text  | Prompts for password and replaces each selections with decrypted base64 encoded strings |


Free logo from https://preview.freelogodesign.org/?lang=EN&autodownload=true&logo=fe445b5c-8f79-400b-8dd7-aaaf99959373
