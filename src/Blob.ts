import * as THREE from 'three';
import { TweenMax, Elastic, Quart } from "gsap/all";
import { GUI } from 'dat.gui';

var Theme = {
  primary: 0xFFFFFF,
  secundary: 0x292733,
  danger: 0xFF0000,
  darker: 0x000000
};

//--------------------------------------------------------------------
var scene, camera, renderer, container;
var _width, _height;
var _primitive;
var shapeGroup = new THREE.Group();
var start = Date.now();
var mat;

function createWorld() {
  _width = window.innerWidth;
  _height= window.innerHeight;
  scene = new THREE.Scene();
  scene.background = new THREE.Color(Theme.secundary);
  camera = new THREE.PerspectiveCamera(35, _width/_height, 1, 1000);
  camera.position.set(0,0,16);
  renderer = new THREE.WebGLRenderer({antialias:false, alpha:false});
  renderer.setSize(_width, _height);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  _width = window.innerWidth;
  _height = window.innerHeight;
  renderer.setSize(_width, _height);
  camera.aspect = _width / _height;
  camera.updateProjectionMatrix();
  console.log('- resize -');
}

//--------------------------------------------------------------------
class PrimitiveElement {
  constructor() {
    this.mesh = new THREE.Object3D();
    mat = new THREE.ShaderMaterial( {
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: "f", value: 0.1 },
        pointscale: { type: "f", value: 0.2 },
        decay: { type: "f", value: 0.3 },
        size: { type: "f", value: 0.3 },
        displace: { type: "f", value: 0.3 },
        complex: { type: "f", value: 0.0 },
        waves: { type: "f", value: 0.10 },
        eqcolor: { type: "f", value: 0.0 },
        rcolor: { type: "f", value: 0.0 },
        gcolor: { type: "f", value: 0.0 },
        bcolor: { type: "f", value: 0.0 },
        fragment: { type: "i", value: true },
        redhell: { type: "i", value: true }
      },
      vertexShader: document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader').textContent
    });

    var wir_mat = new THREE.MeshBasicMaterial({color:Theme.darker});
    var geo = new THREE.IcosahedronBufferGeometry(2, 6);
    var wir = new THREE.IcosahedronBufferGeometry(2.
