/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useFetchSpk } from "@/hooks/spk/useFetchSpk";
import { useCreateRetail } from "@/hooks/retail/useCreateRetail";
import { useEditRetail } from "@/hooks/retail/useEditRetail";
import { useFetchRetailById } from "@/hooks/retail/useFetchRetailById";

import { format } from "date-fns";
import toast from "react-hot-toast";

const RetailForm = () => {
  const { id } = useParams();

  // ********** Validation Schema **********
  const retailValidationSchema = Yup.object({
      spkId: Yup.string().required("Nama SPK wajib dipilih"),
      dateRetail: Yup.string().required("Tanggal retail wajib diisi"),
      carType: Yup.string().required("Tipe Mobil Harus Diisi"),
    });


  // ********** Data Fecthing **********
  const { data: retailDataById, isLoading: loadingSpk, error: errorSpk } = useFetchRetailById(id);
  const { data: spkData, isLoading: loadingRetail, error: errorRetail } = useFetchSpk();
  const editRetail = useEditRetail();
  const createRetail = useCreateRetail();

  // ********** Formik Initial Value **********
  const formik = useFormik({
    initialValues: {
      spkId: retailDataById?.spkId?.id || "",
      dateRetail: retailDataById?.dateRetail
        ? format(new Date(retailDataById.dateRetail), "yyyy-MM-dd")
        : "",
      carType: retailDataById?.carType || "",
    },
    enableReinitialize: true,
    validationSchema: retailValidationSchema,

    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = { ...values, spkId: values.spkId };
        if (id) {
          await editRetail.mutateAsync({ id, retailData: payload });
        } else {
          await createRetail.mutateAsync(payload);
        }

        toast.success(
          id ? "Retail berhasil diperbarui" : "retail berhasil disimpan"
        );
        resetForm();
      } catch (error) {
        toast.error("Terjadi kesalahan saat menyimpan retail");
        console.error(error);
      }
    },
  });

  return (
    <div className="p-4 my-4 rounded-md border border-gray-300 dark:border-gray-800 shadow-sm h-full dark:text-white">
      <h1 className="text-3xl pb-4">{id ? "Edit Retail" : "Add New Retail"}</h1>

      {/* Jika Data Loading */}

      {loadingSpk || loadingRetail ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : errorSpk || errorRetail ? (
        <p className="text-center text-red-500">
          Terjadi kesalahan saat mengambil data.
        </p>
      ) : (
        <form className="h-full space-y-4" onSubmit={formik.handleSubmit}>
          {/* Tombol Navigasi */}
          <div className="flex justify-between pb-4">
            <Link to="/sales/retail">
              <Button
                variant="ghost"
                className="border border-gray-300 dark:border-gray-800"
              >
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

          {/* Dropdown Nama Prospek */}
          <div>
            <Label htmlFor="spkId">Nama SPK</Label>

            <select
              id="spkId"
              name="spkId"
              className="w-full border border-gray-300 rounded-md p-2 dark:border-gray-800"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.spkId}
            >
              <option value="">Pilih Nama SPK</option>
              {spkData?.map((spk) => (
                <option key={spk.id} value={spk.id}>
                  {spk.prospekId?.name}
                </option>
              ))}
            </select>
            {formik.touched.spkId && formik.errors.spkId && (
              <p className="text-red-500">{formik.errors.spkId}</p>
            )}
          </div>

          {/* Input Tanggal Retail */}
          <div>
            <Label htmlFor="dateRetail">Tanggal Retail</Label>
            <Input
              type="date"
              id="dateRetail"
              name="dateRetail"
              className="w-full border border-gray-300 rounded-md p-2 dark:border-gray-800"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dateRetail}
            />
            {formik.touched.dateRetail && formik.errors.dateRetail && (
              <p className="text-red-500">{formik.errors.dateRetail}</p>
            )}
          </div>

          {/* Input Tipe Mobil */}
          <div>
            <Label htmlFor="carType">Tipe Mobil</Label>
            <Input
              type="text"
              id="carType"
              name="carType"
              placeholder="Tipe Mobil"
              className="w-full border border-gray-300 rounded-md p-2 dark:border-gray-800"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.carType}
            />
            {formik.touched.carType && formik.errors.carType && (
              <p className="text-red-500">{formik.errors.carType}</p>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default RetailForm;
