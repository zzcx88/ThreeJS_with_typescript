﻿namespace JWFramework {
    export class Define {
        static SCREEN_WIDTH: number = window.innerWidth;
        static SCREEN_HEIGHT: number = window.innerHeight;
    }

    export class ModelSceneTest {
        private static instance: ModelSceneTest;

        static getInstance() {
            if (!ModelSceneTest.instance) {
                ModelSceneTest.instance = new ModelSceneTest;
            }
            return ModelSceneTest.instance;
        }

        public constructor() {
            this.sceneTestModel = [{
                model: this.helmet, url: 'Model/DamagedHelmet.gltf'
            }];
            this.modelNumber = this.sceneTestModel.length;
        }
        public get ModelSceneTest(): ModelSet[] {
            return this.sceneTestModel;
        }

        public get ModelNumber(): number {
            return this.modelNumber;
        }

        private helmet: TestObject = new TestObject;
        private sceneTestModel: ModelSet[] = [];

        private modelNumber: number;
    }
    export interface ModelSet {
        model: GameObject;
        url: string;
    }
}