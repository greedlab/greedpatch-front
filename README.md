# node-front-template

template for front end based on node.js

English | [中文](README-CN.md)

## Install from code

### clone

```
$ git clone https://github.com/greedlab/node-front-template.git
```

### develop env

```
$ npm install -g gulp
$ npm install -g nodemon
$ npm install (if not OS X use npm install --no-optional)
$ gulp build
$ gulp watch
$ npm run develop
```

### production env

```
$ npm install -g pm2
$ npm install --production
$ npm run release
```

## How to use

### Register

```
/register
```

The first user will be the administrator.

### Login

* <http://patch.greedlab.com/login>


### Create project

* <http://patch.greedlab.com/projects/new>


### Create patch

`go to the home page` > `select a project` > `click Create patch`

### Create access token

* <http://patch.greedlab.com/settings/my/tokens/new>

And then, you can use the token to [check new patch](https://github.com/greedlab/greedpatch-document/blob/master/api/patch/check.md)
