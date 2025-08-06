/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { useFetchProspek } from "@/hooks/prospek/useFetchProspek";
import { useEditTestDrive } from "@/hooks/testDrive/useEditTestDrive";
import { useCreateTestDrive } from "@/hooks/testDrive/useCreateTestDrive";
import { useEffect } from "react";
import { useFetchTestDrive } from "@/hooks/testDrive/useFetchTestDrive";
import { format } from "date-fns";
import toast from "react-hot-toast";

const TestDriveForm = () => {
  const { id } = useParams();
  const { data: prospekData, isLoading: loadingProspek } = useFetchProspek();
  const { data: testDriveData } = useFetchTestDrive();

  const editTestDrive = useEditTestDrive();
  const createTestDrive = useCreateTestDrive();
  // const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      prospekId: "",      
      dateTestDrive: "",
      carType: "",
    },

    validationSchema: Yup.object({
      prospekId: Yup.string().required("Prospek wajib dipilih"),
      dateTestDrive: Yup.string().required("Tanggal Test drive wajib diisi"),
      carType: Yup.string().required("Tipe Mobil harus diisi"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const testDriveData = {
          ...values,
          prospekId: values.prospekId,
        };
      

        if (id) {
          await editTestDrive.mutateAsync({
            id,
            testDriveData: { ...testDriveData, prospekId: values.prospekId },
          });
        } else {
          await createTestDrive.mutateAsync({
            ...testDriveData,
            prospekId: values.prospekId,
          });
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

  useEffect(() => {
    if (id && testDriveData) {
      const testDrive = testDriveData.find(
        (parameter: { id: string }) => parameter.id === id
      );
      if (testDrive) {
        formik.setValues({
          prospekId: testDrive.prospekId?.id || "",          
          dateTestDrive: testDrive.dateTestDrive
            ? format(new Date(testDrive.dateTestDrive), "yyyy-MM-dd")
            : "",
          carType: testDrive.carType || "",
        });
      }
    }
  }, [id, testDriveData]);

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
            {formik.errors.prospekId && (
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
          </div>
        </form>
      </div>
    </>
  );
};

export default TestDriveForm;
