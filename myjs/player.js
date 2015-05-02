/**
 * Created by Reginald on 4/30/2015.
 */

function CreatePlayer(scene, dynamicsWorld, controls){

    this.physicsInfo.shape = new Ammo.btBoxShape(new Ammo.btVector3(        this.size.x/2, this.size.y/2, this.size.z/2));

    this.physicsInfo.transform = new Ammo.btTransform();
    this.physicsInfo.transform.setIdentity();
    this.physicsInfo.transform.setOrigin(new Ammo.btVector3(this.startingPos.x,
        this.startingPos.y, this.startingPos.z));

    var localInertia=new Ammo.btVector3(0,0,0);
    var motionState = new Ammo.btDefaultMotionState( this.physicsInfo.transform );
    this.physicsInfo.shape.calculateLocalInertia(this.mass, localInertia);

    var constructionInfo = new Ammo.btRigidBodyConstructionInfo(this.mass, motionState, this.physicsInfo.shape, localInertia);
    this.physicsInfo.body=new Ammo.btRigidBody(constructionInfo);
    this.physicsInfo.body.setWorldTransform(this.physicsInfo.transform);

    // turns off all rotation
    this.physicsInfo.body.setAngularFactor(0,0,0);
    // keeps physics from going to sleep (from bullet documentation)
    var DISABLE_DEACTIVATION = 4;
    this.physicsInfo.body.setActivationState(DISABLE_DEACTIVATION);
    dynamicsWorld.addRigidBody(this.physicsInfo.body);

    this.geometry = new THREE.BoxGeometry(this.size.x,this.size.y, this.size.z);
    this.material = new THREE.MeshBasicMaterial({color: 0XFFFF00});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    //don't use three.js's update functions since we're using physics
    this.mesh.matrixAutoUpdate = false;
    scene.add(this.mesh);

    //make the camera a child of the player
    //this.mesh.add(camera);
    //camera.position.set(0,1,5);


    /*this.controls = controls;
    this.mesh.add(this.controls.getObject());
    this.controls.getObject().position.set(0, this.size.y/2, 0);*/

    this.linearVelocity = new Ammo.btVector3(0,-1,0);
}

var PlayerProto = {
    mass: 100,
    controls: undefined,
    name: "player",
    size: {x:.1, y:.5, z:.1},
    startingPos: {x:0, y:1, z:0},
    segments: 1,
    geometry: undefined,
    material: undefined,
    mesh: undefined,
    physicsInfo:{},
    // fps constants and storage
    ahead : false,
    right : false,
    left : false,
    back : false,
    speed : 1,
    linearVelocity: null,

    update : function(dt){
        // move objects
        var trans=this.physicsInfo.body.getWorldTransform(trans);
        var mat = this.mesh.matrixWorld;
        AmmoPhysicsHelper.b2three(trans,mat);



        // get camera direction
        var dir3 = new THREE.Vector3();
        //this.controls.getDirection(dir3);

        // convert to Ammo vector, project to plane
        var dir = new Ammo.btVector3(dir3.x,0,dir3.z);
        var yUnit = new Ammo.btVector3(0,1,0);
        dir.normalize();
        // right direction is dir X yUnit
        var right = dir.cross(yUnit);

        //
        // set up physics for next time
        // set up physics for next time
        var velV = new Ammo.btVector3(0,-1,0);
        if (this.ahead)
            velV.op_add(dir);
        if (this.right)
            velV.op_add(right);
        if (this.left)
            velV.op_sub(right);
        if (this.back)
            velV.op_sub(dir);
        velV.normalize();
        velV.op_mul(this.speed);
        this.physicsInfo.body.setLinearVelocity( velV );

        //console.log("player update");
    }

};

CreatePlayer.prototype = PlayerProto;