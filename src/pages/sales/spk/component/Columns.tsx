/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Eye } from "lucide-react"
import { useNavigate } from "react-router-dom"; 


export type ProspekId = {
  // id: string;
  name: string;
  address: string;
}

export type SalesId = {
  id: string;
  username: string;
}

export type Spk = {
  prospekId?: ProspekId;
  salesId: SalesId;
  dateSpk: string;
  noKtp: string;  
  cashOrCredit: string;
  status: string;
  id: string;
}

export const columns = (handleDelete: (id: string) => void): ColumnDef<Spk>[] => {
  return [
  {    
    header: "Prospek Id",
    id: "prospekName",
    accessorFn: (row) => row.prospekId?.name || "No Name",
    cell: ({ row }) => {
      return <span>{row.original.prospekId?.name || "No Name"}</span>;
    }
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
        )
      },
      cell: ({ row }) => {
        const formattedDate = new Date(row.original.dateSpk).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        return <span>{formattedDate}</span>;
      },
    
  },
  {
    accessorKey: "noKtp",
    header: "No Ktp",
  },
  {
    // accessorKey: "address",
    header: "Address",
    cell: ({row}) => row.original.prospekId?.address
  },
  {
    accessorKey: "cashOrCredit",
    header: "Cash/Credit",
    cell: ({ row }) => {
      const cashOrCredit = row.original.cashOrCredit;
      const borderColor: Record<string, string> = {
        Credit: "border-cyan-600 text-cyan-600",
        Cash: "border-green-600 text-green-600",        
      };

      return (
        <span className={`px-1 rounded-sm border ${borderColor[cashOrCredit]}`}>
          {cashOrCredit}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColors: Record<string, string> = {
        "Process Do": "border-yellow-600 text-yellow-600",
        "Cancel": "border-red-600 text-red-600",        
      };

      return (
        <span className={`px-1 rounded-sm border ${statusColors[status]}`}>
          {status}
        </span>
      );
    },
  },
  {    
    header: "Detail",
    cell: ({ row }) => {
      const spkId = row.original.id; 
      const navigate = useNavigate();

      return (
        <span onClick={() => navigate(`detail/${spkId}`)}>
          <Eye className="text-[5px] text-gray-500 hover:text-black transition-all ease-in-out" strokeWidth={2} size={20}/>
          </span>
      )
    }
  },
  
  {
    accessorKey: "Action",
    id: "actions",
    cell: ({ row }) => {
      const spkId = row.original.id; 
      const navigate = useNavigate();
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(spkId)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate(`${spkId}/follow-up/`)}>Follow-Up</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`edit/${spkId}`)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(spkId)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

}
