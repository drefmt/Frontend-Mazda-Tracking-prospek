
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { FollowUpData } from "@/interface/followUp.interface"
import { ArrowUpDown } from "lucide-react"


export const columns :  ColumnDef<FollowUpData>[] = [
  
  {    
    header: "No", 
    cell: ({ row }) => <span>{row.index + 1}</span>
  },
  {        
    header: "Sales Name", 
    cell: ({ row }) => row.original.name,
  },
  {    
    header: "Prospect Name", 
    id: "prospectName",
    accessorFn: ( row ) => row.name,
  },
  {    
    header: "Total Followup", 
    id: "totalFollowUp",
    accessorFn: ( row ) => row.totalFollowUp,
  },
  {    
    header: "Last Follow Up", 
    id: "lastFollowUp",
    accessorFn: ( row ) => row.lastFollowUpStatus,
  },
  {
    accessorKey: "lastFollowUpDate",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Follow-Up
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const formattedDate = new Date(row.original.lastFollowUpDate).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        return <span>{formattedDate}</span>;
      },
    
  },
]

