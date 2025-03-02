import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTestById } from "../services/api";
import PageTitle from "../components/PageTitle/PageTitle";
import BackButton from "../components/BackButton/BackButton";
import styles from "./Results.module.css";

const Results: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const [testData, setTestData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (testId) {
      getTestById(testId)
        .then((data) => {
          setTestData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(`Error fetching test data, ${err}`);
          setLoading(false);
        });
    }
  }, [testId]);

  return (
    <div className={styles.container}>
      <PageTitle title="Results" subTitle={loading ? "Loading ..." : testData?.name} />
      {error && <p>{error}</p>}
      <BackButton />
    </div>
  );
};

export default Results;
