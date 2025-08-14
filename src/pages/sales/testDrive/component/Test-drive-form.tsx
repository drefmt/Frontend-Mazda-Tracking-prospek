import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";


import * as Yup from "yup";
import { useFetchProspek } from "@/hooks/prospek/useFetchProspek";
import { useEditTestDrive } from "@/hooks/testDrive/useEditTestDrive";
import { useCreateTestDrive } from "@/hooks/testDrive/useCreateTestDrive";
import { useMemo } from "react";
import { useFetchTestDriveById } from "@/hooks/testDrive/useFetchTestDriveById";
import { format } from "date-fns";
import toast from "react-hot-toast";

const TestDriveForm = () => {

  // ********** Hook Fech Data API **********
  const { id } = useParams();
  const { data: prospekData, isLoading: loadingProspek } = useFetchProspek();
  const { data: testDriveData } = useFetchTestDriveById(id);

  const editTestDrive = useEditTestDrive();
  const createTestDrive = useCreateTestDrive();
  const isEditMode = Boolean(id);


  // ********** Test-Drive Validation Schema **********
  const testDrivevalidationSchema = Yup.object({
      prospekId: Yup.string().required("Prospek wajib dipilih"),
      dateTestDrive: Yup.string().required("Tanggal Test drive wajib diisi"),
      carType: Yup.string().required("Tipe Mobil harus diisi"),
    }); 

  // ********** Initial Value **********  
  const initialValues = useMemo(() => {
    if(isEditMode && testDriveData) {
      return {
        prospekId: testDriveData?.prospekId?.id ?? "",          
          dateTestDrive: testDriveData?.dateTestDrive
            ? format(new Date(testDriveData?.dateTestDrive), "yyyy-MM-dd")
            : "",
          carType: testDriveData?.carType ?? "",
      }
    }
    return {
      prospekId: "",
      dateTestDrive: "",
      carType: "",
    }
  }, [testDriveData, isEditMode]);

  // ********** Use Formik **********
  const formik = useFormik({
    initialValues,
    validationSchema: testDrivevalidationSchema,
    enableReinitialize: true,

    onSubmit: async (values, { resetForm }) => {
      try {
        // const payload = { ...values, prospekId: values.prospekId,};
        if (id && testDriveData) {
          await editTestDrive.mutateAsync({id, testDriveData: values});
        } else {
          await createTestDrive.mutateAsync(values);
        }
        toast.success(
          id
            ? "Test-Drive berhasil diperbarui."
            : "Test-Drive berhasil ditambahkan"
        );
        resetForm();
      } catch (error) {
        toast.error("Terjadi kesalahan saat mengirim test drive");
        console.error(error);
      }
    },
  });



  return (
    <>
      <div className="mt-4 p-4 rounded-md border border-gray-300 shadow-sm h-full dark:text-white dark:border-gray-800">
        <h1 className="text-3xl pb-4">
          {id ? "Edit Test Drive" : "Add New Test Drive"}
        </h1>
        <form className="h-full justify-between" onSubmit={formik.handleSubmit}>
          <div className="flex justify-between pb-4">
            <Link to="/sales/test-drive">
              <Button variant="ghost" className="border border-gray-300">
                Back
              </Button>
            </Link>
            <Button
              type="submit"
              className="bg-black hover:bg-black/90"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Loading..." : "Submit"}
            </Button>
          </div>
          <div>
            <Label htmlFor="prospekId">Name</Label>
            <select
              id="prospekId"
              name="prospekId"
              className="w-full mb-2 border border-gray-300 rounded-md p-2 dark:bg-gray-950 dark:text-white"
              onChange={formik.handleChange}
              value={formik.values.prospekId}
            >
              <option value="" className="rounded-xl">
                Pilih Nama Prospek
              </option>
              {loadingProspek ? (
                <option>Loading...</option>
              ) : (
                prospekData?.map((prospek) => (
                  <option key={prospek.id} value={prospek.id}>
                    {prospek.name}
                  </option>
                ))
              )}
            </select>
            {formik.touched.prospekId && formik.errors.prospekId && (
              <p className="text-red-500">{formik.errors.prospekId}</p>
            )}
          </div>
          <div className="flex-col mb-2">
            <Label htmlFor="dateTestDrive">Date</Label>
            <div className="w-full">
              <Input
                type="date"
                id="dateTestDrive"
                name="dateTestDrive"
                onChange={formik.handleChange}
                value={formik.values.dateTestDrive}
              />
               {formik.touched.dateTestDrive && formik.errors.dateTestDrive && (
              <p className="text-red-500">{formik.errors.dateTestDrive}</p>
            )}
            </div>
          </div>
          <div className="flex-grow">
            <Label htmlFor="carType">Car Type</Label>
            <Input
              type="text"
              id="carType"
              name="carType"
              placeholder="Car Type"
              className="w-full"
              onChange={formik.handleChange}
              value={formik.values.carType}
            />
             {formik.touched.carType && formik.errors.carType && (
              <p className="text-red-500">{formik.errors.carType}</p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default TestDriveForm;
