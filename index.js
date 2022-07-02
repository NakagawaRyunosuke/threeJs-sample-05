window.addEventListener("DOMContentLoaded", init);

function init(){
    const width = 1400;
    const height = 540;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("canvas"),
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf5f5f5 );


    // 平行光源を作成
    // new THREE.DirectionalLight(色, 光の強さ)
    const light = new THREE.DirectionalLight(0xFFFFFF, 1);
    scene.add(light);

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 2, 5);
    // カメラコントローラーを作成
    const controls = new THREE.OrbitControls(camera, document.getElementById("canvas"));

    //床
    const groundGeometry = new THREE.PlaneGeometry(10,10,64,64);
    const snow = new THREE.TextureLoader().load("img/snow.jpg");
    const groundMaterial = new THREE.MeshLambertMaterial({map:snow});
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / -2;
    ground.position.set(0,0,0);
    scene.add(ground);

    tick();

    function tick(){
        renderer.render(scene, camera); // レンダリング

        requestAnimationFrame(tick);
    }
}