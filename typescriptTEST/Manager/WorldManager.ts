﻿namespace JWFramework {
    export class WorldManager {

        private static instance: WorldManager;

        private constructor() { }

        static getInstance() {
            if (!WorldManager.instance) {
                WorldManager.instance = new WorldManager;
            }
            return WorldManager.instance;
        }

        public InitializeWorld() {
            this.CreateRendere();
            this.ResizeView();
            this.CreateMainCamera();
            this.CreateScene();
            this.CreateDeltaTime();
        }

        private CreateRendere() {
            this.renderer = new THREE.WebGLRenderer(
                {
                canvas: document.querySelector("#c"),
                alpha: true,
                clearAlpha: 0,
                clearColor: 0x000000,
                devicePixelRatio: 0,
                antialias: false,
                precision: "highp",
                premultipliedAlpha: true,
                stencil: true,
                preserveDrawingBuffer: false,
                logarithmicDepthBuffer: false
                }
            );
            this.renderer.setViewport(0, 0, Define.SCREEN_WIDTH, Define.SCREEN_HEIGHT);
            this.renderer.setScissor(0, 0, 0, 0);
            this.renderer.setClearColor(0x000000);
            this.renderer.setFaceCulling(THREE.CullFaceBack);
            document.body.appendChild(this.renderer.domElement);
        }

        private ResizeView() {
            this.renderer.setSize(Define.SCREEN_WIDTH/2, Define.SCREEN_HEIGHT/2);
        }

        private CreateMainCamera() {
            this.camera = new Camera();
            this.camera.Fov = 75;
            this.camera.Aspect = Define.SCREEN_WIDTH / Define.SCREEN_HEIGHT;
            this.camera.Near = 0.1;
            this.camera.Far = 1000;
            this.camera.PhysicsComponent.SetPostion(0, 0, 2);
        }

        private CreateScene() {
            this.sceneManager = SceneManager.getInstance();
            this.sceneManager.BuildScene();
            this.sceneManager.SceneInstance.background = new THREE.Color('blue');
        }

        private CreateDeltaTime() {
            this.clock = new THREE.Clock();
            this.delta = 0;
        }

        public Animate() {
            this.delta = this.clock.getDelta();
            this.sceneManager.Animate();
        }

        public GetDeltaTime(): number {
            return this.delta;
        }

        public get Canvas(): HTMLCanvasElement {
            return this.renderer.domElement;
        }

        public get MainCamera(): Camera {
            return this.camera;
        }

        public Render() {
            this.renderer.render(this.sceneManager.SceneInstance, this.camera.CameraInstance);
        }

        private renderer: THREE.WebGLRenderer;
        private sceneManager: SceneManager;

        private camera: Camera;

        private clock: THREE.Clock;
        private delta: number;
    }
}