/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,  
  MoveDown,
  MoveRight,
  MoveUp,
} from "lucide-react";

import { Prospek } from "@/interface/prospek.interface";
import { JSX } from "react";

export const columns: ColumnDef<Prospek>[] = [
  {
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorFn: (row) => row.salesId?.username ?? "-",
    id: "salesName",
    header: "Sales Name",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const formattedDate = new Date(row.original.date).toLocaleDateString(
        "id-ID",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }
      );
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "whatsappNum",
    header: "WhatsApp",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColors: Record<string, string> = {
        Prospek: "border-cyan-600 text-cyan-600",
        TestDrive: "border-green-600 text-green-600",
        Retail: "border-yellow-600 text-yellow-600",
      };

      return (
        <span
          className={`px-1 rounded-sm border ${
            statusColors[status] || "border-gray-400 text-gray-600"
          }`}
        >
          {status}
        </span>
      );
    },
  },
   {
    accessorKey: "address",
    header: "Address",
  },
   {
    accessorKey: "source",
    header: "Source",
  },
   {
    accessorKey: "carType",
    header: "Car Type",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category;
      const statusIcon: Record<string, JSX.Element> = {
        Low: <MoveDown size={16} className="mr-2" />,
        Medium: <MoveRight size={16} className="mr-2" />,
        Hot: <MoveUp size={16} className="mr-2" />,
      };
      return (
        <span className="flex items-center">
          {statusIcon[category]}
          {category}
        </span>
      );
    },
  },
   {
    accessorKey: "followUpCount",
    header: "Follow-Ups",
    cell: ({ row }) => {
      const followUpCount = row.original.followUpCount;
      return (
        <span>{followUpCount}</span>
      )
    }
  },
 
 
];
