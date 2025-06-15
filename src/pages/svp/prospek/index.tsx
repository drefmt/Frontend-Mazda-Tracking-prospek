
import { useFetchProspek } from "@/hooks/prospek/useFetchProspek";
import { columns as defaultColumns } from "./component/Columns";
import { DataTable } from "./component/Data-table";
import { useMemo } from "react";

const SalesProspek = () => {
  const { data: dataProspek, isLoading, isError } = useFetchProspek();

  const safeDataProspek = (dataProspek || []).map((prospek) => ({
    ...prospek,
    salesId: prospek.salesId ?? { id: "unknown", username: "-" }, 
  }));
  
  const columns = useMemo(() => defaultColumns, []);

  if (isLoading) {
    return <p>Loading data...</p>;
  }
  
  if (isError) {
    return <p>Terjadi kesalahan saat mengambil data.</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={safeDataProspek || []} />
    </div>
  );
};

export default SalesProspek;
