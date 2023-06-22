import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import "./style.css";

const DataGridComponent = ({ rows, columns, onCellEditStop, isLoading }) => {
  const [width, setWidth] = useState(150);
  const dataColumns = columns.map((column) => {
    if (column.originalField) {
      return {
        ...column,
        field: column.originalField,
      };
    }
    return column;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    console.log( columns);
    setWidth(window.innerWidth - 160);

    const handleResize = () => setWidth(window.innerWidth - 160);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ width: width }}>
      <DataGrid
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        className="datagrid-container rounded-lg transition-all"
        rows={rows.length ? rows : null}
        columns={dataColumns}
        rowHeight={64}
        pagination
        pageSizeOptions={[10, 20, 30]}
        paginationMode="client"
        onCellEditStop={onCellEditStop}
        loading={isLoading}
      />
    </div>
  );
};

export default DataGridComponent;
