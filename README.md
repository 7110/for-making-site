# front-env

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

## Atom's packages
* [emmet](https://atom.io/packages/emmet)  
the essential tool for web developers

* [file-icons](https://atom.io/packages/file-icons)  
assign file extension icons and colours for improved visual grepping

* [pigments](https://atom.io/packages/pigments)  
A package to display colors in project and files

* [autocomplete-paths](https://atom.io/packages/autocomplete-paths)  
Adds path autocompletion to autocomplete+
