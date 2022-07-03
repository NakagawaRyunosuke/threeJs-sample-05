window.addEventListener("DOMContentLoaded", init);

function init(){
    const width = 1400;
    const height = 540;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("canvas"),
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 1);

    // シーンを作成
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 0, 1000);

    // 平行光源を作成
    // new THREE.DirectionalLight(色, 光の強さ)
    const light = new THREE.DirectionalLight(0xFFFFFF, 0.5);
    light.castShadow = true;
    scene.add(light);

    //スポットライト
    const spotLight = new THREE.SpotLight(0xFFFFCC, 10, 250, Math.PI * 0.8, 0.25, 1);
    spotLight.castShadow = true;
    spotLight.position.set(30, 200, -30);
    scene.add(spotLight);

    const spotLightSub = new THREE.SpotLight(0xFFFFCC, 10, 250, Math.PI * 0.8, 0.25, 1);
    spotLightSub.castShadow = true;
    spotLightSub.position.set(30, 250, -30);
    scene.add(spotLightSub);

    // const spotlightHelper = new THREE.SpotLightHelper(spotLight);
    // scene.add(spotlightHelper);

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(-100, 400, 350);
    // カメラコントローラーを作成
    const controls = new THREE.OrbitControls(camera, document.getElementById("canvas"));

    //床
    const groundGeometry = new THREE.PlaneGeometry(500,500,64,64);
    const snow = new THREE.TextureLoader().load("img/snow.jpg");
    const groundMaterial = new THREE.MeshLambertMaterial({map:snow, side: THREE.DoubleSide});
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / -2;
    ground.position.set(0,0,0);
    ground.receiveShadow = true;
    scene.add(ground);

    //テクスチャ
    const texture = new THREE.TextureLoader().load("img/snowFreak.png");
    const material = new THREE.SpriteMaterial({
        map: texture,
        color: 0xffffff,
    });

    const woodTexture = new THREE.TextureLoader().load("img/wood.jpg");

    // グループ
    const group = new THREE.Group();
    scene.add( group );

    const snowmanHeadGroup = new THREE.Group();
    scene.add(snowmanHeadGroup);

    const benchGroup = new THREE.Group();
    scene.add(benchGroup);

    const lightGroup = new THREE.Group();
    scene.add(lightGroup);


    //雪だるま下半身
    const BGeometry = new THREE.SphereGeometry( 20, 32, 32 );
    const BMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff,map:snow} );
    const snowman_B = new THREE.Mesh( BGeometry, BMaterial );
    snowman_B.position.set(-30,20,0);
    snowman_B.castShadow = true;
    scene.add(snowman_B);

    //雪だるま上半身
    const TGeometry = new THREE.SphereGeometry( 15, 32, 32 );
    const TMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff,map:snow} );
    const snowman_T = new THREE.Mesh( TGeometry, TMaterial );
    snowman_T.position.set(-30,50,0);
    snowmanHeadGroup.add( snowman_T );
 

    //雪だるま鼻
    const coneGeometry = new THREE.ConeGeometry( 5, 20, 32 );
    const coneMaterial = new THREE.MeshLambertMaterial( {color: 0xFF0000} );
    const cone = new THREE.Mesh( coneGeometry, coneMaterial );
    cone.position.set(-30,50,10);
    cone.rotation.x = Math.PI/2;
    snowmanHeadGroup.add( cone );

    //雪だるま目
    const eyeGeometry1 = new THREE.SphereGeometry(2,32,32);
    const eyeMaterial1 = new THREE.MeshLambertMaterial({color:0x000000});
    const rightEye = new THREE.Mesh(eyeGeometry1, eyeMaterial1);
    rightEye.position.set(-35,55,13);
    snowmanHeadGroup.add(rightEye);

    const eyeGeometry2 = new THREE.SphereGeometry(2,32,32);
    const eyeMaterial2 = new THREE.MeshLambertMaterial({color:0x000000});
    const leftEye = new THREE.Mesh(eyeGeometry2, eyeMaterial2);
    leftEye.position.set(-25,55,13);
    snowmanHeadGroup.add(leftEye);

    snowmanHeadGroup.castShadow = true;

    //ベンチ
    const benchGeometry1 = new THREE.BoxGeometry(100, 10, 30);
    const benchMaterial1 = new THREE.MeshLambertMaterial({color:0xCD853F, map:woodTexture});
    const benchBord = new THREE.Mesh(benchGeometry1,benchMaterial1);
    benchBord.position.set(100,30,0);
    benchGroup.add(benchBord);

    const benchGeometry2 = new THREE.BoxGeometry(10, 25, 30);
    const benchMaterial2 = new THREE.MeshLambertMaterial({color:0x000000});
    const benchleag1 = new THREE.Mesh(benchGeometry2,benchMaterial2);
    benchleag1.position.set(55,15,0);
    benchGroup.add(benchleag1);

    const benchleag2 = new THREE.Mesh(benchGeometry2,benchMaterial2);
    benchleag2.position.set(145,15,0);
    benchGroup.add(benchleag2);

    benchGroup.castShadow = true;

    //街灯
    const lightGeometry = new THREE.CylinderGeometry( 4, 4, 200, 64 );
    const lightMaterial = new THREE.MeshLambertMaterial( {color: 0x000000} );
    const lightPool = new THREE.Mesh( lightGeometry, lightMaterial );
    lightPool.position.set(30,100,-50);
    lightGroup.add( lightPool );

    const headGeometry = new THREE.BoxGeometry(20,10,30);
    const headMaterial = new THREE.MeshLambertMaterial({color:0x000000});
    const lightHeadpart = new THREE.Mesh(headGeometry, headMaterial);
    lightHeadpart.position.set(30,200,-40);
    lightGroup.add(lightHeadpart);

    lightGroup.castShadow = true;



    // パーティクル
    const num = 500; // パーティクルの数
    const range = 500; // 配置する範囲
    const rangeHalf = range / 2;

    for ( let i = 0; i < num; i ++ ) {
        const sprite = new THREE.Sprite( material ); //常に正面を向く3Dオブジェクト
        sprite.position.x = range * (Math.random() - 0.5);
        sprite.position.y = range * (Math.random() - 0.5)+10;
        sprite.position.z = range * (Math.random() - 0.5);
        sprite.scale.x = sprite.scale.y = sprite.scale.z = Math.random() * 10 + 0.5;
        sprite.matrixAutoUpdate = false;
        sprite.updateMatrix();
        group.add( sprite );
    }

    //位置を変える
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
            if( obj.position.y < 0){
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

    let mode = true;
    const checkMode = () => {
        if(Math.floor(snowman_T.rotation.z) > 0.5){
            return false;
        }else if(Math.floor(snowman_T.rotation.z < -0.5)){
            return true;
        }else{
            return mode;
        }
    }

    const moveSnowman = (mode) => {
        if(mode){
            snowman_T.rotation.z += 0.01;
        }else{
            snowman_T.rotation.z -= 0.01;
        }
    }


    tick();

    function tick(){
        renderer.render(scene, camera); // レンダリング
        positionUpdate();

        mode = checkMode();
        console.log(snowmanHeadGroup.rotation.z)
        console.log(mode)
        moveSnowman(mode);

        requestAnimationFrame(tick);
    }
}