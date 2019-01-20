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
        label: 'HemisphericLight)(name, direction, scene)',
        kind: CompletionItemKind.Text,
        data: 4
    },
    {
        label: 'BABYLON.',
        kind: CompletionItemKind.Text,
        data: 5
    },
    {
        label: 'new (',
        kind: CompletionItemKind.Text,
        data: 6
    },{
        label: 'Angle',
        kind: CompletionItemKind.Text,
        data: 16
    }
];

const vectors = [{
    label: 'Vector2)(x,y)',
    kind: CompletionItemKind.Text,
    data: 7
}, {
    label: 'Vector3)(x,y,z)',
    kind: CompletionItemKind.Text,
    data: 8
}, {
    label: 'Vector4)(x,y,z,w)',
    kind: CompletionItemKind.Text,
    data: 9
},].forEach(vector => {
    labels.push(vector);
});

const mesh = [{
    label: 'Mesh',
    kind: CompletionItemKind.Text,
    data: 10
}, {
    label: 'GroundMesh',
    kind: CompletionItemKind.Text,
    data: 11
}, {
    label: 'LinesMesh',
    kind: CompletionItemKind.Text,
    data: 12
},{
    label: 'MeshBuilder',
    kind: CompletionItemKind.Text,
    data: 29
}].forEach(mesh => {
    labels.push(mesh);
});

const actions = [{
    label: 'Action',
    kind: CompletionItemKind.Text,
    data: 13
},{
    label: 'ActionManager',
    kind: CompletionItemKind.Text,
    data: 14    
},{
    label: 'ActionEvent',
    kind: CompletionItemKind.Text,
    data: 15    
}].forEach(action => {
    labels.push(action);
});

const animations = [{
    label: 'Animation',
    kind: CompletionItemKind.Text,
    data: 17
},{
    label: 'AnimationEvent',
    kind: CompletionItemKind.Text,
    data: 18    
},{
    label: 'AnimationGroup',
    kind: CompletionItemKind.Text,
    data: 19    
},{
    label: 'AnimationPropertiesOverride',
    kind: CompletionItemKind.Text,
    data: 20    
},{
    label: 'AnimationRange',
    kind: CompletionItemKind.Text,
    data: 21    
}].forEach(animation => {
    labels.push(animation);
});

const colors = [{
    label: 'Color3',
    kind: CompletionItemKind.Text,
    data: 22
},{
    label: 'Color4',
    kind: CompletionItemKind.Text,
    data: 23    
}].forEach(color => {
    labels.push(color);
});

const meshShapes = [{
    label: 'CreateBox',
    kind: CompletionItemKind.Text,
    data: 24
},{
    label: 'CreateCylinder',
    kind: CompletionItemKind.Text,
    data: 25    
},{
    label: 'CreateDashedLines',
    kind: CompletionItemKind.Text,
    data: 26
},{
    label: 'CreateDecal',
    kind: CompletionItemKind.Text,
    data: 27    
},{
    label: 'CreateDisc',
    kind: CompletionItemKind.Text,
    data: 28    
},{
    label: 'CreateGround',
    kind: CompletionItemKind.Text,
    data: 30
},{
    label: 'CreateGroundFromHeightMap',
    kind: CompletionItemKind.Text,
    data: 31    
},{
    label: 'CreateIcoSphere',
    kind: CompletionItemKind.Text,
    data: 32
},{
    label: 'CreateLathe',
    kind: CompletionItemKind.Text,
    data: 33    
},{
    label: 'CreateLineSystem',
    kind: CompletionItemKind.Text,
    data: 34    
},{
    label: 'CreateLines',
    kind: CompletionItemKind.Text,
    data: 35
},{
    label: 'CreatePlane',
    kind: CompletionItemKind.Text,
    data: 36    
},{
    label: 'CreatePolygon',
    kind: CompletionItemKind.Text,
    data: 37
},{
    label: 'CreatePolyhedron',
    kind: CompletionItemKind.Text,
    data: 38    
},{
    label: 'CreateRibbon',
    kind: CompletionItemKind.Text,
    data: 39    
},{
    label: 'CreateSphere',
    kind: CompletionItemKind.Text,
    data: 40
},{
    label: 'CreateTiledGround',
    kind: CompletionItemKind.Text,
    data: 41    
},{
    label: 'CreateTorus',
    kind: CompletionItemKind.Text,
    data: 42
},{
    label: 'CreateTorusKnot',
    kind: CompletionItemKind.Text,
    data: 43    
},{
    label: 'CreateTube',
    kind: CompletionItemKind.Text,
    data: 44    
},{
    label: 'ExtrudePolygon',
    kind: CompletionItemKind.Text,
    data: 45    
},{
    label: 'ExtrudeShape',
    kind: CompletionItemKind.Text,
    data: 46    
},{
    label: 'ExtrudeShapeCustom',
    kind: CompletionItemKind.Text,
    data: 47    
}].forEach(shape => {
    labels.push(shape);
});

export default labels;