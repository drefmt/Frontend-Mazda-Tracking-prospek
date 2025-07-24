/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
// import { useNavigate } from "react-router-dom";
import { copyToClipboard } from "@/utils/copyToClipboard"
// import {FeedbackReportItem} from "@/interface/feedback.interface"
export interface FeedbackLink {
  id: string;
  token: string;
  used: boolean;
  expiredAt: string;
  createdAt: string;
  retailId: {
    carType: string;
    spkId: {
      prospekId: {
        name: string;
      };
    };
    salesId: {
      username: string;
    }
  };
  feedbackId?: {
    rating: number;
    message: string;
    customerName: string;
    submittedAt: string;
  };
}

// interface Feedback extends FeedbackReportItem {
//   token: string;
//   id: string;
// }

export const columns = ( handleDelete: (id: string) => void ): ColumnDef<FeedbackLink>[] => {
  return [
    {
      header: "No",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
     {
    header: "Sales Name",
    cell: ({ row }) => row.original.retailId.salesId.username || "-",
  },
   {
    id: "prospectName", // id penting untuk filtering!
    header: "Nama Prospek",
    accessorFn: (row) => row.retailId.spkId.prospekId.name || "-", // ambil nested value
    cell: ({ getValue }) => getValue() ?? "-", // opsional, bisa pakai row.original
    filterFn: "includesString", // default filter string cocok
  },
    // {
    //   accessorKey: "name",
    //   header: "Nama Customer",
    //   cell: ({ row }) => {
    //     const name = row.original.retailId?.spkId?.prospekId?.name || "-";
    //     return <span>{name}</span>;
    //   },
    // },
    {
      accessorKey: "retailId.carType",
      header: "Tipe Mobil",
    },
    {
      accessorKey: "expiredAt",
      header: "Expired",
      cell: ({ row }) => {
        const formattedDate = new Date(row.original.expiredAt).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
        return <span>{formattedDate}</span>;
      },
    },
    {
      accessorKey: "used",
      header: "Status",
      cell: ({ row }) => (
        <span className={row.original.used ? "text-red-500" : "text-green-600"}>
          {row.original.used ? "Sudah Digunakan" : "Belum Digunakan"}
        </span>
      ),
    },
    {
  accessorKey: "feedbackId.rating",
  header: "Rating",
  cell: ({ row }) => {
    const rating = row.original.feedbackId?.rating;
    return rating ? `${rating} ⭐` : "-";
  },
},
{
  accessorKey: "feedbackId.message",
  header: "Pesan",
  cell: ({ row }) => {
    const msg = row.original.feedbackId?.message;
    return msg || "-";
  },
},


    {
      accessorKey: "actions",
      header: "Aksi",
      cell: ({ row }) => {
        const { id, token } = row.original;
        const link: string = `${window.location.origin}/feedback/${token}`;         

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Aksi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => copyToClipboard(link)}>
                Salin Link
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(id)}>
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
