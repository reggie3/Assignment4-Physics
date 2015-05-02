/**
 * Created by Reginald on 5/1/2015.
 */
var meshObject;   //an object to act as the parent f
var ballSize = .5;
var    fieldWidth = 4;
var    fieldDepth = 8;
var    fieldHeight = .5;
var    physicsObjects = {};    //name: physics body
var    physicsMeshes ={};     //name: mesh


var SoccerFieldProto = {
    

    shape: undefined,        //the shape of the collision meshor the field

    update : function(dt){
        if(meshObject) {
            for (var i = 0; i < meshObject.children.length; i++) {
                if (this.physicsObjects[meshObject.children[i].name]) {
                    //var trans = this.physicsObjects[meshObject.children[i].name].getMotionState().getWorldTransform(new Ammo.btTransform());  //does not work
                    var trans = this.physicsObjects[meshObject.children[i].name].getWorldTransform(new Ammo.btTransform());
                    var mat = meshObject.children[i].matrixWorld;
                    AmmoPhysicsHelper.b2three(trans, mat);

                    /*  var transform = new Ammo.btTransform()
                     this.physicsObjects[meshObject.children[i].name].getMotionState().getWorldTransform( transform )*/; // Retrieve box position & rotation from Ammo

                    // Update position
                    /*origin = transform.getOrigin();
                     meshObject.children[i].position.x = origin.x();
                     meshObject.children[i].position.y = origin.y();
                     meshObject.children[i].position.z = origin.z();

                     // Update rotation
                     rotation = transform.getRotation();
                     meshObject.children[i].quaternion.x = rotation.x();
                     meshObject.children[i].quaternion.y = rotation.y();
                     meshObject.children[i].quaternion.z = rotation.z();
                     meshObject.children[i].quaternion.w = rotation.w();*/

                    //meshObject.children[i].updateMatrix(); //have to update the matrix one time before turning it off
                }
            }
        }

        /*for(var key in this.physicsObjects) {
         if (this.physicsObjects.hasOwnProperty(key)) {
         //console.log("updating : " + key);
         var trans = this.physicsObjects[key].getWorldTransform(AmmoPhysicsHelper.getTrans());
         var mat = this.physicsMeshes[key].matrixWorld;
         AmmoPhysicsHelper.b2three(trans,mat);

         }
         }*/
    },
    SoccerField : function(scene, physicsWorld, loadManager){
        this.physicsObjects ={};

            meshObject = new THREE.Object3D();

            //create the field
            var fieldMesh = new THREE.Mesh(new THREE.BoxGeometry(fieldWidth, fieldDepth, fieldHeight), new THREE.MeshLambertMaterial({
                color: 0x006600
            }));
            fieldMesh.updateMatrix();
            /*fieldMesh.matrixAutoUpdate = false;
            this.physicsObjects["field"] = AmmoPhysicsHelper.CreateStaticBox(fieldMesh,
                physicsWorld);

            //create the ball
            var ballMesh = new THREE.Mesh(new THREE.SphereGeometry(this.fieldWidth, this.fieldDepth, this.fieldHeight), new THREE.MeshPhongMaterial({
             color: 0xDDDDDD
             }));
            ballMesh.matrixAutoUpdate = false;
            this.physicsObjects["ball"] = AmmoPhysicsHelper.CreateBouncyBall(ballMesh,
                physicsWorld);*/

            meshObject.add(fieldMesh);
            meshObject.matrixAutoUpdate = false;   //it also has to be set for the parent object
            scene.add(fieldMesh);


            /*for(var i=loaded.children.length-1; i >=0; i--){
             loaded.children[i].updateMatrix(); //have to update the matrix one time before turning it off
             loaded.children[i].matrixAutoUpdate = false;    //have to set this for each individual child
             meshObject.add(loaded.children[i]);    // this removes the item from the loaded list
             }

             for(var i=0; i< meshObject.children.length; i++) {
             switch (meshObject.children[i].name) {
             case "ball":
             meshObject.children[i].material = new THREE.MeshPhongMaterial({
             color: 0xDDDDDD
             });

             that.physicsObjects["ball"] = AmmoPhysicsHelper.CreateBouncyBall(meshObject.children[i],
             physicsWorld);
             that.physicsMeshes["ball"] = meshObject.children[i];

             break;
             case "net1":
             meshObject.children[i].material = new THREE.MeshLambertMaterial({
             color: 0xFF1111
             });
             break;
             case "net2":
             meshObject.children[i].material = new THREE.MeshLambertMaterial({
             color: 0x1111FF
             });
             break;
             case "field":
             meshObject.children[i].material = new THREE.MeshLambertMaterial({
             color: 0x006600
             });
             that.physicsObjects["field"] = AmmoPhysicsHelper.CreateStaticBox(meshObject.children[i],
             physicsWorld);
             that.physicsMeshes["field"] = meshObject.children[i];
             break;
             case "fence":
             meshObject.children[i].material = new THREE.MeshLambertMaterial({
             color: 0xCCCCC
             });

             break;
             }
             }*/

            
    }
};



