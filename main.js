import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./controls/OrbitControls.js";
import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.15/+esm";

//UIデバッグ
const gui = new GUI();

//サイズ
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

//シーン
const scene = new THREE.Scene();

//カメラ
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.set(1, 1, 2);

//レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

//座標軸
const axesHelper = new THREE.AxesHelper(5);

//ジオメトリ
const particleGeometry = new THREE.BufferGeometry(1, 1, 1);
const count = 10000;
const positionArray = new Float32Array(count * 3);
const colorArray = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) {
    positionArray[i] = (Math.random() - 0.5) * 10;
    colorArray[i] = Math.random();
}
particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positionArray, 3)
);
particleGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colorArray, 3)
);

//マテリアル
const pointsMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
});

//メッシュ
const particles = new THREE.Points(particleGeometry, pointsMaterial);

//シーン
scene.add(particles);

//マウス操作
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

window.addEventListener("resize", onWindowResize);

const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    controls.update();

    //レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

//ブラウザのリサイズに対応
function onWindowResize() {
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
}

animate();