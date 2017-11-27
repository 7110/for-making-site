# mapping.website

## make environment
this gulp environment has two tasks of compiling sass and es6.

### install brew
```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### install node
```bash
brew install node
```

### install yarn
```bash
brew install yarn
```

### install packages
type in the same directory with package.json  
```bash
yarn install
```

### start tasks
```bash
# compile scss and es6 + live reload
yarn run default

# only compile scss and es6
yarn run compile
```

### add package
```bash
yarn add [package name]
```
