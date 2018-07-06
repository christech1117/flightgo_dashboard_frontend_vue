
## Installation

``` bash
# clone the repo
$ git clone -b dev https://github.com/housekeepbao/flightgo_dashboard.git flightgoai-project

# go into app's directory
$ cd flightgoai-project

# install app's dependencies
$ npm install
$ npm run serve
```

## Usage

``` bash
# serve with hot reload at localhost:8080
npm run serve

# build for production with minification
npm run build

# run linter
npm run lint

# run unit tests
npm run test:unit

# run e2e tests
npm run test:e2e

```

For a detailed explanation on how things work, check out the [Vue CLI Guide](https://cli.vuejs.org/guide/).

## What's included

Within the download you'll find the following directories and files:

```
Flightgo
├── public/          #static files
│   └── index.html   #html temlpate
├── src/             #project root
│   ├── assets/      #assets
│   │   └── scss/    #user scss/css source
│   ├── components/  # components source
│   ├── containers/  # containers source
│   ├── router/      # routing 
│   ├── shared/      # utils
│   ├── views/       # views source
│   ├── _nav.js      # sidebar nav config
│   ├── App.vue      # main app component
│   └── main.js      # app entry file
└── package.json
```

