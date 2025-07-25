import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';

interface Column {
  key: string;
  header: string;
  render?: (item: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  emptyStateIcon: React.ReactNode;
  emptyStateTitle: string;
  emptyStateMessage: string;
  emptyStateButtonText?: string;
  emptyStateButtonAction?: () => void;
}

/**
 * @component DataTable
 * @param {DataTableProps} props - Props cho component DataTable.
 * @param {Column[]} props.columns - Mảng các đối tượng định nghĩa cột bảng.
 * @param {any[]} props.data - Dữ liệu hiển thị trong bảng.
 * @param {React.ReactNode} props.emptyStateIcon - Icon cho trạng thái rỗng.
 * @param {string} props.emptyStateTitle - Tiêu đề cho trạng thái rỗng.
 * @param {string} props.emptyStateMessage - Thông báo cho trạng thái rỗng.
 * @param {string} [props.emptyStateButtonText] - Văn bản cho nút hành động trong trạng thái rỗng.
 * @param {() => void} [props.emptyStateButtonAction] - Hàm callback cho nút hành động trong trạng thái rỗng.
 * @returns {JSX.Element} Component DataTable.
 */
const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  emptyStateIcon,
  emptyStateTitle,
  emptyStateMessage,
  emptyStateButtonText,
  emptyStateButtonAction,
}) => {
  return (
    <div className="w-full">
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-lg shadow-sm">
          <div className="text-gray-400 mb-6">{emptyStateIcon}</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{emptyStateTitle}</h2>
          <p className="text-gray-600 mb-6 max-w-md">{emptyStateMessage}</p>
          {emptyStateButtonText && emptyStateButtonAction && (
            <Button onClick={emptyStateButtonAction}>{emptyStateButtonText}</Button>
          )}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key}>{column.header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {column.render ? column.render(row) : row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default DataTable;