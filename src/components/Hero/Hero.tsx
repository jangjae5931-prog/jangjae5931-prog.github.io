import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import portfolioData from '../../data/portfolio.json';
import { motion } from 'framer-motion';

const Hero = () => {
  const { profile } = portfolioData;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true; // 강제 뮤트
      video.load();
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Auto-play was prevented:", error);
        });
      }
    }
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.gradientBackground}>
        {/* 영상 배경 적용 (캐시 방지 및 강제 재생 로직) */}
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline 
          poster="./assets/hero.png"
          className={styles.videoBackground}
        >
          <source src="./assets/hero-bg.mp4?v=2" type="video/mp4" />
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
