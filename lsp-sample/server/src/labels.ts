import { CompletionItemKind } from 'vscode-languageserver';

const labels = [
    {
        label: 'Engine)(canvasOrContext, antialias, options, adaptToDeviceRatio)',
        kind: CompletionItemKind.Constructor,
        data: 1
    },
    {
        label: 'Scene)(engine, options)',
        kind: CompletionItemKind.Constructor,
        data: 2
    },
    {
        label: 'FreeCamera)(name, position, scene, setActiveOnSceneIfNoneActive)',
        kind: CompletionItemKind.Constructor,
        data: 3
    },
    {
        label: 'HemisphericLight)(name, direction, scene)',
        kind: CompletionItemKind.Constructor,
        data: 4
    },
    {
        label: 'BABYLON.',
        kind: CompletionItemKind.Class,
        data: 5
    },
    {
        label: 'new (',
        kind: CompletionItemKind.Text,
        data: 6
    }, {
        label: 'Angle',
        kind: CompletionItemKind.Class,
        data: 16
    },
    {
        label: 'ShaderMaterial)()',
        kind: CompletionItemKind.Constructor,
        data: 48
    }
];

const vectors = [{
    label: 'Vector2)(x,y)',
    kind: CompletionItemKind.Constructor,
    data: 7
}, {
    label: 'Vector3)(x,y,z)',
    kind: CompletionItemKind.Constructor,
    data: 8
}, {
    label: 'Vector4)(x,y,z,w)',
    kind: CompletionItemKind.Constructor,
    data: 9
},].forEach(vector => {
    labels.push(vector);
});

const mesh = [{
    label: 'Mesh',
    kind: CompletionItemKind.Class,
    data: 10
}, {
    label: 'GroundMesh',
    kind: CompletionItemKind.Class,
    data: 11
}, {
    label: 'LinesMesh',
    kind: CompletionItemKind.Class,
    data: 12
}, {
    label: 'MeshBuilder',
    kind: CompletionItemKind.Class,
    data: 29
}].forEach(mesh => {
    labels.push(mesh);
});

const actions = [{
    label: 'Action',
    kind: CompletionItemKind.Class,
    data: 13
}, {
    label: 'ActionManager',
    kind: CompletionItemKind.Class,
    data: 14
}, {
    label: 'ActionEvent',
    kind: CompletionItemKind.Class,
    data: 15
}].forEach(action => {
    labels.push(action);
});

const animations = [{
    label: 'Animation',
    kind: CompletionItemKind.Class,
    data: 17
}, {
    label: 'AnimationEvent',
    kind: CompletionItemKind.Class,
    data: 18
}, {
    label: 'AnimationGroup',
    kind: CompletionItemKind.Class,
    data: 19
}, {
    label: 'AnimationPropertiesOverride',
    kind: CompletionItemKind.Class,
    data: 20
}, {
    label: 'AnimationRange',
    kind: CompletionItemKind.Class,
    data: 21
}].forEach(animation => {
    labels.push(animation);
});

const colors = [{
    label: 'Color3',
    kind: CompletionItemKind.Class,
    data: 22
}, {
    label: 'Color4',
    kind: CompletionItemKind.Class,
    data: 23
}].forEach(color => {
    labels.push(color);
});

const meshShapes = [{
    label: 'CreateBox',
    kind: CompletionItemKind.Text,
    data: 24
}, {
    label: 'CreateCylinder',
    kind: CompletionItemKind.Text,
    data: 25
}, {
    label: 'CreateDashedLines',
    kind: CompletionItemKind.Text,
    data: 26
}, {
    label: 'CreateDecal',
    kind: CompletionItemKind.Text,
    data: 27
}, {
    label: 'CreateDisc',
    kind: CompletionItemKind.Text,
    data: 28
}, {
    label: 'CreateGround',
    kind: CompletionItemKind.Text,
    data: 30
}, {
    label: 'CreateGroundFromHeightMap',
    kind: CompletionItemKind.Text,
    data: 31
}, {
    label: 'CreateIcoSphere',
    kind: CompletionItemKind.Text,
    data: 32
}, {
    label: 'CreateLathe',
    kind: CompletionItemKind.Text,
    data: 33
}, {
    label: 'CreateLineSystem',
    kind: CompletionItemKind.Text,
    data: 34
}, {
    label: 'CreateLines',
    kind: CompletionItemKind.Text,
    data: 35
}, {
    label: 'CreatePlane',
    kind: CompletionItemKind.Text,
    data: 36
}, {
    label: 'CreatePolygon',
    kind: CompletionItemKind.Text,
    data: 37
}, {
    label: 'CreatePolyhedron',
    kind: CompletionItemKind.Text,
    data: 38
}, {
    label: 'CreateRibbon',
    kind: CompletionItemKind.Text,
    data: 39
}, {
    label: 'CreateSphere',
    kind: CompletionItemKind.Text,
    data: 40
}, {
    label: 'CreateTiledGround',
    kind: CompletionItemKind.Text,
    data: 41
}, {
    label: 'CreateTorus',
    kind: CompletionItemKind.Text,
    data: 42
}, {
    label: 'CreateTorusKnot',
    kind: CompletionItemKind.Text,
    data: 43
}, {
    label: 'CreateTube',
    kind: CompletionItemKind.Text,
    data: 44
}, {
    label: 'ExtrudePolygon',
    kind: CompletionItemKind.Text,
    data: 45
}, {
    label: 'ExtrudeShape',
    kind: CompletionItemKind.Text,
    data: 46
}, {
    label: 'ExtrudeShapeCustom',
    kind: CompletionItemKind.Text,
    data: 47
}].forEach(shape => {
    labels.push(shape);
});


const ShaderMaterialMethods = [{
    label: 'bind()',
    kind: CompletionItemKind.Text,
    data: 49
}, {
    label: 'bindForSubMesh()',
    kind: CompletionItemKind.Text,
    data: 50
}, {
    label: 'bindOnlyWorldMatrix()',
    kind: CompletionItemKind.Text,
    data: 51
}, {
    label: 'bindSceneUniformBuffer()',
    kind: CompletionItemKind.Text,
    data: 52
}, {
    label: 'bindView()',
    kind: CompletionItemKind.Text,
    data: 53
}, {
    label: 'bindViewProjection()',
    kind: CompletionItemKind.Text,
    data: 54
}, {
    label: 'clone()',
    kind: CompletionItemKind.Text,
    data: 55
}, {
    label: 'dispose()',
    kind: CompletionItemKind.Text,
    data: 56
}, {
    label: 'forceCompilation()',
    kind: CompletionItemKind.Text,
    data: 57
}, {
    label: 'forceCompilationAsync()',
    kind: CompletionItemKind.Text,
    data: 58
}, {
    label: 'freeze()',
    kind: CompletionItemKind.Text,
    data: 59
}, {
    label: 'getActiveTextures()',
    kind: CompletionItemKind.Text,
    data: 60
},{
    label: 'createScene()',
    kind: CompletionItemKind.Text,
    data: 61
},{
    label: 'runRenderLoop',
    kind: CompletionItemKind.Text,
    data: 62
},{
    label: 'render()',
    kind: CompletionItemKind.Text,
    data: 63
}].forEach(method => {
    labels.push(method);
});

const scene = [{
    label: 'ArcRotateCamera',
    kind: CompletionItemKind.Text,
    data: 64
},{
    label: 'attachControl(canvas, false)',
    kind: CompletionItemKind.Text,
    data: 65
},{
    label: 'intensity',
    kind: CompletionItemKind.Text,
    data: 66
},{
    label: 'diffuse',
    kind: CompletionItemKind.Text,
    data: 67
},{
    label: 'PointLight',
    kind: CompletionItemKind.Class,
    data: 68
},{
    label: 'StandardMaterial',
    kind: CompletionItemKind.Class,
    data: 69
},{
    label: 'emissiveTexture',
    kind: CompletionItemKind.Class,
    data: 70
},{
    label: 'Texture',
    kind: CompletionItemKind.Class,
    data: 71
},{
    label: 'material',
    kind: CompletionItemKind.Class,
    data: 72
},{
    label: 'position',
    kind: CompletionItemKind.Class,
    data: 73
},{
    label: 'resize()',
    kind: CompletionItemKind.Class,
    data: 74
},{
    label: 'addEventListener',
    kind: CompletionItemKind.Class,
    data: 75
}].forEach(scene => {
    labels.push(scene);
});


export default labels;