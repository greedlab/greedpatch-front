# FAQ

## Q1

### question:

```
stop at node scripts/install.js when install node-sass
```

### answer:

更新 npm

```
$ npm update npm -g
$ npm install node-sass
```


## Q2

### question:

```
[09:52:09] Starting 'min-assets-image'...
[09:52:09] Plumber found unhandled error:
 Error in plugin 'gulp-imagemin:'
Message:
    spawn /Users/bell/Github/love/node_modules/optipng-bin/vendor/optipng ENOENT
Details:
    code: ENOENT
    errno: ENOENT
    syscall: spawn /Users/bell/Github/love/node_modules/optipng-bin/vendor/optipng
    path: /Users/bell/Github/love/node_modules/optipng-bin/vendor/optipng
    spawnargs: -strip,all,-clobber,-force,-fix,-o,3,-out,/var/folders/nx/bpq_jm2j0hq72nn0zh03jkyw0000gn/T/9e99b91d-885c-43ac-afeb-f98304b3869e,/var/folders/nx/bpq_jm2j0hq72nn0zh03jkyw0000gn/T/8aca9280-675e-4f12-938b-5d982197cbdb
    cmd: /Users/bell/Github/love/node_modules/optipng-bin/vendor/optipng -strip all -clobber -force -fix -o 3 -out /var/folders/nx/bpq_jm2j0hq72nn0zh03jkyw0000gn/T/9e99b91d-885c-43ac-afeb-f98304b3869e /var/folders/nx/bpq_jm2j0hq72nn0zh03jkyw0000gn/T/8aca9280-675e-4f12-938b-5d982197cbdb
    stdout: 
    stderr: 
    fileName: /Users/bell/Github/love/src/assets/images/GitHub-Mark-64px.png
```

### answer:

更新 optipng-bin

```
$ npm install optipng-bin
```
