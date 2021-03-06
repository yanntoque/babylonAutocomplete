# [ Master I | MIAGE ] Technology Monitoring : Babylon.js, CoffeeScript and VS Code Extension

This project aims to create an autocomplete extension for Babylon.js in coffeescript files thanks to the [Language Server Extension](https://code.visualstudio.com/api/language-extensions/language-server-extension-guide) provided by VS Code. 

To understand what is Language Server and why we use it in this project please refer to this link : https://code.visualstudio.com/api/language-extensions/language-server-extension-guide#why-language-server

# 1) Instructions for `lsp-sample` 
 
This folder contains the code to create an autocomplete extension (original [here](https://github.com/Microsoft/vscode-extension-samples/tree/master/lsp-sample)). 

* Go to the `lsp-sample` folder 
* Run `npm install` in this folder. This installs all necessary npm modules in both the client and server folder
* Open VS Code on this folder.
* Press Ctrl+Shift+B to compile the client and server.
* Switch to the Debug viewlet with Ctrl+Shift+D.
* Select `Launch Client` from the drop down and run it.
* You should have a new VS Code window opened called "[Extension Development Host]"
* In the [Extension Development Host] instance of VS Code, open the `main.coffee` from the folder `babylon-sample/src`
* Follow the instructions of the next section 


# 2)  Instructions for `babylon-sample`

* Go to the `babylon-sample` folder then run the npm command : 
```
npm run compile 
```

* Go to the  `babylon-sample/out/` folder and open the `index.html` in your browser 

* You can modify the code of `main.coffee` from the [Extension Development Host] instance of VS Code
    * Type n or B to see new ( and BABYLON. completion.

* Save your modifications and refresh the page in your browser to see the compiled code 

# Explanation on the Autocomplete 

For the autocomplete purpose we need two different files from `lsp-sample\server\src\`:

 * `label.ts` stores all the completion items. This very file will be called in the second one.

 Structure example for the item **new(**. The user types `n` and our extension will suggest completion with `new(`, to confirm it he must press ENTER : 
 
 ```
import { CompletionItemKind } from 'vscode-languageserver';

const labels = [
    {
        label: 'new (',
        kind: CompletionItemKind.Text,
        data: 1
    }
} 
 ```

 * the second one is the `server.ts` it imports all items from the previous file and go throught it and add additionnal information to the item (matched by id) such as detail and documentation :
 ```
 case 1:
				(item.detail = 'new ('),
					(item.documentation = 'Instanciates a BABYLON')
				break;
 ``` 


## What is [Babylon.js](https://www.babylonjs.com/) ?

JavaScript API designed to render interactive 3D computer graphics and 2D graphics within any compatible web browser, without the use of any plug-ins.

## What is [VS Code](https://code.visualstudio.com/) ?

VS Code is a type of tool that combines the simplicity of a code editor with what developers need for their core edit-build-debug cycle. It provides comprehensive editing and debugging support, an extensibility model, and lightweight integration with existing tools.

## What is [CoffeeScript](https://en.wikipedia.org/wiki/CoffeeScript) ?

CoffeeScript is a programming language that transcompiles to JavaScript. It adds syntactic sugar inspired by Ruby, Python and Haskell in an effort to enhance JavaScript's brevity and readability.[4] Specific additional features include list comprehension and pattern matching.

### How to install it ? 

```
# Install globally to execute .coffee files anywhere:
npm install --global coffeescript
```