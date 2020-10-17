
const create3DObject = (entityObj) => {
    var geometry = new THREE.BoxGeometry(entityObj.width / 10, 0.5, entityObj.height / 10);
    var material = createCharacterTexture(entityObj.name);

    var body = new THREE.Mesh(geometry, material);
    body.position.x = entityObj.x / 10;
    body.position.y = entityObj.level * 5;
    body.position.z = entityObj.y / 10;
    return body;
};

function createCharacterTexture(text) {
    //return new THREE.MeshNormalMaterial();
    var dynamictexture = new THREEx.DynamicTexture(512, 512);
    dynamictexture.context.font = "bolder 90px verdana";
    dynamictexture.texture.needsUpdate = true;
    dynamictexture.clear('#ffa500').drawText(text, undefined, 256, 'black');
    var material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: dynamictexture.texture,
        opacity: 1,
        transparent: true
    });
    return material;
}

const run = (exampleElements) => {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();

    document.body.appendChild(renderer.domElement);
    exampleElements.forEach(o => {
        scene.add(create3DObject(o));
    });

    camera.position.z = 50;


    var animate = function () {
        requestAnimationFrame(animate);

        /*if (camera.position.x > 4) {
            camera.position.x = 0;
        }
        if (camera.position.y > 14) {
            camera.position.y = 0;
        }
        camera.position.x += 0.01;
        camera.position.y += 0.01;*/
        controls.update();

        renderer.render(scene, camera);
    };

    animate();
};
