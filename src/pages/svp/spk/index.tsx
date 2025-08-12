import { useMemo } from "react";
import { columns as defaultColumns } from "./component/Columns";
import { DataTable } from "./component/Data-table";
import { useFetchSpk } from "@/hooks/spk/useFetchSpk";

const SalesSpk = () => {
  const {
    data: dataSpk,
    isLoading: spkIsLoading,
    isError: spkIsError,
  } = useFetchSpk();

  const columns = useMemo(() => defaultColumns, []);

  if (spkIsLoading) {
    return <p>Loading data...</p>;
  }

  if (spkIsError) {
    return <p>Terjadi kesalahan saat mengambil data.</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={dataSpk || []} />
    </div>
  );
};
export default SalesSpk;
