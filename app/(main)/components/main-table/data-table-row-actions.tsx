"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { getMenuItems } from "./actions";
// import { useClickOutsideRefs } from "@/lib/context/clickOutsideProvider";

export function DataTableRowActions({ row, table, context }: any) {
  // Get the appropriate actions based on the item kind
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (openDialog === null) {
      // triggerEscape();
      table.setRowSelection([]);
      setDropdownOpen(false);
    }
  }, [openDialog]);

  // const { dropdownMenuRef } = useClickOutsideRefs();

  // const menuItems = getMenuItems(
  //   table.getSelectedRowModel().rows,
  //   context,
  //   "dropdown",
  //   row.original?.requestorId,
  //   openDialog,
  //   setOpenDialog,
  //   table.setRowSelection,
  // );

  return (
    <DropdownMenu
      open={dropdownOpen}
      onOpenChange={(isOpen) => {
        if (isOpen) {
          setDropdownOpen(true);
          if (!row.getIsSelected()) row.toggleSelected();
        } else {
          // triggerEscape();
          setDropdownOpen(false);
          table.setRowSelection([]);
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[160px] text-muted-foreground"
        // ref={dropdownMenuRef}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* {menuItems} */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
