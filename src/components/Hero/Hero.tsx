import styles from './Hero.module.css';
import portfolioData from '../../data/portfolio.json';
import { motion } from 'framer-motion';

const Hero = () => {
  const { profile } = portfolioData;

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.gradientBackground}>
        {/* 영상 배경 적용 (렉 해결 핵심) */}
        <video 
          key="hero-video"
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="auto"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          className={styles.videoBackground}
        >
          <source src="/assets/hero-bg.mp4" type="video/mp4" />
        </video>

        <div className={styles.glassOverlay}></div>
      </div>

      <div className={styles.content}>
        <motion.h1 
          className={styles.name}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {profile.name}
        </motion.h1>
        <motion.h2 
          className={styles.role}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {profile.role}
        </motion.h2>
        <motion.p 
          className={styles.intro}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {profile.intro}
        </motion.p>
        <motion.div 
          className={styles.aboutContainer}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{ originX: 0 }}
        >
          <p className={styles.about}>{profile.about}</p>
        </motion.div>
      </div>

      <motion.div 
        className={styles.scrollIndicator}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>SCROLL DOWN</span>
      </motion.div>
    </section>
  );
};

export default Hero;
