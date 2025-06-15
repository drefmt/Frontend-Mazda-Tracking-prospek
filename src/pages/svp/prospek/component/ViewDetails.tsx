import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchProspekById } from "@/hooks/prospek/useFetchProspekById";
import { Link,  useParams } from "react-router-dom";
import { format } from "date-fns";
import FollowUpTable from "./FollowUpTable";

const ViewDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchProspekById(id ?? "");


  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Data tidak ditemukan</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Detail Prospek</CardTitle>
        <CardDescription>Informasi lengkap Prospek</CardDescription>
        <div className="pt-2">
          <Link
            to="/svp/prospek"
            className="bg-white border-1  border-black focus:ring-2 ring-gray-500 py-2 px-4 text-center rounded-lg text-black"
          >
            Kembali{" "}
          </Link>
        </div>
      </CardHeader>

      <div className="grid grid-cols-2 gap-4">
        <CardContent>
          <p>Prospek Name</p>
          <p>Date</p>
          <p>No Whatsapp</p>
          <p>Address</p>
          <p>Soure</p>
          <p>Status</p>
          <p>Car Type</p>          
        </CardContent>
        <CardContent>
          <p>:{data.name}</p>
          <p>:{data?.date ? format(new Date(data.date), "dd-MM-yyyy") : "-"}</p>
          <p>:{data.whatsappNum}</p>
          <p>:{data.address}</p>          
          <p>:{data.source}</p>
          <p>:{data.status}</p>
          <p>:{data.carType}</p>
        </CardContent>
      </div>

      <FollowUpTable followUps={data.followUps || []} />
      <CardFooter className="items-center flex justify-center "></CardFooter>
    </Card>
  );
};

export default ViewDetails;
