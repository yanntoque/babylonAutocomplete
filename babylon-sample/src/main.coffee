window.addEventListener 'DOMContentLoaded', ->
  # get the canvas DOM element
  canvas = document.getElementById('renderCanvas')
  # load the 3D engine
  engine = new (BABYLON.Engine)(canvas, true)
  # createScene function that creates and return the scene

  createScene = ->
#https://i.imgur.com/I5xYrvq.jpg

    scene = new (BABYLON.Scene)(engine)
    scene.clearColor = new (BABYLON.Color3)(0, 0.1, 0.1)

    camera = new (BABYLON.ArcRotateCamera)('ArcRotateCamera', 1, 0.8, 60, new (BABYLON.Vector3)(0, 0, 0), scene)
    camera.attachControl(canvas, false)

    light = new (BABYLON.HemisphericLight)('light1', new (BABYLON.Vector3)(0, 1, 0), scene)
    light.intensity = 0.3
    light.diffuse = new (BABYLON.Color3)(1, 1, 1)
    
    light0 = new (BABYLON.PointLight)('Omni0', new (BABYLON.Vector3)(1, 10, 1), scene)
    light0.intensity = 0.3

    sun = BABYLON.Mesh.CreateSphere('sun', 64, 20, scene, false, BABYLON.Mesh.DEFAULTSIDE)
    sunmaterial = new (BABYLON.StandardMaterial)('sunmaterial', scene)
    sunmaterial.emissiveTexture = new (BABYLON.Texture)("https://i.imgur.com/t3XlcfV.jpg", scene)
    sun.material = sunmaterial
    sun.position = new (BABYLON.Vector3)(0, 0, 0)

    earth = BABYLON.Mesh.CreateSphere('earth', 64, 10, scene, false, BABYLON.Mesh.DEFAULTSIDE)
    earth.position = new (BABYLON.Vector3)(-30, 0, 0)
    earthMaterial = new (BABYLON.StandardMaterial)("earthMaterial", scene)
    earthMaterial.emissiveTexture = new (BABYLON.Texture)("https://i.imgur.com/kjxyOBb.png", scene)
    earth.material = earthMaterial
    
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
 