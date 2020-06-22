
const axis = new THREE.Vector3(0, 1, 0).normalize();
const loader = new THREE.TextureLoader();

// SCENE
const scene = new THREE.Scene();


// CAMERA
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);

camera.position.set(0, 0, 70);

scene.add(camera);

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


document.body.appendChild(renderer.domElement);

// ORBIT CONTROLS

const controls = new THREE.OrbitControls(camera, renderer.domElement);


// LIGHTS
const ambientLight = new THREE.AmbientLight(0xffffff, .5, 0, 2);


const light = new THREE.SpotLight(0xffffff, 1.5, 0, 2);
light.position.set(100, 0, 100);
light.target.position.set(0, 0, 0);
light.castShadow = true;

light.shadow.bias = 0.0001;
light.shadow.mapSize.width = 4096;
light.shadow.mapSize.height = 4096;
light.shadowDarkness = 0.5;
light.shadow.camera.near = 1;
light.shadow.camera.far = 1000;

scene.add(ambientLight, light);

//////////  EARTH  //////////
let earth;

const earth_texture = loader.load("./assets/images/texture_earth-5400x2700.jpg", function (texture) {
  // EARTH MESH
  const earth_geometry = new THREE.SphereGeometry(15, 32, 32);
  const earth_material = new THREE.MeshPhongMaterial({ map: texture });
  earth = new THREE.Mesh(earth_geometry, earth_material);
  earth.position.set(0, 0, 0);
  earth.castShadow = true;
  earth.receiveShadow = true;
  scene.add(earth);
});
/////////////////////////

//////////  MOON  //////////
let moon;
const moon_texture = loader.load("./assets/images/texture_moon-2048x1024.jpg", function (texture) {
  // Moon Mesh
  const moon_geometry = new THREE.SphereGeometry(5, 32, 32);
  const moon_material = new THREE.MeshPhongMaterial({ map: texture });
  moon = new THREE.Mesh(moon_geometry, moon_material);
  moon.position.set(-40, 0, 0);
  moon.castShadow = true;
  moon.receiveShadow = true;
  scene.add(moon);
});
////////////////////////

//////////  STARS BACKGROUND  //////////
const stars = loader.load("./assets/images/stars-1920x1080.jpg");
scene.background = stars;
////////////////////////////////////

const quaternion = new THREE.Quaternion();

///// FUNCTION TO ANIMATE
function animate() {
  if (earth && moon) {
    earth.rotation.y += 0.001;
    moon.rotation.y += 0.001;
    quaternion.setFromAxisAngle(axis, -0.008);
    moon.position.applyQuaternion(quaternion);
  }

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();