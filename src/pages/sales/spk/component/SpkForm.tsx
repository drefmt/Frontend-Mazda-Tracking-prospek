import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { NumericFormat } from "react-number-format";

import * as Yup from "yup";

// ********** Custom Hook **********
import { useCreateSpk } from "@/hooks/spk/useCreateSpk";
import { useEditSpk } from "@/hooks/spk/useEditSpk";
import { useFetchSpkById } from "@/hooks/spk/useSpkById";
import { useFetchProspek } from "@/hooks/prospek/useFetchProspek";

import toast from "react-hot-toast";
import React from "react";

const SpkForm = () => {
  const { id } = useParams();
  const { data: allProspek, isLoading: loadingProspek } = useFetchProspek();
  const { data: spkData } = useFetchSpkById(id);
  const editSpk = useEditSpk();
  const createSpk = useCreateSpk();

  const isEditMode = Boolean(id);
  const prospekData = isEditMode
    ? allProspek
    : allProspek?.filter((p) => p.status !== "SPK");

  const initialValues = React.useMemo(() => {
    if (isEditMode && spkData) {
      return {
        prospekId: spkData.prospekId?.id ??  "",
        dateSpk: spkData.dateSpk
          ? new Date(spkData.dateSpk).toISOString().split("T")[0]
          : "",
        noKtp: spkData.noKtp ?? "",
        cashOrCredit: spkData.cashOrCredit ?? "Cash",
        downPayment: spkData.downPayment ?? 0,
        tenor: spkData.tenor ?? "",
        leasing: spkData.leasing ?? "",
        status: spkData.status ?? "Process Do",
      };
    }
    return {
      prospekId: "",
      dateSpk: "",
      noKtp: "",
      cashOrCredit: "Cash",
      downPayment: 0,
      tenor: "",
      leasing: "",
      status: "Process Do",
    };
  }, [spkData, isEditMode]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      prospekId: Yup.string().required("Prospek wajib dipilih"),
      dateSpk: Yup.string().required("Tanggal SPK wajib diisi"),
      noKtp: Yup.string()
        .required("No KTP wajib diisi")
        .typeError("No KTP harus berupa angka")
        .matches(/^\d+$/, "No KTP harus berupa angka")
        .max(16, "No KTP maksimal 16 digit")
        .min(16, "No KTP harus 16 digit"),
      leasing: Yup.string().required("Leasing wajib diisi"),
      status: Yup.string().required(
        "Status terdiri dari Process Do dan Cancel"
      ),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        if (id && spkData) {
          await editSpk.mutateAsync({ id, spkData: values });
        } else {
          const payload = { ...values };
          await createSpk.mutateAsync(payload);
        }
        toast.success(
          id ? "SPK berhasil diperbarui" : "SPK berhasil di tambahkan"
        );
        resetForm();
      } catch (error) {
        toast.error("Gagal menambahkan SPK");
        console.log("failed to submit PSK", error);
      }
    },
  });

  console.log("spkData.prospekId.id =>", spkData?.prospekId?.id);
  console.log("formik.values.prospekId =>", formik.values.prospekId);
  console.log("prospekData IDs =>",prospekData?.map((p) => p.id)
  );

  if ((isEditMode && !spkData) || loadingProspek) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div className="p-4 my-4 rounded-md border border-gray-300 shadow-sm h-full mb-10 dark:border-gray-800 dark:text-white">
        <h1 className="text-3xl pb-4">{id ? "Edit SPK" : "Add New Spk"}</h1>

        <form className="h-full justify-between" onSubmit={formik.handleSubmit}>
          <div className="flex justify-between pb-4">
            <Link to="/sales/spk">
              <Button
                variant="ghost"
                className="border border-gray-300 dark:border-gray-800"
                disabled={formik.isSubmitting}
              >Back
              </Button>
            </Link>
            <Button type="submit" className="bg-black hover:bg-black/90">
              
                {formik.isSubmitting ? "Loading..." : "Submit"}
            </Button>
          </div>
          <div className="pb-4">
            <Label htmlFor="prospekId">Name</Label>
            <select
              id="prospekId"
              name="prospekId"
              className="w-full border border-gray-300 dark:border-gray-800 rounded-md p-2"
              onChange={formik.handleChange}
              value={formik.values.prospekId}
            >
              <option value="">Pilih Nama Prospek</option>
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
          <div className="flex-col pb-4">
            <Label htmlFor="dateSpk">Date</Label>
            <div className="w-full">
              <Input
                type="date"
                id="dateSpk"
                name="dateSpk"
                onChange={formik.handleChange}
                value={formik.values.dateSpk}
              />
            </div>
          </div>
          <div className="flex-grow pb-4">
            <Label htmlFor="noKtp">No Ktp</Label>
            <Input
              type="text"
              id="noKtp"
              name="noKtp"
              placeholder="No Ktp"
              className="w-full"
              onChange={formik.handleChange}
              value={formik.values.noKtp}
            />
          </div>
          <div className="flex-grow pb-4">
            <Label htmlFor="cashOrCredit">Cash Or Credit</Label>
            <select
              name="cashOrCredit"
              id="cashOrCredit"
              className="w-full py-1 border border-gray-300 dark:border-gray-800 rounded-md focus:border-1 focus:border-black focus:ring-3 focus:ring-gray-400"
              onChange={formik.handleChange}
              value={formik.values.cashOrCredit}
              defaultValue={formik.values.cashOrCredit}
            >
              <option value="Cash">Cash</option>
              <option value="Credit">Credit</option>
            </select>
          </div>
          {/* Revisi Down payment */}
          <div className="flex-grow pb-4">
            <Label htmlFor="downPayment">Down Payment</Label>
            <NumericFormat
              id="downPayment"
              name="downPayment"
              thousandSeparator="."
              decimalSeparator=","
              prefix="Rp "
              allowNegative={false}
              customInput={Input} // dari ShadCN
              value={formik.values.downPayment}
              onValueChange={(values) => {
                formik.setFieldValue("downPayment", values.floatValue || 0);
              }}
            />
          </div>
          {formik.values.cashOrCredit === "Credit" && (
            <div className="flex-grow block pb-4">
              <Label htmlFor="tenor">Tenor</Label>
              <Input
                type="text"
                id="tenor"
                name="tenor"
                placeholder="Tenor"
                className="w-full"
                onChange={formik.handleChange}
                value={formik.values.tenor}
              />
            </div>
          )}
          <div className="flex-grow pb-4">
            <Label htmlFor="leasing">Leasing</Label>
            <Input
              type="text"
              id="leasing"
              name="leasing"
              placeholder="Leasing"
              className="w-full"
              onChange={formik.handleChange}
              value={formik.values.leasing}
            />
          </div>
          <div className="flex-grow pb-4">
            <Label htmlFor="status">Status Spk</Label>
            <select
              name="status"
              id="status"
              className="w-full py-1 border border-gray-300 dark:border-gray-800 rounded-md focus:border-1 focus:border-black focus:ring-3 focus:ring-gray-400"
              onChange={formik.handleChange}
              value={formik.values.status}
              defaultValue={formik.values.status}
            >
              <option value="Draft">Draft</option>
              <option value="Process Do">Process Do</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancel">Cancel</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SpkForm;
