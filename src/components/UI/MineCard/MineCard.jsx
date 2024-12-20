import React, { useEffect, useRef } from 'react';
import cl from './MineCard.module.css';

const MineCard = ({ setMinePanel, backgroundImage }) => {
  const containerRef = useRef();

  useEffect(() => {
    if (backgroundImage && containerRef.current) {
      containerRef.current.style.setProperty('--mine-card-bg', `url(${backgroundImage})`);
    }
  }, [backgroundImage]);

  return <div ref={containerRef} className={cl.mineCard__container}></div>;
};

export default MineCard;
