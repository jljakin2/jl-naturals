"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns/format";
import { parseISO } from "date-fns/parseISO";
import { File, Folder, Globe, Link, Star, Users, X } from "lucide-react";
import Image from "next/image";

import { Checkbox } from "@/components/ui/checkbox";

// import { Task } from "@/data/schema";
import { DataTableColumnHeader } from "../components/main-table/data-table-column-header";
import { DataTableRowActions } from "../components/main-table/data-table-row-actions";

export const columns: ColumnDef<any>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //       onClick={(e) => e.stopPropagation()}
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //       onClick={(e) => e.stopPropagation()}
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    sortingFn: "text",
    cell: ({ row }) => (
      <div className="flex space-x-2 cursor-default select-none">
        <div className="flex gap-2 items-center">
          <Image
            alt="Product image"
            className="aspect-square rounded-md object-cover"
            height="64"
            src="/placeholder.png"
            width="64"
          />

          {/* File or folder name */}
          <p className="max-w-[150px] md:max-w-[400px] lg:max-w-[500px] truncate">
            {row.getValue("name")}
          </p>
        </div>
      </div>
    ),
    enableHiding: false,
  },
  // {
  //   accessorKey: "price",
  //   meta: { className: "hidden lg:table-cell" }, // best way I could find to handle responsive columns. We consume this metadata in the classNames for Table Row and Table Cell in data-table file
  //   sortingFn: "alphanumeric",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Price" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex items-center text-muted-foreground cursor-default select-none">
  //         <span>{row.getValue("price")}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    accessorKey: "updatedAt",
    meta: { className: "hidden lg:table-cell" }, // best way I could find to handle responsive columns. We consume this metadata in the classNames for Table Row and Table Cell in data-table file
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modified" />
    ),
    cell: ({ row }) => {
      const dateString = row.getValue("updatedAt") as string;

      // Parse the date string
      const date = new Date(dateString);

      // Extract month, day, and year
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
      } as const;
      const formattedDate = date.toLocaleDateString("en-US", options);

      return (
        <div className="flex items-center text-muted-foreground cursor-default select-none">
          <span>{formattedDate}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    meta: { className: "hidden lg:table-cell" }, // best way I could find to handle responsive columns. We consume this metadata in the classNames for Table Row and Table Cell in data-table file
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      const dateString = row.getValue("createdAt") as string;

      // Parse the date string
      const date = new Date(dateString);

      // Extract month, day, and year
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
      } as const;
      const formattedDate = date.toLocaleDateString("en-US", options);

      return (
        <div className="flex items-center text-muted-foreground cursor-default select-none">
          <span>{formattedDate}</span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "createdAt",
  //   meta: { className: "hidden lg:table-cell" }, // best way I could find to handle responsive columns. We consume this metadata in the classNames for Table Row and Table Cell in data-table file
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Created" />
  //   ),
  //   cell: ({ row }) => {
  //     // Get the date string from the row
  //     const dateString = row.getValue("createdAt") as string;
  //     // Parse the ISO string to a Date object and format it
  //     const formattedDate = format(parseISO(dateString), "MMM dd, yyyy"); // the MMM dd, yyyy format is the short date format

  //     return (
  //       <div className="flex items-center text-muted-foreground cursor-default select-none">
  //         <span>{formattedDate}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, filterValue) => {
  //     const rowDate = new Date(row.getValue(id)).getTime();
  //     if (filterValue?.from && filterValue?.to) {
  //       const from = new Date(filterValue.from).getTime();
  //       const to = new Date(filterValue.to).getTime();
  //       return rowDate >= from && rowDate <= to;
  //     }
  //     if (filterValue?.from) {
  //       const from = new Date(filterValue.from).getTime();
  //       return rowDate === from;
  //     }
  //     return true;
  //   },
  // },
  {
    id: "actions",
    cell: ({ row, table }) => (
      <DataTableRowActions
        key={row.original._id}
        row={row}
        table={table}
        context={row.original.kind}
      />
    ),
  },
];
