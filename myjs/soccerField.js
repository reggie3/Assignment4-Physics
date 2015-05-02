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

            //loaded.children[i].updateMatrix(); //have to update the matrix one time before turning it off
            //loaded.children[i].matrixAutoUpdate = false;    //have to set this for each individual child
            meshObject.add(loaded.children[i]);    // this removes the item from the loaded list
        }

        for(var i=0; i< meshObject.children.length; i++) {
            switch (meshObject.children[i].name) {
                case "ball":
                    var mesh = meshObject.children[i];
                   mesh.material = new THREE.MeshPhongMaterial({
                        color: 0xDDDDDD
                    });

                    /*that.physicsObjects["ball"] = AmmoPhysicsHelper.CreateBouncyBall(meshObject.children[i],
                     physicsWorld);
                     that.physicsMeshes["ball"] = meshObject.children[i];*/

                    var physicsBall = new CANNON.Body({
                        mass: 2,    //kg
                        position: new CANNON.Vec3(mesh.position.x, mesh.position.y, mesh.position.z),
                        shape: new CANNON.Sphere(mesh.geometry.boundingSphere.radius * mesh.scale.x)

                    });
                    //add a new field to the body to keep track of this objects name
                    physicsBall.name = "ball";

                    physicsWorld.add(physicsBall);
                    that.physicsObjects["ball"] = physicsBall;


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
                    var mesh = meshObject.children[i];
                   /* mesh.rotation.x = Math.PI/2;
                    mesh.rotation.y = 0;
                    mesh.rotation.z = 0;*/

                    mesh.material = new THREE.MeshLambertMaterial({
                        color: 0x006600
                    });
                    mesh.updateMatrix();

                    var box = new THREE.Box3();
                    box.setFromObject(  meshObject.children[i] );

                    var xdim = box.max.x-box.min.x;
                    var ydim = box.max.y-box.min.y;
                    var zdim = box.max.z-box.min.z;

                    var physicsField = new CANNON.Body({
                        mass: 0, // mass == 0 makes the body static
                        shape: new CANNON.Box(new CANNON.Vec3(xdim/2, ydim/2, zdim/2)),

                    });
                    //add a new field to the body to keep track of this objects name
                    physicsField.name = "field";

                    physicsWorld.add(physicsField);
                    that.physicsObjects["field"] = physicsField;
                    break;
                case "fence":
                    meshObject.children[i].material = new THREE.MeshLambertMaterial({
                        color: 0xCCCCC
                    });

                    break;
            }
        }

        //meshObject.matrixAutoUpdate = false;   //it also has to be set for the parent object
        scene.add(meshObject);
    };
    objectLoader.load("./models/soccerField.json", this.onGeometry);
}

var SoccerFieldProto = {
    scaleFactor: 4,
    physicsObjects: {},    //name: physics body
    physicsMeshes:{},       //name: mesh

    shape: undefined,        //the shape of the collision meshor the field

    update : function(cannonWorld){
        if(meshObject) {
            for (var i = 0; i < cannonWorld.bodies.length; i++) {
                var cannonBody = cannonWorld.bodies[i];

                //get the mesh object by the cannonBody's name
                var mesh = meshObject.getObjectByName(cannonBody.name);

                if(cannonBody.name === "ball"){
                    console.log("ball body pos: " + cannonBody.position.x + ", " +
                            cannonBody.position.y + ", " + cannonBody.position.z);
                    console.log("ball mesh pos: " + mesh.position.x + ", " +
                        mesh.position.y + ", " + mesh.position.z);
                }
                // Update position and orientation
                mesh.position.copy(cannonBody.position);
                mesh.quaternion.copy(cannonBody.quaternion);


                //mesh.updateMatrix(); //have to update the matrix one time before turning it off


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


