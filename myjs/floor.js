/**
 * Created by Reginald on 4/30/2015.
 */


function CreateFloor(scene){
    this.geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
    this.material = new THREE.MeshPhongMaterial({color: 0X00FF00});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    /*this.mesh =  new THREE.Mesh(new THREE.BoxGeometry(1,1,1),
     new THREE.MeshBasicMaterial());*/
    scene.add(this.mesh);

    this.physicsInfo = {};

    this.physicsInfo.shape = new Ammo.btBoxShape(new Ammo.btVector3(
        this.mesh.geometry.parameters.width/2, this.mesh.geometry.parameters.height/2,
        this.mesh.geometry.parameters.depth/2));
    this.physicsInfo.transform = new Ammo.btTransform();
    this.physicsInfo.transform.setIdentity();
    this.physicsInfo.transform.setOrigin(new Ammo.btVector3(this.mesh.position.x,
        this.mesh.position.y, this.mesh.position.z));
    var localInertia=new Ammo.btVector3(0,0,0);
    var motionState = new Ammo.btDefaultMotionState( this.physicsInfo.transform );
    var constructionInfo = new Ammo.btRigidBodyConstructionInfo(0, motionState, this.physicsInfo.shape, localInertia);
    this.physicsInfo.body=new Ammo.btRigidBody(constructionInfo);
}

var FloorProto = {
    width: 20,
    height: 1,
    depth: 20,
    segments: 10,
    geometry: undefined,
    material: undefined,
    physicsInfo:{}


};

CreateFloor.prototype = FloorProto;



