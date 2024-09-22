import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import Card from "./card";

interface Spending {
  id: number;
  userid: number;
  count: number;
  type: string;
  model: string;
  createdAt: string;
}

interface SpendingTableProps {
  spendings: Spending[];
}

const columnHelper = createColumnHelper<Spending>();

function SpendingTable({ spendings }: SpendingTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  console.log('Spendings data:', spendings);
  const columns = [
    columnHelper.accessor("userid", {
      id: "userid",
      header: () => <p className="text-sm font-bold text-gray-600">USER ID</p>,
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("count", {
      id: "count",
      header: () => <p className="text-sm font-bold text-gray-600">COUNT</p>,
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("type", {
      id: "type",
      header: () => <p className="text-sm font-bold text-gray-600">TYPE</p>,
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("model", {
      id: "model",
      header: () => <p className="text-sm font-bold text-gray-600">MODEL</p>,
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => <p className="text-sm font-bold text-gray-600">DATE</p>,
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {new Date(info.getValue()).toLocaleString()}
        </p>
      ),
    }),
  ];

  const table = useReactTable({
    data: spendings,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Card extra={"w-full pb-10 p-4 h-full"}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Spendings
        </div>
      </header>

      {spendings.length === 0 ? (
        <div className="mt-8 text-center text-gray-600">
          <p>No records found.</p>
        </div>
      ) : (
        <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="!border-px !border-gray-400">
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
                      >
                        <div className="items-center justify-between text-xs text-gray-600">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getIsSorted() === "asc"
                            ? " 🔼"
                            : header.column.getIsSorted() === "desc"
                            ? " 🔽"
                            : null}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="min-w-[150px] border-white/0 py-3 pr-4"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

export default SpendingTable;
