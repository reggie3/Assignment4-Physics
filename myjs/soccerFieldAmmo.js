/**
 * Created by Reginald on 5/1/2015.
 */
var meshObject;   //an object to act as the parent f

function SoccerField(scene, physicsWorld, loadManager){
    var objectLoader = new THREE.ObjectLoader(loadManager);

    var that = this;
    this.onGeometry = function (loaded) {
        meshObject = new THREE.Object3D();

        for(var i=loaded.children.length-1; i >=0; i--){

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
                    meshObject.children[i].rotation.x = Math.PI/2;
                    meshObject.children[i].rotation.y = 0;
                    meshObject.children[i].rotation.z = 0;

                    meshObject.children[i].material = new THREE.MeshLambertMaterial({
                        color: 0x006600
                    });
                    meshObject.children[i].updateMatrix();
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
        }

        meshObject.matrixAutoUpdate = false;   //it also has to be set for the parent object
        scene.add(meshObject);
    };
    objectLoader.load("./models/soccerField.json", this.onGeometry);
}

var SoccerFieldProto = {
    scaleFactor: 4,
    physicsObjects: {},    //name: physics body
    physicsMeshes:{},       //name: mesh

    shape: undefined,        //the shape of the collision meshor the field

    update : function(dt){
        if(meshObject) {
            for (var i = 0; i < meshObject.children.length; i++) {
                if (this.physicsObjects[meshObject.children[i].name]) {
                    //var trans = this.physicsObjects[meshObject.children[i].name].getMotionState().getWorldTransform(new Ammo.btTransform());  //does not work
                    /*var trans = this.physicsObjects[meshObject.children[i].name].getWorldTransform(new Ammo.btTransform());
                     var mat = meshObject.children[i].matrixWorld;
                     AmmoPhysicsHelper.b2three(trans, mat);*/

                    if(meshObject.children[i].name!=="field") {
                        var transform = new Ammo.btTransform();
                        //console.log("updating " + meshObject.children[i].name);

                        this.physicsObjects[meshObject.children[i].name].getMotionState().getWorldTransform(transform); // Retrieve box position & rotation from Ammo
                        soccerField.js
                        // Update position
                        var origin = transform.getOrigin();
                        meshObject.children[i].position.x = origin.x();
                        meshObject.children[i].position.y = origin.y();
                        meshObject.children[i].position.z = origin.z();

                        // Update rotation
                        var rotation = transform.getRotation();
                        meshObject.children[i].quaternion.x = rotation.x();
                        meshObject.children[i].quaternion.y = rotation.y();
                        meshObject.children[i].quaternion.z = rotation.z();
                        meshObject.children[i].quaternion.w = rotation.w();


                        meshObject.children[i].updateMatrix(); //have to update the matrix one time before turning it off
                    }

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
    }
};

SoccerField.prototype = SoccerFieldProto;


