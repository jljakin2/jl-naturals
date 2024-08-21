"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableToolbar } from "./data-table-toolbar";
// import { useClickOutsideRefs } from "@/lib/context/clickOutsideProvider";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  context?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  context,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [openDialog, setOpenDialog] = React.useState<string | null>(null);
  const [showProcessingDialog, setShowProcessingDialog] =
    React.useState<boolean>(false);
  const [showFailedConversionDialog, setShowFailedConversionDialog] =
    React.useState<boolean>(false);

  useEffect(() => {
    if (openDialog === null) {
      // triggerEscape();
      setRowSelection([]);
    }
  }, [openDialog]);

  const table = useReactTable({
    meta: {}, // FIXME: use this to store any meta data you need throughout the table. Acts like a context or redux store within the table.
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // const { tableRef, handleClickOutside } = useClickOutsideRefs();
  // useEffect(() => {
  //   const handleClick = (event) => {
  //     handleClickOutside(event, table);
  //   };
  //   document.addEventListener("mousedown", handleClick);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClick);
  //   };
  // }, [handleClickOutside, table]);

  const router = useRouter();
  const path = usePathname();

  const handleClick = (item: any, cellId: any) => {
    if (cellId === "actions") return; // we don't want these cells to trigger anything because they have their own actions

    if (path.startsWith("/products")) {
      router.push(`/products/${item._id}`);
    } else if (path.startsWith("/inventory")) {
      router.push(`/inventory/${item._id}`);
    }
  };

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      // @ts-ignore
                      className={cn(header.column.columnDef.meta?.className)}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="!cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          // @ts-ignore
                          className={cn(cell.column.columnDef.meta?.className)}
                          onClick={() =>
                            handleClick(row.original, cell.column.id)
                          }
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nothing to show.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
