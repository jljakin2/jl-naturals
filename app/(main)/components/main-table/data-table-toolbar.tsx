"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { types } from "../../data-config";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
// import { DataTableSizeFilter } from "./data-table-size-filter";
// import { DataTableDateRangeFilter } from "./data-table-date-range-filter";
import { useEffect, useState } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const path = usePathname();

  const columns: string[] = table
    .getVisibleFlatColumns()
    .map((column) => column.id);

  const needsViewToggle =
    path.startsWith("/shared") || path.startsWith("/files");
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter items..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-full lg:w-[250px]"
        />
        {/* TODO: add the size filter. Running into a lot of issues currently */}
        {/* {table.getColumn("size") && (
          <DataTableSizeFilter column={table.getColumn("size")} title="Size" />
        )} */}
        <div className="hidden lg:flex items-center space-x-2">
          {/* {columns.includes("extension") && table.getColumn("extension") && (
            <DataTableFacetedFilter
              column={table.getColumn("extension")}
              title="Type"
              options={types}
            />
          )} */}
          {/* {columns.includes("sharedWithDate") && table.getColumn("sharedWithDate") && (
            <DataTableDateRangeFilter
              column={table.getColumn("sharedWithDate")}
              title="Shared On"
            />
          )}
          {columns.includes("updatedAt") && table.getColumn("updatedAt") && (
            <DataTableDateRangeFilter column={table.getColumn("updatedAt")} title="Modified" />
          )}
          {columns.includes("createdAt") && table.getColumn("createdAt") && (
            <DataTableDateRangeFilter column={table.getColumn("createdAt")} title="Created" />
          )} */}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
