import React from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface MatrixGridProps {
  n: number;
  matrix: number[][];
}

const MatrixGrid: React.FC<MatrixGridProps> = ({ n, matrix }) => {
  // Generate column definitions
  const columns: GridColDef[] = Array.from({ length: n }, (_, i) => ({
    field: `col${i + 1}`,
    headerName: `Col ${i + 1}`,
    width: 100, // Set fixed column width (adjust as needed)
    headerAlign: 'center',
    align: 'center',
  }));

  // Convert the matrix into rows that DataGrid can understand
  const rows: GridRowsProp = matrix.map((row, rowIndex) => {
    const rowObject: any = { id: rowIndex }; // Add id for DataGrid
    row.forEach((value, colIndex) => {
      rowObject[`col${colIndex + 1}`] = value;
    });
    return rowObject;
  });

  return (
    <Box sx={{ height: 'auto', width: 'auto', display: 'inline-block' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight // Automatically adjust height based on rows
        disableColumnMenu // Disable column menu to simplify UI
        hideFooter // Hide footer to reduce extra space
        // disableSelectionOnClick // Disable row selection for simplicity
        sx={{
          '& .MuiDataGrid-root': {
            borderRadius: '8px', // Set border radius
          },
          '& .MuiDataGrid-cell': {
            border: '1px solid rgba(255, 255, 255, 0.12)', // Adjust cell borders
          },
        }}
      />
    </Box>
  );
};

type Props = {
  matrix: number[][];
};

export default function Matrix({ matrix }: Props) {
  const n = matrix.length;

  return <MatrixGrid n={n} matrix={matrix} />;
}
