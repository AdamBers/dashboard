import React, { useEffect, useState } from "react";
import { getTests, getSites } from "../services/api";
import PageTitle from "../components/PageTitle/PageTitle";
import Search from "../components/Search/Search";
import Table from "../components/Table/Table";

const Dashboard: React.FC = () => {
  const [tests, setTests] = useState<any[]>([]);
  const [filteredTests, setFilteredTests] = useState<any[]>([]);
  const [sites, setSites] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<any>({ key: "", direction: "asc" });

  useEffect(() => {
    Promise.all([getTests(), getSites()])
      .then(([testsData, sitesData]) => {
        setSites(sitesData);
        const enrichedTests = testsData.map((test) => ({
          ...test,
          siteUrl: sitesData.find((site) => site.id === test.siteId)?.url || "Unknown site",
        }));
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

  const handleSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
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
      return direction === "asc" ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
    });

    setFilteredTests(sorted);
  };

  return (
    <>
      <PageTitle title="Dashboard" subTitle="Tests Overview" />
      <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <Table handleSort={handleSort} filteredTests={filteredTests} loading={loading} error={error} />
    </>
  );
};

export default Dashboard;
