import { motion, useMotionValue, useTransform } from "motion/react";
import { useState, useEffect } from "react";

type Tab = 'frontend' | 'backend' | 'personal';

const DevIdentityCard: React.FC = () => {
    const [tab, setTab] = useState<Tab>('frontend');

    // Motion values for tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [0, 300], [15, -15]);
    const rotateY = useTransform(x, [0, 300], [-15, 15]);
    const translateZ = useTransform(x, [0, 300], [0, 20]); // subtle depth

    // Reduced motion support
    const [reduceMotion, setReduceMotion] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduceMotion(mq.matches);
        const listener = () => setReduceMotion(mq.matches);
        mq.addEventListener('change', listener);
        return () => mq.removeEventListener('change', listener);
    }, []);

    return (
        <motion.div
            className="relative w-[360px] h-[480px] rounded-3xl overflow-hidden"
            style={{ rotateX: reduceMotion ? 0 : rotateX, rotateY: reduceMotion ? 0 : rotateY, translateZ: reduceMotion ? 0 : translateZ }}
            onMouseMove={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                x.set(e.clientX - rect.left);
                y.set(e.clientY - rect.top);
            }}
            onMouseLeave={() => {
                x.set(150);
                y.set(150);
            }}
        >
            {/* Neumorphic base */}
            <div className="absolute inset-0 bg-[#111] rounded-3xl shadow-soft">
                {/* Glass layer */}
                <div className="absolute inset-0 rounded-3xl bg-cardBg backdrop-blur-glass border border-white/20">
                    <div className="relative z-10 flex flex-col h-full p-6 text-white">
                        {/* Avatar & header */}
                        <motion.img
                            src="/avatar.png"
                            alt="Avatar"
                            className="w-24 h-24 rounded-full mx-auto border-2 border-neonCyan/50"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        />
                        <h2 className="text-3xl font-bold text-center mt-4">Your Name</h2>
                        <p className="text-center text-sm text-neonCyan/80 uppercase">Full Stack Developer</p>

                        {/* Tabbed content */}
                        <motion.div
                            key={tab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="mt-8 text-center text-sm leading-relaxed text-cyan-100/90"
                        >
                            {tab === 'frontend' && (
                                <p>Crafting immersive UI with <span className="text-neonCyan">React</span>, <span className="text-neonCyan">TypeScript</span>, and <span className="text-neonCyan">TailwindCSS</span>.</p>
                            )}
                            {tab === 'backend' && (
                                <p>Building robust APIs with <span className="text-neonCyan">Node.js</span>, <span className="text-neonCyan">Express</span> and <span className="text-neonCyan">PostgreSQL</span>.</p>
                            )}
                            {tab === 'personal' && (
                                <p>Coffee addict ☕ | Tech explorer 🚀 | Open-source lover 💻</p>
                            )}
                        </motion.div>

                        {/* Tabs */}
                        <div className="flex justify-around mt-auto border-t border-white/20 pt-4">
                            {(['frontend', 'backend', 'personal'] as Tab[]).map(t => (
                                <button
                                    key={t}
                                    onClick={() => setTab(t)}
                                    className={`uppercase text-xs tracking-wider transition-all ${tab === t ? 'text-neonCyan font-semibold' : 'text-white/60 hover:text-neonCyan/90'}`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Neon ambient glow */}
            <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none mix-blend-screen"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                style={{ boxShadow: '0 0 60px rgba(0,255,240,0.3)' }}
            />
        </motion.div>
    );
};

export default DevIdentityCard;
