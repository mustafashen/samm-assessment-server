# Coordinate keeping server for Leaflet Map Center Marker Project

### METHODS:

#### GET /points
Returns:
```
{
"data": {
    "id": string,
    "type": "points",
    "attributes": {
      "latitude": number,
      "longitude": number,
      "id": string,
      "datetime": string
  }[]
}
```

#### POST /points
Returns:
```
{
"data": {
    "id": string,
    "type": "points",
    "attributes": {
      "latitude": number,
      "longitude": number,
      "id": string,
      "datetime": string
  }
}
```
#### DELETE /points/:id
Returns:
```
{
"data": {
    "id": string,
    "type": "points",
    "attributes": {
      "latitude": number,
      "longitude": number,
      "id": string,
      "datetime": string
  }
}
```

### Errors
Returns:
```
{
"errors": {
    "title": string,
    "detail": string
  }[]
}
```
## Usage for Production

- Clone the repo
- Run `pnpm install`
- Run `pnpm build`
- Run `pnpm start`

### Usage for Development

- Clone the repo
- Run `pnpm install`
- Run `pnpm build`
- Run `pnpm dev`
