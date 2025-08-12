import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
import TestDrive from "@/pages/svp/testDrive";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type ProspekId = {
  id: string;
  name: string;
};

export type SalesId = {
  id: string;
  username: string;
};

export type TestDrive = {
  prospekId: ProspekId;
  salesId: SalesId;
  dateTestDrive: string;
  carType: string;
  id: string;
};

export const columns: ColumnDef<TestDrive>[] = [
  {
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "salesId.username",
    header: "Sales Name",
  },
  {
    id: "prospectName", // id penting untuk filtering!
    header: "Nama Prospek",
    accessorFn: (row) => row.prospekId.name, // ambil nested value
    cell: ({ getValue }) => getValue() ?? "-", // opsional, bisa pakai row.original
    filterFn: "includesString", // default filter string cocok
  },

  {
    accessorKey: "dateTestDrive",
    cell: ({ row }) => {
      const formattedDate = new Date(
        row.original.dateTestDrive,
      ).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return <span>{formattedDate}</span>;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Test Drive
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "carType",
    header: "Car Type",
  },
  // {
  //   accessorKey: "id",
  //   header: "action",
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const prospek = row.original.prospekId;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(prospek.id)}
  //           >
  //             Copy ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   }
  // },
];
