/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button"

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
 
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
 
interface SalesId {     
    id: string; 
    username: string;  
}

interface ProspekId  {
  // id: string;
  name: string;
  whatsappNum: string;
}

interface SpkId {
  prospekId: ProspekId;
}

interface Retail {  
  id: string;  
  salesId: SalesId;
  spkId: SpkId;
  dateRetail: string;
  status: string;
  carType: string;
}

export const columns :  ColumnDef<Retail>[] = [
  
  {    
    header: "No", 
    cell: ({ row }) => <span>{row.index + 1}</span>
  },
  {        
    header: "Sales Name", 
    cell: ({ row }) => row.original.salesId.username,
  },
  {    
    header: "Spk Name", 
    id: "SpkName",
    accessorFn: ( row ) => row.spkId.prospekId.name,
  },
  {
    accessorKey: "dateRetail",
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
        const formattedDate = new Date(row.original.dateRetail).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        return <span>{formattedDate}</span>;
      },
    
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColors: Record<string, string> = {       
        Retail: "border-yellow-600 text-yellow-600",
      };

      return (
        <span className={`px-1 rounded-sm border ${statusColors[status]}`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "carType",
    header: "Car Type",
  },
  
  // {
  //   accessorKey: "Action",
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const retailId = row.original.id; 
      
 
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
  //             onClick={() => navigator.clipboard.writeText(retailId)}
  //           >
  //             Copy ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />            
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   },
  // },
]

