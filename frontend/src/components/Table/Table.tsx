import React from "react";
import { useNavigate } from "react-router-dom";
import { ITest } from "../../types";
import styles from "./Table.module.css";

interface TableProps {
  filteredTests: ITest[];
  handleSort: (key: keyof ITest) => void;
  loading: boolean;
  error: string;
  sortConfig: { key: string; direction: "asc" | "desc" } | null;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Table: React.FC<TableProps> = ({ handleSort, filteredTests, loading, error, sortConfig, setSearchTerm }) => {
  const capitalizeWords = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const navigate = useNavigate();
  const navigateTo = (testId: number, action: "results" | "finalize") => {
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
          <button className={styles.results} onClick={() => setSearchTerm("")}>
            Reset
          </button>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>
                Name
                {sortConfig?.key === "name" && (
                  <img
                    src="/assets/img/arrow_sort.svg"
                    alt="sort_icon"
                    style={{ transform: sortConfig.direction === "asc" ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                )}
              </th>

              <th onClick={() => handleSort("type")}>
                Type
                {sortConfig?.key === "type" && (
                  <img
                    src="/assets/img/arrow_sort.svg"
                    alt="sort_icon"
                    style={{ transform: sortConfig.direction === "asc" ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                )}
              </th>
              <th onClick={() => handleSort("status")}>
                Status
                {sortConfig?.key === "status" && (
                  <img
                    src="/assets/img/arrow_sort.svg"
                    alt="sort_icon"
                    style={{ transform: sortConfig.direction === "asc" ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                )}
              </th>
              <th onClick={() => handleSort("siteUrl")}>
                Site
                {sortConfig?.key === "siteUrl" && (
                  <img
                    src="/assets/img/arrow_sort.svg"
                    alt="sort_icon"
                    style={{ transform: sortConfig.direction === "asc" ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTests.map((test) => (
              <tr key={test.id} className={styles.row}>
                <td>{test.name}</td>
                <td>{test.type}</td>
                <td className={styles[test?.status?.toLowerCase()]}>{capitalizeWords(test.status)}</td>
                <td>{test?.siteUrl?.replace(/^https?:\/\//, "").replace(/^www\./, "")}</td>
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
