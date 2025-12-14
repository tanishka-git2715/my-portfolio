# 3D Interactive Portfolio

A game-style 3D portfolio built with Three.js featuring character controls and interactive zones.

## Quick Start

### 1. Install Dependencies

```bash
cd 3d-portfolio
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

### 3. Open in Browser

Navigate to `http://localhost:5173` (or the URL shown in terminal)

## Controls

- **W / ↑** - Move forward
- **S / ↓** - Move backward  
- **A / ←** - Move left
- **D / →** - Move right
- **ESC** - Close overlay

## Project Structure

```
3d-portfolio/
├── index.html              # Main HTML file
├── package.json            # Dependencies
├── src/
│   ├── main.js            # Entry point & game loop
│   ├── scene.js           # Three.js scene setup
│   ├── playerController.js # Character movement
│   ├── cameraController.js # Camera follow system
│   ├── uiOverlay.js       # Overlay UI system
│   ├── content.js         # Portfolio data
│   └── style.css          # UI styling
```

## Customization

### Update Content

Edit `src/content.js` to change your portfolio information:
- Personal details
- Experience
- Projects
- Skills
- Achievements
- Contact info

### Modify Zones

Edit `src/scene.js` in the `setupZones()` method to:
- Change zone colors
- Adjust positions
- Add/remove zones

### Styling

Edit `src/style.css` to customize:
- Overlay appearance
- Colors and fonts
- Animations

## Build for Production

```bash
npm run build
```

Output will be in `dist/` folder.

## Technologies

- **Three.js** - 3D rendering
- **GSAP** - Animations
- **Vite** - Build tool

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari

## Performance Tips

- Runs best on desktop with dedicated GPU
- Reduce shadow quality for better performance
- Close other browser tabs

## Next Steps

To enhance this MVP:
1. Add 3D character model (GLTF)
2. Implement physics with Cannon.js
3. Add ambient music/sound effects
4. Create more detailed environment
5. Add mobile touch controls
6. Optimize for lower-end devices

## License

MIT

---

Built with ❤️ by Tanishka Khandelwal
