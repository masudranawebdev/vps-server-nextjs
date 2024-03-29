import { useEffect } from "react";

const QuickViewModal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  const modalClasses = isOpen ? "block" : "hidden";

  return (
    <div className={`fixed z-50 inset-0 overflow-y-auto ${modalClasses}`}>
      <div className="flex items-center justify-center max-h-screen pt-10 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={onClose}
          ></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-4xl`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
