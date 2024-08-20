// import {
//   Share,
//   Download,
//   Pencil,
//   Move,
//   Star,
//   Trash2,
//   ArchiveRestore,
//   CircleX,
//   CircleOff,
// } from "lucide-react";

// import {
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
// } from "@/components/ui/dropdown-menu";
// import {
//   ContextMenuItem,
//   ContextMenuSeparator,
//   ContextMenuShortcut,
// } from "@/components/ui/context-menu";
// import { DialogTrigger, Dialog } from "@/components/ui/dialog";
// import { toast } from "@/components/ui/use-toast";
// import RenameItem from "@/components/forms/rename-item";
// import ShareItem from "@/components/forms/share-item";
// import MoveItem from "@/components/forms/move-item";
// import { toggleFavorite, triggerDownload } from "@/data/actions";
// import ErrorToast from "@/components/error-toast";
// import logger from "@/lib/logger";
// import { checkIfFileAlreadyHasExtensionBeforeDownload } from "@/lib/helper";
// import TrashItem from "@/components/forms/trash-item";
// import RestoreItem from "@/components/forms/restore-item";
// import PermDeleteItem from "@/components/forms/perm-delete-item";
// import { TableActions } from "@/lib/types/files";
// import { useClickOutsideRefs } from "@/lib/context/clickOutsideProvider";

// // primitive options
// const MULTIPLE_ITEM_ACTIONS = ["move", "trash", "restore", "permanentDelete"]; // FIXME: If you need to add more actions that can be used with multiple items, add them to this array
// // FIXME: if you need to add more actions, add them to this object
// // all options should have icons, labels, a shortcut (if applicable) and an action trigger
// export const actionDefinitions: TableActions = {
//   share: {
//     icon: <Share className="h-4 w-4 mr-2" />,
//     label: "Share",
//     // shortcut: "⌘S",
//     dialog: ({ items, onClose, requestorId }) => (
//       <ShareItem items={items} onClose={onClose} requestorId={requestorId} />
//     ),
//   },
//   download: {
//     icon: <Download className="h-4 w-4 mr-2" />,
//     label: "Download",
//     // shortcut: "⌘D",
//     onSelect: async (items) => {
//       const item = items[0];
//       try {
//         const customName = checkIfFileAlreadyHasExtensionBeforeDownload(item.name, item.extension);
//         const res: any = await triggerDownload(item, customName);
//         toast({
//           description: res.success,
//         });

//         // Use an anchor element to trigger the download
//         const a = document.createElement("a");
//         a.href = res.url;
//         // Note: The 'download' attribute may not always work for cross-origin URLs or with certain browsers
//         a.download = customName || "download";
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//       } catch (error) {
//         logger.error("Something went wrong during the download process", {
//           error: JSON.stringify(error),
//         });
//         ErrorToast();
//       }
//     },
//   },
//   rename: {
//     icon: <Pencil className="h-4 w-4 mr-2" />,
//     label: "Rename",
//     // shortcut: "⏎",
//     dialog: ({ items, onClose, setRowSelection }) => (
//       <RenameItem items={items} onClose={onClose} setRowSelection={setRowSelection} />
//     ),
//   },
//   move: {
//     icon: <Move className="h-4 w-4 mr-2" />,
//     label: "Move",
//     // shortcut: "⌘M",
//     dialog: ({ items, onClose, setRowSelection }) => (
//       <MoveItem items={items} onClose={onClose} setRowSelection={setRowSelection} />
//     ),
//   },
//   favorite: {
//     icon: <Star className="h-4 w-4 mr-2" />,
//     label: (isFavorite) => (isFavorite ? "Unfavorite" : "Favorite"),
//     // shortcut: "⌘F",
//     onSelect: async (items) => {
//       const item = items[0];
//       try {
//         const res = await toggleFavorite(item);
//         toast({
//           description: res.success,
//         });
//       } catch (error) {
//         logger.error("Error toggling favorite on item:", error);
//         ErrorToast({ title: "Something went wrong toggling favorite" });
//       }
//     },
//   },
//   trash: {
//     icon: <Trash2 className="h-4 w-4 mr-2" />,
//     label: "Trash",
//     // shortcut: "⌘⌫",
//     dialog: ({ items, onClose, setRowSelection }) => (
//       <TrashItem items={items} onClose={onClose} setRowSelection={setRowSelection} />
//     ),
//   },
//   restore: {
//     icon: <ArchiveRestore className="h-4 w-4 mr-2" />,
//     label: "Restore",
//     // shortcut: "⌘⌫",
//     dialog: ({ items, onClose, setRowSelection }) => (
//       <RestoreItem items={items} onClose={onClose} setRowSelection={setRowSelection} />
//     ),
//   },
//   permanentDelete: {
//     icon: <CircleX className="h-4 w-4 mr-2" />,
//     label: "Delete",
//     // shortcut: "⌘⌫",
//     dialog: ({ items, onClose, setRowSelection }) => (
//       <PermDeleteItem items={items} onClose={onClose} setRowSelection={setRowSelection} />
//     ),
//   },
//   noActionsAvailable: {
//     icon: <CircleOff className="h-4 w-4 mr-2" />,
//     label: "No actions for selection",
//     // shortcut: null,
//     onSelect: () => null,
//   },
// };

// // option a) create a dropdown action
// function createDropdownAction(
//   items,
//   actionKey,
//   requestorId,
//   openDialog,
//   setOpenDialog,
//   setRowSelection,
// ) {
//   const action = actionDefinitions[actionKey];
//   if (!action) return null; // No action found for the key

//   const DialogComponent = action.dialog || (() => null);

//   let isFavorite;
//   if (items.length === 1) {
//     isFavorite = items[0].isFavorite;
//   }

//   return (
//     <Dialog
//       open={openDialog === actionKey}
//       onOpenChange={(isOpen) => {
//         if (isOpen) {
//           setOpenDialog(actionKey);
//         } else {
//           setOpenDialog(null);
//         }
//       }}
//     >
//       {(actionKey === "trash" || actionKey === "permanentDelete") && <DropdownMenuSeparator />}
//       <DialogTrigger asChild>
//         <DropdownMenuItem
//           key={actionKey}
//           className={`${
//             actionKey === "trash" || actionKey === "permanentDelete"
//               ? "text-destructive !hover:text-destructive"
//               : ""
//           }`}
//           onClick={(e) => {
//             e.stopPropagation();
//             if (action.onSelect) action.onSelect(items);
//           }} // only add the onClick if there is a direct action happening on the menu item (e.g. favoriting, downloading, etc.)
//           onSelect={(e) => {
//             if (!action.onSelect) {
//               e.preventDefault();
//             }
//           }}
//           style={
//             actionKey === "share" &&
//             items.some((item) => item?.processing?.status !== 1) && { display: "none" }
//           }
//         >
//           {typeof action.icon === "function" ? action.icon?.(isFavorite) : action.icon}
//           {typeof action.label === "function" ? action.label(isFavorite) : action.label}
//           {actionKey === "trash" && <DropdownMenuSeparator />}
//           {action.shortcut && <DropdownMenuShortcut>{action.shortcut}</DropdownMenuShortcut>}
//         </DropdownMenuItem>
//       </DialogTrigger>
//       {action?.dialog && (
//         <DialogComponent
//           items={items}
//           onClose={() => setOpenDialog(null)}
//           requestorId={requestorId}
//           setRowSelection={setRowSelection}
//         />
//       )}
//     </Dialog>
//   );
// }

// // we need to know the "kind" of the item to determine the context. some will be dynamic and others hard coded
// const contextToActionsMap = {
//   default: ["rename", "move"],
//   noActions: ["noActionsAvailable"],

//   // these will come from the item in the row dynamically
//   file: ["rename", "share", "move", "download", "favorite", "trash"],
//   fileFolder: ["rename", "favorite", "move", "trash"],

//   // these will need to be hard coded
//   shared: ["share", "download"],
//   trash: ["restore", "permanentDelete"],
// };

// export function getMenuItems(
//   items: any,
//   context: string,
//   kind: "context" | "dropdown",
//   requestorId,
//   openDialog,
//   setOpenDialog,
//   setRowSelection,
// ) {
//   const actions = contextToActionsMap[context] || contextToActionsMap.default;
//   let availableActions =
//     items.length > 1 ? MULTIPLE_ITEM_ACTIONS.filter((action) => actions.includes(action)) : actions;

//   if (availableActions.length === 0) {
//     // If no actions are available, show the "No actions available" item
//     const noActionsAvailableAction = createDropdownAction(
//       items,
//       "noActionsAvailable",
//       requestorId,
//       openDialog,
//       setOpenDialog,
//       setRowSelection,
//     );
//     return [noActionsAvailableAction];
//   }

//   let finalItems = [];
//   if (items.length > 0) {
//     finalItems = items.map((item) => item.original);
//   }

//   if (finalItems.some((item: any) => item?.processing?.status !== 1)) {
//     availableActions = availableActions.filter((action) => action !== "share");
//   }

//   return availableActions
//     .map((actionKey) =>
//       createDropdownAction(
//         finalItems,
//         actionKey,
//         requestorId,
//         openDialog,
//         setOpenDialog,
//         setRowSelection,
//       ),
//     )
//     .filter(Boolean);
// }
