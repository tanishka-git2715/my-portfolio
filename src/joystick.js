export class Joystick {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.thumb = this.container.querySelector('.joystick-thumb');

        this.active = false;
        this.dragStart = { x: 0, y: 0 };
        this.currentPos = { x: 0, y: 0 };
        this.vector = { x: 0, y: 0 }; // Normalized vector (-1 to 1)

        this.maxRadius = 40; // Max distance thumb can move

        this.setupEvents();
    }

    setupEvents() {
        // Touch events
        this.container.addEventListener('touchstart', this.handleStart.bind(this), { passive: false });
        document.addEventListener('touchmove', this.handleMove.bind(this), { passive: false });
        document.addEventListener('touchend', this.handleEnd.bind(this));

        // Mouse events (for testing on desktop)
        this.container.addEventListener('mousedown', this.handleStart.bind(this));
        document.addEventListener('mousemove', this.handleMove.bind(this));
        document.addEventListener('mouseup', this.handleEnd.bind(this));
    }

    handleStart(e) {
        // Only trigger if touching the joystick container
        if (e.target !== this.container && e.target !== this.thumb) return;

        e.preventDefault();
        this.active = true;
        this.container.classList.add('active');

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        this.dragStart = { x: clientX, y: clientY };
        this.updatePosition(clientX, clientY);
    }

    handleMove(e) {
        if (!this.active) return;

        // Prevent scrolling while using joystick
        if (e.cancelable) e.preventDefault();

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        this.updatePosition(clientX, clientY);
    }

    handleEnd() {
        if (!this.active) return;

        this.active = false;
        this.container.classList.remove('active');
        this.vector = { x: 0, y: 0 };

        // Reset thumb position
        this.thumb.style.transform = `translate(0px, 0px)`;
    }

    updatePosition(clientX, clientY) {
        // Calculate deltas based on container center
        const rect = this.container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        let dx = clientX - centerX;
        let dy = clientY - centerY;

        // Calculate distance
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Clamp to radius
        if (distance > this.maxRadius) {
            const angle = Math.atan2(dy, dx);
            dx = Math.cos(angle) * this.maxRadius;
            dy = Math.sin(angle) * this.maxRadius;
        }

        // Update vector (-1 to 1)
        this.vector.x = dx / this.maxRadius;
        this.vector.y = dy / this.maxRadius;

        // Move thumb
        this.thumb.style.transform = `translate(${dx}px, ${dy}px)`;
    }
}
