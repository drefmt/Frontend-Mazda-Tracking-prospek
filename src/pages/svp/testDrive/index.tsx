import { useMemo } from "react";
import { columns as defaultColumns } from "./component/Columns";
import { useFetchTestDrive } from "@/hooks/testDrive/useFetchTestDrive";
import { DataTable } from "./component/Data-table";

const SalesTestDrive = () => {
  const {
    data: dataTestDrive,
    isLoading: testDriveIsLoading,
    isError: testDriveIsError,
  } = useFetchTestDrive();

  const columns = useMemo(() => defaultColumns, []);

  if (testDriveIsLoading) {
    return <p>Loading Data</p>;
  }

  if (testDriveIsError) {
    return <p>Terjadi kesalahan saat mengambil data...</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={dataTestDrive || []} />
    </div>
  );
};

export default SalesTestDrive;
