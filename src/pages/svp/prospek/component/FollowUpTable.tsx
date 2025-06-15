import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

interface FollowUp {
  _id: string;
  dateFollowUp: string;
  customerResponse: string;
  salesProses: string;
  recommendation: string;
}

const FollowUpTable = ({ followUps }: { followUps: FollowUp[] }) => {
  const navigate = useNavigate();

  const handleEdit = (id:string) => {
    navigate(`follow-up/${id}`)
  }
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Follow-Up History</h2>
      <Table>
        <TableCaption>Riwayat Follow-Up SPK</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Tanggal</TableHead>
            <TableHead>Customer Response </TableHead>
            <TableHead>Proces Sales </TableHead>
            <TableHead>Recommendation</TableHead>
            <TableHead>Option</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {followUps.length > 0 ? (
            followUps.map((followUp) => (
              <TableRow key={followUp._id}>
                <TableCell className="font-medium">
                  {format(new Date(followUp.dateFollowUp), "dd-MM-yyyy") || ""}
                </TableCell>
                <TableCell>{followUp.customerResponse || ""}</TableCell>
                <TableCell>{followUp.salesProses || ""}</TableCell>
                <TableCell>{followUp.recommendation || ""}</TableCell>
                <TableCell onClick={() => handleEdit(followUp._id)} className="text-cyan-600 cursor-pointer">Edit</TableCell>
                
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500">
                <p className="text-center pt-2">
                **Tidak ada data follow-up**
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FollowUpTable;
