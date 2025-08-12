import { useCallback, useMemo } from "react";
import { useDeleteSpk } from "@/hooks/spk/useDeleteSpk";
import { columns as defaultColumns } from "./component/Columns";
import { DataTable } from "./component/Data-table";
import { useFetchSpk } from "@/hooks/spk/useFetchSpk";

const SalesSpk = () => {
  const {
    data: dataSpk,
    isLoading: spkIsLoading,
    isError: spkIsError,
  } = useFetchSpk();
  const { mutate: deleteSpk } = useDeleteSpk();

  const handleDelete = useCallback(
    (id: string) => {
      if (window.confirm("Apakah Anda yakin ingin menghapus prospek ini?")) {
        deleteSpk(id);
      }
    },
    [deleteSpk],
  );

  const columns = useMemo(() => defaultColumns(handleDelete), [handleDelete]);

  if (spkIsLoading) {
    return <p>Loading data...</p>;
  }

  if (spkIsError) {
    return <p>Terjadi kesalahan saat mengambil data.</p>;
  }

  return (
    <div className="container mx-auto py-10 dark:text-white">
      <DataTable columns={columns} data={dataSpk || []} />
    </div>
  );
};
export default SalesSpk;
