# [ Master I | MIAGE ] Technology Monitoring : Babylon.js, CoffeeScript and VSCode Extension

This project aims to create an autocomplete extension for Babylon.js thanks to the [Language Server Extension](https://code.visualstudio.com/api/language-extensions/language-server-extension-guide) provided by VSCode. 

To understand what is Language Server and why we use it in this project please refer to this link : https://code.visualstudio.com/api/language-extensions/language-server-extension-guide#why-language-server

# LSP Sample 
 
This is the folder that contains the code of the extension. 

# Babylon Sample

### Instructions to compile the [example from Babylon.js](https://playground.babylonjs.com/) written in coffeescript and see the output

* Go to the babylon_sample folder then run the npm command : 
```
cd babylon_sample
npm run compile 
```

* Check if an out/ folder has been created with this commmand :

```
ls | grep 'out'
```

* Go to the out folder and open the index.html in your browser 


## What is [Babylon.js](https://www.babylonjs.com/) ?

JavaScript API designed to render interactive 3D computer graphics and 2D graphics within any compatible web browser, without the use of any plug-ins.

## What is [VSCode](https://code.visualstudio.com/) ?

VS Code is a type of tool that combines the simplicity of a code editor with what developers need for their core edit-build-debug cycle. It provides comprehensive editing and debugging support, an extensibility model, and lightweight integration with existing tools.

## What is [CoffeeScript](https://en.wikipedia.org/wiki/CoffeeScript)

CoffeeScript is a programming language that transcompiles to JavaScript. It adds syntactic sugar inspired by Ruby, Python and Haskell in an effort to enhance JavaScript's brevity and readability.[4] Specific additional features include list comprehension and pattern matching.