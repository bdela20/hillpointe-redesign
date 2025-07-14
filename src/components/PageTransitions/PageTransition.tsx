import React, { useEffect, useRef } from 'react';
import styles from './PageTransition.module.scss';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, className }) => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.classList.add(styles.fadeIn);
    }
  }, []);

  return (
    <div 
      ref={pageRef}
      className={`${styles.pageTransition} ${className || ''}`}
    >
      {children}
    </div>
  );
};

export default PageTransition;