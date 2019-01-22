/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------
 * From : https://code.visualstudio.com/api/language-extensions/language-server-extension-guide#explaining-the-language-server
 * Server implementation that uses the provided simple text document manager which synchronizes 
 * text documents by always sending the file's full content from VS Code to the server 
 * */
// This file contains the list of all completion items
import labels from "./labels";

import {
	createConnection,
	TextDocuments,
	TextDocument,
	Diagnostic,
	DiagnosticSeverity,
	ProposedFeatures,
	InitializeParams,
	DidChangeConfigurationNotification,
	CompletionItem,
	CompletionItemKind,
	TextDocumentPositionParams
} from 'vscode-languageserver';

// Create a connection for the server. The connection uses Node's IPC as a transport.
// Also include all preview / proposed LSP features.
let connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager. The text document manager
// supports full document sync only
let documents: TextDocuments = new TextDocuments();

let hasConfigurationCapability: boolean = false;
let hasWorkspaceFolderCapability: boolean = false;
let hasDiagnosticRelatedInformationCapability: boolean = false;

connection.onInitialize((params: InitializeParams) => {
	let capabilities = params.capabilities;

	// Does the client support the `workspace/configuration` request?
	// If not, we will fall back using global settings
	hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
	hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
	hasDiagnosticRelatedInformationCapability =
		!!(capabilities.textDocument &&
			capabilities.textDocument.publishDiagnostics &&
			capabilities.textDocument.publishDiagnostics.relatedInformation);

	return {
		capabilities: {
			textDocumentSync: documents.syncKind,
			// Tell the client that the server supports code completion
			completionProvider: {
				resolveProvider: true
			}
		}
	};
});

connection.onInitialized(() => {
	if (hasConfigurationCapability) {
		// Register for all configuration changes.
		connection.client.register(
			DidChangeConfigurationNotification.type,
			undefined
		);
	}
	if (hasWorkspaceFolderCapability) {
		connection.workspace.onDidChangeWorkspaceFolders(_event => {
			connection.console.log('Workspace folder change event received.');
		});
	}
});

// The example settings
interface ExampleSettings {
	maxNumberOfProblems: number;
}

// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const defaultSettings: ExampleSettings = { maxNumberOfProblems: 1000 };
let globalSettings: ExampleSettings = defaultSettings;

// Cache the settings of all open documents
let documentSettings: Map<string, Thenable<ExampleSettings>> = new Map();

connection.onDidChangeConfiguration(change => {
	if (hasConfigurationCapability) {
		// Reset all cached document settings
		documentSettings.clear();
	} else {
		globalSettings = <ExampleSettings>(
			(change.settings.languageServerExample || defaultSettings)
		);
	}

	// Revalidate all open text documents
	documents.all().forEach(validateTextDocument);
});

function getDocumentSettings(resource: string): Thenable<ExampleSettings> {
	if (!hasConfigurationCapability) {
		return Promise.resolve(globalSettings);
	}
	let result = documentSettings.get(resource);
	if (!result) {
		result = connection.workspace.getConfiguration({
			scopeUri: resource,
			section: 'languageServerExample'
		});
		documentSettings.set(resource, result);
	}
	return result;
}

// Only keep settings for open documents
documents.onDidClose(e => {
	documentSettings.delete(e.document.uri);
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
	validateTextDocument(change.document);
});

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
	// In this simple example we get the settings for every validate run.
	let settings = await getDocumentSettings(textDocument.uri);

	// The validator creates diagnostics for all uppercase words length 2 and more
	let text = textDocument.getText();
	let pattern = /\b[A-Z]{2,}\b/g;
	let m: RegExpExecArray | null;

	let problems = 0;
	let diagnostics: Diagnostic[] = [];
	while ((m = pattern.exec(text)) && problems < settings.maxNumberOfProblems) {
		problems++;
		let diagnosic: Diagnostic = {
			severity: DiagnosticSeverity.Warning,
			range: {
				start: textDocument.positionAt(m.index),
				end: textDocument.positionAt(m.index + m[0].length)
			},
			message: `${m[0]} is all uppercase.`,
			source: 'ex'
		};
		if (hasDiagnosticRelatedInformationCapability) {
			diagnosic.relatedInformation = [
				{
					location: {
						uri: textDocument.uri,
						range: Object.assign({}, diagnosic.range)
					},
					message: 'Spelling matters'
				},
				{
					location: {
						uri: textDocument.uri,
						range: Object.assign({}, diagnosic.range)
					},
					message: 'Particularly for names'
				}
			];
		}
		diagnostics.push(diagnosic);
	}

	// Send the computed diagnostics to VSCode.
	connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}

connection.onDidChangeWatchedFiles(_change => {
	// Monitored files have change in VSCode
	connection.console.log('We received an file change event');
});

// This handler provides the initial list of the completion items.
connection.onCompletion(
	(_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
		// The pass parameter contains the position of the text document in
		// which code complete got requested. For the example we ignore this
		// info and always provide the same completion items.
		return labels;
	}
);

// This handler resolves additional information for the item selected in
// the completion list.
connection.onCompletionResolve(
	(item: CompletionItem): CompletionItem => {
		switch (item.data) {
			case 1:
				(item.detail = 'new (BABYLON.Engine)(canvasOrContext, antialias, options, adaptToDeviceRatio)'),
					(item.documentation = 'Creates a new engine')
				break;
			case 2:
				(item.detail = 'new (BABYLON.Scene)(engine, options)'),
					(item.documentation = 'Creates a new Scene')
				break;
			case 3:
				(item.detail = 'new (BABYLON.FreeCamera)(name, position, scene, setActiveOnSceneIfNoneActive)'),
					(item.documentation = 'Instantiates a Free Camera. This represents a free type of camera. It can be useful in First Person Shooter game for instance. Please consider using the new UniversalCamera instead as it adds more functionality like touch to this camera.')
				break;
			case 4:
				(item.detail = 'new (BABYLON.HemisphericLight)(name, direction, scene)'),
					(item.documentation = 'Creates a HemisphericLight object in the scene according to the passed direction (Vector3). The HemisphericLight simulates the ambient environment light, so the passed direction is the light reflection direction, not the incoming direction. The HemisphericLight can\'t cast shadows. Documentation : https://doc.babylonjs.com/babylon101/lights')
				break;
			case 5:
				(item.detail = 'new (BABYLON.object)'),
					(item.documentation = 'Creates a object')
				break;
			case 6:
				(item.detail = 'new ('),
					(item.documentation = 'Instanciates a BABYLON')
				break;
			case 7:
				(item.detail = 'new (BABYLON.Vector2)(x,y)'),
					(item.documentation = 'Creates a new Vector2 object from the given x, y (floats) coordinates.')
				break;
			case 8:
				(item.detail = 'new (BABYLON.Vector3)(x,y,z)'),
					(item.documentation = 'Creates a new Vector3 object from the given x, y, z (floats) coordinates.')
				break;
			case 9:
				(item.detail = 'new (BABYLON.Vector4)(x,y,z,w)'),
					(item.documentation = 'Creates a new Vector4 object from the given x, y, z, w (floats) coordinates.')
				break;
			case 10:
				(item.detail = 'new Mesh(name: string, scene ?: Nullable < Scene >, parent ?: Nullable < Node >, source ?: Nullable < Mesh >, doNotCloneChildren ?: boolean, clonePhysicsImpostor ?: boolean)'),
					(item.documentation = 'Class used to represent renderable models')
				break;
			case 11:
				(item.detail = 'new GroundMesh()'),
					(item.documentation = 'Mesh representing the ground')
				break;
			case 12:
				(item.detail = 'new LinesMesh(name: string, scene?: Nullable<Scene>, parent?: Nullable<Node>, source?: LinesMesh, doNotCloneChildren?: boolean, useVertexColor?: boolean | undefined, useVertexAlpha?: boolean | undefined): LinesMesh'),
					(item.documentation = 'Line mesh')
				break;
			case 13:
				(item.detail = 'new Action(triggerOptions: any, condition?: Condition): Action'),
					(item.documentation = 'The action to be carried out following a trigger')
				break;
			case 14:
				(item.detail = 'new ActionManager(scene: Scene): ActionManager'),
					(item.documentation = 'Action Manager manages all events to be triggered on a given mesh or the global scene. A single scene can have many Action Managers to handle predefined actions on specific meshes.')
				break;
			case 15:
				(item.detail = 'new ActionEvent(source: any, pointerX: number, pointerY: number, meshUnderPointer: Nullable<AbstractMesh>, sourceEvent?: any, additionalData?: any): ActionEvent'),
					(item.documentation = 'ActionEvent is the event being sent when an action is triggered.')
				break;
			case 16:
				(item.detail = 'new Angle(radians: number): Angle'),
					(item.documentation = 'Defines angle representation')
				break;
			case 17:
				(item.detail = 'new Animation(name: string, targetProperty: string, framePerSecond: number, dataType: number, loopMode?: number | undefined, enableBlending?: boolean | undefined): Animation'),
					(item.documentation = 'Class used to store any kind of animation')
				break;
			case 18:
				(item.detail = 'new AnimationEvent(frame: number, action: function, onlyOnce?: boolean | undefined): AnimationEvent'),
					(item.documentation = 'Composed of a frame, and an action function')
				break;
			case 19:
				(item.detail = 'new AnimationGroup(name: string, scene?: Nullable<Scene>): AnimationGroup'),
					(item.documentation = 'Use this class to create coordinated animations on multiple targets')
				break;
			case 20:
				(item.detail = 'new AnimationPropertiesOverride()'),
					(item.documentation = 'Class used to override all child animations of a given target')
				break;
			case 21:
				(item.detail = 'new AnimationRange(name: string, from: number, to: number): AnimationRange'),
					(item.documentation = 'Represents the range of an animation')
				break;
			case 22:
				(item.detail = 'new Color3(r?: number, g?: number, b?: number): Color3'),
					(item.documentation = 'Class used to hold a RBG color')
				break;
			case 23:
				(item.detail = 'new Color4(r?: number, g?: number, b?: number, a?: number) : Color4)'),
					(item.documentation = 'Class used to hold a RBGA color')
				break;
			case 24:
				(item.detail = 'CreateBox(name: string, options: object, scene?: Nullable<Scene>): Mesh'),
					(item.documentation = 'Creates a box mesh')
				break;
			case 25:
				(item.detail = 'CreateCylinder(name: string, options: object, scene: any): Mesh'),
					(item.documentation = 'Creates a cylinder or a cone mesh')
				break;
			case 26:
				(item.detail = 'CreateDashedLines(name: string, options: object, scene?: Nullable<Scene>): LinesMesh'),
					(item.documentation = 'Creates a dashed line mesh')
				break;
			case 27:
				(item.detail = 'CreateDecal(name: string, sourceMesh: AbstractMesh, options: object): Mesh'),
					(item.documentation = 'Creates a decal mesh. A decal is a mesh usually applied as a model onto the surface of another mesh. So don\'t forget the parameter sourceMesh depicting the decal')
				break;
			case 28:
				(item.detail = 'CreateDisc(name: string, options: object, scene?: Nullable<Scene>): Mesh'),
					(item.documentation = 'Creates a plane polygonal mesh. By default, this is a disc')
				break;
			case 29:
				(item.detail = 'new MeshBuilder()'),
					(item.documentation = 'Class containing static functions to help procedurally build meshes')
				break;
			case 30:
				(item.detail = 'CreateGround(name: string, options: object, scene: any): Mesh'),
					(item.documentation = 'Creates a ground mesh')
				break;
			case 31:
				(item.detail = 'CreateGroundFromHeightMap(name: string, url: string, options: object, scene: Scene): GroundMesh'),
					(item.documentation = 'Creates a ground mesh from a height map')
				break;
			case 32:
				(item.detail = 'CreateIcoSphere(name: string, options: object, scene: Scene): Mesh'),
					(item.documentation = 'Creates a sphere based upon an icosahedron with 20 triangular faces which can be subdivided')
				break;
			case 33:
				(item.detail = 'CreateLathe(name: string, options: object, scene: Scene): Mesh'),
					(item.documentation = 'Creates lathe mesh. The lathe is a shape with a symetry axis : a 2D model shape is rotated around this axis to design the lathe')
				break;
			case 34:
				(item.detail = 'CreateLineSystem(name: string, options: object, scene: Nullable<Scene>): LinesMesh'),
					(item.documentation = 'Creates a line system mesh. A line system is a pool of many lines gathered in a single mesh')
				break;
			case 35:
				(item.detail = 'CreateLines(name: string, options: object, scene?: Nullable<Scene>): LinesMesh'),
					(item.documentation = 'Creates a line mesh A line mesh is considered as a parametric shape since it has no predefined original shape. Its shape is determined by the passed array of points as an input parameter')
				break;
			case 36:
				(item.detail = 'CreatePlane(name: string, options: object, scene: Scene): Mesh'),
					(item.documentation = 'Creates a plane mesh')
				break;
			case 37:
				(item.detail = 'CreatePolygon(name: string, options: object, scene: Scene): Mesh'),
					(item.documentation = 'Creates a polygon mesh The polygon\'s shape will depend on the input parameters and is constructed parallel to a ground mesh')
				break;
			case 38:
				(item.detail = 'CreatePolyhedron(name: string, options: object, scene: Scene): Mesh'),
					(item.documentation = 'Creates a polyhedron mesh')
				break;
			case 39:
				(item.detail = 'CreateRibbon(name: string, options: object, scene?: Nullable<Scene>): Mesh'),
					(item.documentation = 'Creates a ribbon mesh. The ribbon is a parametric shape. It has no predefined shape. Its final shape will depend on the input parameters')
				break;
			case 40:
				(item.detail = 'CreateSphere(name: string, options: object, scene: any): Meshl'),
					(item.documentation = 'Creates a sphere mesh')
				break;
			case 41:
				(item.detail = 'CreateTiledGround(name: string, options: object, scene: Scene): Mesh'),
					(item.documentation = 'Creates a tiled ground mesh')
				break;
			case 42:
				(item.detail = 'CreateTorus(name: string, options: object, scene: any): Mesh'),
					(item.documentation = 'Creates a torus mesh')
				break;
			case 43:
				(item.detail = 'CreateTorusKnot(name: string, options: object, scene: any): Mesh'),
					(item.documentation = 'Creates a torus knot mesh')
				break;
			case 44:
				(item.detail = 'CreateTube(name: string, options: object, scene: Scene): Mesh'),
					(item.documentation = 'Creates a tube mesh. The tube is a parametric shape. It has no predefined shape. Its final shape will depend on the input parameters')
				break;
			case 45:
				(item.detail = 'ExtrudePolygon(name: string, options: object, scene: Scene): Mesh'),
					(item.documentation = 'Creates an extruded polygon mesh, with depth in the Y direction.')
				break;
			case 46:
				(item.detail = 'ExtrudeShape(name: string, options: object, scene?: Nullable<Scene>): Mesh'),
					(item.documentation = 'Creates an extruded shape mesh. The extrusion is a parametric shape. It has no predefined shape. Its final shape will depend on the input parameters.')
				break;
			case 47:
				(item.detail = 'ExtrudeShapeCustom(name: string, options: object, scene: Scene): Mesh'),
					(item.documentation = 'Creates an custom extruded shape mesh. The custom extrusion is a parametric shape. It has no predefined shape. Its final shape will depend on the input parameters.')
				break;
			case 48:
				(item.detail = 'var'),
					(item.documentation = 'Creates a simple variable')
				break;
			case 49:
				(item.detail = 'BABYLON.GUI'),
					(item.documentation = 'Access GUI properties')
				break;
					
			default:
				(item.detail = 'Babylon (thx captain Obvious)'),
					(item.documentation = 'There\'s no doc, search by yourself young padawan')
				break;
		}
		return item;
	}
);

/*
connection.onDidOpenTextDocument((params) => {
	// A text document got opened in VSCode.
	// params.uri uniquely identifies the document. For documents store on disk this is a file URI.
	// params.text the initial full content of the document.
	connection.console.log(`${params.textDocument.uri} opened.`);
});
connection.onDidChangeTextDocument((params) => {
	// The content of a text document did change in VSCode.
	// params.uri uniquely identifies the document.
	// params.contentChanges describe the content changes to the document.
	connection.console.log(`${params.textDocument.uri} changed: ${JSON.stringify(params.contentChanges)}`);
});
connection.onDidCloseTextDocument((params) => {
	// A text document got closed in VSCode.
	// params.uri uniquely identifies the document.
	connection.console.log(`${params.textDocument.uri} closed.`);
});
*/

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
