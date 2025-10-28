import "./App.css";
import DataTable from "./components/DataTable";
import { generateTableData } from "./utils/dataGenerator";

function App() {
  const tableData = generateTableData(10000);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Data Table</h1>
      </header>
      <DataTable columns={tableData.columns} data={tableData.data} />
    </div>
  );
}

export default App;
