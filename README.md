## Description

Script to generate [CHIP-0007](https://github.com/Chia-Network/chips/blob/main/assets/chip-0007/schema.json) compliant NFT metadata.

## Requirements

- Git
- Node.js >= v10
- An input CSV file with the following headers
  - `Series Number`
  - `Filename`
  - `Name`
  - `Description`
  - `Gender`
  - `Attributes`: in the format `trait_name:value;trait_name:value`

## Setup

Clone this repository

```bash
git clone https://github.com/a11rew/json-gen
```

Install the dependencies

```bash
cd json-gen
npm install
```

### Usage

Run the start command with 1 arguments - The name/path of your input csv file.

```bash
npm run start <Input CSV file name/path>
```

Example

```bash
npm run start test.csv
```

This will output 2 files to the directory

- A csv file with SHA256 hashes appended to the input CSV's rows. This file is named `<File name>.output.csv`
- A json file with entries following the CHIP-0007 standard. This file is named `<File name>.json`

See the `sample` directory for example usage.
