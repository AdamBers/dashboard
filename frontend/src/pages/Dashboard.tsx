import React, { useEffect, useState } from "react";
import { getTests } from "../services/api";
import PageTitle from "../components/PageTitle/PageTitle";
import Search from "../components/Search/Search";
import Table from "../components/Table/Table";

const Dashboard: React.FC = () => {
  const [tests, setTests] = useState<any[]>([]);
  const [filteredTests, setFilteredTests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<any>({ key: "", direction: "asc" });

  useEffect(() => {
    getTests()
      .then((data) => {
        setTests(data);
        setFilteredTests(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching tests");
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
        const statusOrder = ["Online", "Paused", "Stopped", "Draft"];
        return direction === "asc"
          ? statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
          : statusOrder.indexOf(b.status) - statusOrder.indexOf(a.status);
      }
      return direction === "asc" ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
    });

    setFilteredTests(sorted);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <PageTitle title="Dashboard" subTitle="text" />
      <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <Table handleSort={handleSort} filteredTests={filteredTests} />
    </>
  );
};

export default Dashboard;
