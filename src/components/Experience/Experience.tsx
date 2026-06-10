import { useState } from 'react';
import styles from './Experience.module.css';
import portfolioData from '../../data/portfolio.json';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface HistoryItem {
  period: string;
  title: string;
  description: string;
  folder?: string;
  imageCount?: number;
}

const Experience = () => {
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  
  // 대구읍성 예고편(6번)을 제외한 나머지 데이터 필터링 및 폴더 매칭
  const history = (portfolioData.history as HistoryItem[])
    .filter(item => item.title !== '대구읍성예고편 제작')
    .map((item) => {
      // 폴더 및 이미지 개수 매핑 (현재 로컬 폴더 기준 전수 조사 결과)
      const folderMap: { [key: string]: { folder: string, count: number } } = {
        "경상감영공원": { folder: "1_경상감영공원", count: 5 },
        "영남제일관": { folder: "2_영남제일관", count: 4 },
        "대구 콘서트 하우스": { folder: "3_대구콘서트하우스", count: 4 },
        "계산성당": { folder: "4_계산성당", count: 4 },
        "월정교 예고편": { folder: "5_월정교예고편", count: 4 },
        "Ai 활용 자체 제작": { folder: "7_Ai자체제작", count: 5 },
        "서대구역": { folder: "8_서대구역", count: 4 },
        "대구읍성": { folder: "9_대구읍성", count: 5 },
        "대구박물관 꽃 미디어아트": { folder: "10_대구박물관꽃", count: 5 },
        "예술발전소 명화미디어아트": { folder: "11_예술발전소명화", count: 7 },
        "예술발전소 별주부전 미디어아트": { folder: "12_예술발전소별주부전", count: 6 },
        "이야기모바일 공모전": { folder: "13_이야기모바일", count: 6 }
      };
      
      const config = folderMap[item.title];
      return { ...item, folder: config?.folder, imageCount: config?.count || 0 };
    });

  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.container}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Project History
        </motion.h2>

        <div className={styles.listContainer}>
          {history.map((item, index) => (
            <motion.div 
              key={index} 
              className={styles.listItem}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedItem(item)}
            >
              <span className={styles.itemPeriod}>{item.period}</span>
              <h4 className={styles.itemTitle}>{item.title}</h4>
              <span className={styles.viewMore}>Click to view images</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 이미지 슬라이더 모달 */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeButton} onClick={() => setSelectedItem(null)}>×</button>
              
              <div className={styles.modalBody}>
                <div className={styles.sliderContainer}>
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    className={styles.imageSwiper}
                  >
                    {Array.from({ length: selectedItem.imageCount || 0 }, (_, i) => i + 1).map((num) => {
                      const imgSrc = `./projects/${selectedItem.folder}/${num}.jpg`;
                      return (
                        <SwiperSlide key={num}>
                          <div 
                            className={styles.slideImageWrapper}
                            onClick={() => setZoomedImage(imgSrc)}
                          >
                            <img 
                              src={imgSrc} 
                              alt={`${selectedItem.title} capture ${num}`}
                            />
                            <div className={styles.imageOverlay}>
                              <span className={styles.zoomIcon}>🔍</span>
                              <span className={styles.zoomText}>CLICK TO ENLARGE</span>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
                
                <div className={styles.infoContainer}>
                  <span className={styles.modalPeriod}>{selectedItem.period}</span>
                  <h3 className={styles.modalTitle}>{selectedItem.title}</h3>
                  <p className={styles.modalDescription}>{selectedItem.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 이미지 확대 라이트박스 */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div 
            className={styles.lightboxBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
          >
            <motion.div 
              className={styles.lightboxContent}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <img src={zoomedImage} className={styles.lightboxImage} alt="Zoomed view" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Experience;
