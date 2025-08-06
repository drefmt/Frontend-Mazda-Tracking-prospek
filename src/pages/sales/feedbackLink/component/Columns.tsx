import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Star } from "lucide-react";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { FeedbackLink } from "@/interface/feedback.interface";



export const columns = (
  handleDelete: (id: string) => void
): ColumnDef<FeedbackLink>[] => {
  return [
    {
      header: "No",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: "retailId.spkId.prospekId.name",
      header: "Nama Customer",
      cell: ({ row }) => {
        const name = row.original.retailId?.spkId?.prospekId?.name || "-";
        return <span>{name}</span>;
      },
    },
    {
      accessorKey: "retailId.carType",
      header: "Tipe Mobil",
    },
    {
      accessorKey: "expiredAt",
      header: "Expired",
      cell: ({ row }) => {
        const formattedDate = new Date(
          row.original.expiredAt
        ).toLocaleDateString("id-ID", {
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
      id: "rating", // custom id
      accessorFn: (row) => row.feedbackId?.rating,
      header: "Rating",
      filterFn: "equals", // penting agar bisa filter angka sama persis
      cell: ({ row }) => {
        const rating = row.original.feedbackId?.rating;

        if (!rating) return "-";
        return (
          <div className="flex items-center gap-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                strokeWidth={1.5}
                fill={i < rating ? "currentColor" : "none"}
              />
            ))}
          </div>
        );
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
