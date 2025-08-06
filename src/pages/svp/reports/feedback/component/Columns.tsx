
import { ColumnDef } from "@tanstack/react-table";
import { FeedbackReportItem } from "@/interface/feedback.interface";

export const columns: ColumnDef<FeedbackReportItem>[] = [
  
    {
      header: "No",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
     {
    header: "Sales Name",
    cell: ({ row }) => row.original.retailId.salesId?.username || "-",
  },
   {
    id: "prospectName", 
    header: "Nama Prospek",
    accessorFn: (row) => row.retailId.spkId.prospekId.name || "-", 
    cell: ({ getValue }) => getValue() ?? "-", 
    filterFn: "includesString",
  },
 
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
]

