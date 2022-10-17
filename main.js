import "./style.css";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight
);

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
	color: 0xff6347,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStars() {
	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
	const star = new THREE.Mesh(geometry, material);
	const [x, y, z] = Array(3)
		.fill()
		.map(() => THREE.MathUtils.randFloatSpread(100));
	star.position.set(x, y, z);
	scene.add(star);
}

Array(200).fill().forEach(addStars);

const spaceTexture = new THREE.TextureLoader().load("/space.jpeg");
scene.background = spaceTexture;

//my texture
const myTextture = new THREE.TextureLoader().load("/my-pic.png");

const me = new THREE.Mesh(
	new THREE.BoxGeometry(3, 3, 3),
	new THREE.MeshBasicMaterial({ map: myTextture })
);
scene.add(me);

//moon texture
const moonTexture = new THREE.TextureLoader().load("/moon.jpeg");
const normalTexture = new THREE.TextureLoader().load("/normal.jpeg");
const moon = new THREE.Mesh(
	new THREE.SphereGeometry(3, 32, 32),
	new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture })
);

scene.add(moon);

moon.position.setX(-18);

function moveCamera() {
	const t = document.body.getBoundingClientRect().top;
	moon.rotateX(0.01);
	moon.rotateY(0.075);
	moon.rotateZ(0.05);

	me.rotateY(0.01);
	me.rotateZ(0.001);

	camera.position.setZ(t * -0.03);
	camera.position.setX(t * -0.0002);
	camera.position.setY(t * -0.0002);
}

document.body.onscroll = moveCamera;

function animate() {
	requestAnimationFrame(animate);
	torus.rotateX(0.01);
	torus.rotateY(0.05);
	torus.rotateZ(0.03);

	controls.update();

	renderer.render(scene, camera);
}
animate();
