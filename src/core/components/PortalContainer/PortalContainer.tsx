import { PropsWithChildren } from 'react';
import styles from './PortalContainer.module.css';

const PortalContainer = ({
  top,
  left,
  height,
  width,
  onBackDropClick,
  children,
}: PropsWithChildren & {
  top: number | string;
  left: number | string;
  width: number | string;
  height: number | string;
  onBackDropClick?: () => void;
}) => {
  return (
    <div className={styles.backDrop} onClick={onBackDropClick}>
      <div
        style={{ top, left, height, width }}
        className={styles.container}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default PortalContainer;
