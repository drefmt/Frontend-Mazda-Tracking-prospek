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
import TestDrive from "@/pages/svp/testDrive"
 
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { useNavigate } from "react-router-dom"


export type ProspekId = {
  id: string;
  name: string;
}

export type TestDrive = {
  prospekId: ProspekId;
  dateTestDrive: string;
  carType: string;
  id: string;
}

export const columns = (handleDelete: (id: string) => void): ColumnDef<TestDrive>[] => {
  return [
  {
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>
  },
  {
    accessorKey: "prospekId.name",
    header: "Prospek Name",
  },
  {
    accessorKey: "dateTestDrive",
    cell: ({ row }) => {
      const formattedDate = new Date(row.original.dateTestDrive).toLocaleDateString("id-ID", {
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
        )
      },
    
  },
  {
    accessorKey: "carType",
    header: "Car Type",
  },
  {
    accessorKey: "id",
    header: "action",
    id: "actions",
    cell: ({ row }) => {
      
      const testDrive = row.original;
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
           
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate(`edit/${testDrive.id}`)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(testDrive.id)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  },
]
}


