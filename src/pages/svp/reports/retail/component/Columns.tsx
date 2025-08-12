import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Retail } from "@/interface/retail.interface";

export const columns: ColumnDef<Retail>[] = [
  {
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    header: "Sales Name",
    cell: ({ row }) => row.original.salesId?.username,
  },
  {
    header: "Spk Name",
    id: "SpkName",
    accessorFn: (row) => row.spkId.prospekId.name,
  },
  {
    accessorKey: "dateRetail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Retail
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedDate = new Date(
        row.original.dateRetail,
      ).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return <span>{formattedDate}</span>;
    },
  },

  {
    accessorKey: "carType",
    header: "Car Type",
  },
];
