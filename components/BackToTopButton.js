import { FiChevronUp } from "react-icons/fi";

const BackToTopButton = ({ showButton }) => {
  return (
    <div className="relative">
  {/* Your button code */}
  <button
    className={`fixed right-0 bottom-0 grid mb-4 mr-4 z-30 rounded-full shadow back-to-top-btn w-9 h-9 place-items-center bg-teal_color shadow-primary/60 text-white ${
      showButton && "active"
    }`}
    onClick={() => window.scrollTo(0, 0)}
  >
    <FiChevronUp />
  </button>
</div>
  );
};

export default BackToTopButton;
