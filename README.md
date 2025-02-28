<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# REPSEL API

This API is designed to automatically update product prices on the **Repsel** platform using existing prices in **SAP**. The API performs PUT queries to update prices on the Repsel platform with the information obtained from SAP.

## Characteristics

- **Automatic Price Update**: The API consults and updates the prices of Repsel products according to the existing values ​​in SAP.
- **Integration with Repsel API**: The API connects with the API provided by our provider for data updating.
- **Scheduled Task in Windows**: The API is integrated into a scheduled task in Windows, which allows the update process to be carried out automatically at predefined intervals.

## Flow of Operation

1. **Connection with SAP**: The API obtains the most updated prices from SAP.
2. **Price Update in Repsel**: Through PUT queries, the API updates the prices of the products on the Repsel platform.

## PricesList and GroupRepselID

|  Branch  | Price List SAP | RepselProperty |
| :------: | :------------: | :------------: |
| Alianza  |       3        |       7        |
|    FG    |       3        |       5        |
|   FGM    |       1        |       2        |
| Pacifico |       1        |       1        |

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
