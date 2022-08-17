import React from "react";
import DataTable from "react-data-table-component";

export function Datatable() {
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
  ];

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];

  return (
    <div className="table-container">
      <h3>Material table</h3>
      <DataTable title="Crypto data" data={data} columns={columns} />
    </div>
  );
}
