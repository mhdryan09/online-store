import { Dispatch, useEffect, useRef } from "react";
import styles from "./Modal.module.scss";

const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: any;
}) => {
  const ref: any = useRef();

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      // jika click diluar modal tutup modal
      if (ref.current && !ref.current.contains(e.target)) {
        onClose(); // kembalikan ke state default
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    // menambahkan event listener ketika modal ditampilkan ke layar
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // menghilangkan event listener ketika modal ditutup
    };
  }, [onClose]);

  return (
    <div className={styles.modal}>
      <div className={styles.modal__main} ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
