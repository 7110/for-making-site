# front-env

## explain environment
this front development environment is using gulp!

- compile _scss_ to _css_
- compile _es6_ to _es6_
- compress images of _png_ & _jpg_
- browser sync


## make environment

### install _brew_
```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### install _node_
```bash
brew install node
```

### install _yarn_
```bash
brew install yarn
```

### install packages
in the same directory with _package.json_

```bash
yarn install
```

### gulp tasks
```bash
# compile scss and es6 + compress images + browser sync
yarn run dev

# build for deployment by compiled and compressed
yarn run build
```
