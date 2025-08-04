import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchSpkById } from "@/hooks/spk/useSpkById";
import { Link,  useParams } from "react-router-dom";
import { format } from "date-fns";


const ViewDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchSpkById(id ?? "");


  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Data tidak ditemukan</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Detail SPK</CardTitle>
        <CardDescription>Informasi lengkap SPK</CardDescription>
        <div className="pt-2">
          <Link
            to="/sales/spk"
            className="bg-white border-1  border-black focus:ring-2 ring-gray-500 py-2 px-4 text-center rounded-lg text-black"
          >
            Kembali{" "}
          </Link>
        </div>
      </CardHeader>

      <div className="grid grid-cols-2 gap-4">
        <CardContent>
          <p>Nama Prospek</p>
          <p>Tanggal SPK</p>
          <p>No KTP</p>
          <p>Alamat</p>
          <p>No WA</p>
          <p>Down Payment</p>
          <p>Leasing</p>
          <p>Tenor</p>
          <p>Tipe Mobil</p>
          <p>Status</p>
        </CardContent>
        <CardContent>
          <p>:{data.prospekId?.name}</p>
          <p>:{data?.dateSpk ? format(new Date(data.dateSpk), "dd-MM-yyyy") : "-"}
          </p>
          <p>:{data.noKtp}</p>
          <p>:{data?.prospekId?.address}</p>          
          <p>:{data?.prospekId?.whatsappNum ?? "Data tidak tersedia"}</p>
          <p>:Rp {new Intl.NumberFormat('id-ID').format(data.downPayment)}</p>
          <p>:{data.leasing}</p>
          <p>:{data.tenor}</p>
          :<span >
          {data?.prospekId?.carType}
          </span>
          <p>
          :<span>{data.status}</span>
          </p>
        </CardContent>
      </div>

     
      <CardFooter className="items-center flex justify-center "></CardFooter>
    </Card>
  );
};

export default ViewDetails;
