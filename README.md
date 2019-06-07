# GMT nginx log monitoring

## Requirements

* Nodejs 8.10.x

Clone project and run test.

```
$ git clone https://git_url_clone <project_dir>
$ cd <project_dir>
$ npm install
$ npm run test
```

Copy sh/env.example.sh to sh/env.sh.

```
$ cd <project_dir>
$ cp env.example.sh env.sh
```

Edit file env.sh by yourself and run command below to initialization environment variable.

```
$ cd <project_dir>
$ source sh/env.sh
```

Run project

```
$ cd <project_dir>
$ node src/index.js
```
