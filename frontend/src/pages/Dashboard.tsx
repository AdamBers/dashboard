import React, { useEffect, useState } from "react";
import { getTests, getSites } from "../services/api";
import PageTitle from "../components/PageTitle/PageTitle";
import Search from "../components/Search/Search";
import Table from "../components/Table/Table";
import { ITest } from "../types";

const Dashboard: React.FC = () => {
  const [tests, setTests] = useState<ITest[]>([]);
  const [filteredTests, setFilteredTests] = useState<ITest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  useEffect(() => {
    Promise.all([getTests(), getSites()])
      .then(([testsData, sitesData]) => {
        const enrichedTests = testsData.map((test) => {
          const site = sitesData.find((site) => site.id === test.siteId);
          return {
            ...test,
            siteUrl: site ? site.url : "Unknown site",
          };
        });
        setTests(enrichedTests);
        setFilteredTests(enrichedTests);
      })
      .catch((err) => {
        setError(`Error fetching data: ${err}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = tests.filter((test) => test.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredTests(filtered);
  }, [searchTerm, tests]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key: keyof ITest) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig?.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    const sorted = [...filteredTests].sort((a, b) => {
      if (key === "status") {
        const statusOrder = ["online", "paused", "stopped", "draft"];
        return direction === "asc"
          ? statusOrder.indexOf(a.status.toLowerCase()) - statusOrder.indexOf(b.status.toLowerCase())
          : statusOrder.indexOf(b.status.toLowerCase()) - statusOrder.indexOf(a.status.toLowerCase());
      }
      if (typeof a[key] === "string" && typeof b[key] === "string") {
        return direction === "asc" ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
      }
      if (typeof a[key] === "number" && typeof b[key] === "number") {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      }
      return 0;
    });
    setFilteredTests(sorted);
  };

  return (
    <>
      <PageTitle title="Dashboard" subTitle="Tests Overview" />
      <Search
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        filteredTestsCount={filteredTests.length}
      />
      <Table
        handleSort={handleSort}
        filteredTests={filteredTests}
        loading={loading}
        error={error}
        sortConfig={sortConfig}
        setSearchTerm={setSearchTerm}
      />
    </>
  );
};

export default Dashboard;
