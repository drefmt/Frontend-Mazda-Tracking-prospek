import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";

import { useCreateSpk } from "@/hooks/spk/useCreateSpk";
import { useEditSpk } from "@/hooks/spk/useEditSpk";
import { useEffect } from "react";
import { useFetchSpk } from "@/hooks/spk/useFetchSpk";
import { useFetchAvailableForSpk } from "@/hooks/prospek/useAvailableForSpk";

const SpkForm = () => {
  const { id } = useParams();
  const { data: prospekData, isLoading: loadingProspek } = useFetchAvailableForSpk();
  const { data: spkData } = useFetchSpk();
  const editSpk = useEditSpk();
  const createSpk = useCreateSpk();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      prospekId: "",      
      dateSpk: "",
      noKtp: "",
      cashOrCredit: "Cash",
      downPayment: 0,
      tenor: "",
      leasing: "",
      status: "Process Do",
    },

    enableReinitialize: true,
    validationSchema: Yup.object({
      prospekId: Yup.string().required("Prospek wajib dipilih"),
      dateSpk: Yup.string().required("Tanggal SPK wajib diisi"),
      noKtp: Yup.string().required("No KTP wajib diisi").typeError("No KTP harus berupa angka"),    
      leasing: Yup.string().required("Leasing wajib diisi"),
      status: Yup.string().required("Status terdiri dari Process Do dan Cancel"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const spkData = {
          ...values,          
          noKtp: values.noKtp,
        };
        console.log(spkData)
        if (id) {
          await editSpk.mutateAsync({
            id,
            spkData: { ...spkData, prospekId: values.prospekId },
          });
        } else {
          await createSpk.mutateAsync({
            ...spkData,
            prospekId: values.prospekId,
          });
        }
        alert("SPK berhasil ditambahkan!");
        resetForm();
        navigate("/sales/spk");
      } catch (error) {
        alert("Gagal menambahkan SPK");
        console.error(error);
      }
    },
    
  });

  useEffect(() => {
    if (id && spkData) {
      const spk = spkData.find((parameter: { id: string }) => parameter.id === id);

      if (spk) {
        const formattedDateSpk = spk.dateSpk? new Date(spk.dateSpk).toISOString().split("T")[0]: "";
        formik.setValues({
          prospekId: spk.prospekId._id || "",
          dateSpk: formattedDateSpk || "",
          noKtp: spk.noKtp || "",         
          cashOrCredit: spk.cashOrCredit || "Cash",
          downPayment: spk.downPayment || 0,
          tenor: spk.tenor || "",
          leasing: spk.leasing || "",
          status: spk.status || "",
        });
      }      
    }
  }, [id, spkData]);

  return (
    <>
      <div className="p-4 rounded-md border border-gray-300 shadow-sm h-full mb-10">
        <h1 className="text-3xl">{id ? "Edit SPK" : "Add New Spk"}</h1>
        <p>Lorem ipsum dolor sit amet.</p>
        <form className="h-full justify-between" onSubmit={formik.handleSubmit}>
          <div className="flex justify-between pb-4">
            <Link to="/sales/spk">
              <Button variant="ghost" className="border border-gray-300">
                Back
              </Button>
            </Link>
            <Button type="submit" className="bg-black hover:bg-black/90">
              Submit
            </Button>
          </div>
          <div className="pb-4">
            <Label htmlFor="prospekId">Name</Label>
            <select
              id="prospekId"
              name="prospekId"
              className="w-full border border-gray-300 rounded-md p-2"
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
              className="w-full py-1 border border-gray-300 rounded-md focus:border-1 focus:border-black focus:ring-3 focus:ring-gray-400"
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
            <Input
              type="number"
              id="downPayment"
              name="downPayment"
              placeholder="Down Payment"
              className="w-full"
              onChange={formik.handleChange}
              value={formik.values.downPayment}
            />           
          </div>
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
              className="w-full py-1 border border-gray-300 rounded-md focus:border-1 focus:border-black focus:ring-3 focus:ring-gray-400"
              onChange={formik.handleChange}
              value={formik.values.status}
              defaultValue={formik.values.status}
            >
              <option value="Process Do">Process Do</option>
              <option value="Cancel">Cancel</option>
            </select>
          </div>
        </form>
      </div>
    </>
  );
};

export default SpkForm;
