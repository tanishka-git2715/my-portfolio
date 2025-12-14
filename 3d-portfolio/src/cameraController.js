import * as THREE from 'three';

export class CameraController {
    constructor(camera, player) {
        this.camera = camera;
        this.player = player;

        // Camera offset from player
        this.offset = new THREE.Vector3(0, 8, 12);
        this.lookAtOffset = new THREE.Vector3(0, 1, 0);

        // Smooth follow
        this.smoothness = 0.1;
    }

    update() {
        const playerPos = this.player.getPosition();

        // Calculate desired camera position
        const desiredPosition = playerPos.clone().add(this.offset);

        // Smooth lerp to desired position
        this.camera.position.lerp(desiredPosition, this.smoothness);

        // Look at player with offset
        const lookAtTarget = playerPos.clone().add(this.lookAtOffset);
        this.camera.lookAt(lookAtTarget);
    }
}
