
// ===== MOBILE CONTACT BUTTON =====
const mobileContactBtn = document.getElementById('mobileContactBtn');

if (mobileContactBtn) {
    mobileContactBtn.addEventListener('click', () => {
        const contactTab = document.querySelector('[data-tab="contact"]');
        if (contactTab) {
            contactTab.click();
        }
    });
}
