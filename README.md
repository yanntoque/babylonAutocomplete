# [ Master I | MIAGE ] Technology Monitoring : Babylon.js, CoffeeScript and VSCode Extension

This project aims to create an autocomplete extension for Babylon.js in coffeescript files thanks to the [Language Server Extension](https://code.visualstudio.com/api/language-extensions/language-server-extension-guide) provided by VSCode. 

To understand what is Language Server and why we use it in this project please refer to this link : https://code.visualstudio.com/api/language-extensions/language-server-extension-guide#why-language-server

# LSP Sample 
 
This is the folder that contains the code of the extension. 

* Go to the lsp-sample folder :
```
cd lsp-sample 
```
* Run `npm install` in this folder. This installs all necessary npm modules in both the client and server folder
* Open VS Code on this folder.
* Press Ctrl+Shift+B to compile the client and server.
* Switch to the Debug viewlet.
* Select `Launch Client` from the drop down.
* Run the launch config.
* If you want to debug the server as well use the launch configuration `Attach to Server`
* In the [Extension Development Host] instance of VSCode, open a document in 'plain text' language mode.
  * Type `n` or `B` to see `new (` and `BABYLON.` completion.
  * Enter text content such as `AAA aaa BBB`. The extension will emit diagnostics for all words in all-uppercase.

# Babylon Sample

### Instructions to compile the [example from Babylon.js](https://playground.babylonjs.com/) written in coffeescript and see the output

* Go to the babylon-sample folder then run the npm command : 
```
cd babylon-sample
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

## What is [CoffeeScript](https://en.wikipedia.org/wiki/CoffeeScript) ?

CoffeeScript is a programming language that transcompiles to JavaScript. It adds syntactic sugar inspired by Ruby, Python and Haskell in an effort to enhance JavaScript's brevity and readability.[4] Specific additional features include list comprehension and pattern matching.

### How to install it ? 

```
# Install globally to execute .coffee files anywhere:
npm install --global coffeescript
```