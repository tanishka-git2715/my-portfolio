

import { portfolioContent } from './content.js';
import gsap from 'gsap';
import resumePdf from './assets/Tanishka_Khandelwal_Resume.pdf';

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

            // Specific layout for HOME
            if (zoneName === 'HOME') {
                this.content.innerHTML = `
                    <div style="text-align: center; color: white;">
                        <h1 style="font-size: 2.2rem; margin-bottom: 0.5rem; letter-spacing: 0.5px; font-family: 'Inter', sans-serif; font-weight: 700; color: #fff;">TANISHKA KHANDELWAL</h1>
                        
                        <div style="display: flex; justify-content: center; gap: 30px; margin-bottom: 30px; align-items: center;">
                            <a href="mailto:tashukhandelwal27@gmail.com" style="color: #bbb; text-decoration: none; display: flex; align-items: center; gap: 10px; font-weight: 500; font-family: 'Inter', sans-serif; font-size: 1rem;">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                    <path d="M22 6l-10 7L2 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M2 6l10 7 10-7v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6z" fill="black"/> 
                                    <!-- Use simple icon paths for cleaner look -->
                                    <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="white"/>
                                </svg>
                                Email
                            </a>
                            <span style="color: #555; font-size: 20px; font-weight: 200;">—</span>
                            <a href="https://www.linkedin.com/in/tanishka2712/" target="_blank" style="color: #bbb; text-decoration: none; display: flex; align-items: center; gap: 10px; font-weight: 500; font-family: 'Inter', sans-serif; font-size: 1rem;">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="white"/>
                                </svg>
                                LinkedIn
                            </a>
                            <span style="color: #555; font-size: 20px; font-weight: 200;">—</span>
                            <a href="https://github.com/tanishka-git2715" target="_blank" style="color: #bbb; text-decoration: none; display: flex; align-items: center; gap: 10px; font-weight: 500; font-family: 'Inter', sans-serif; font-size: 1rem;">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" fill="white"/>
                                </svg>
                                Github
                            </a>
                        </div>

                        <div style="text-align: left; max-width: 800px; margin: 0 auto; border-top: 1px solid #444; padding-top: 20px;">
                            <h2 style="color: #d4a373; font-size: 1.5rem; margin-bottom: 20px; border-bottom: 2px solid #d4a373; display: inline-block;">Education</h2>
                            
                            <div style="margin-bottom: 15px; display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #333; padding-bottom: 10px;">
                                <div>
                                    <h3 style="margin: 0; font-size: 1.1rem; color: #fff; font-weight: 400;">Netaji Subhash University of Technology</h3>
                                    <p style="margin: 3px 0 0; color: #aaa; font-size: 0.9rem;">Btech in CSE-MAC</p>
                                </div>
                                <span style="color: #fff; font-size: 0.9rem;">2023–2027</span>
                            </div>

                            <div style="margin-bottom: 15px; display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #333; padding-bottom: 10px;">
                                <div>
                                    <h3 style="margin: 0; font-size: 1rem; color: #fff; font-weight: 400;">Lovely Public Sr. Sec. School, Delhi</h3>
                                    <p style="margin: 3px 0 0; color: #aaa; font-size: 0.9rem;">CBSE XII</p>
                                </div>
                                <div style="text-align: right;">
                                    <span style="display: block; color: #fff; font-size: 0.9rem;">2022–2023</span>
                                    <span style="display: block; color: #4ade80; font-size: 0.85rem;">92.2%</span>
                                </div>
                            </div>

                            <div style="margin-bottom: 15px; display: flex; justify-content: space-between; align-items: baseline;">
                                <div>
                                    <h3 style="margin: 0; font-size: 1rem; color: #fff; font-weight: 400;">Lovely Public Sr. Sec. School, Delhi</h3>
                                    <p style="margin: 3px 0 0; color: #aaa; font-size: 0.9rem;">CBSE X</p>
                                </div>
                                <div style="text-align: right;">
                                    <span style="display: block; color: #fff; font-size: 0.9rem;">2020–2021</span>
                                    <span style="display: block; color: #4ade80; font-size: 0.85rem;">97.2%</span>
                                </div>
                            </div>
                        </div>

                        <div style="text-align: center; margin-top: 30px;">
                            <a href="https://drive.google.com/file/d/1lpZfqbVpYPWbVWTmp1QuB3zupk1iyv5z/view?usp=sharing" target="_blank" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 1rem; border: 1px solid rgba(255,255,255,0.2); transition: transform 0.2s, box-shadow 0.2s; cursor: pointer;">
                                📄 View Resume
                            </a>
                        </div>
                    </div>
                `;

            } else if (zoneName === 'EXPERIENCE') {
                this.content.innerHTML = `
                    <div style="text-align: left; max-width: 800px; margin: 0 auto; padding-top: 0;">
                        <h2 style="color: #d4a373; font-size: 2rem; margin-bottom: 20px; border-bottom: 2px solid #d4a373; display: inline-block;">Work Experience</h2>
                        
                        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px; transition: transform 0.2s; hover: {transform: translateY(-2px);}">
                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
                                <h3 style="margin: 0; font-size: 1.1rem; color: #fff; font-weight: 500;">Chordy.ai (Remote)</h3>
                                <span style="color: #fff; font-size: 0.9rem;">Nov'25 – Present</span>
                            </div>
                            <p style="margin: 0 0 10px; color: #aaa; font-style: italic; font-size: 0.9rem;">Technical Lead</p>
                            <ul style="color: #ddd; margin: 0; padding-left: 20px; font-size: 0.9rem; line-height: 1.5;">
                                <li style="margin-bottom: 5px;">Leading the development of <b>Chordy.ai</b>, an <b>AI Superconnector</b> focused on <b>emotion- and intent-based matchmaking</b> for meaningful professional relationships.</li>
                                <li style="margin-bottom: 5px;">Designed the core <b>Resonance Engine</b>, combining <b>intent modeling</b>, <b>purpose alignment</b>, and <b>emotional signals</b>.</li>
                                <li>Driving product strategy and early user onboarding while coordinating with developers and early adopters to iterate toward product–market fit.</li>
                            </ul>
                        </div>

                        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
                                <h3 style="margin: 0; font-size: 1.1rem; color: #fff; font-weight: 500;">ElectraWireless (US Based Startup) (Remote)</h3>
                                <span style="color: #fff; font-size: 0.9rem;">Sep'25 – Dec'25</span>
                            </div>
                            <p style="margin: 0 0 10px; color: #aaa; font-style: italic; font-size: 0.9rem;">Software Development & Marketing Strategist Intern</p>
                            <ul style="color: #ddd; margin: 0; padding-left: 20px; font-size: 0.9rem; line-height: 1.5;">
                                <li style="margin-bottom: 5px;">Engineered modules for <b>real-time control and smart notification systems</b>, improving responsiveness and reliability.</li>
                                <li style="margin-bottom: 5px;">Developed <b>the Cognitive Core of the AI assistant</b>, including decision logic, real-time pipelines, and <b>core conversational engine flow</b>.</li>
                                <li>Enhanced the <b>brand’s global presence</b> by simplifying deep-tech concepts for broader audiences, resulting in a <b>25% increase in social media engagement</b>.</li>
                            </ul>
                        </div>

                        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
                                <h3 style="margin: 0; font-size: 1.1rem; color: #fff; font-weight: 500;">SBI Cards (Gurgaon)</h3>
                                <span style="color: #fff; font-size: 0.9rem;">Jun'25 – Jul'25</span>
                            </div>
                            <p style="margin: 0 0 10px; color: #aaa; font-style: italic; font-size: 0.9rem;">Information Technology Intern</p>
                            <ul style="color: #ddd; margin: 0; padding-left: 20px; font-size: 0.9rem; line-height: 1.5;">
                                <li style="margin-bottom: 5px;">Contributed to the development of <b>Sprint</b>, SBI Cards’ digital credit card platform, by preparing BRDs and aligning technical features with business needs.</li>
                                <li style="margin-bottom: 5px;">Streamlined <b>AI-powered KYC workflows</b>, reducing customer onboarding time by <b>20%</b> and improving verification accuracy.</li>
                                <li>Conducted <b>competitive benchmarking</b> for the YONO Card project, identifying gaps in fintech user journeys and recommending data-driven UX improvements.</li>
                            </ul>
                        </div>

                        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
                                <h3 style="margin: 0; font-size: 1.1rem; color: #fff; font-weight: 500;">Aarogya Vatika (Remote)</h3>
                                <span style="color: #fff; font-size: 0.9rem;">Jun'25 – Jul'25</span>
                            </div>
                            <p style="margin: 0 0 10px; color: #aaa; font-style: italic; font-size: 0.9rem;">Artificial Intelligence Intern</p>
                            <ul style="color: #ddd; margin: 0; padding-left: 20px; font-size: 0.9rem; line-height: 1.5;">
                                <li style="margin-bottom: 5px;">Built a prototype of an <b>AI-powered Wellness Platform</b>, integrating <b>rule-based nutrition</b> with a <b>machine learning recommendation engine</b> for personalized wellness plans.</li>
                                <li style="margin-bottom: 5px;">Developed an <b>NLP-based chatbot</b> using <b>RAG pipelines (LangChain + Vector DB)</b> to answer patient queries on food substitutions, nutrition, and Ayurvedic properties.</li>
                                <li>Implemented a <b>doctor feedback loop</b> to retrain models, enabling continuous improvement of diet recommendations and chatbot responses.</li>
                            </ul>
                        </div>

                        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
                                <h3 style="margin: 0; font-size: 1.1rem; color: #fff; font-weight: 500;">Marketing Makhni (Remote)</h3>
                                <span style="color: #fff; font-size: 0.9rem;">Mar'25 – May'25</span>
                            </div>
                            <p style="margin: 0 0 10px; color: #aaa; font-style: italic; font-size: 0.9rem;">Business Development Intern</p>
                            <ul style="color: #ddd; margin: 0; padding-left: 20px; font-size: 0.9rem; line-height: 1.5;">
                                <li style="margin-bottom: 5px;">Secured <b>30+ brand collaborations</b> through strategic pitches and ROI-focused proposals.</li>
                                <li style="margin-bottom: 5px;">Led the complete <b>client acquisition cycle</b> — prospecting, outreach, negotiation, and closure.</li>
                                <li>Boosted lead conversion by <b>25%</b> through CRM tracking and optimized campaign messaging.</li>
                            </ul>
                        </div>
                    </div>
                `;
            } else if (zoneName === 'PROJECTS') {
                this.content.innerHTML = `
                    <div style="text-align: left; max-width: 800px; margin: 0 auto; padding-top: 0;">
                        <h2 style="color: #d4a373; font-size: 2rem; margin-bottom: 20px; border-bottom: 2px solid #d4a373; display: inline-block;">Projects</h2>

                        <div class="project-container">
                            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px; transition: transform 0.2s; hover: {transform: translateY(-2px);}">
                                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
                                    <h3 style="margin: 0; font-size: 1.3rem; color: #fff; font-weight: 600;">Ayurvedic Healthcare Platform</h3>
                                    <span style="color: #fff; font-size: 0.9rem;">Sep'25</span>
                                </div>
                                <p style="margin: 0 0 10px; color: #aaa; font-style: italic; font-size: 1rem;">Ayurdev</p>
                                
                                <ul style="color: #ddd; margin: 0 0 15px 0; padding-left: 20px; font-size: 0.95rem; line-height: 1.6;">
                                    <li style="margin-bottom: 8px;">Built a <b>full-stack Ayurvedic healthcare platform</b> for consultations, appointments, and digital patient records.</li>
                                    <li style="margin-bottom: 8px;">Integrated <b>AI-powered features</b> including prescription summarization, Prakruti analysis, personalized diet plans, and LLM-based chat/voice assistants.</li>
                                    <li>Developed a secure <b>React–Node.js–MongoDB stack</b> with role-based authentication and admin dashboards.</li>
                                </ul>

                                <a href="https://github.com/tanishka-git2715/ayurveda-rag-project" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; color: #667eea; text-decoration: none; font-weight: 500; font-size: 0.95rem; hover: {text-decoration: underline;}">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                                    </svg>
                                    View on GitHub
                                </a>
                            </div>

                            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px; transition: transform 0.2s; hover: {transform: translateY(-2px);}">
                                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
                                    <h3 style="margin: 0; font-size: 1.3rem; color: #fff; font-weight: 600;">Automatic Speech Recognition (ASR) Model</h3>
                                    <span style="color: #fff; font-size: 0.9rem;">Sep'25</span>
                                </div>
                                <p style="margin: 0 0 10px; color: #aaa; font-style: italic; font-size: 1rem;">Fine-tuned OpenAI Whisper-Small</p>
                                
                                <ul style="color: #ddd; margin: 0 0 15px 0; padding-left: 20px; font-size: 0.95rem; line-height: 1.6;">
                                    <li style="margin-bottom: 8px;">Fine-tuned <b>OpenAI Whisper-Small</b> for Hindi speech recognition, achieving <b>2.98% Word Error Rate (WER)</b> on the evaluation set.</li>
                                    <li style="margin-bottom: 8px;">Optimized training using <b>AdamW (fused)</b> with <b>mixed-precision (AMP)</b> and a linear learning rate scheduler, ensuring stable convergence over 3 epochs.</li>
                                    <li>Built and evaluated the model using <b>PyTorch 2.8</b> and <b>Hugging Face Transformers</b>, achieving a final validation loss of 1.0656 with efficient batch training.</li>
                                </ul>

                                <a href="https://github.com/tanishka-git2715/whisper-hi-ft" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; color: #667eea; text-decoration: none; font-weight: 500; font-size: 0.95rem; hover: {text-decoration: underline;}">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                                    </svg>
                                    View on GitHub
                                </a>
                            </div>

                            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px; transition: transform 0.2s; hover: {transform: translateY(-2px);}">
                                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
                                    <h3 style="margin: 0; font-size: 1.3rem; color: #fff; font-weight: 600;">SynergyX</h3>
                                    <span style="color: #fff; font-size: 0.9rem;">July'25</span>
                                </div>
                                
                                <ul style="color: #ddd; margin: 10px 0 15px 0; padding-left: 20px; font-size: 0.95rem; line-height: 1.6;">
                                    <li style="margin-bottom: 8px;">Built a <b>gamified platform</b> empowering users to learn in-demand skills, access gig opportunities, and collaborate in student communities.</li>
                                    <li>Implemented <b>interactive front-end components</b> with seamless UX, enabling faster prototype iterations.</li>
                                </ul>

                                <a href="https://github.com/tanishka-git2715/synergyx" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; color: #667eea; text-decoration: none; font-weight: 500; font-size: 0.95rem; hover: {text-decoration: underline;}">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                                    </svg>
                                    View on GitHub
                                </a>
                            </div>

                            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px; transition: transform 0.2s; hover: {transform: translateY(-2px);}">
                                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
                                    <h3 style="margin: 0; font-size: 1.3rem; color: #fff; font-weight: 600;">FRP Composites Residual Strength Prediction</h3>
                                    <span style="color: #fff; font-size: 0.9rem;">April'25</span>
                                </div>
                                <p style="margin: 0 0 10px; color: #aaa; font-style: italic; font-size: 1rem;">Machine Learning Project</p>
                                
                                <ul style="color: #ddd; margin: 0 0 15px 0; padding-left: 20px; font-size: 0.95rem; line-height: 1.6;">
                                    <li style="margin-bottom: 8px;">Built and fine-tuned regression models (<b>Random Forest</b>, <b>Gradient Boosting</b>, <b>MLP</b>) in <b>Python</b>, achieving high predictive accuracy.</li>
                                    <li style="margin-bottom: 8px;">Applied <b>feature engineering</b> and <b>PCA-based dimensionality reduction</b> to enhance efficiency.</li>
                                    <li>Developed an <b>automated benchmarking pipeline</b> to validate model robustness and reliability.</li>
                                </ul>

                                <a href="https://github.com/tanishka-git2715/ml-project" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; color: #667eea; text-decoration: none; font-weight: 500; font-size: 0.95rem; hover: {text-decoration: underline;}">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                                    </svg>
                                    View on GitHub
                                </a>
                            </div>

                            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px; transition: transform 0.2s; hover: {transform: translateY(-2px);}">
                                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
                                    <h3 style="margin: 0; font-size: 1.3rem; color: #fff; font-weight: 600;">Food Delivery Analytics Platform</h3>
                                    <span style="color: #fff; font-size: 0.9rem;">March'25</span>
                                </div>
                                <p style="margin: 0 0 10px; color: #aaa; font-style: italic; font-size: 1rem;">Zomato Case Study</p>
                                
                                <ul style="color: #ddd; margin: 0; padding-left: 20px; font-size: 0.95rem; line-height: 1.6;">
                                    <li style="margin-bottom: 8px;">Developed an <b>AI-powered logistics framework</b> combining predictive analytics for demand forecasting, route optimization, and dynamic pricing.</li>
                                    <li style="margin-bottom: 8px;">Proposed <b>gamification features</b> and <b>group-ordering strategies</b> to boost user engagement and lifetime value, projecting a potential <b>15–20% revenue increase</b>.</li>
                                    <li>Delivered a <b>scalable blueprint</b> for a next-gen food delivery ecosystem, emphasizing AI-driven operational efficiency and customer experience.</li>
                                </ul>
                            </div>

                            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px; transition: transform 0.2s; hover: {transform: translateY(-2px);}">
                                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
                                    <h3 style="margin: 0; font-size: 1.3rem; color: #fff; font-weight: 600;">Social Media Analytics Platform</h3>
                                    <span style="color: #fff; font-size: 0.9rem;">Jan'25</span>
                                </div>
                                <p style="margin: 0 0 10px; color: #aaa; font-style: italic; font-size: 1rem;">DBMS Project</p>
                                
                                <ul style="color: #ddd; margin: 0; padding-left: 20px; font-size: 0.95rem; line-height: 1.6;">
                                    <li style="margin-bottom: 8px;">Developed a platform to analyze <b>user interactions</b>, enabling businesses and influencers to extract behavioral patterns.</li>
                                    <li style="margin-bottom: 8px;">Implemented <b>real-time dashboards</b> to track key metrics (likes, shares, engagement trends), enhancing decision-making.</li>
                                    <li>Designed <b>scalable data models and DBMS queries</b> to efficiently process large datasets under heavy loads.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
            } else if (zoneName === 'SKILLS') {
                const createSkillCategory = (title, skills) => `
                    <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px;">
                        <h3 style="margin: 0 0 15px 0; font-size: 1.1rem; color: #fff; font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">${title}</h3>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                            ${skills.map(skill => `
                                <span style="display: inline-block; background: rgba(255, 255, 255, 0.1); padding: 6px 14px; border-radius: 20px; font-size: 0.9rem; color: #e0e0e0; border: 1px solid rgba(255,255,255,0.05); transition: background 0.2s;">
                                    ${skill}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                `;

                this.content.innerHTML = `
                    <div style="text-align: left; max-width: 900px; margin: 0 auto; padding-top: 0;">
                        <h2 style="color: #d4a373; font-size: 2rem; margin-bottom: 25px; border-bottom: 2px solid #d4a373; display: inline-block;">Skills</h2>
                        
                        <div class="skills-grid">
                            ${createSkillCategory('Programming & Frameworks', ['C++', 'Python', 'MATLAB', 'HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Node.js', 'MongoDB'])}
                            ${createSkillCategory('Machine Learning & Data Analysis', ['SQL', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'NumPy', 'Pandas', 'Matplotlib'])}
                            ${createSkillCategory('Tools & Utilities', ['Docker', 'Git', 'Bash', 'Markdown', 'Excel', 'Generative AI & Automation'])}
                            ${createSkillCategory('Product & Business', ['Product Management', 'Digital Marketing', 'Client Acquisition', 'User Research'])}
                        </div>
                    </div>
                `;
            } else if (zoneName === 'POR & ACHIEVEMENTS') {
                this.content.innerHTML = `
                    <div style="text-align: left; max-width: 900px; margin: 0 auto; padding-top: 0;">
                        <!-- Positions of Responsibility -->
                        <h2 style="color: #d4a373; font-size: 2rem; margin-bottom: 25px; border-bottom: 2px solid #d4a373; display: inline-block;">Position of Responsibility</h2>
                        
                        <div style="margin-bottom: 40px;">
                            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
                                    <h3 style="margin: 0; font-size: 1.2rem; color: #fff; font-weight: 600;">Founder & Product Lead, Prodizzy</h3>
                                    <span style="color: #fff; font-size: 0.9rem;">Sep'25 - Present</span>
                                </div>
                                <ul style="color: #ddd; margin: 10px 0 0 0; padding-left: 20px; font-size: 0.95rem; line-height: 1.6;">
                                    <li style="margin-bottom: 5px;">Built a scalable platform supporting <b>50,000+ students across 200+ communities</b> in launching impactful projects.</li>
                                    <li>Secured <b>50+ strategic brand partnerships</b> for student-focused campaigns.</li>
                                </ul>
                                <a href="https://www.prodizzy.com/" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; color: #667eea; text-decoration: none; font-weight: 500; font-size: 0.9rem; margin-top: 15px;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                    Visit Prodizzy
                                </a>
                            </div>

                            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
                                    <h3 style="margin: 0; font-size: 1.2rem; color: #fff; font-weight: 600;">ISP Ambassador, Internshala</h3>
                                    <span style="color: #fff; font-size: 0.9rem;">July'25 - Aug'25</span>
                                </div>
                                <ul style="color: #ddd; margin: 10px 0 0 0; padding-left: 20px; font-size: 0.95rem; line-height: 1.6;">
                                    <li style="margin-bottom: 5px;">Promoted <b>Internshala internships and training programs</b> across campus and social media.</li>
                                    <li>Boosted student registrations through <b>targeted outreach campaigns</b>.</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Achievements -->
                        <h2 style="color: #d4a373; font-size: 2rem; margin-bottom: 25px; border-bottom: 2px solid #d4a373; display: inline-block;">Achievements</h2>
                        
                        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 25px;">
                            <ul style="color: #ddd; margin: 0; padding-left: 20px; font-size: 1rem; line-height: 1.8;">
                                <li style="margin-bottom: 15px;">Selected as a <b>SheFi Scholar</b> for a fully-funded program in <b>Web3 and AI</b>, gained hands-on experience in blockchain, DeFi, and NFTs.</li>
                                <li style="margin-bottom: 15px;">Secured <b>Top 20 position in Shark Tank IIITD 2025</b>, organized by Digital Delhi Conclave, for product pitch.</li>
                                <li style="margin-bottom: 15px;">Achieved <b>3rd place among 500+ teams</b> in <b>Product Prodigy: The Product Teardown Challenge</b>, SpaceCon'25, NSUT Delhi.</li>
                                <li style="margin-bottom: 15px;">Secured <b>2nd place at Founders' Framework</b>, Moksha'25, NSUT for entrepreneurship and business strategy.</li>
                                <li>Secured <b>97.8 Percentile in JEE Mains 2023</b>.</li>
                            </ul>
                        </div>
                    </div>
                `;
            } else {
                // Default content for other zones
                this.content.innerHTML = `
                    <div style="text-align: center;">
                        <h2 style="color: #d4a373; font-size: 2.5rem; margin-bottom: 20px;">${zoneName}</h2>
                        <p style="font-size: 1.2rem; line-height: 1.6;">Content for ${zoneName} coming soon...</p>
                    </div>
                `;
            }

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
