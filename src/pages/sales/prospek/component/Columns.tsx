import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, MoreHorizontal, MoveDown, MoveRight, MoveUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useNavigate } from "react-router-dom";
import { JSX } from "react";



export type Prospek = {
  id: string;
  name: string;
  date: string;
  whatsappNum: string;
  status: string;
  category: string;
};

export const columns = (handleDelete: (id: string) => void): ColumnDef<Prospek>[] => {

  return [
    {
      header: "No",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: "name",
      header: "Name"
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const formattedDate = new Date(row.original.date).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
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
          <span className={`px-1 rounded-sm border ${statusColors[status]}`}>
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.original.category;

        const statusIcon: Record<string, JSX.Element> = {
          Low: <MoveDown size={16} className="mr-2"/>,
          Medium: <MoveRight size={16} className="mr-2"/>,
          Hot: <MoveUp size={16} className="mr-2"/>,
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
      header: "Detail",
      cell: ({ row }) => {
        const spkId = row.original.id;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const navigate = useNavigate();

        return (
          <span onClick={() => navigate(`detail/${spkId}`)}>
            <Eye className="text-[5px] text-gray-500 hover:text-black transition-all ease-in-out" strokeWidth={2} size={20} />
          </span>
        );
      }
    },
    {
      accessorKey: "Action",
      cell: ({ row }) => {
        const prospekId = row.original.id;
        // eslint-disable-next-line react-hooks/rules-of-hooks
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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(prospekId)}>
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate(`${prospekId}/follow-up/`)}>Follow-Up</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`edit/${prospekId}`)}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(prospekId)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
