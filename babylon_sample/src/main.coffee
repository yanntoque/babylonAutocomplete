window.addEventListener 'DOMContentLoaded', ->
  # get the canvas DOM element
  canvas = document.getElementById('renderCanvas')
  # load the 3D engine
  engine = new (BABYLON.Engine)(canvas, true)
  # createScene function that creates and return the scene

  createScene = ->
    # create a basic BJS Scene object
    scene = new (BABYLON.Scene)(engine)
    # create a FreeCamera, and set its position to (x:0, y:5, z:-10)
    camera = new (BABYLON.FreeCamera)('camera1', new (BABYLON.Vector3)(0, 5, -10), scene)
    # target the camera to scene origin
    camera.setTarget BABYLON.Vector3.Zero()
    # attach the camera to the canvas
    camera.attachControl canvas, false
    # create a basic light, aiming 0,1,0 - meaning, to the sky
    light = new (BABYLON.HemisphericLight)('light1', new (BABYLON.Vector3)(0, 1, 0), scene)
    # create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation 
    sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene)
    # move the sphere upward 1/2 of its height
    sphere.position.y = 1
    # create a built-in "ground" shape;
    ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene)
    # return the created scene
    scene

  # call the createScene function
  scene = createScene()
  # run the render loop
  engine.runRenderLoop ->
    scene.render()
    return
  # the canvas/window resize event handler
  window.addEventListener 'resize', ->
    engine.resize()
    return
 