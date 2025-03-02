import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Table.module.css";

interface TableProps {
  filteredTests: [];
  handleSort: (value: string) => void;
}

const Table: React.FC<TableProps> = ({ handleSort, filteredTests }) => {
  const navigate = useNavigate();

  const handleButtonClick = (testId: string, action: "results" | "finalize") => {
    const path = action === "results" ? `/results/${testId}` : `/finalize/${testId}`;
    navigate(path);
  };
  return (
    <div className={styles.container}>
      {filteredTests.length === 0 ? (
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
              <th onClick={() => handleSort("site")}>Site</th>
            </tr>
          </thead>
          <tbody>
            {filteredTests.map((test) => (
              <tr key={test.id} className={styles.row}>
                <td>{test.name}</td>
                <td>{test.type}</td>
                <td className={styles[test?.status?.toLowerCase()]}>{test.status}</td>
                <td>{test?.site?.replace(/^https?:\/\//, "").replace(/^www\./, "")}</td>
                <td>
                  <button
                    className={styles[test?.status?.toLowerCase() === "draft" ? "draft" : "results"]}
                    onClick={() => handleButtonClick(test.id, test.status === "DRAFT" ? "finalize" : "results")}
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
