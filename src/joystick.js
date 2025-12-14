export class Joystick {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.joystickVisual = document.getElementById('joystick');
        this.thumb = this.container.querySelector('.joystick-thumb');

        this.active = false;
        this.origin = { x: 0, y: 0 }; // Where the joystick "base" is currently
        this.currentPos = { x: 0, y: 0 }; // Where the thumb is
        this.vector = { x: 0, y: 0 }; // Normalized vector (-1 to 1)

        this.maxRadius = 60; // Max distance thumb can move

        this.setupEvents();
    }

    setupEvents() {
        // Touch events
        this.container.addEventListener('touchstart', this.handleStart.bind(this), { passive: false });
        document.addEventListener('touchmove', this.handleMove.bind(this), { passive: false });
        document.addEventListener('touchend', this.handleEnd.bind(this));

        // Disable mouse events for dynamic joystick to avoid confusion or just treat click as touch
        // For simplicity, mostly relying on Touch for mobile experience
    }

    handleStart(e) {
        if (e.target !== this.container && !this.container.contains(e.target)) return;

        e.preventDefault();

        const clientX = e.touches[0].clientX;
        const clientY = e.touches[0].clientY;

        this.startJoystick(clientX, clientY);
    }

    startJoystick(x, y) {
        this.active = true;
        this.joystickVisual.classList.add('active');

        // Set origin to touch position
        this.origin = { x, y };

        // Position visual joystick
        this.joystickVisual.style.left = `${x}px`;
        this.joystickVisual.style.top = `${y}px`;

        // Reset thumb
        this.thumb.style.transform = `translate(0px, 0px)`;
        this.vector = { x: 0, y: 0 };
    }

    handleMove(e) {
        if (!this.active) return;
        if (e.cancelable) e.preventDefault();

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        this.updateStick(clientX, clientY);
    }

    updateStick(clientX, clientY) {
        let dx = clientX - this.origin.x;
        let dy = clientY - this.origin.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        // Clamp to radius
        if (distance > this.maxRadius) {
            const angle = Math.atan2(dy, dx);
            dx = Math.cos(angle) * this.maxRadius;
            dy = Math.sin(angle) * this.maxRadius;
        }

        // Update vector
        this.vector.x = dx / this.maxRadius;
        this.vector.y = dy / this.maxRadius;

        // Move thumb
        this.thumb.style.transform = `translate(${dx}px, ${dy}px)`;
    }

    handleEnd() {
        if (!this.active) return;

        this.active = false;
        this.joystickVisual.classList.remove('active');
        this.vector = { x: 0, y: 0 };
    }
}
