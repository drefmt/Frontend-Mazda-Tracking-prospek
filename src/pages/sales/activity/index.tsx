// import { useFetchProspek } from "@/hooks/prospek/useFetchProspek";
import { useDeleteActivity } from "@/hooks/daily-activity/useDeleteActivity";
import { columns as defaultColumns } from "./component/Columns";
import { DataTable } from "./component/Data-table";
import { useFetchActifity } from "@/hooks/daily-activity/useFetchActivity";
import { useCallback, useMemo } from "react";

const SalesProspek = () => {
  const { data: activityData, isLoading, isError } = useFetchActifity();
  const { mutate: deleteActivity } = useDeleteActivity();

  const handleDelete = useCallback(
    (id: string) => {
      if (window.confirm("Apakah Anda yakin ingin menghapus prospek ini?")) {
        deleteActivity(id);
      }
    },
    [deleteActivity],
  );

  const columns = useMemo(() => defaultColumns(handleDelete), [handleDelete]);

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  if (isError) {
    return <p>Terjadi kesalahan saat mengambil data.</p>;
  }

  return (
    <div className="container mx-auto py-10 dark:text-white">
      <DataTable columns={columns} data={activityData || []} />
    </div>
  );
};

export default SalesProspek;
