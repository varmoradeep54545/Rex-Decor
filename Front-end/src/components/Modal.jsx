import React from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full">
      
        {React.cloneElement(children, { onClose })}
      </div>
    </div>
  );
};

export default Modal;
