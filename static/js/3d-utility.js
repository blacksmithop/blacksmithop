import * as THREE from './three.module.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);  // Set background color to transparent
document.getElementById('three-container').appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Create rotating concentric circles
let circleRadius = 1.5;
let circleArray = []
for (let i=0; i<5; i++){
	let g = new THREE.BufferGeometry().setFromPoints(
		new THREE.Path().absarc(0, 0, circleRadius, 0, Math.PI * 2).getSpacedPoints(50)
	);
	let m = new THREE.LineBasicMaterial({color: "aqua"});
	let circle = new THREE.Line(g, m);

	scene.add(circle);
	circleArray.push(circle)
	circleRadius += 0.1
}

camera.position.z = 10;

function animate() {
    requestAnimationFrame(animate);

    // Rotate the circle
	let directionX = 0.001
	let directionY = -0.001

	circleArray.forEach(circle => {
		for (let i=0; i<circleArray.length; i++)
		{
			directionX *= -1
			directionX *= -1

			circle.rotation.x += directionX;
    		circle.rotation.y += directionY;
		}
		
	});
    

    renderer.render(scene, camera);
}

animate();

// Handle window resizing
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setAnimationLoop( animate );
// document.body.appendChild( renderer.domElement );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;

// function animate() {

// 	cube.rotation.x += 0.01;
// 	cube.rotation.y += 0.01;

// 	renderer.render( scene, camera );

// }