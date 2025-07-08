import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Spk } from "@/interface/spk.interface";


export const columns: ColumnDef<Spk>[] = [
  {
    accessorFn: (row) => row.salesId?.username ?? "-",
    header: "Sales Name",
  },
  {
    header: "Prospek Name",
    id: "prospekName",
    accessorFn: (row) => row.prospekId?.name ?? "-",
  },
  {
    header: "Whatsapp Num",
    id: "whatsappNum",
    accessorFn: (row) => row.prospekId?.whatsappNum ?? "-",
  },
  {
    header: "Address",
    id: "address",
    accessorFn: (row) => row.prospekId?.address ?? "-",
  },
  {
    header: "Car Type",
    id: "carType",
    accessorFn: (row) => row.prospekId?.carType ?? "-",
  },
  {
    accessorKey: "dateSpk",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Spk
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedDate = new Date(row.original.dateSpk).toLocaleDateString(
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
    accessorKey: "noKtp",
    header: "No Ktp",
  },
  {
    accessorKey: "cashOrCredit",
    header: "Cash/Credit",
    cell: ({ row }) => {
      const cashOrCredit = row.original.cashOrCredit;
      const statusColors: Record<string, string> = {
        Credit: "border-cyan-600 text-cyan-600",
        Cash: "border-green-600 text-green-600",
      };

      return (
        <span
          className={`px-1 rounded-sm border ${statusColors[cashOrCredit]}`}
        >
          {cashOrCredit}
        </span>
      );
    },
  },
  {
    accessorKey: "leasing",
    header: "leasing",
  },
  {
    accessorKey: "tenor",
    header: "tenor",
  },
  {
    accessorKey: "status",
    header: "Status",
  },

];
