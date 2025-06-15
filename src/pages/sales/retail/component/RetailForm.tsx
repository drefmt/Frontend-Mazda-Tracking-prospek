/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, } from "react";
import { useFetchSpk } from "@/hooks/spk/useFetchSpk";
import { useCreateRetail } from "@/hooks/retail/useCreateRetail";
import { useEditRetail } from "@/hooks/retail/useEditRetail";
import { useFetchRetail } from "@/hooks/retail/useFetchRetail";
import { format } from "date-fns";

const RetailForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch Data
  const { data: spkData, isLoading: loadingSpk, error: errorSpk } = useFetchSpk();
  const { data: retailData, isLoading: loadingRetail, error: errorRetail} = useFetchRetail();
  const editRetail = useEditRetail();
  const createRetail = useCreateRetail();

  

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      spkId: "",
      dateRetail: "",
      status: "Retail",
      carType: "",
    },

    validationSchema: Yup.object({
      spkId: Yup.string().required("Nama SPK wajib dipilih"),
      dateRetail: Yup.string().required("Tanggal retail wajib diisi"),
      status: Yup.string().required("Status wajib diisi"),
      carType: Yup.string().required("Tipe Mobil Harus Diisi"),
    }),


    onSubmit: async (values, { resetForm }) => {
      try {
        const retailData = { ...values, spkId: values.spkId };

        if (id) {
          await editRetail.mutateAsync({ id, retailData });
        } else {
          await createRetail.mutateAsync(retailData);
        }

        alert("Retail berhasil disimpan!");
        resetForm();
        navigate("/sales/retail");
      } catch (error) {
        alert("Gagal menyimpan Retail");
        console.error(error);
      }
    },
  });

  // Populate Data Saat Edit
  useEffect(() => {
    if (id && retailData) {
      const retail = retailData.find((item) => item.id === id);


      if (retail) {
        formik.setValues({
          spkId: retail.spkId?._id || "",
          dateRetail: retail.dateRetail ? format(new Date(retail.dateRetail), "yyyy-MM-dd") : "",
          status: retail.status || "",
          carType: retail.carType || "",
        });
      }
    }

  }, [id, retailData, formik.setValues]);



  return (
    <div className="p-4 rounded-md border border-gray-300 shadow-sm h-full">
      <h1 className="text-3xl">{id ? "Edit Retail" : "Add New Retail"}</h1>

      <p>Edit Data Retail</p>

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
              <Button variant="ghost" className="border border-gray-300">
                Back
              </Button>
            </Link>
            <Button type="submit" className="bg-black hover:bg-black/90">
              Submit
            </Button>
          </div>

          {/* Dropdown Nama Prospek */}
          <div>
            <Label htmlFor="spkId">Nama SPK</Label>
  
            <select
              id="spkId"
              name="spkId"
              className="w-full border border-gray-300 rounded-md p-2"
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
              className="w-full border border-gray-300 rounded-md p-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dateRetail}
            />
            {formik.touched.dateRetail && formik.errors.dateRetail && (
              <p className="text-red-500">{formik.errors.dateRetail}</p>
            )}
          </div>

          {/* Dropdown Status */}
          <div>
            <Label htmlFor="status">Status</Label>
            <select
              name="status"
              id="status"
              className="w-full border border-gray-300 rounded-md p-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
            >
              <option value="Retail">Retail</option>
            </select>
            {formik.touched.status && formik.errors.status && (
              <p className="text-red-500">{formik.errors.status}</p>
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
              className="w-full border border-gray-300 rounded-md p-2"
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
