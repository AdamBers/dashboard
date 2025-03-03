import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.css";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <button onClick={handleBack} aria-label="Go back">
        <img src="/assets/img/arrow_left.svg" alt="arrow-back" />
        Back
      </button>
    </div>
  );
};

export default BackButton;
