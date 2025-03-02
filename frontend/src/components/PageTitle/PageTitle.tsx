import React from "react";
import styles from "./PageTitle.module.css";

interface PageTitleProps {
  title: string;
  subTitle: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subTitle }) => {
  return (
    <div className={styles.pageTitle}>
      <h1>{title}</h1>
      <h2>{subTitle}</h2>
    </div>
  );
};

export default PageTitle;
