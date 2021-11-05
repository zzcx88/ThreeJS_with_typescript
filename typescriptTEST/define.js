var JWFramework;
(function (JWFramework) {
    var Define = /** @class */ (function () {
        function Define() {
        }
        Define.SCREEN_WIDTH = window.innerWidth;
        Define.SCREEN_HEIGHT = window.innerHeight;
        return Define;
    }());
    JWFramework.Define = Define;
    var ModelSceneTest = /** @class */ (function () {
        function ModelSceneTest() {
            this.helmet = new JWFramework.TestObject;
            this.sceneTestModel = [{
                    model: this.helmet, url: 'Model/DamagedHelmet.gltf'
                }];
        }
        ModelSceneTest.getInstance = function () {
            if (!ModelSceneTest.instance) {
                ModelSceneTest.instance = new ModelSceneTest;
            }
            return ModelSceneTest.instance;
        };
        Object.defineProperty(ModelSceneTest.prototype, "ModelSceneTest", {
            get: function () {
                return this.sceneTestModel;
            },
            enumerable: false,
            configurable: true
        });
        return ModelSceneTest;
    }());
    JWFramework.ModelSceneTest = ModelSceneTest;
})(JWFramework || (JWFramework = {}));
//# sourceMappingURL=define.js.map