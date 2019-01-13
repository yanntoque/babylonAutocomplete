/*
In this file we store the list of all completion items
This file will be imported in the server.ts file 
*/

import { CompletionItemKind } from 'vscode-languageserver';

const labels = [
    {
        label: 'Engine)(canvasOrContext, antialias, options, adaptToDeviceRatio)',
        kind: CompletionItemKind.Text,
        data: 1
    },
    {
        label: 'Scene)(engine, options)',
        kind: CompletionItemKind.Text,
        data: 2
    },
    {
        label: 'FreeCamera)(name, position, scene, setActiveOnSceneIfNoneActive)',
        kind: CompletionItemKind.Text,
        data: 3
    },
    {
        label: 'Vector3)(x,y,z)',
        kind: CompletionItemKind.Text,
        data: 4
    },
    {
        label: 'HemisphericLight)(name, direction, scene)',
        kind: CompletionItemKind.Text,
        data: 5
    },
    {
        label: 'BABYLON.',
        kind: CompletionItemKind.Text,
        data: 6
    },
    {
        label: 'new (',
        kind: CompletionItemKind.Text,
        data: 7
    }
];

export default labels;