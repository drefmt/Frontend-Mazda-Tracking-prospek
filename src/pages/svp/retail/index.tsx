import { useMemo } from "react";
import { columns as defaultColumns } from "./component/Columns";
import { DataTable } from "./component/Data-table";
import { useFetchRetail } from "@/hooks/retail/useFetchRetail";

const SalesRetail = () => {
  const {
    data: dataRetail,
    isLoading: retailIsLoading,
    isError: retailIsError,
  } = useFetchRetail();

  const columns = useMemo(() => defaultColumns, []);

  if (retailIsLoading) {
    return <p>Loading data...</p>;
  }

  if (retailIsError) {
    return <p>Terjadi kesalahan saat mengambil data.</p>;
  }

  return (
    <div className="container mx-auto py-10 ">
      <DataTable columns={columns} data={dataRetail || []} />
    </div>
  );
};
export default SalesRetail;
