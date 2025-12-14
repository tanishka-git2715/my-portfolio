import { portfolioContent } from './content.js';
import gsap from 'gsap';

export class UIOverlay {
    constructor() {
        this.overlay = document.getElementById('overlay');
        this.content = document.getElementById('overlay-content');
        this.closeBtn = document.getElementById('close-overlay');
        this.currentZone = null;

        console.log('UIOverlay initialized:', {
            overlay: this.overlay,
            content: this.content,
            closeBtn: this.closeBtn
        });

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.closeBtn.addEventListener('click', () => this.hide());

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.overlay.classList.contains('hidden')) {
                this.hide();
            }
        });

        // Click outside to close
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.hide();
            }
        });
    }

    show(zoneName) {
        try {
            console.log('🎨 SHOW METHOD CALLED with:', zoneName);

            this.currentZone = zoneName;
            const data = portfolioContent[zoneName];

            if (!data) {
                console.error('No data for zone:', zoneName);
                this.content.innerHTML = `<h2 style="color: white;">No content for ${zoneName}</h2>`;
                this.overlay.classList.remove('hidden');
                return;
            }

            // Simple test content first
            this.content.innerHTML = `
                <h2 style="color: white; font-size: 2rem; margin-bottom: 20px;">${data.title || zoneName.toUpperCase()}</h2>
                <p style="color: white; font-size: 1.2rem;">This is test content for ${zoneName}</p>
                <p style="color: white;">Data loaded successfully!</p>
            `;

            console.log('Content HTML set successfully');
            this.overlay.classList.remove('hidden');
            console.log('Overlay shown');

        } catch (error) {
            console.error('ERROR in show():', error);
            this.content.innerHTML = `<h2 style="color: white;">Error: ${error.message}</h2>`;
            this.overlay.classList.remove('hidden');
        }
    }

    hide() {
        this.overlay.classList.add('hidden');
        this.currentZone = null;
    }
}
