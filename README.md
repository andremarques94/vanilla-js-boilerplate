# BOILERPLATE FOR JAVASCRIPT VANILLA PROJECTS

## NODE >=20.11.1 is required

## Available scripts

-   `npm run dev` - runs development server
-   `npm run build` - builds the project

## Installation

```bash
npm install
```

## What it has

-   ESBUILD
-   ESLINT && PRETTIER
-   ROUTING
-   DEV SERVER

## Routing your app

-   Add your page in `/js/pages` folder
-   The file name should be the same as the route name
-   Routes are created on build time and will have the same name as the file

e.g.

```bash

├── pages
    ├── home.js
    └── test
        └── other.js

```

Will create the following routes:

-   `/home`
-   `/test/other`
