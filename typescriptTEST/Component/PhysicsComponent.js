var JWFramework;
(function (JWFramework) {
    var PhysicsComponent = /** @class */ (function () {
        function PhysicsComponent(gameObject) {
            this.vec3Look = new THREE.Vector3(0, 0, 1);
            this.GameObject = gameObject;
            this.GameObject.PhysicsCompIncluded = true;
        }
        PhysicsComponent.prototype.SetPostion = function (x, y, z) {
            this.GameObject.GameObjectInstance.position.x = x;
            this.GameObject.GameObjectInstance.position.y = y;
            this.GameObject.GameObjectInstance.position.z = z;
            this.LocalToWorldMatrix();
        };
        PhysicsComponent.prototype.SetPostionVec3 = function (vec3) {
            this.GameObject.GameObjectInstance.position = vec3;
            this.LocalToWorldMatrix();
        };
        PhysicsComponent.prototype.SetScale = function (x, y, z) {
            this.GameObject.GameObjectInstance.scale.set(x, y, z);
            this.LocalToWorldMatrix();
        };
        PhysicsComponent.prototype.SetScaleScalar = function (scalar) {
            this.GameObject.GameObjectInstance.scale.setScalar(scalar);
            this.LocalToWorldMatrix();
        };
        PhysicsComponent.prototype.MoveFoward = function (distance) {
            this.GameObject.GameObjectInstance.translateOnAxis(this.vec3Look, distance * JWFramework.WorldManager.getInstance().GetDeltaTime());
            this.LocalToWorldMatrix();
        };
        PhysicsComponent.prototype.GetRotateEuler = function () {
            return this.GameObject.GameObjectInstance.rotation;
        };
        PhysicsComponent.prototype.Rotate = function (x, y, z) {
            this.GameObject.GameObjectInstance.rotation.x += (x * JWFramework.WorldManager.getInstance().GetDeltaTime());
            this.GameObject.GameObjectInstance.rotation.y += (y * JWFramework.WorldManager.getInstance().GetDeltaTime());
            this.GameObject.GameObjectInstance.rotation.z += (z * JWFramework.WorldManager.getInstance().GetDeltaTime());
            this.LocalToWorldMatrix();
        };
        PhysicsComponent.prototype.RotateVec3 = function (axis, angle) {
            this.GameObject.GameObjectInstance.rotateOnAxis(axis, angle * JWFramework.WorldManager.getInstance().GetDeltaTime());
            this.GameObject.GameObjectInstance.updateMatrix();
            this.LocalToWorldMatrix();
        };
        PhysicsComponent.prototype.LocalToWorldMatrix = function () {
            this.GameObject.GameObjectInstance.updateMatrixWorld(true);
        };
        return PhysicsComponent;
    }());
    JWFramework.PhysicsComponent = PhysicsComponent;
})(JWFramework || (JWFramework = {}));
//# sourceMappingURL=PhysicsComponent.js.map