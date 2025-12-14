import * as THREE from 'three';
import { Joystick } from './joystick.js';

export class PlayerController {
    constructor(scene) {
        this.scene = scene;
        this.velocity = new THREE.Vector3();
        this.speed = 0.3;
        this.keys = {};

        this.createPlayer();
        this.setupControls();

        // Initialize joystick
        this.joystick = new Joystick('joystick-zone');
    }

    createPlayer() {
        // Simple character (sphere on cylinder)
        const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1.5, 8);
        const bodyMaterial = new THREE.MeshStandardMaterial({
            color: 0x667eea,
            emissive: 0x667eea,
            emissiveIntensity: 0.2
        });
        this.body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        this.body.position.y = 0.75;
        this.body.castShadow = true;

        // Head
        const headGeometry = new THREE.SphereGeometry(0.35, 16, 16);
        const headMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0x667eea,
            emissiveIntensity: 0.1
        });
        this.head = new THREE.Mesh(headGeometry, headMaterial);
        this.head.position.y = 1.85;
        this.head.castShadow = true;

        // Group
        this.player = new THREE.Group();
        this.player.add(this.body);
        this.player.add(this.head);
        this.player.position.set(0, 0, 5);

        this.scene.add(this.player);
    }

    setupControls() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
    }

    update() {
        // Reset velocity
        this.velocity.set(0, 0, 0);

        // WASD controls
        if (this.keys['w'] || this.keys['arrowup']) {
            this.velocity.z -= this.speed;
        }
        if (this.keys['s'] || this.keys['arrowdown']) {
            this.velocity.z += this.speed;
        }
        if (this.keys['a'] || this.keys['arrowleft']) {
            this.velocity.x -= this.speed;
        }
        if (this.keys['d'] || this.keys['arrowright']) {
            this.velocity.x += this.speed;
        }

        // Joystick inputs
        if (this.joystick && this.joystick.active) {
            this.velocity.x += this.joystick.vector.x * this.speed;
            this.velocity.z += this.joystick.vector.y * this.speed;
        }

        // Apply movement
        this.player.position.add(this.velocity);

        // Boundary constraints
        const boundary = 45;
        this.player.position.x = Math.max(-boundary, Math.min(boundary, this.player.position.x));
        this.player.position.z = Math.max(-boundary, Math.min(boundary, this.player.position.z));

        // Rotate player in movement direction
        if (this.velocity.length() > 0) {
            const angle = Math.atan2(this.velocity.x, this.velocity.z);
            this.player.rotation.y = angle;

            // Bob animation
            this.head.position.y = 1.85 + Math.sin(Date.now() * 0.01) * 0.05;
        }
    }

    getPosition() {
        return this.player.position.clone();
    }

    getPlayer() {
        return this.player;
    }
}
