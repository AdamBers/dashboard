import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Table.module.css";

interface TableProps {
  filteredTests: any[];
  handleSort: (value: string) => void;
  loading: boolean;
  error: string;
}

const Table: React.FC<TableProps> = ({ handleSort, filteredTests, loading, error }) => {
  const navigate = useNavigate();

  const navigateTo = (testId: string, action: "results" | "finalize") => {
    const path = action === "results" ? `/results/${testId}` : `/finalize/${testId}`;
    navigate(path);
  };

  return (
    <div className={styles.container}>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {filteredTests.length === 0 && !loading ? (
        <div className={styles.empty_res}>
          <p>Your search did not match any results.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>Name</th>
              <th onClick={() => handleSort("type")}>Type</th>
              <th onClick={() => handleSort("status")}>Status</th>
              <th onClick={() => handleSort("siteUrl")}>Site</th>
            </tr>
          </thead>
          <tbody>
            {filteredTests.map((test) => (
              <tr key={test.id} className={styles.row}>
                <td>{test.name}</td>
                <td>{test.type}</td>
                <td className={styles[test?.status?.toLowerCase()]}>{test.status}</td>
                <td>{test.siteUrl.replace(/^https?:\/\//, "").replace(/^www\./, "")}</td>{" "}
                <td>
                  <button
                    className={styles[test?.status?.toLowerCase() === "draft" ? "draft" : "results"]}
                    onClick={() => navigateTo(test.id, test.status === "DRAFT" ? "finalize" : "results")}
                  >
                    {test.status === "DRAFT" ? "Finalize" : "Results"}{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
