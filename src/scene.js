import * as THREE from 'three';

export class Scene {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0a);
        this.scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);

        this.setupLights();
        this.setupGround();
        this.setupZones();
    }

    setupLights() {
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambient);

        const directional = new THREE.DirectionalLight(0xffffff, 1.0);
        directional.position.set(5, 15, 5);
        directional.castShadow = true;
        directional.shadow.camera.left = -25;
        directional.shadow.camera.right = 25;
        directional.shadow.camera.top = 25;
        directional.shadow.camera.bottom = -25;
        this.scene.add(directional);

        const hemi = new THREE.HemisphereLight(0x667eea, 0x764ba2, 0.4);
        this.scene.add(hemi);
    }

    setupGround() {
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            roughness: 0.8,
            metalness: 0.2
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);

        const gridHelper = new THREE.GridHelper(100, 50, 0x333333, 0x222222);
        this.scene.add(gridHelper);
    }

    setupZones() {
        this.zones = [];

        const zoneConfigs = [
            { name: 'HOME', color: 0x667eea, position: [0, 0, 0] },
            { name: 'EXPERIENCE', color: 0xe74c3c, position: [0, 0, -12] },
            { name: 'PROJECTS', color: 0x3498db, position: [0, 0, 12] },
            { name: 'SKILLS', color: 0x2ecc71, position: [12, 0, 0] },
            { name: 'POR & ACHIEVEMENTS', color: 0xf39c12, position: [-12, 0, 0] }
        ];

        zoneConfigs.forEach(config => {
            const zone = this.createZone(config);
            this.zones.push(zone);
        });

        this.setupNavigationArrows();
    }

    setupNavigationArrows() {
        const arrowShape = new THREE.Shape();
        arrowShape.moveTo(0, 1);
        arrowShape.lineTo(1, -1);
        arrowShape.lineTo(0, -0.5);
        arrowShape.lineTo(-1, -1);
        arrowShape.lineTo(0, 1);

        const arrowGeometry = new THREE.ShapeGeometry(arrowShape);
        const arrowConfigs = [
            { name: 'EXPERIENCE', color: 0xe74c3c, position: [0, 0.1, -4], rotation: 0 },         // Points Back (-Z) - Rotation 0 is facing +Y? shape drawn in XY plane.
            // We need to rotate X -90 to lay flat. Then Rotate Z to point direction.
            { name: 'PROJECTS', color: 0x3498db, position: [0, 0.1, 4], rotation: Math.PI },       // Points Front (+Z)
            { name: 'SKILLS', color: 0x2ecc71, position: [4, 0.1, 0], rotation: -Math.PI / 2 },    // Points Right (+X)
            { name: 'ACHIEVEMENTS', color: 0xf39c12, position: [-4, 0.1, 0], rotation: Math.PI / 2 } // Points Left (-X)
        ];

        arrowConfigs.forEach(config => {
            const material = new THREE.MeshBasicMaterial({
                color: config.color,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.8
            });

            const arrow = new THREE.Mesh(arrowGeometry, material);
            arrow.scale.set(1.5, 1.5, 1.5);
            arrow.position.set(...config.position);

            // Lay flat
            arrow.rotation.x = -Math.PI / 2;
            // Point direction (Rotate around Z axis which is now vertical relative to the arrow plane)
            // Wait, after X rotation, Y is Forward/Backward, Z is Up/Down relative to world?
            // Let's think: Geometry in XY plane. +Y is UP in Geometry.
            // Op: Rotate X -90 deg.
            // Result: +Y geometry becomes -Z world (Back). +X geometry is +X world.
            // So default (0 rotation) points -Z (Back). Correct.

            // Adjust rotation around World Y (which is local Z after X-rotation? No, rotation order is XYZ usually)
            // Standard approach: Set rotation directly.
            arrow.rotation.z = config.rotation; // This rotates around the local Z axis (which points UP in world/normal to ground)

            // Add glowing border
            const edges = new THREE.EdgesGeometry(arrowGeometry);
            const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 }));
            arrow.add(line);

            // Add label below arrow
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 512;
            canvas.height = 128;
            context.font = 'bold 40px Inter, Arial';
            context.fillStyle = '#ffffff';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(config.name, canvas.width / 2, canvas.height / 2);

            const labelTexture = new THREE.CanvasTexture(canvas);
            const labelMaterial = new THREE.MeshBasicMaterial({ map: labelTexture, transparent: true });
            const label = new THREE.Mesh(new THREE.PlaneGeometry(2, 0.5), labelMaterial);

            // Position label "behind" the arrow (closer to center)
            label.position.set(0, -1.5, 0); // In local coordinates (Y is back/forward on ground now)
            arrow.add(label);

            this.scene.add(arrow);

            // Animate arrow
            const initialZ = arrow.position.z;
            const initialX = arrow.position.x;

            // Simple reference for animation loop if we had access, but for now static is fine or add to scene objects list
            // We'll leave it static glowing for now.
        });
    }

    createZone(config) {
        const zoneGroup = new THREE.Group();

        // Elevated pedestal
        const pedestalGeometry = new THREE.CylinderGeometry(2, 2.2, 0.5, 16);
        const pedestalMaterial = new THREE.MeshStandardMaterial({
            color: config.color,
            roughness: 0.3,
            metalness: 0.7
        });
        const pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
        pedestal.position.y = 0.25;
        pedestal.castShadow = true;
        pedestal.receiveShadow = true;
        zoneGroup.add(pedestal);

        // Create BIG, CLEAR text board
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 2048;  // High resolution
        canvas.height = 512;

        // Solid background
        context.fillStyle = 'rgba(0, 0, 0, 0.95)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Colored border
        context.strokeStyle = `#${config.color.toString(16).padStart(6, '0')}`;
        context.lineWidth = 20;
        context.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

        // BIG, CLEAR TEXT
        context.font = 'bold 140px Inter, Arial, sans-serif';
        context.fillStyle = '#ffffff';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(config.name, canvas.width / 2, canvas.height / 2);

        const texture = new THREE.CanvasTexture(canvas);
        const textMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide
        });

        // LARGE vertical board
        const textGeometry = new THREE.PlaneGeometry(6, 1.5);
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.y = 1.5;
        zoneGroup.add(textMesh);

        zoneGroup.position.set(...config.position);
        this.scene.add(zoneGroup);

        // Glow effect
        const glowGeometry = new THREE.CylinderGeometry(2.3, 2.5, 0.1, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: config.color,
            transparent: true,
            opacity: 0.3
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.set(...config.position);
        glow.position.y = 0.05;
        this.scene.add(glow);

        return {
            name: config.name,
            mesh: zoneGroup,
            glow: glow,
            pillar: zoneGroup,
            position: new THREE.Vector3(...config.position),
            bounds: new THREE.Box3().setFromObject(zoneGroup)
        };
    }

    getZones() {
        return this.zones;
    }

    getScene() {
        return this.scene;
    }
}
