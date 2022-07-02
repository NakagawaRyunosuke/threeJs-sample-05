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
    scene.fog = new THREE.Fog( 0xeeeeee, 0, 100 );

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, 100);
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