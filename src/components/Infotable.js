// import React from "react";
// import DataTable from "react-data-table-component";
// import { useFetchApi } from "./useFetchApi";

// function Infotable() {
//   const { info, infoError, loadingInfo, onRefresh } = useFetchApi();

//   const columns = [
//     {
//       name: "Nome mercato",
//       selector: (row) => row.symbol,
//       sortable: true,
//     },
//     {
//       name: "Base Asset",
//       selector: (row) => row.baseAsset,
//     },
//     {
//       name: "Quote Asset",
//       selector: (row) => row.quoteAsset,
//     },
//   ];

//   const data = [
//     {
//       symbol: info.symbol,
//       baseAsset: info.baseAsset,
//       quoteAsset: info.quoteAsset,
//     },
//   ];
//   return (
//     <div>
//       <div className="table-container">
//         <h3>Material table</h3>
//         <button onClick={onRefresh}>Refresh</button>
//         {loadingInfo && <h1>Loading...</h1>}
//         {infoError && <h1>An error has occured</h1>}
//         {info && <h1>{info}</h1>}
//         <DataTable title="Crypto data" data={data} columns={columns} />
//       </div>
//     </div>
//   );
// }

// export default Infotable;
