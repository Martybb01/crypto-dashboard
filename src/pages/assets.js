import React, { useEffect, useState } from "react";
import { useFetchApi } from "../customHook/useFetchApi";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const columns = [
  {
    name: "Base Asset",
    selector: (row) => (
      <Link className="link-style" to={`/markets?base_assets=${row.baseAsset}`}>
        {row.baseAsset}
      </Link>
    ),
  },
  {
    name: "Markets' Number",
    selector: (row) => row.markets,
    sortable: true,
  },
];

function Assets() {
  const { symbol, loading, error } = useFetchApi();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (symbol) {
      const baseAssetObj = symbol.reduce((acc, next) => {
        return {
          ...acc,
          [next.baseAsset]: acc[next.baseAsset] + 1 || 0 || 1,
        };
      }, {});

      const _data = Object.keys(baseAssetObj).map((key) => ({
        baseAsset: key,
        markets: baseAssetObj[key],
      }));

      setData(_data);
    }
  }, [symbol]);

  return (
    <div>
      {loading && <h3>Loading...</h3>}
      {error && <h3>An error has occurred</h3>}
      <DataTable
        columns={columns}
        data={data}
        pagination
        noDataComponent={<h3>Loading Data</h3>}
      />
    </div>
  );
}
export default Assets;
