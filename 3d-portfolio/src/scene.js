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
