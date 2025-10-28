import { memo, useState } from "react";

// TableCell component with memoization for performance optimization
const TableCell = memo(function TableCell({
  row,
  column,
  isEditing,
  onStartEdit,
  onSave,
  onCancel,
}) {
  const value = row[column.id];
  const [editValue, setEditValue] = useState(value);

  // For UX: handle Enter and Escape keys
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleSave = () => {
    onSave(row.id, column.id, editValue);
  };

  const handleCancel = () => {
    setEditValue(value);
    onCancel();
  };

  // For UX: handle click outside to save
  const handleClickOutside = () => {
    handleSave();
  };

  if (isEditing) {
    if (column.type === "boolean") {
      return (
        <td>
          <select
            value={editValue}
            onChange={(e) => setEditValue(e.target.value === "true")}
            onBlur={handleClickOutside}
            onKeyDown={handleKeyPress}
            autoFocus
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </td>
      );
    }

    if (column.type === "select") {
      return (
        <td>
          <select
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleClickOutside}
            onKeyDown={handleKeyPress}
            autoFocus
          >
            {column.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </td>
      );
    }

    if (column.type === "number") {
      return (
        <td>
          <input
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(Number(e.target.value))}
            onBlur={handleClickOutside}
            onKeyDown={handleKeyPress}
            autoFocus
          />
        </td>
      );
    }

    // Else, it's a String input
    return (
      <td>
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleClickOutside}
          onKeyDown={handleKeyPress}
          autoFocus
        />
      </td>
    );
  }

  // If not editing, show the cell value
  return (
    <td onClick={() => onStartEdit(row.id, column.id)}>
      {column.type === "boolean" && (
        <span className={`boolean-cell ${value ? "Yes" : "No"}`}>
          {value ? "Yes" : "No"}
        </span>
      )}

      {column.type === "select" && <span className="select-cell">{value}</span>}

      {column.type === "number" && (
        <span className="number-cell">
          {value ? value.toLocaleString() : "A number is missing here..."}
        </span>
      )}

      {!["boolean", "select", "number"].includes(column.type) && (
        <span className="string-cell">
          {value ? value : "A text is missing here..."}
        </span>
      )}
    </td>
  );
});

export default TableCell;
