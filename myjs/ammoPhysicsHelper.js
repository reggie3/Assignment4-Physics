/**
 * Created by Reginald on 4/30/2015.
 */

var AmmoPhysicsHelper = {
    initPhysics : function(){
        var collision_config = new Ammo.btDefaultCollisionConfiguration();
        var dispatcher = new Ammo.btCollisionDispatcher( collision_config );
        var overlappingPairCache =  new Ammo.btDbvtBroadphase();
        var solver = new Ammo.btSequentialImpulseConstraintSolver();
        dynamicsWorld = new Ammo.btDiscreteDynamicsWorld( dispatcher, overlappingPairCache, solver, collision_config );
        dynamicsWorld.setGravity(new Ammo.btVector3(0, -12, 0));

        return dynamicsWorld;
    },

    b2three : function(trans,mat) {
        var basis = trans.getBasis();
        var origin = trans.getOrigin();
        var m = mat.elements;
        var v = basis.getRow(0);
        m[0] = v.x(); m[4+0] = v.y(); m[8+0] = v.z(); m[12+0] = origin.x();
        v = basis.getRow(1);
        m[1] = v.x(); m[4+1] = v.y(); m[8+1] = v.z(); m[12+1] = origin.y();
        v = basis.getRow(2);
        m[2] = v.x(); m[4+2] = v.y(); m[8+2] = v.z(); m[12+2] = origin.z();
        m[3] = 0.0; m[4+3] = 0.0; m[8+3] = 0.0; m[12+3] = 1.0;
    },

    getTrans : function(){
        return new Ammo.btTransform();
    },

    body2world: function (body,v3B) {
        var trans = body.getWorldTransform();
        var result = trans.op_mul(v3B);
        return result;
    }
}