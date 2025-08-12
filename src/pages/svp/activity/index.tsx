// import { useFetchProspek } from "@/hooks/prospek/useFetchProspek";
import { columns as defaultColumns } from "./component/Columns";
import { DataTable } from "./component/Data-table";
import { useFetchActifity } from "@/hooks/daily-activity/useFetchActivity";

const SalesProspek = () => {
  const { data: activityData, isLoading, isError } = useFetchActifity();

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  if (isError) {
    return <p>Terjadi kesalahan saat mengambil data.</p>;
  }

  return (
    <div className="container mx-auto py-10 dark:text-white">
      <DataTable columns={defaultColumns} data={activityData || []} />
    </div>
  );
};

export default SalesProspek;
