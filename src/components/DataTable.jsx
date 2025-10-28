import { useCallback, useMemo, useState } from "react";
import "../styles/style.css";
import TableCell from "./TableCell";

function DataTable({ columns, data }) {

  // Make visibleColumns an object with column ids as keys and true as values
  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.id]: true }), {})
  );

  const [tableData, setTableData] = useState(data);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [editingCell, setEditingCell] = useState(null);

  // Pagination calculations
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = tableData.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleChangeItemsPerPage = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Memoized array of visible columns, sorted by ordinalNo
  const visibleColumnsArray = useMemo(
    () =>
      columns
        .filter((col) => visibleColumns[col.id])
        .sort((a, b) => a.ordinalNo - b.ordinalNo),
    [columns, visibleColumns]
  );

  // Function to toggle column visibility when checkbox is clicked
  const toggleColumn = (columnId) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  const handleStartEdit = useCallback((rowId, columnId) => {
    setEditingCell({ rowId, columnId });
  }, []);

  // Function to save the edited cell value
  const handleSave = useCallback((rowId, columnId, newValue) => {
    setTableData((prev) =>
      prev.map((row) => {
        if (row.id === rowId) {
          return { ...row, [columnId]: newValue };
        }
        return row;
      })
    );
    setEditingCell(null);
  }, []);

  const handleCancel = useCallback(() => {
    setEditingCell(null);
  }, []);

  return (
    <div className="data-table-container">
      <div className="table-controls">
        {/* Column visibility toggles */}
        <div className="filter-checkboxes">
          {columns.map((col) => (
            <label key={col.id}>
              <input
                type="checkbox"
                checked={visibleColumns[col.id]}
                onChange={() => toggleColumn(col.id)}
              />
              {col.title}
            </label>
          ))}
        </div>
      </div>

      <table className="data-table">
        {/* Table header */}
        <thead>
          <tr>
            {visibleColumnsArray.map((col) => (
              <th key={col.id}>{col.title}</th>
            ))}
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {currentPageData.map((row) => (
            <tr key={row.id}>
              {visibleColumnsArray.map((col) => (
                // Render TableCell component for each cell, optimized with isEditing prop
                <TableCell
                  key={`${row.id},${col.id}`}
                  row={row}
                  column={col}
                  isEditing={
                    editingCell?.rowId === row.id &&
                    editingCell?.columnId === col.id
                  }
                  onStartEdit={handleStartEdit}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="pagination">
        <div className="pagination-rows-per-page">
          <label>
            Rows per page:
            <select
              value={itemsPerPage}
              onChange={handleChangeItemsPerPage}
              className="page-select"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="500">500</option>
            </select>
          </label>

          <span className="total-rows">
            Showing {startIndex + 1} - {Math.min(endIndex, tableData.length)} of {" "}
            {tableData.length} rows
          </span>
        </div>

        <div className="pagination-next-previous">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>

          <span className="page-info">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
