var JWFramework;
(function (JWFramework) {
    class CollisionComponent {
        constructor(gameObject) {
            this.gameObject = gameObject;
            this.boundingBoxInclude = false;
            this.boundingSphereInclude = false;
            this.raycasterInclude = false;
        }
        CreateBoundingBox(x, y, z) {
            this.sizeX = x;
            this.sizeY = y;
            this.sizeZ = z;
            this.boundingBox = new THREE.Box3();
            this.boundingBox.setFromCenterAndSize(new THREE.Vector3(0, 0, 0), new THREE.Vector3(this.sizeX, this.sizeY, this.sizeZ));
            let color = new THREE.Color().setColorName("Red");
            this.boxHelper = new THREE.Box3Helper(this.boundingBox, color);
            if (JWFramework.SceneManager.getInstance().SceneInstance != null)
                JWFramework.SceneManager.getInstance().SceneInstance.add(this.boxHelper);
            this.boundingBoxInclude = true;
        }
        CreateOrientedBoundingBox(x, y, z) {
        }
        CreateBoundingSphere() {
        }
        CreateRaycaster() {
            let vec3pos = new THREE.Vector3(0, 0, 0);
            let vecd3 = new THREE.Vector3(0, -1, 0);
            this.raycaster = new THREE.Raycaster(vec3pos, vecd3);
            this.raycasterInclude = true;
        }
        get BoundingBox() {
            return this.boundingBox;
        }
        get BoxHelper() {
            return this.boxHelper;
        }
        get BoundingSphere() {
            return this.boundingSphere;
        }
        get Raycaster() {
            return this.raycaster;
        }
        DeleteCollider() {
            if (this.boundingBoxInclude) {
                this.boxHelper.visible = false;
                delete this.boundingBox;
                delete this.boxHelper;
                this.boundingBox = null;
                this.boxHelper = null;
            }
            if (this.raycasterInclude == true) {
                delete this.raycaster;
            }
        }
        Update() {
            if (this.boundingBoxInclude) {
                this.boxHelper.box.setFromCenterAndSize(this.gameObject.PhysicsComponent.GetPosition(), new THREE.Vector3(this.sizeX, this.sizeY, this.sizeZ));
            }
            if (this.raycasterInclude == true) {
                this.raycaster.set(this.gameObject.PhysicsComponent.GetPosition(), new THREE.Vector3(0, -1, 0));
            }
        }
    }
    JWFramework.CollisionComponent = CollisionComponent;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class ExportComponent {
        constructor(gameObject) {
            this.gameObject = gameObject;
        }
        MakeJsonObject() {
            let obj = new Object();
            if (this.gameObject.Type == JWFramework.ObjectType.OBJ_TERRAIN) {
                obj =
                    {
                        type: this.gameObject.Type,
                        name: this.gameObject.Name,
                        vertexIndex: this.gameObject.HeightIndexBuffer,
                        vertexHeight: this.gameObject.HeightBuffer,
                        scale: {
                            x: this.gameObject.PhysicsComponent.GetScale().x,
                            y: this.gameObject.PhysicsComponent.GetScale().y,
                            z: this.gameObject.PhysicsComponent.GetScale().z,
                        },
                        rotation: {
                            x: this.gameObject.PhysicsComponent.GetRotateEuler().x,
                            y: this.gameObject.PhysicsComponent.GetRotateEuler().y,
                            z: this.gameObject.PhysicsComponent.GetRotateEuler().z
                        },
                        position: {
                            x: this.gameObject.PhysicsComponent.GetPosition().x,
                            y: this.gameObject.PhysicsComponent.GetPosition().y,
                            z: this.gameObject.PhysicsComponent.GetPosition().z
                        }
                    };
            }
            else {
                obj = {
                    type: this.gameObject.Type,
                    name: this.gameObject.Name,
                    scale: {
                        x: this.gameObject.PhysicsComponent.GetScale().x,
                        y: this.gameObject.PhysicsComponent.GetScale().y,
                        z: this.gameObject.PhysicsComponent.GetScale().z,
                    },
                    rotation: {
                        x: this.gameObject.PhysicsComponent.GetRotateEuler().x,
                        y: this.gameObject.PhysicsComponent.GetRotateEuler().y,
                        z: this.gameObject.PhysicsComponent.GetRotateEuler().z
                    },
                    position: {
                        x: this.gameObject.PhysicsComponent.GetPosition().x,
                        y: this.gameObject.PhysicsComponent.GetPosition().y,
                        z: this.gameObject.PhysicsComponent.GetPosition().z
                    }
                };
            }
            return obj;
        }
    }
    JWFramework.ExportComponent = ExportComponent;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class GraphComponent {
        constructor(gameObject) {
            this.GameObject = gameObject;
            this.GameObject.GraphicCompIncluded = true;
            this.renderSwitch = true;
        }
        SetRenderOnOff(renderSwitch) {
            this.renderSwitch = renderSwitch;
            if (renderSwitch == false) {
                JWFramework.SceneManager.getInstance().SceneInstance.remove(this.GameObject.GameObjectInstance);
            }
            else {
                if (JWFramework.SceneManager.getInstance().SceneInstance)
                    JWFramework.SceneManager.getInstance().SceneInstance.add(this.GameObject.GameObjectInstance);
            }
        }
    }
    JWFramework.GraphComponent = GraphComponent;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class GUIComponent {
        constructor(gameObject) {
            this.gameObject = gameObject;
            if (this.gameObject.PhysicsCompIncluded) {
            }
            if (this.gameObject.GraphicCompIncluded) {
            }
        }
        UpdateDisplay() {
            if (this.gameObject.PhysicsCompIncluded) {
            }
            if (this.gameObject.GraphicCompIncluded) {
            }
        }
        ShowGUI(show) {
        }
    }
    JWFramework.GUIComponent = GUIComponent;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class CameraManager {
        static getInstance() {
            if (!CameraManager.instance) {
                CameraManager.instance = new CameraManager;
            }
            return CameraManager.instance;
        }
        get CameraMode() {
            return this.cameraMode;
        }
        SetCameraSavedPosition(cameraMode) {
            switch (cameraMode) {
                case JWFramework.CameraMode.CAMERA_3RD:
                    this.ChangeThridPersonCamera();
                    break;
                case JWFramework.CameraMode.CAMERA_ORBIT:
                    this.ChangeOrbitCamera();
                    break;
            }
        }
        ChangeThridPersonCamera() {
            this.cameraMode = JWFramework.CameraMode.CAMERA_3RD;
            JWFramework.SceneManager.getInstance().CurrentScene.Picker.OrbitControl.enabled = false;
            let gameObjectForCamera = JWFramework.SceneManager.getInstance().CurrentScene.Picker.GetPickParents();
            gameObjectForCamera.GameObjectInstance.add(JWFramework.WorldManager.getInstance().MainCamera.CameraInstance);
            JWFramework.WorldManager.getInstance().MainCamera.CameraInstance.lookAt(gameObjectForCamera.PhysicsComponent.GetPosition().x, gameObjectForCamera.PhysicsComponent.GetPosition().y + 1.5, gameObjectForCamera.PhysicsComponent.GetPosition().z);
            JWFramework.WorldManager.getInstance().MainCamera.PhysicsComponent.SetPostion(0, 0, 0);
            let Up = new THREE.Vector3(0, 1, 0);
            let Look = new THREE.Vector3(0, 0, 1);
            JWFramework.WorldManager.getInstance().MainCamera.PhysicsComponent.SetPostion(JWFramework.WorldManager.getInstance().MainCamera.PhysicsComponent.GetPosition().x + Up.x * 1.5, JWFramework.WorldManager.getInstance().MainCamera.PhysicsComponent.GetPosition().y + Up.y * 1.5, JWFramework.WorldManager.getInstance().MainCamera.PhysicsComponent.GetPosition().z + Up.z * 1.5);
            JWFramework.WorldManager.getInstance().MainCamera.PhysicsComponent.SetPostion(JWFramework.WorldManager.getInstance().MainCamera.PhysicsComponent.GetPosition().x + Look.x * -4.8, JWFramework.WorldManager.getInstance().MainCamera.PhysicsComponent.GetPosition().y + Look.y * -4.8, JWFramework.WorldManager.getInstance().MainCamera.PhysicsComponent.GetPosition().z + Look.z * -4.8);
        }
        ChangeOrbitCamera() {
            this.cameraMode = JWFramework.CameraMode.CAMERA_ORBIT;
            JWFramework.SceneManager.getInstance().CurrentScene.Picker.OrbitControl.enabled = true;
            let gameObjectForCamera = JWFramework.SceneManager.getInstance().CurrentScene.Picker.GetPickParents();
            gameObjectForCamera.GameObjectInstance.remove(JWFramework.WorldManager.getInstance().MainCamera.CameraInstance);
            JWFramework.WorldManager.getInstance().MainCamera.PhysicsComponent.SetPostion(gameObjectForCamera.PhysicsComponent.GetPosition().x, gameObjectForCamera.PhysicsComponent.GetPosition().y + 20, gameObjectForCamera.PhysicsComponent.GetPosition().z);
            JWFramework.WorldManager.getInstance().MainCamera.CameraInstance.lookAt(gameObjectForCamera.PhysicsComponent.GetPosition());
        }
    }
    JWFramework.CameraManager = CameraManager;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class PhysicsComponent {
        constructor(gameObject) {
            this.vec3Right = new THREE.Vector3(1, 0, 0);
            this.vec3Up = new THREE.Vector3(0, 1, 0);
            this.vec3Look = new THREE.Vector3(0, 0, 1);
            this.vec3Position = new THREE.Vector3(0, 0, 0);
            this.GameObject = gameObject;
            this.GameObject.PhysicsCompIncluded = true;
        }
        get Up() {
            return this.vec3Up;
        }
        get Right() {
            return this.vec3Right;
        }
        get Look() {
            return this.vec3Look;
        }
        set Up(vec3Up) {
            this.vec3Up = vec3Up;
        }
        set Right(vec3Right) {
            this.vec3Right = vec3Right;
        }
        set Look(vec3Look) {
            this.vec3Look = vec3Look;
        }
        SetPostion(x, y, z) {
            this.GameObject.GameObjectInstance.position.x = x;
            this.GameObject.GameObjectInstance.position.y = y;
            this.GameObject.GameObjectInstance.position.z = z;
            this.UpdateMatrix();
        }
        SetPostionVec3(vec3) {
            this.GameObject.GameObjectInstance.position.x = vec3.x;
            this.GameObject.GameObjectInstance.position.y = vec3.y;
            this.GameObject.GameObjectInstance.position.z = vec3.z;
            this.UpdateMatrix();
        }
        SetScale(x, y, z) {
            this.GameObject.GameObjectInstance.scale.set(x, y, z);
            this.UpdateMatrix();
        }
        SetScaleScalar(scalar) {
            this.GameObject.GameObjectInstance.scale.setScalar(scalar);
            this.UpdateMatrix();
        }
        MoveFoward(distance) {
            let Look = new THREE.Vector3(0, 0, 1);
            this.GameObject.GameObjectInstance.translateOnAxis(Look, distance * JWFramework.WorldManager.getInstance().GetDeltaTime());
            this.UpdateMatrix();
        }
        GetPosition() {
            return this.GameObject.GameObjectInstance.position;
        }
        GetRotateEuler() {
            return this.GameObject.GameObjectInstance.rotation;
        }
        GetScale() {
            return this.GameObject.GameObjectInstance.scale;
        }
        GetMatrix4() {
            return this.GameObject.GameObjectInstance.matrixWorld;
        }
        Rotate(x, y, z) {
            this.GameObject.GameObjectInstance.rotateX(x * JWFramework.WorldManager.getInstance().GetDeltaTime());
            this.GameObject.GameObjectInstance.rotateY(y * JWFramework.WorldManager.getInstance().GetDeltaTime());
            this.GameObject.GameObjectInstance.rotateZ(z * JWFramework.WorldManager.getInstance().GetDeltaTime());
            this.UpdateMatrix();
        }
        RotateVec3(axis, angle) {
            this.GameObject.GameObjectInstance.rotateOnWorldAxis(axis, angle * JWFramework.WorldManager.getInstance().GetDeltaTime());
            this.UpdateMatrix();
        }
        UpdateMatrix() {
            if (this.GameObject.Name != "MainCamera" && JWFramework.CameraManager.getInstance().CameraMode != JWFramework.CameraMode.CAMERA_3RD) {
                this.GameObject.GameObjectInstance.getWorldPosition(this.vec3Position);
            }
            else {
                this.vec3Position = this.GameObject.GameObjectInstance.position;
            }
            this.GameObject.GameObjectInstance.getWorldDirection(this.vec3Look);
            this.vec3Look = this.vec3Look.normalize();
            this.vec3Up.set(this.GameObject.GameObjectInstance.matrix.elements[4], this.GameObject.GameObjectInstance.matrix.elements[5], this.GameObject.GameObjectInstance.matrix.elements[6]);
            this.vec3Up = this.vec3Up.normalize();
            this.vec3Right = this.vec3Right.crossVectors(this.vec3Up, this.vec3Look);
            this.vec3Right = this.vec3Right.normalize();
        }
    }
    JWFramework.PhysicsComponent = PhysicsComponent;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class GameObject {
        constructor() {
            this.isClone = false;
            this.isDead = false;
            this.isPlayer = false;
            this.physicsCompIncluded = false;
            this.graphicCompIncluded = false;
            this.picked = false;
        }
        InitializeAfterLoad() { }
        get Type() {
            return this.type;
        }
        get Name() {
            return this.name;
        }
        set Name(name) {
            this.name = name;
        }
        get IsClone() {
            return this.isClone;
        }
        set IsClone(isClone) {
            this.isClone = isClone;
        }
        get IsPlayer() {
            return this.isPlayer;
        }
        set IsPlayer(flag) {
            this.isPlayer = flag;
        }
        get PhysicsComponent() {
            return this.physicsComponent;
        }
        get GraphicComponent() {
            return this.graphicComponent;
        }
        get GUIComponent() {
            return this.guiComponent;
        }
        get ExportComponent() {
            return this.exportComponent;
        }
        get CollisionComponent() {
            return this.collisionComponent;
        }
        get PhysicsCompIncluded() {
            return this.physicsCompIncluded;
        }
        get GraphicCompIncluded() {
            return this.graphicCompIncluded;
        }
        set PhysicsCompIncluded(isIncluded) {
            this.physicsCompIncluded = isIncluded;
        }
        set GraphicCompIncluded(isIncluded) {
            this.graphicCompIncluded = isIncluded;
        }
        set Picked(picked) {
            this.picked = picked;
        }
        get Picked() {
            return this.picked;
        }
        get GameObjectInstance() {
            return this.gameObjectInstance;
        }
        set GameObjectInstance(gameObjectInstance) {
            this.gameObjectInstance = gameObjectInstance;
        }
        get IsDead() {
            return this.isDead;
        }
        set IsDead(flag) {
            this.isDead = flag;
        }
        CollisionActive(value = 0) { }
        CollisionDeActive(value = 0) { }
        Animate() { }
        DeleteObject() {
            this.isDead = true;
        }
    }
    JWFramework.GameObject = GameObject;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class EditObject extends JWFramework.GameObject {
        constructor() {
            super();
            this.type = JWFramework.ObjectType.OBJ_OBJECT3D;
            this.physicsComponent = new JWFramework.PhysicsComponent(this);
            this.graphicComponent = new JWFramework.GraphComponent(this);
            this.exportComponent = new JWFramework.ExportComponent(this);
            this.collisionComponent = new JWFramework.CollisionComponent(this);
        }
        InitializeAfterLoad() {
            this.GameObjectInstance.matrixAutoUpdate = true;
            this.PhysicsComponent.SetScaleScalar(1);
            this.PhysicsComponent.SetPostion(0, 0, 0);
            this.GameObjectInstance.rotation.x = 0;
            this.GameObjectInstance.rotation.y = 0;
            this.GameObjectInstance.rotation.z = 0;
            this.GameObjectInstance.name = this.name;
            if (this.IsClone == false)
                JWFramework.ObjectManager.getInstance().AddObject(this, this.name, this.Type);
            else
                this.CreateCollider();
            if (JWFramework.SceneManager.getInstance().SceneType == JWFramework.SceneType.SCENE_EDIT) {
                this.axisHelper = new THREE.AxesHelper(10);
                this.GameObjectInstance.add(this.axisHelper);
            }
        }
        CreateCollider() {
            this.CollisionComponent.CreateBoundingBox(this.PhysicsComponent.GetScale().x, this.PhysicsComponent.GetScale().y, this.PhysicsComponent.GetScale().z);
            this.CollisionComponent.CreateRaycaster();
        }
        CollisionActive() {
        }
        CollisionDeActive() {
        }
        Animate() {
            if (this.isClone == true) {
                this.CollisionComponent.Update();
            }
            if (this.Picked == true) {
                if (JWFramework.InputManager.getInstance().GetKeyState('left', JWFramework.KeyState.KEY_PRESS)) {
                    this.PhysicsComponent.RotateVec3(this.PhysicsComponent.Look, -1);
                }
                if (JWFramework.InputManager.getInstance().GetKeyState('right', JWFramework.KeyState.KEY_PRESS)) {
                    this.PhysicsComponent.RotateVec3(this.PhysicsComponent.Look, 1);
                }
                if (JWFramework.InputManager.getInstance().GetKeyState('down', JWFramework.KeyState.KEY_PRESS)) {
                    this.PhysicsComponent.RotateVec3(this.PhysicsComponent.Right, -1);
                }
                if (JWFramework.InputManager.getInstance().GetKeyState('up', JWFramework.KeyState.KEY_PRESS)) {
                    this.PhysicsComponent.RotateVec3(this.PhysicsComponent.Right, 1);
                }
                if (JWFramework.InputManager.getInstance().GetKeyState('w', JWFramework.KeyState.KEY_PRESS)) {
                    this.PhysicsComponent.MoveFoward(15);
                }
                if (JWFramework.InputManager.getInstance().GetKeyState('f', JWFramework.KeyState.KEY_PRESS)) {
                    JWFramework.CameraManager.getInstance().SetCameraSavedPosition(JWFramework.CameraMode.CAMERA_3RD);
                }
                if (JWFramework.InputManager.getInstance().GetKeyState('r', JWFramework.KeyState.KEY_PRESS)) {
                    JWFramework.CameraManager.getInstance().SetCameraSavedPosition(JWFramework.CameraMode.CAMERA_ORBIT);
                }
            }
            if (JWFramework.SceneManager.getInstance().SceneType == JWFramework.SceneType.SCENE_EDIT && this.Picked == true) {
                this.axisHelper.visible = true;
            }
            if (JWFramework.SceneManager.getInstance().SceneType == JWFramework.SceneType.SCENE_EDIT && this.Picked == false) {
                this.axisHelper.visible = false;
            }
        }
    }
    JWFramework.EditObject = EditObject;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class Define {
    }
    Define.SCREEN_WIDTH = window.innerWidth;
    Define.SCREEN_HEIGHT = window.innerHeight;
    JWFramework.Define = Define;
    class ModelSceneEdit {
        constructor() {
            this.helmet = new JWFramework.EditObject;
            this.F16 = new JWFramework.EditObject;
            this.flower = new JWFramework.EditObject;
            this.sceneTestModel = [];
            this.F16.Name = "F-16";
            this.helmet.Name = "helmet";
            this.flower.Name = "flower";
            this.sceneTestModel = [
                { model: this.F16, url: 'Model/F-16D/F-16.gltf' },
                { model: this.helmet, url: 'Model/DamagedHelmet.gltf' },
                { model: this.flower, url: 'Model/Flower.glb' }
            ];
            this.modelNumber = this.sceneTestModel.length;
        }
        static getInstance() {
            if (!ModelSceneEdit.instance) {
                ModelSceneEdit.instance = new ModelSceneEdit;
            }
            return ModelSceneEdit.instance;
        }
        get ModelScene() {
            return this.sceneTestModel;
        }
        get ModelNumber() {
            return this.modelNumber;
        }
    }
    JWFramework.ModelSceneEdit = ModelSceneEdit;
    class ModelSceneStage {
        constructor() {
            this.F16 = new JWFramework.EditObject;
            this.sceneTestModel = [];
            this.F16.Name = "F-16";
            this.sceneTestModel = [
                { model: this.F16, url: 'Model/F-16D/F-16.gltf' },
            ];
            this.modelNumber = this.sceneTestModel.length;
        }
        static getInstance() {
            if (!ModelSceneStage.instance) {
                ModelSceneStage.instance = new ModelSceneStage;
            }
            return ModelSceneStage.instance;
        }
        get ModelScene() {
            return this.sceneTestModel;
        }
        get ModelNumber() {
            return this.modelNumber;
        }
    }
    JWFramework.ModelSceneStage = ModelSceneStage;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    let SceneType;
    (function (SceneType) {
        SceneType[SceneType["SCENE_EDIT"] = 0] = "SCENE_EDIT";
        SceneType[SceneType["SCENE_START"] = 1] = "SCENE_START";
        SceneType[SceneType["SCENE_STAGE"] = 2] = "SCENE_STAGE";
        SceneType[SceneType["SCENE_END"] = 3] = "SCENE_END";
    })(SceneType = JWFramework.SceneType || (JWFramework.SceneType = {}));
    let ObjectType;
    (function (ObjectType) {
        ObjectType[ObjectType["OBJ_TERRAIN"] = 0] = "OBJ_TERRAIN";
        ObjectType[ObjectType["OBJ_OBJECT3D"] = 1] = "OBJ_OBJECT3D";
        ObjectType[ObjectType["OBJ_OBJECT2D"] = 2] = "OBJ_OBJECT2D";
        ObjectType[ObjectType["OBJ_AIRCRAFT"] = 3] = "OBJ_AIRCRAFT";
        ObjectType[ObjectType["OBJ_CAMERA"] = 4] = "OBJ_CAMERA";
        ObjectType[ObjectType["OBJ_END"] = 5] = "OBJ_END";
    })(ObjectType = JWFramework.ObjectType || (JWFramework.ObjectType = {}));
    let PickMode;
    (function (PickMode) {
        PickMode[PickMode["PICK_MODIFY"] = 0] = "PICK_MODIFY";
        PickMode[PickMode["PICK_CLONE"] = 1] = "PICK_CLONE";
        PickMode[PickMode["PICK_TERRAIN"] = 2] = "PICK_TERRAIN";
        PickMode[PickMode["PICK_REMOVE"] = 3] = "PICK_REMOVE";
    })(PickMode = JWFramework.PickMode || (JWFramework.PickMode = {}));
    let TerrainOption;
    (function (TerrainOption) {
        TerrainOption[TerrainOption["TERRAIN_UP"] = 0] = "TERRAIN_UP";
        TerrainOption[TerrainOption["TERRAIN_DOWN"] = 1] = "TERRAIN_DOWN";
        TerrainOption[TerrainOption["TERRAIN_BALANCE"] = 2] = "TERRAIN_BALANCE";
        TerrainOption[TerrainOption["TERRAIN_LOAD"] = 3] = "TERRAIN_LOAD";
        TerrainOption[TerrainOption["TERRAIN_END"] = 4] = "TERRAIN_END";
    })(TerrainOption = JWFramework.TerrainOption || (JWFramework.TerrainOption = {}));
    let CameraMode;
    (function (CameraMode) {
        CameraMode[CameraMode["CAMERA_ORBIT"] = 0] = "CAMERA_ORBIT";
        CameraMode[CameraMode["CAMERA_3RD"] = 1] = "CAMERA_3RD";
    })(CameraMode = JWFramework.CameraMode || (JWFramework.CameraMode = {}));
    let KeyState;
    (function (KeyState) {
        KeyState[KeyState["KEY_DOWN"] = 0] = "KEY_DOWN";
        KeyState[KeyState["KEY_PRESS"] = 1] = "KEY_PRESS";
        KeyState[KeyState["KEY_UP"] = 2] = "KEY_UP";
    })(KeyState = JWFramework.KeyState || (JWFramework.KeyState = {}));
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class GUI_Base {
        constructor() { }
        CreateFolder(name) { }
    }
    JWFramework.GUI_Base = GUI_Base;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class GUI_Select extends JWFramework.GUI_Base {
        constructor() {
            super();
            this.List = {
                ObjectList: "None"
            };
            this.datGui = new dat.GUI();
            this.datGui.domElement.id = 'select-gui-container';
            this.datGui.open();
            this.CreateFolder();
            this.AddElement();
            this.datGui.width = JWFramework.WorldManager.getInstance().Canvas.width / 8;
        }
        CreateFolder() {
            this.objectListFolder = this.datGui.addFolder('ObjectList');
            this.exportButtonFolder = this.datGui.addFolder('Output');
        }
        AddElement() {
            let item = [];
            let objectList = JWFramework.ObjectManager.getInstance().GetObjectList;
            for (let TYPE = JWFramework.ObjectType.OBJ_OBJECT3D; TYPE < JWFramework.ObjectType.OBJ_END; ++TYPE) {
                for (let OBJ = 0; OBJ < objectList[TYPE].length; ++OBJ) {
                    item.push(objectList[TYPE][OBJ].Name);
                }
            }
            this.objectListFolder.add(this.List, 'ObjectList', item);
            this.objectListFolder.open();
            this.makeJson = function () {
                this.ExportData = function () { JWFramework.SceneManager.getInstance().MakeJSON(); };
            };
            this.makeJson = new this.makeJson();
            this.exportButtonFolder.add(this.makeJson, 'ExportData');
            this.exportButtonFolder.open();
        }
        GetSelectObjectName() {
            return this.List.ObjectList;
        }
    }
    JWFramework.GUI_Select = GUI_Select;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class GUI_SRT extends JWFramework.GUI_Base {
        constructor(gameObject) {
            super();
            this.datGui = new dat.GUI;
            this.datGui.open();
            this.gameObject = gameObject;
            this.CreateFolder();
            this.AddElement();
            this.datGui.width = JWFramework.WorldManager.getInstance().Canvas.width / 8;
        }
        CreateFolder() {
            this.positionFolder = this.datGui.addFolder('Position');
            this.rotateFolder = this.datGui.addFolder('Rotate');
            this.scaleFolder = this.datGui.addFolder('Scale');
            this.isPlayerFolder = this.datGui.addFolder('IsPlayer');
        }
        AddElement() {
            this.positionFolder.add(this.gameObject.GameObjectInstance.position, 'x').step(0.01).listen();
            this.positionFolder.add(this.gameObject.GameObjectInstance.position, 'y').step(0.01).listen();
            this.positionFolder.add(this.gameObject.GameObjectInstance.position, 'z').step(0.01).listen();
            this.positionFolder.open();
            this.rotateFolder.add(this.gameObject.GameObjectInstance.rotation, 'x', 0, Math.PI * 2).listen();
            this.rotateFolder.add(this.gameObject.GameObjectInstance.rotation, 'y', 0, Math.PI * 2).listen();
            this.rotateFolder.add(this.gameObject.GameObjectInstance.rotation, 'z', 0, Math.PI * 2).listen();
            this.rotateFolder.open();
            this.scaleFolder.add(this.gameObject.GameObjectInstance.scale, 'x', 0).step(0.01).listen();
            this.scaleFolder.add(this.gameObject.GameObjectInstance.scale, 'y', 0).step(0.01).listen();
            this.scaleFolder.add(this.gameObject.GameObjectInstance.scale, 'z', 0).step(0.01).listen();
            this.scaleFolder.open();
            this.isPlayerFunc = function () {
                this.isPlayer = function () {
                    console.log(JWFramework.GUIManager.getInstance().GUI_SRT.gameObject.IsPlayer);
                    JWFramework.GUIManager.getInstance().GUI_SRT.gameObject.IsPlayer = true;
                    console.log(JWFramework.GUIManager.getInstance().GUI_SRT.gameObject.IsPlayer);
                };
            };
            this.isPlayerFunc = new this.isPlayerFunc();
            this.isPlayerFolder.add(this.isPlayerFunc, 'isPlayer');
            this.isPlayerFolder.open();
        }
        SetGameObject(gameObject) {
            this.gameObject = gameObject;
            this.datGui.removeFolder(this.positionFolder);
            this.datGui.removeFolder(this.rotateFolder);
            this.datGui.removeFolder(this.scaleFolder);
            this.datGui.removeFolder(this.isPlayerFolder);
            this.CreateFolder();
            this.AddElement();
        }
        UpdateDisplay() {
            this.datGui.updateDisplay();
        }
        ShowGUI(show) {
            if (show == true) {
                this.datGui.open();
            }
            else {
                this.datGui.close();
            }
            this.gameObject.PhysicsComponent.UpdateMatrix();
        }
    }
    JWFramework.GUI_SRT = GUI_SRT;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class GUI_Terrain extends JWFramework.GUI_Base {
        constructor() {
            super();
            this.propList = {
                TerrianOptiontList: "None",
                HeightOffset: 0
            };
            this.terrainOption = JWFramework.TerrainOption.TERRAIN_UP;
            this.datGui = new dat.GUI();
            this.datGui.domElement.id = 'terrain-gui-container';
            this.datGui.open();
            this.CreateFolder();
            this.AddElement();
            this.datGui.width = JWFramework.WorldManager.getInstance().Canvas.width / 8;
        }
        CreateFolder() {
            this.terrainOptionFolder = this.datGui.addFolder('Terrain');
        }
        AddElement() {
            let item = [];
            item.push('UP');
            item.push('DOWN');
            item.push('BALANCE');
            this.terrainOptionFolder.add(this.propList, 'TerrianOptiontList', item).listen();
            this.terrainOptionFolder.add(this.propList, 'HeightOffset').step(0.01).listen();
            this.propList.TerrianOptiontList = 'UP';
            this.terrainOptionFolder.open();
        }
        GetTerrainOption() {
            return this.terrainOption;
        }
        GetHeightOffset() {
            return this.propList.HeightOffset;
        }
        ChangeTerrainOption() {
            if (this.terrainOption == JWFramework.TerrainOption.TERRAIN_BALANCE)
                this.terrainOption = JWFramework.TerrainOption.TERRAIN_UP;
            else
                this.terrainOption++;
            this.SetTerrainOptionFromEnum();
        }
        SetTerrainOptionFromEnum() {
            if (this.terrainOption == JWFramework.TerrainOption.TERRAIN_UP)
                this.propList.TerrianOptiontList = 'UP';
            if (this.terrainOption == JWFramework.TerrainOption.TERRAIN_DOWN)
                this.propList.TerrianOptiontList = 'DOWN';
            if (this.terrainOption == JWFramework.TerrainOption.TERRAIN_BALANCE)
                this.propList.TerrianOptiontList = 'BALANCE';
        }
        SetTerrainOptionList() {
            if (this.propList.TerrianOptiontList == 'UP')
                this.terrainOption = JWFramework.TerrainOption.TERRAIN_UP;
            if (this.propList.TerrianOptiontList == 'DOWN')
                this.terrainOption = JWFramework.TerrainOption.TERRAIN_DOWN;
            if (this.propList.TerrianOptiontList == 'BALANCE')
                this.terrainOption = JWFramework.TerrainOption.TERRAIN_BALANCE;
        }
    }
    JWFramework.GUI_Terrain = GUI_Terrain;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class Camera extends JWFramework.GameObject {
        constructor() {
            super();
            this.y = 0;
            this.type = JWFramework.ObjectType.OBJ_CAMERA;
            this.fov = 75;
            this.aspect = JWFramework.Define.SCREEN_WIDTH / JWFramework.Define.SCREEN_HEIGHT;
            this.near = 0.1;
            this.far = 1000;
            this.cameraInstance = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
            this.GameObjectInstance = this.CameraInstance;
            this.physicsComponent = new JWFramework.PhysicsComponent(this);
            this.collisionComponent = new JWFramework.CollisionComponent(this);
            this.CollisionComponent.CreateBoundingBox(300, 1, 300);
            this.GameObjectInstance.matrixAutoUpdate = true;
        }
        get Fov() {
            return this.fov;
        }
        set Fov(fov) {
            this.fov = fov;
            this.SetCameraElement();
        }
        get Aspect() {
            return this.aspect;
        }
        set Aspect(aspect) {
            this.aspect = aspect;
            this.SetCameraElement();
        }
        get Near() {
            return this.Near;
        }
        set Near(near) {
            this.near = near;
            this.SetCameraElement();
        }
        get Far() {
            return this.far;
        }
        set Far(far) {
            this.far = far;
            this.SetCameraElement();
        }
        get CameraInstance() {
            return this.cameraInstance;
        }
        SetCameraElement() {
            this.cameraInstance.fov = this.fov;
            this.cameraInstance.aspect = this.aspect;
            this.cameraInstance.near = this.near;
            this.cameraInstance.far = this.far;
            this.cameraInstance.updateProjectionMatrix();
        }
        Animate() {
            this.PhysicsComponent.UpdateMatrix();
        }
        get PhysicsComponent() {
            return this.physicsComponent;
        }
    }
    JWFramework.Camera = Camera;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class ObjectManager {
        constructor() {
            this.terrainList = new THREE.Group();
            this.objectList = [[], [], [], [], []];
            this.exportObjectList = [];
        }
        static getInstance() {
            if (!ObjectManager.instance) {
                ObjectManager.instance = new ObjectManager;
            }
            return ObjectManager.instance;
        }
        GetObjectsFromType() { }
        GetObjectFromName(name) {
            for (let TYPE = JWFramework.ObjectType.OBJ_TERRAIN; TYPE < JWFramework.ObjectType.OBJ_END; ++TYPE) {
                for (let OBJ = 0; OBJ < this.objectList[TYPE].length; ++OBJ) {
                    if (name == this.objectList[TYPE][OBJ].GameObject.Name) {
                        return this.objectList[TYPE][OBJ].GameObject;
                    }
                }
            }
            return null;
        }
        GetInSectorTerrain() {
            let terrain;
            for (let OBJ = 0; OBJ < this.objectList[JWFramework.ObjectType.OBJ_TERRAIN].length; ++OBJ) {
                terrain = this.objectList[JWFramework.ObjectType.OBJ_TERRAIN][OBJ].GameObject;
                if (terrain.cameraInSecter == true)
                    this.terrainList.add(terrain.GameObjectInstance);
            }
            return this.terrainList;
        }
        get GetObjectList() {
            return this.objectList;
        }
        ClearExportObjectList() {
            this.exportObjectList = [];
            this.exportObjectList.length = 0;
        }
        AddObject(gameObject, name, type) {
            this.objectList[type].push({ GameObject: gameObject, Name: name });
        }
        MakeClone(selectObject) {
            let cloneObject;
            if (selectObject instanceof JWFramework.EditObject) {
                cloneObject = new JWFramework.EditObject;
            }
            else {
                if (selectObject == null)
                    alert("EmtyObject");
                else
                    alert(selectObject.Name.toUpperCase() + " Instance of class name not found");
                return;
            }
            cloneObject.IsClone = true;
            cloneObject.Name = selectObject.Name + "Clone" + ObjectManager.getInstance().GetObjectList[cloneObject.Type].length.toString();
            cloneObject.GameObjectInstance = selectObject.GameObjectInstance.clone();
            cloneObject.InitializeAfterLoad();
            return cloneObject;
        }
        MakeJSONArray() {
            for (let TYPE = JWFramework.ObjectType.OBJ_TERRAIN; TYPE < JWFramework.ObjectType.OBJ_END; ++TYPE) {
                for (let OBJ = 0; OBJ < this.objectList[TYPE].length; ++OBJ) {
                    if (this.objectList[TYPE][OBJ].GameObject.IsClone == true || this.objectList[TYPE][OBJ].GameObject.Type == JWFramework.ObjectType.OBJ_TERRAIN) {
                        this.exportObjectList.push(this.objectList[TYPE][OBJ].GameObject.ExportComponent.MakeJsonObject());
                    }
                }
            }
            const a = document.createElement("a");
            a.href = URL.createObjectURL(new Blob([JSON.stringify(this.exportObjectList, null, 2)], {
                type: "text/plain"
            }));
            a.setAttribute("download", "Scene.json");
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            this.ClearExportObjectList();
        }
        DeleteObject(gameObject) {
            JWFramework.SceneManager.getInstance().SceneInstance.remove(gameObject.GameObjectInstance);
            gameObject.CollisionComponent.DeleteCollider();
            gameObject.GameObjectInstance.traverse(node => {
                if (node.isMesh) {
                    if (node.geometry) {
                        node.geometry.dispose();
                    }
                    if (node.material)
                        if (Array.isArray(node.material)) {
                            for (let i = 0; i < node.material.length; ++i) {
                                node.material[i].dispose();
                                if (node.material[i].map)
                                    node.material[i].map.dispose();
                            }
                        }
                        else {
                            node.material.dispose();
                            if (node.material.map)
                                node.material.map.dispose();
                        }
                }
            });
            this.ClearExportObjectList();
        }
        DeleteAllObject() {
            this.objectList.forEach(function (type) {
                type.forEach(function (object) {
                    if (object.GameObject.Type != JWFramework.ObjectType.OBJ_CAMERA && object.GameObject.IsClone == true)
                        object.GameObject.IsDead = true;
                });
            });
        }
        RenderOffObject() { }
        Animate() {
            for (let TYPE = 0; TYPE < JWFramework.ObjectType.OBJ_END; ++TYPE) {
                for (let OBJ = 0; OBJ < this.objectList[TYPE].length; ++OBJ) {
                    this.objectList[TYPE][OBJ].GameObject.Animate();
                    if (this.objectList[TYPE][OBJ].GameObject.PhysicsCompIncluded == true)
                        this.objectList[TYPE][OBJ].GameObject.PhysicsComponent.UpdateMatrix();
                    if (this.objectList[TYPE][OBJ].GameObject.IsDead) {
                        this.DeleteObject(this.objectList[TYPE][OBJ].GameObject);
                        delete this.objectList[TYPE][OBJ];
                        this.objectList[TYPE] = this.objectList[TYPE].filter((element, OBJ) => element !== undefined);
                    }
                }
            }
            JWFramework.CollisionManager.getInstance().CollideBoxToBox(this.objectList[JWFramework.ObjectType.OBJ_TERRAIN], this.objectList[JWFramework.ObjectType.OBJ_CAMERA]);
            JWFramework.CollisionManager.getInstance().CollideRayToTerrain(this.objectList[JWFramework.ObjectType.OBJ_OBJECT3D], this.objectList[JWFramework.ObjectType.OBJ_TERRAIN]);
            JWFramework.InputManager.getInstance().UpdateKey();
        }
        Render() { }
    }
    JWFramework.ObjectManager = ObjectManager;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class Picker {
        constructor() {
            this.pickPositionX = 0;
            this.pickPositionY = 0;
            this.raycaster = new THREE.Raycaster();
            this.pickedObject = null;
            this.pickMode = JWFramework.PickMode.PICK_MODIFY;
            this.CreateOrtbitControl();
            window.addEventListener('mousemove', function (e) {
                JWFramework.SceneManager.getInstance().CurrentScene.Picker.mouseEvent = e;
            });
            window.addEventListener('click', function (e) {
                JWFramework.SceneManager.getInstance().CurrentScene.Picker.SetPickPosition(e);
            });
            window.addEventListener('mouseout', function (e) {
                JWFramework.SceneManager.getInstance().CurrentScene.Picker.ClearPickPosition();
            });
            window.addEventListener('mouseleave', function (e) {
                JWFramework.SceneManager.getInstance().CurrentScene.Picker.ClearPickPosition();
            });
        }
        CreateOrtbitControl() {
            this.orbitControl = new THREE.OrbitControls(JWFramework.WorldManager.getInstance().MainCamera.CameraInstance, JWFramework.WorldManager.getInstance().Canvas);
            this.orbitControl.maxDistance = 2000;
            this.orbitControl.minDistance = -2000;
            this.orbitControl.zoomSpeed = 2;
            this.orbitControl.maxZoom = -2000;
            this.orbitControl.panSpeed = 3;
        }
        GetParentName(intersectedObjects) {
            if (intersectedObjects != null) {
                if (intersectedObjects.type == "Mesh") {
                    this.pickedParentName = undefined;
                }
                if (intersectedObjects.type != "Group") {
                    this.GetParentName(intersectedObjects.parent);
                }
                else {
                    this.pickedParentName = intersectedObjects.name;
                    this.pickedObject = intersectedObjects;
                }
            }
        }
        PickOffObject() {
            let objectList = JWFramework.ObjectManager.getInstance().GetObjectList;
            for (let TYPE = JWFramework.ObjectType.OBJ_OBJECT3D; TYPE < JWFramework.ObjectType.OBJ_OBJECT2D; ++TYPE) {
                for (let OBJ = 0; OBJ < objectList[TYPE].length; ++OBJ) {
                    objectList[TYPE][OBJ].GameObject.Picked = false;
                }
            }
        }
        Pick() {
            let terrain;
            if (this.pickPositionX > 0.75 || this.pickPositionX == -1) {
                return;
            }
            this.PickOffObject();
            this.pickedObject = undefined;
            this.raycaster.setFromCamera({ x: this.pickPositionX, y: this.pickPositionY }, JWFramework.WorldManager.getInstance().MainCamera.CameraInstance);
            if (this.pickMode == JWFramework.PickMode.PICK_CLONE) {
                let objectManager = JWFramework.ObjectManager.getInstance();
                let intersectedObject = this.raycaster.intersectObject(JWFramework.SceneManager.getInstance().SceneInstance, true);
                let cloneObject = objectManager.MakeClone(objectManager.GetObjectFromName(JWFramework.GUIManager.getInstance().GUI_Select.GetSelectObjectName()));
                let terrain = objectManager.GetObjectFromName(intersectedObject[0].object.name);
                if (terrain.Type == JWFramework.ObjectType.OBJ_TERRAIN) {
                    cloneObject.GameObjectInstance.position.set(0, 0, 0);
                    let clonePosition = new THREE.Vector3(intersectedObject[0].point.x, intersectedObject[0].point.y + 10, intersectedObject[0].point.z);
                    cloneObject.GameObjectInstance.position.copy(clonePosition);
                    JWFramework.SceneManager.getInstance().SceneInstance.add(cloneObject.GameObjectInstance);
                    objectManager.AddObject(cloneObject, cloneObject.Name, cloneObject.Type);
                }
            }
            else if (this.pickMode == JWFramework.PickMode.PICK_TERRAIN) {
                JWFramework.GUIManager.getInstance().GUI_Terrain.SetTerrainOptionList();
                let heightOffset = JWFramework.GUIManager.getInstance().GUI_Terrain.GetHeightOffset();
                let objectManager = JWFramework.ObjectManager.getInstance();
                let intersectedObject = this.raycaster.intersectObject(JWFramework.SceneManager.getInstance().SceneInstance, true);
                if (intersectedObject[0] != undefined) {
                    terrain = objectManager.GetObjectFromName(intersectedObject[0].object.name);
                    if (terrain != null && terrain.Type == JWFramework.ObjectType.OBJ_TERRAIN) {
                        intersectedObject[0].face.normal;
                        terrain.SetHeight(intersectedObject[0].face.a, heightOffset, JWFramework.GUIManager.getInstance().GUI_Terrain.GetTerrainOption());
                        terrain.SetHeight(intersectedObject[0].face.b, heightOffset, JWFramework.GUIManager.getInstance().GUI_Terrain.GetTerrainOption());
                        terrain.SetHeight(intersectedObject[0].face.c, heightOffset, JWFramework.GUIManager.getInstance().GUI_Terrain.GetTerrainOption());
                    }
                }
            }
            else if (this.pickMode == JWFramework.PickMode.PICK_REMOVE) {
                let intersectedObjects = this.raycaster.intersectObjects(JWFramework.SceneManager.getInstance().SceneInstance.children);
                if (intersectedObjects.length) {
                    this.GetParentName(intersectedObjects[0].object);
                    this.pickedParent = JWFramework.ObjectManager.getInstance().GetObjectFromName(this.pickedParentName);
                    console.log(this.pickedParentName);
                    if (this.pickedParentName != undefined)
                        this.pickedParent.DeleteObject();
                }
            }
            else {
                let intersectedObjects = this.raycaster.intersectObject(JWFramework.SceneManager.getInstance().SceneInstance);
                if (intersectedObjects.length) {
                    this.GetParentName(intersectedObjects[0].object);
                    this.pickedParent = JWFramework.ObjectManager.getInstance().GetObjectFromName(this.pickedParentName);
                    console.log(this.pickedParentName);
                    if (this.pickedParentName != undefined) {
                        this.pickedParent.Picked = true;
                        JWFramework.GUIManager.getInstance().GUI_SRT.SetGameObject(this.pickedParent);
                    }
                }
            }
        }
        GetCanvasReleativePosition(event) {
            let rect = JWFramework.WorldManager.getInstance().Canvas.getBoundingClientRect();
            return {
                x: (event.clientX - rect.left) * JWFramework.WorldManager.getInstance().Canvas.width / rect.width,
                y: (event.clientY - rect.top) * JWFramework.WorldManager.getInstance().Canvas.height / rect.height,
            };
        }
        get MouseEvent() {
            return this.mouseEvent;
        }
        SetPickPosition(event) {
            this.pickPositionX = (event.clientX / window.innerWidth) * 2 - 1;
            this.pickPositionY = -(event.clientY / window.innerHeight) * 2 + 1;
            this.Pick();
        }
        ClearPickPosition() {
            this.pickPositionX = -10000;
            this.pickPositionY = -10000;
        }
        ChangePickModeModify() {
            this.pickMode = JWFramework.PickMode.PICK_MODIFY;
        }
        ChangePickModeClone() {
            this.pickMode = JWFramework.PickMode.PICK_CLONE;
        }
        ChangePickModeTerrain() {
            this.pickMode = JWFramework.PickMode.PICK_TERRAIN;
        }
        ChangePickModeRemove() {
            this.pickMode = JWFramework.PickMode.PICK_REMOVE;
        }
        get PickMode() {
            return this.pickMode;
        }
        get OrbitControl() {
            return this.orbitControl;
        }
        GetPickParents() {
            return this.pickedParent;
        }
    }
    JWFramework.Picker = Picker;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class SceneBase {
        constructor(sceneManager) {
            this.sceneManager = sceneManager;
            this.BuildObject();
            this.BuildLight();
            this.BuildFog();
            this.SetPicker();
        }
        BuildObject() { }
        BuildLight() { }
        BuildFog() { }
        Animate() { }
        get SceneManager() {
            return this.sceneManager;
        }
        get Picker() {
            return this.picker;
        }
        SetPicker() {
            this.picker = new JWFramework.Picker();
        }
    }
    JWFramework.SceneBase = SceneBase;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class HeightmapTerrain extends JWFramework.GameObject {
        constructor(x, z, segmentWidth, segmentHeight) {
            super();
            this.heigtIndexBuffer = [];
            this.heigtBuffer = [];
            this.vertexNormalNeedUpdate = false;
            this.inSecter = false;
            this.cameraInSecter = false;
            this.width = x;
            this.height = z;
            this.segmentWidth = segmentWidth;
            this.segmentHeight = segmentHeight;
            this.name = "Terrain" + JWFramework.ObjectManager.getInstance().GetObjectList[JWFramework.ObjectType.OBJ_TERRAIN].length;
            this.terrainIndex = JWFramework.ObjectManager.getInstance().GetObjectList[JWFramework.ObjectType.OBJ_TERRAIN].length;
            this.type = JWFramework.ObjectType.OBJ_TERRAIN;
            this.isClone = true;
            this.physicsComponent = new JWFramework.PhysicsComponent(this);
            this.graphicComponent = new JWFramework.GraphComponent(this);
            this.exportComponent = new JWFramework.ExportComponent(this);
            this.collisionComponent = new JWFramework.CollisionComponent(this);
            this.CreateTerrainMesh();
        }
        InitializeAfterLoad() {
            this.PhysicsComponent.SetPostion(this.width, 0, this.height);
            this.CreateBoundingBox();
            JWFramework.SceneManager.getInstance().SceneInstance.add(this.gameObjectInstance);
            JWFramework.SceneManager.getInstance().SceneInstance.add(this.CollisionComponent.BoxHelper);
            JWFramework.ObjectManager.getInstance().AddObject(this, this.name, this.type);
        }
        CreateBoundingBox() {
            this.CollisionComponent.CreateBoundingBox(300, 5000, 300);
            this.CollisionComponent.BoxHelper.box.setFromCenterAndSize(new THREE.Vector3(this.width, 2500, this.height), new THREE.Vector3(300, 5000, 300));
        }
        CreateTerrainMesh() {
            this.planeGeomatry = new THREE.PlaneGeometry(300, 300, this.segmentWidth, this.segmentHeight);
            this.material = new THREE.MeshToonMaterial();
            this.texture = new THREE.TextureLoader().load("Model/Heightmap/TerrainTexture.jpg");
            this.gradientmap = new THREE.TextureLoader().load('Model/Heightmap/fiveTone.jpg');
            this.gradientmap.minFilter = THREE.NearestFilter;
            this.gradientmap.magFilter = THREE.NearestFilter;
            this.texture.wrapS = THREE.RepeatWrapping;
            this.texture.wrapT = THREE.RepeatWrapping;
            this.texture.repeat.set(128, 128);
            this.material.map = this.texture;
            this.material.gradientMap = this.gradientmap;
            this.material.wireframe = false;
            let rotation = new THREE.Matrix4().makeRotationX(-Math.PI / 2);
            this.planeGeomatry.applyMatrix4(rotation);
            this.planeGeomatry.computeBoundingSphere();
            this.planeGeomatry.computeVertexNormals();
            this.planeMesh = new THREE.Mesh(this.planeGeomatry, this.material);
            this.planeMesh.receiveShadow = true;
            this.planeMesh.castShadow = true;
            this.gameObjectInstance = this.planeMesh;
            this.GameObjectInstance.name = this.name;
            this.InitializeAfterLoad();
        }
        get HeightIndexBuffer() {
            return this.heigtIndexBuffer;
        }
        get HeightBuffer() {
            for (let i = 0; i < this.heigtBuffer.length; ++i) {
                this.heigtBuffer.pop();
            }
            this.heigtBuffer.length = 0;
            this.heigtIndexBuffer.forEach(element => this.heigtBuffer.push(this.planeGeomatry.getAttribute('position').getY(element)));
            return this.heigtBuffer;
        }
        SetHeight(index, value = undefined, option = JWFramework.TerrainOption.TERRAIN_UP) {
            this.planeGeomatry.getAttribute('position').needsUpdate = true;
            let height = this.planeGeomatry.getAttribute('position').getY(index);
            if (value != undefined && option == JWFramework.TerrainOption.TERRAIN_UP) {
                value = Math.abs(value);
            }
            if (option == JWFramework.TerrainOption.TERRAIN_DOWN) {
                value = Math.abs(value);
                value *= -1;
                this.planeGeomatry.getAttribute('position').setY(index, height += value);
            }
            else if (option == JWFramework.TerrainOption.TERRAIN_BALANCE || option == JWFramework.TerrainOption.TERRAIN_LOAD) {
                this.planeGeomatry.getAttribute('position').setY(index, value);
            }
            else {
                this.planeGeomatry.getAttribute('position').setY(index, height += value);
            }
            let objectList = JWFramework.ObjectManager.getInstance().GetObjectList;
            let endPointIndex = this.planeGeomatry.getAttribute('position').count - 1;
            let oldheight = this.planeGeomatry.getAttribute('position').getY(index);
            if (this.planeGeomatry.getAttribute('position').getX(index) == 300 / 2) {
                if (objectList[JWFramework.ObjectType.OBJ_TERRAIN][this.terrainIndex + 1]) {
                    let terrain = objectList[JWFramework.ObjectType.OBJ_TERRAIN][this.terrainIndex + 1].GameObject;
                    terrain.planeGeomatry.getAttribute('position').needsUpdate = true;
                    terrain.planeGeomatry.getAttribute('position').setY(index - this.segmentHeight, oldheight);
                    if (index == endPointIndex) {
                        if (objectList[JWFramework.ObjectType.OBJ_TERRAIN][this.terrainIndex + 11]) {
                            let terrain = objectList[JWFramework.ObjectType.OBJ_TERRAIN][this.terrainIndex + 11].GameObject;
                            terrain.planeGeomatry.getAttribute('position').needsUpdate = true;
                            terrain.planeGeomatry.getAttribute('position').setY(0, oldheight);
                        }
                    }
                    else if (index == this.segmentWidth) {
                        if (objectList[JWFramework.ObjectType.OBJ_TERRAIN][this.terrainIndex - 9]) {
                            let terrain = objectList[JWFramework.ObjectType.OBJ_TERRAIN][this.terrainIndex - 9].GameObject;
                            terrain.planeGeomatry.getAttribute('position').needsUpdate = true;
                            terrain.planeGeomatry.getAttribute('position').setY(endPointIndex - this.segmentWidth, oldheight);
                        }
                    }
                }
            }
            if (this.planeGeomatry.getAttribute('position').getX(index) == -(300 / 2)) {
                if (objectList[JWFramework.ObjectType.OBJ_TERRAIN][this.terrainIndex - 1]) {
                    let terrain = objectList[JWFramework.ObjectType.OBJ_TERRAIN][this.terrainIndex - 1].GameObject;
                    terrain.planeGeomatry.getAttribute('position').needsUpdate = true;
                    terrain.planeGeomatry.getAttribute('position').setY(index + this.segmentHeight, oldheight);
                }
                if (index == 0) {
                    if (objectList[JWFramework.ObjectType.OBJ_TERRAIN][this.terrainIndex - 11]) {
                        let terrain = objectList[JWFramework.ObjectType.OBJ_TERRAIN][this.terrainIndex - 11].GameObject;
                        terrain.planeGeomatry.getAttribute('position').needsUpdate = true;
                        terrain.planeGeomatry.getAttribute('position').setY(endPointIndex, oldheight);
                    }
                }
                else if (index == endPointIndex - this.segmentWidth) {
                    if (objectList[JWFramework.ObjectType.OBJ_TERRAIN][this.terrainIndex + 9]) {
                        let terrain = objectList[JWFramework.ObjectType.OBJ_TERRAIN][this.terrainIndex + 9].GameObject;
                        terrain.planeGeomatry.getAttribute('position').needsUpdate = true;
                        terrain.planeGeomatry.getAttribute('position').setY(this.segmentWidth, oldheight);
                    }
                }
            }
            if (this.planeGeomatry.getAttribute('position').getZ(index) == 300 / 2) {
                if (objectList[JWFramework.ObjectType.OBJ_TERRAIN][this.terrainIndex + 10]) {
                    let terrain = objectList[JWFramework.ObjectType.OBJ_TERRAIN][this.terrainIndex + 10].GameObject;
                    terrain.planeGeomatry.getAttribute('position').needsUpdate = true;
                    terrain.planeGeomatry.getAttribute('position').setY(index - (endPointIndex - this.segmentWidth), oldheight);
                }
            }
            if (this.planeGeomatry.getAttribute('position').getZ(index) == -(300 / 2)) {
                if (objectList[JWFramework.ObjectType.OBJ_TERRAIN][this.terrainIndex - 10]) {
                    let terrain = objectList[JWFramework.ObjectType.OBJ_TERRAIN][this.terrainIndex - 10].GameObject;
                    terrain.planeGeomatry.getAttribute('position').needsUpdate = true;
                    terrain.planeGeomatry.getAttribute('position').setY(index + (endPointIndex - this.segmentWidth), oldheight);
                }
            }
            if (this.heigtIndexBuffer.indexOf(index) == -1)
                this.heigtIndexBuffer.push(index);
            this.vertexNormalNeedUpdate = true;
        }
        CollisionActive(value) {
            if (value == JWFramework.ObjectType.OBJ_CAMERA) {
                this.cameraInSecter = true;
                this.material.opacity = 0.9;
            }
            else
                this.inSecter = true;
        }
        CollisionDeActive(value) {
            if (value == JWFramework.ObjectType.OBJ_CAMERA) {
                this.cameraInSecter = false;
                this.material.opacity = 1;
            }
            else
                this.inSecter = false;
        }
        Animate() {
            if (this.vertexNormalNeedUpdate) {
                this.planeGeomatry.computeVertexNormals();
                this.vertexNormalNeedUpdate = false;
            }
        }
    }
    JWFramework.HeightmapTerrain = HeightmapTerrain;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class ModelLoadManager {
        constructor() {
            this.loadComplete = false;
            this.terrain = [];
            this.loaderManager = new THREE.LoadingManager;
            this.loaderManager.onLoad = this.SetLoadComplete;
            this.gltfLoader = new THREE.GLTFLoader(this.loaderManager);
            this.loadCompletModel = 0;
        }
        static getInstance() {
            if (!ModelLoadManager.instance) {
                ModelLoadManager.instance = new ModelLoadManager;
            }
            return ModelLoadManager.instance;
        }
        SetLoadComplete() {
            this.loadCompletModel++;
            if (this.loadCompletModel == this.modelCount)
                this.loadComplete = true;
        }
        get LoadComplete() {
            if (this.loadComplete == true && JWFramework.SceneManager.getInstance().SceneType == JWFramework.SceneType.SCENE_EDIT) {
                JWFramework.GUIManager.getInstance().GUI_Select;
            }
            return this.loadComplete;
        }
        LoadScene() {
            if (JWFramework.SceneManager.getInstance().SceneType == JWFramework.SceneType.SCENE_EDIT) {
                this.modeltList = JWFramework.ModelSceneEdit.getInstance().ModelScene;
                this.modelCount = JWFramework.ModelSceneEdit.getInstance().ModelNumber;
            }
            for (let i = 0; i < this.modeltList.length; ++i) {
                this.LoadModel(this.modeltList[i].url, this.modeltList[i].model);
            }
            this.LoadHeightmapTerrain();
        }
        LoadModel(modelSource, gameObject) {
            this.gltfLoader.load(modelSource, (gltf) => {
                console.log('success');
                console.log(gltf);
                gameObject.GameObjectInstance = gltf.scene;
                gameObject.GameObjectInstance.traverse(n => {
                    if (n.isMesh) {
                        let texture = n.material.map;
                        let normal = n.material.normalMap;
                        let color = n.material.color;
                        n.material = new THREE.MeshToonMaterial();
                        n.material.map = texture;
                        n.material.normalMap = normal;
                        n.material.color = color;
                        n.castShadow = true;
                        n.receiveShadow = true;
                    }
                });
                gameObject.InitializeAfterLoad();
                this.SetLoadComplete();
            }, (progress) => {
                console.log('progress');
                console.log(progress);
            }, (error) => {
                console.log('error');
                console.log(error);
            });
        }
        LoadHeightmapTerrain() {
            for (let i = 0; i < 10; ++i) {
                for (let j = 0; j < 10; ++j) {
                    this.terrain[i] = new JWFramework.HeightmapTerrain(j * 300, i * 300, 32, 32);
                }
            }
        }
    }
    JWFramework.ModelLoadManager = ModelLoadManager;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class Light extends JWFramework.GameObject {
        constructor() {
            super();
            this.color = 0x000000;
            this.intensity = 0;
            this.light = new THREE.DirectionalLight(this.color, this.intensity);
            this.GameObjectInstance = this.light;
        }
        get Color() {
            return this.color;
        }
        SetColor(color) {
            this.color = color;
            this.SetLightElement();
        }
        get Intensity() {
            return this.intensity;
        }
        set Intensity(intensity) {
            this.intensity = intensity;
            this.SetLightElement();
        }
        SetLightElement() {
            this.light.color.set(this.color);
            this.light.intensity = this.intensity;
            this.light.target.position.set(0, 0, 0);
        }
    }
    JWFramework.Light = Light;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class EditScene extends JWFramework.SceneBase {
        constructor(sceneManager) {
            super(sceneManager);
        }
        BuildObject() {
            JWFramework.ModelLoadManager.getInstance().LoadScene();
            let rotation = new THREE.Matrix4().makeRotationY(-Math.PI);
            JWFramework.WorldManager.getInstance().MainCamera.CameraInstance.applyMatrix4(rotation);
        }
        BuildLight() {
            this.light = new JWFramework.Light();
            this.light.SetColor(0xFFFFFF);
            this.light.Intensity = 1.5;
            this.light.GameObjectInstance.position.set(10000, 10000, 0);
            this.SceneManager.SceneInstance.add(this.light.GameObjectInstance);
        }
        BuildFog() {
            let sceneInstance = this.SceneManager.SceneInstance;
            let color = 0xdefdff;
            sceneInstance.fog = new THREE.Fog(color, 10, 1000);
        }
        Animate() {
            if (JWFramework.ModelLoadManager.getInstance().LoadComplete == true) {
                JWFramework.ObjectManager.getInstance().Animate();
                if (JWFramework.InputManager.getInstance().GetKeyState('1', JWFramework.KeyState.KEY_DOWN)) {
                    this.Picker.ChangePickModeModify();
                }
                if (JWFramework.InputManager.getInstance().GetKeyState('2', JWFramework.KeyState.KEY_DOWN)) {
                    this.Picker.ChangePickModeClone();
                }
                if (JWFramework.InputManager.getInstance().GetKeyState('3', JWFramework.KeyState.KEY_DOWN)) {
                    this.Picker.ChangePickModeTerrain();
                }
                if (JWFramework.InputManager.getInstance().GetKeyState('4', JWFramework.KeyState.KEY_DOWN)) {
                    this.Picker.ChangePickModeRemove();
                }
                if (JWFramework.InputManager.getInstance().GetKeyState('r', JWFramework.KeyState.KEY_DOWN)) {
                    JWFramework.GUIManager.getInstance().GUI_Terrain.ChangeTerrainOption();
                }
                if (JWFramework.SceneManager.getInstance().CurrentScene.Picker.PickMode == JWFramework.PickMode.PICK_TERRAIN)
                    if (JWFramework.InputManager.getInstance().GetKeyState('t', JWFramework.KeyState.KEY_PRESS))
                        this.Picker.SetPickPosition(this.Picker.MouseEvent);
                if (JWFramework.InputManager.getInstance().GetKeyState('5', JWFramework.KeyState.KEY_DOWN)) {
                    fetch("./Model/Scene.json")
                        .then(response => {
                        return response.json();
                    })
                        .then(jsondata => console.log(jsondata[0]));
                }
                if (JWFramework.InputManager.getInstance().GetKeyState('delete', JWFramework.KeyState.KEY_DOWN)) {
                    JWFramework.ObjectManager.getInstance().DeleteAllObject();
                }
            }
        }
    }
    JWFramework.EditScene = EditScene;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class StageScene extends JWFramework.SceneBase {
        constructor(sceneManager) {
            super(sceneManager);
            this.terrain = [];
        }
        BuildObject() {
            JWFramework.ModelLoadManager.getInstance().LoadScene();
            let rotation = new THREE.Matrix4().makeRotationY(-Math.PI);
            JWFramework.WorldManager.getInstance().MainCamera.CameraInstance.applyMatrix4(rotation);
        }
        BuildLight() {
            this.light = new JWFramework.Light();
            this.light.SetColor(0xFFFFFF);
            this.light.Intensity = 1.5;
            this.light.GameObjectInstance.position.set(10000, 10000, 0);
            this.light2 = new JWFramework.Light();
            this.light2.SetColor(0xFFFFFF);
            this.light2.Intensity = 0.7;
            this.light2.GameObjectInstance.position.set(-10000, -10000, 0);
            this.SceneManager.SceneInstance.add(this.light.GameObjectInstance);
        }
        BuildFog() {
            let sceneInstance = this.SceneManager.SceneInstance;
            let color = 0xdefdff;
            sceneInstance.fog = new THREE.Fog(color, 10, 1000);
        }
        Animate() {
            if (JWFramework.ModelLoadManager.getInstance().LoadComplete == true) {
                JWFramework.ObjectManager.getInstance().Animate();
                if (JWFramework.InputManager.getInstance().GetKeyState('1', JWFramework.KeyState.KEY_DOWN)) {
                    this.Picker.ChangePickModeModify();
                }
                if (JWFramework.InputManager.getInstance().GetKeyState('2', JWFramework.KeyState.KEY_DOWN)) {
                    this.Picker.ChangePickModeClone();
                }
                if (JWFramework.InputManager.getInstance().GetKeyState('3', JWFramework.KeyState.KEY_DOWN)) {
                    this.Picker.ChangePickModeTerrain();
                }
                if (JWFramework.InputManager.getInstance().GetKeyState('4', JWFramework.KeyState.KEY_DOWN)) {
                    this.Picker.ChangePickModeRemove();
                }
                if (JWFramework.InputManager.getInstance().GetKeyState('5', JWFramework.KeyState.KEY_DOWN)) {
                    fetch("./Model/Scene.json")
                        .then(response => {
                        return response.json();
                    })
                        .then(jsondata => console.log(jsondata[0]));
                    this.BuildObject();
                }
                if (JWFramework.InputManager.getInstance().GetKeyState('delete', JWFramework.KeyState.KEY_DOWN)) {
                    JWFramework.ObjectManager.getInstance().DeleteAllObject();
                }
            }
        }
    }
    JWFramework.StageScene = StageScene;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class SceneManager {
        constructor() { }
        static getInstance() {
            if (!SceneManager.instance) {
                SceneManager.instance = new SceneManager;
            }
            return SceneManager.instance;
        }
        get SceneInstance() {
            return this.sceneThree;
        }
        get CurrentScene() {
            return this.scene;
        }
        get SceneType() {
            return this.sceneType;
        }
        MakeJSON() {
            JWFramework.ObjectManager.getInstance().MakeJSONArray();
        }
        BuildScene() {
            this.sceneThree = new THREE.Scene();
            this.sceneType = JWFramework.SceneType.SCENE_EDIT;
            this.objectManager = JWFramework.ObjectManager.getInstance();
            switch (this.sceneType) {
                case JWFramework.SceneType.SCENE_EDIT:
                    this.scene = new JWFramework.EditScene(this);
                    break;
                case JWFramework.SceneType.SCENE_START:
                    break;
                case JWFramework.SceneType.SCENE_STAGE:
                    break;
            }
        }
        Animate() {
            this.scene.Animate();
        }
    }
    JWFramework.SceneManager = SceneManager;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class ShaderManager {
        constructor() {
            this.BuildMotuinBlurShader();
        }
        static getInstance() {
            if (!ShaderManager.instance) {
                ShaderManager.instance = new ShaderManager;
            }
            return ShaderManager.instance;
        }
        BuildMotuinBlurShader() {
            let renderer = JWFramework.WorldManager.getInstance().Renderer;
            let sceneInstance = JWFramework.SceneManager.getInstance().SceneInstance;
            let camera = JWFramework.WorldManager.getInstance().MainCamera.CameraInstance;
            let canvas = JWFramework.WorldManager.getInstance().Canvas;
            this.composer = new THREE.EffectComposer(renderer);
            this.renderPass = new THREE.RenderPass(sceneInstance, camera);
            this.renderTargetParameters = {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                stencilBuffer: false
            };
            this.savePass = new THREE.SavePass(new THREE.WebGLRenderTarget(canvas.clientWidth, canvas.clientHeight, this.renderTargetParameters));
            this.blendPass = new THREE.ShaderPass(THREE.BlendShader, "tDiffuse1");
            this.blendPass.uniforms["tDiffuse2"].value = this.savePass.renderTarget.texture;
            this.blendPass.uniforms["mixRatio"].value = 0.75;
            this.outputPass = new THREE.ShaderPass(THREE.CopyShader);
            this.composer.addPass(this.renderPass);
            this.composer.addPass(this.blendPass);
            this.composer.addPass(this.savePass);
            this.composer.addPass(this.outputPass);
            this.composer.renderToScreen = true;
        }
        ShadedRender() {
            this.composer.render();
        }
    }
    JWFramework.ShaderManager = ShaderManager;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class WorldManager {
        constructor() { }
        static getInstance() {
            if (!WorldManager.instance) {
                WorldManager.instance = new WorldManager;
            }
            return WorldManager.instance;
        }
        InitializeWorld() {
            this.CreateRendere();
            this.ResizeView();
            this.CreateMainCamera();
            this.CreateScene();
            this.CreateDeltaTime();
        }
        CreateRendere() {
            this.renderer = new THREE.WebGLRenderer({
                canvas: document.querySelector("#c"),
                alpha: true,
                antialias: true,
                precision: "highp",
                premultipliedAlpha: true,
                stencil: true,
                preserveDrawingBuffer: false,
                logarithmicDepthBuffer: false
            });
            this.renderer.setViewport(0, 0, JWFramework.Define.SCREEN_WIDTH, JWFramework.Define.SCREEN_HEIGHT);
            this.renderer.setScissor(0, 0, 0, 0);
            this.renderer.setClearColor(0x000000);
            this.renderer.shadowMap.enabled = true;
            document.body.appendChild(this.renderer.domElement);
        }
        ResizeView() {
            const width = this.Canvas.clientWidth;
            const height = this.Canvas.clientHeight;
            const needResize = this.Canvas.width !== width || this.Canvas.height !== height;
            if (needResize) {
                this.renderer.setSize(width, height, false);
            }
            return needResize;
        }
        CreateMainCamera() {
            this.camera = new JWFramework.Camera();
            this.camera.Name = "MainCamera";
            this.camera.Fov = 75;
            this.camera.Aspect = this.Canvas.clientWidth / this.Canvas.clientHeight;
            this.camera.Near = 0.1;
            this.camera.Far = 900;
            this.camera.PhysicsComponent.SetPostion(0, 22, 0);
            JWFramework.ObjectManager.getInstance().AddObject(this.camera, this.camera.Name, this.camera.Type);
        }
        CreateScene() {
            this.sceneManager = JWFramework.SceneManager.getInstance();
            this.sceneManager.BuildScene();
            this.sceneManager.SceneInstance.background = new THREE.CubeTextureLoader()
                .setPath('Model/SkyBox/')
                .load([
                'Right.bmp',
                'Left.bmp',
                'Up.bmp',
                'Down.bmp',
                'Front.bmp',
                'Back.bmp'
            ]);
        }
        CreateDeltaTime() {
            this.clock = new THREE.Clock();
            this.delta = 0;
        }
        GetDeltaTime() {
            return this.delta;
        }
        get Canvas() {
            return this.renderer.domElement;
        }
        get MainCamera() {
            return this.camera;
        }
        get Renderer() {
            return this.renderer;
        }
        Animate() {
            if (this.ResizeView()) {
                this.camera.Aspect = this.Canvas.clientWidth / this.Canvas.clientHeight;
                this.camera.CameraInstance.updateProjectionMatrix();
            }
            this.delta = this.clock.getDelta();
            this.MainCamera.Animate();
            this.sceneManager.Animate();
        }
        Render() {
            JWFramework.ShaderManager.getInstance().ShadedRender();
        }
    }
    JWFramework.WorldManager = WorldManager;
})(JWFramework || (JWFramework = {}));
{
    const worldManager = JWFramework.WorldManager.getInstance();
    worldManager.InitializeWorld();
    const main = function () {
        worldManager.Animate();
        worldManager.Render();
        requestAnimationFrame(main);
    };
    main();
}
var JWFramework;
(function (JWFramework) {
    class CollisionManager {
        static getInstance() {
            if (!CollisionManager.instance) {
                CollisionManager.instance = new CollisionManager;
            }
            return CollisionManager.instance;
        }
        CollideRayToTerrain(sorce, destination) {
            sorce.forEach(function (src) {
                destination.forEach(function (dst) {
                    if (dst.GameObject != undefined && src.GameObject.IsClone == true) {
                        let intersect = src.GameObject.CollisionComponent.Raycaster.intersectObject(dst.GameObject.GameObjectInstance);
                        if (intersect[0] != undefined)
                            if (intersect[0].distance < 1) {
                                let terrain = JWFramework.ObjectManager.getInstance().GetObjectFromName(intersect[0].object.name);
                                src.GameObject.PhysicsComponent.SetPostion(intersect[0].point.x, intersect[0].point.y + 1.0000001, intersect[0].point.z);
                            }
                    }
                });
            });
        }
        CollideBoxToBox(sorce, destination) {
            sorce.forEach(function (src) {
                destination.forEach(function (dst) {
                    if (src.GameObject.CollisionComponent.BoxHelper.box.intersectsBox(dst.GameObject.CollisionComponent.BoxHelper.box)) {
                        src.GameObject.CollisionActive(dst.GameObject.Type);
                        dst.GameObject.CollisionActive();
                    }
                    else {
                        src.GameObject.CollisionDeActive(dst.GameObject.Type);
                        dst.GameObject.CollisionDeActive();
                    }
                });
            });
        }
        CollideBoxToSphere(sorce, destination) {
        }
        CollideSphereToSphere(sorce, destination) {
        }
    }
    JWFramework.CollisionManager = CollisionManager;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class GUIManager {
        static getInstance() {
            if (!GUIManager.instance) {
                GUIManager.instance = new GUIManager;
                GUIManager.instance.gui_SRT = new JWFramework.GUI_SRT(JWFramework.ObjectManager.getInstance().GetObjectFromName("flower"));
                GUIManager.instance.gui_Select = new JWFramework.GUI_Select();
                GUIManager.instance.gui_Terrain = new JWFramework.GUI_Terrain();
            }
            return GUIManager.instance;
        }
        get GUI_Select() {
            return this.gui_Select;
        }
        get GUI_SRT() {
            return this.gui_SRT;
        }
        get GUI_Terrain() {
            return this.gui_Terrain;
        }
    }
    JWFramework.GUIManager = GUIManager;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class InputManager {
        constructor() {
            this.AddKey = (Code, name) => {
                this.keys.push({ KeyCode: Code, KeyName: name, KeyEvent: false, KeyPressed: false, KeyDown: false, KeyUp: false });
            };
            this.keys = [];
            window.addEventListener('keydown', (e) => {
                let key = this.keys.find(data => { return data.KeyCode == e.keyCode; });
                if (key != undefined) {
                    key.KeyEvent = true;
                }
            });
            window.addEventListener('keyup', (e) => {
                let key = this.keys.find(data => { return data.KeyCode == e.keyCode; });
                if (key != undefined) {
                    key.KeyEvent = false;
                }
            });
            this.AddKey(37, 'left');
            this.AddKey(39, 'right');
            this.AddKey(38, 'up');
            this.AddKey(40, 'down');
            this.AddKey(32, 'space');
            this.AddKey(46, 'delete');
            this.AddKey(82, 'r');
            this.AddKey(87, 'w');
            this.AddKey(70, 'f');
            this.AddKey(84, 't');
            this.AddKey(49, '1');
            this.AddKey(50, '2');
            this.AddKey(51, '3');
            this.AddKey(52, '4');
            this.AddKey(53, '5');
        }
        static getInstance() {
            if (!InputManager.instance) {
                InputManager.instance = new InputManager;
            }
            return InputManager.instance;
        }
        KeyPressedCheck(key) {
            if (key.KeyEvent == true) {
                if (key.KeyDown == false && key.KeyPressed == false) {
                    key.KeyDown = true;
                    key.KeyPressed = false;
                    key.KeyUp = false;
                }
                else {
                    key.KeyDown = false;
                    key.KeyPressed = true;
                    key.KeyUp = false;
                }
            }
            else {
                if (key.KeyUp == true) {
                    key.KeyDown = false;
                    key.KeyPressed = false;
                    key.KeyUp = false;
                }
                else {
                    key.KeyDown = false;
                    key.KeyPressed = false;
                    key.KeyUp = true;
                }
            }
        }
        UpdateKey() {
            for (let i = 0; i < this.keys.length; ++i) {
                this.KeyPressedCheck(this.keys[i]);
            }
        }
        GetKeyState(keyName, keyState) {
            let key;
            for (let i = 0; i < this.keys.length; ++i) {
                if (this.keys[i].KeyName == keyName) {
                    if (keyState == JWFramework.KeyState.KEY_DOWN)
                        key = this.keys[i].KeyDown;
                    if (keyState == JWFramework.KeyState.KEY_PRESS)
                        key = this.keys[i].KeyPressed;
                    if (keyState == JWFramework.KeyState.KEY_UP)
                        key = this.keys[i].KeyUp;
                    return key;
                }
            }
        }
    }
    JWFramework.InputManager = InputManager;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class TestCube extends JWFramework.GameObject {
        constructor() {
            super();
            this.y = 0;
            this.type = JWFramework.ObjectType.OBJ_OBJECT3D;
            this.physicsComponent = new JWFramework.PhysicsComponent(this);
            this.graphicComponent = new JWFramework.GraphComponent(this);
        }
        InitializeAfterLoad() {
            let axisY = new THREE.Vector3(0, 1, 0);
            this.PhysicsComponent.RotateVec3(axisY, 180);
        }
        get PhysicsComponent() {
            return this.physicsComponent;
        }
        get GraphComponent() {
            return this.graphicComponent;
        }
        Animate() {
        }
    }
    JWFramework.TestCube = TestCube;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class AircraftObject extends JWFramework.GameObject {
        constructor() {
            super();
            this.throttle = 0;
            this.afterBurner = false;
            this.acceleration = 0;
        }
        InitializeAfterLoad() {
        }
        CreateCollider() {
        }
        CollisionActive() {
        }
        CollisionDeActive() {
        }
        Animate() {
            if (this.throttle > 100) {
                this.throttle = 100;
                this.afterBurner = true;
            }
            else if (this.throttle < 100) {
                this.afterBurner = false;
            }
            else if (this.throttle < 0) {
                this.throttle = 0;
                this.afterBurner = false;
            }
        }
    }
    JWFramework.AircraftObject = AircraftObject;
})(JWFramework || (JWFramework = {}));
var JWFramework;
(function (JWFramework) {
    class F16Object extends JWFramework.AircraftObject {
        constructor() {
            super();
            this.type = JWFramework.ObjectType.OBJ_AIRCRAFT;
            this.physicsComponent = new JWFramework.PhysicsComponent(this);
            this.graphicComponent = new JWFramework.GraphComponent(this);
            this.collisionComponent = new JWFramework.CollisionComponent(this);
        }
        InitializeAfterLoad() {
            this.GameObjectInstance.matrixAutoUpdate = true;
            this.GameObjectInstance.name = this.name;
            if (this.IsClone == false)
                JWFramework.ObjectManager.getInstance().AddObject(this, this.name, this.Type);
            else
                this.CreateCollider();
        }
        CreateCollider() {
            this.CollisionComponent.CreateBoundingBox(1, 1, 1);
            this.CollisionComponent.CreateRaycaster();
        }
        CollisionActive() {
        }
        CollisionDeActive() {
        }
        Animate() {
            if (this.isClone == true) {
                this.CollisionComponent.Update();
            }
            if (this.IsPlayer == true) {
                this.PhysicsComponent.MoveFoward(15);
                if (JWFramework.InputManager.getInstance().GetKeyState('left', JWFramework.KeyState.KEY_PRESS)) {
                    this.PhysicsComponent.RotateVec3(this.PhysicsComponent.Look, -1);
                }
                if (JWFramework.InputManager.getInstance().GetKeyState('right', JWFramework.KeyState.KEY_PRESS)) {
                    this.PhysicsComponent.RotateVec3(this.PhysicsComponent.Look, 1);
                }
                if (JWFramework.InputManager.getInstance().GetKeyState('down', JWFramework.KeyState.KEY_PRESS)) {
                    this.PhysicsComponent.RotateVec3(this.PhysicsComponent.Right, -1);
                }
                if (JWFramework.InputManager.getInstance().GetKeyState('up', JWFramework.KeyState.KEY_PRESS)) {
                    this.PhysicsComponent.RotateVec3(this.PhysicsComponent.Right, 1);
                }
                if (JWFramework.InputManager.getInstance().GetKeyState('w', JWFramework.KeyState.KEY_PRESS)) {
                    this.throttle += 2;
                }
                if (JWFramework.InputManager.getInstance().GetKeyState('f', JWFramework.KeyState.KEY_DOWN)) {
                    JWFramework.CameraManager.getInstance().SetCameraSavedPosition(JWFramework.CameraMode.CAMERA_3RD);
                }
                if (JWFramework.InputManager.getInstance().GetKeyState('r', JWFramework.KeyState.KEY_DOWN)) {
                    JWFramework.CameraManager.getInstance().SetCameraSavedPosition(JWFramework.CameraMode.CAMERA_ORBIT);
                }
            }
        }
    }
    JWFramework.F16Object = F16Object;
})(JWFramework || (JWFramework = {}));
//# sourceMappingURL=JWFramework.js.map