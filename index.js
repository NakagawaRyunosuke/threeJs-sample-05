window.addEventListener("DOMContentLoaded", init);

function init(){
    const width = 1400;
    const height = 540;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("canvas"),
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0xf5f5f5, 1);

    // シーンを作成
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf5f5f5, 50, 1000);

    // 平行光源を作成
    // new THREE.DirectionalLight(色, 光の強さ)
    const light = new THREE.DirectionalLight(0xFFFFFF, 1);
    scene.add(light);

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 50, 100);
    // カメラコントローラーを作成
    const controls = new THREE.OrbitControls(camera, document.getElementById("canvas"));

    //床
    const groundGeometry = new THREE.PlaneGeometry(1000,1000,64,64);
    const snow = new THREE.TextureLoader().load("img/snow.jpg");
    const groundMaterial = new THREE.MeshLambertMaterial({map:snow, side: THREE.DoubleSide});
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / -2;
    ground.position.set(0,0,0);
    scene.add(ground);

    //テクスチャ
    const texture = new THREE.TextureLoader().load("img/snowFreak.png");
    const material = new THREE.SpriteMaterial({
        map: texture,
        color: 0xffffff,
    });

    // グループ
    const group = new THREE.Group();
    scene.add( group );

    const snowmanGroup = new THREE.Group();
    scene.add(snowmanGroup);

    // パーティクル
    const num = 5000; // パーティクルの数
    const range = 1000; // 配置する範囲
    const rangeHalf = range / 2;

    for ( let i = 0; i < num; i ++ ) {
        const sprite = new THREE.Sprite( material ); //常に正面を向く3Dオブジェクト
        sprite.position.x = range * (Math.random() - 0.5);
        sprite.position.y = range * (Math.random() - 0.5);
        sprite.position.z = range * (Math.random() - 0.5);
        sprite.scale.x = sprite.scale.y = sprite.scale.z = Math.random() * 10 + 0.5;
        sprite.matrixAutoUpdate = false;
        sprite.updateMatrix();
        group.add( sprite );
    }

    //位置を変える------------------
    const windX = 0.25; //x方向の速度（共通）
    const variationX = 0.25; //x方向の速度にバラつきを加える
    const gravityY = 0.5 //y方向の速度（共通）
    const variationY = 0.25;//y方向の速度にバラつきを加える
    const windZ = 0; //z方向の速度（共通）
    const variationZ = 0.5;//z方向の速度にバラつきを加える

    const positionUpdate = () =>{
        for ( let i = 0; i < num; i ++ ) {
            const obj = group.children[ i ];
            //x
            if( obj.position.x < - rangeHalf){
                obj.position.x = rangeHalf;
            }else if ( obj.position.x > rangeHalf){
                obj.position.x = - rangeHalf;
            }else{
                obj.position.x +=  windX + variationX * ( i / num - 0.5  ) ;
            }
            //y
            if( obj.position.y < - rangeHalf){
                obj.position.y = rangeHalf;
            }else{
                obj.position.y -= gravityY + variationY * i / num ;
            }
            //z
            if( obj.position.z < - rangeHalf){
                obj.position.z = rangeHalf;
            }else if ( obj.position.z > rangeHalf){
                obj.position.z = - rangeHalf;
            }else{
                obj.position.z +=  windZ + variationZ * ( i / num - 0.5  ) ;
            }
            obj.matrixAutoUpdate = false;
            obj.updateMatrix();
        }
    }

    //雪だるま下半身
    const BGeometry = new THREE.SphereGeometry( 10, 32, 32 );
    const BMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff,map:snow} );
    const snowman_B = new THREE.Mesh( BGeometry, BMaterial );
    snowman_B.position.set(0,10,0);
    snowmanGroup.add( snowman_B );

    //雪だるま上半身
    const TGeometry = new THREE.SphereGeometry( 5, 32, 32 );
    const TMaterial = new THREE.MeshLambertMaterial({color:0xffffff, map:snow});
    const snowman_T = new THREE.Mesh( TGeometry, TMaterial);
    snowman_T.position.set(0,15,0);
    scene.add(snowman_T);

    tick();

    function tick(){
        renderer.render(scene, camera); // レンダリング
        positionUpdate();
        requestAnimationFrame(tick);
    }
}