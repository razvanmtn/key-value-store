# key-value-store

Simple key-value in-memory database implemented in Nodejs.

## Run

```
yarn start
```

## Rest Endpoints

Status text
`GET:/`

Fetch Value
`GET:/:key`

Create Value
`POST:/:key`

Create Value with expiration
`POST:/:key?ms=5000`

Delete Value
`DELETE:/:key

