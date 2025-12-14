import * as THREE from 'three';
import { Scene } from './scene.js';
import { PlayerController } from './playerController.js';
import { CameraController } from './cameraController.js';
import { UIOverlay } from './uiOverlay.js';

class Portfolio3D {
    constructor() {
        this.init();
        this.setupRenderer();
        this.setupCamera();
        this.setupScene();
        this.setupPlayer();
        this.setupCameraController();
        this.setupUI();
        this.setupZoneDetection();

        this.hideLoading();
        this.animate();
    }

    init() {
        this.canvas = document.getElementById('canvas');
        this.clock = new THREE.Clock();
        this.currentZone = null;
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 8, 12);
    }

    setupScene() {
        this.sceneManager = new Scene();
        this.scene = this.sceneManager.getScene();
        this.zones = this.sceneManager.getZones();
    }

    setupPlayer() {
        this.player = new PlayerController(this.scene);
    }

    setupCameraController() {
        this.cameraController = new CameraController(this.camera, this.player);
    }

    setupUI() {
        this.uiOverlay = new UIOverlay();
    }

    setupZoneDetection() {
        this.zoneCheckInterval = 100; // Check every 100ms
        this.lastZoneCheck = 0;
    }

    checkZoneCollision() {
        const playerPos = this.player.getPosition();
        console.log('Player position:', playerPos.x.toFixed(2), playerPos.y.toFixed(2), playerPos.z.toFixed(2));

        for (const zone of this.zones) {
            const distance = playerPos.distanceTo(zone.position);
            console.log(`Distance to ${zone.name}:`, distance.toFixed(2), 'Zone at:', zone.position.x, zone.position.z);

            if (distance < 2.5) { // Reduced radius - must be ON the arrow to trigger
                console.log('🎯 ENTERING ZONE:', zone.name);
                if (this.currentZone !== zone.name) {
                    console.log('📢 Showing overlay for:', zone.name);
                    this.currentZone = zone.name;
                    this.uiOverlay.show(zone.name);

                    // Hide instructions
                    const instructions = document.getElementById('instructions');
                    if (instructions) {
                        instructions.classList.add('hidden');
                    }
                }
                return;
            }
        }

        // Not in any zone
        if (this.currentZone) {
            console.log('👋 Left all zones');
            this.currentZone = null;
            // Show instructions again
            const instructions = document.getElementById('instructions');
            if (instructions) {
                instructions.classList.remove('hidden');
            }
        }
    }

    hideLoading() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            loadingScreen.classList.add('hidden');
        }, 1000);
    }

    handleResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const delta = this.clock.getDelta();
        const elapsed = this.clock.getElapsedTime();

        // Update player
        this.player.update();

        // Update camera
        this.cameraController.update();

        // Check zone collision
        if (elapsed * 1000 - this.lastZoneCheck > this.zoneCheckInterval) {
            this.checkZoneCollision();
            this.lastZoneCheck = elapsed * 1000;
        }

        // Animate zone glows
        this.zones.forEach((zone, index) => {
            const pulse = Math.sin(elapsed * 2 + index) * 0.5 + 0.5;
            zone.glow.material.opacity = 0.2 + pulse * 0.3;
            // Gentle floating animation for cards
            zone.mesh.position.y = Math.sin(elapsed * 0.5 + index) * 0.05;
        });

        // Render
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    const app = new Portfolio3D();

    // Handle window resize
    window.addEventListener('resize', () => app.handleResize());
});
