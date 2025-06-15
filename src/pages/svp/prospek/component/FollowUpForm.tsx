import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useCreateFollowUp } from "@/hooks/follow-up/useCreateFollowUp";
import { useEditFollowUp } from "@/hooks/follow-up/useEditFollowUp";
import { useFetchFollowUpById } from "@/hooks/follow-up/useFetchFollowUpById";



const FollowUpSchema = Yup.object().shape({
  dateFollowUp: Yup.string().required("Tanggal wajib diisi"),
  salesProses: Yup.string().required("Sales Proses wajib diisi"),
  customerResponse: Yup.string().required("Respon customer wajib diisi"),
  recommendation: Yup.string().required("Rekomendasi wajib diisi"),
});

const FollowUpForm = () => {
  const navigate = useNavigate();
  const { id, followUpId } = useParams<{ id: string; followUpId: string }>();
  const prospekId = id || ""; 
  const { data: followUpData } = useFetchFollowUpById(prospekId, followUpId);




  const isEditMode = Boolean(followUpId); 

  const createMutation = useCreateFollowUp();
  const updateMutation = useEditFollowUp();

  const formik = useFormik({
    initialValues: {
      dateFollowUp: "",
      salesProses: "",
      customerResponse: "",
      recommendation: "",
    },
    validationSchema: FollowUpSchema,
    onSubmit: async (values) => {
      if (!prospekId) {
        console.error("ID SPK tidak ditemukan");
        return;
      }
      try {
        if (followUpId) {
          await updateMutation.mutateAsync({ prospekId, followUpId, followUp: values });
        } else {
          await createMutation.mutateAsync({ id: prospekId, followUp: values });
        }
        navigate(`/svp/prospek/detail/${prospekId}`);
      } catch (error) {
        console.error("Failed to submit follow-up:", error);
      }
    },
  });

  useEffect(() => {
    if (followUpId && followUpData) {
      formik.setValues({
        dateFollowUp: followUpData.dateFollowUp ? followUpData.dateFollowUp.split("T")[0] : "",
        salesProses: followUpData.salesProses || "",
        customerResponse: followUpData.customerResponse || "",
        recommendation: followUpData.recommendation || "",
      });
    }
  }, [followUpData, followUpId]);

  return (
    <form className="space-y-4 p-4" onSubmit={formik.handleSubmit}>
      <div>
        <h1 className="text-lg font-semibold">{isEditMode ? "Edit" : "Tambah"} Follow-Up</h1>
        <p className="text-gray-500 pb-4">Isi form berikut sesuai kebutuhan.</p>
        <Link to={`/svp/prospek/detail/${prospekId}`}>
          <button type="button" className="py-1 px-4 border border-black text-black rounded-md">
            Kembali
          </button>
        </Link>
      </div>
      <hr className="border-gray-300" />

      <label className="text-lg">Tanggal Follow-Up</label>
      <Input
        type="date"
        name="dateFollowUp"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.dateFollowUp}
      />
      {formik.touched.dateFollowUp && formik.errors.dateFollowUp && (
        <p className="text-red-500">{formik.errors.dateFollowUp}</p>
      )}

      <label className="text-lg">Sales Proses</label>
      <Input
        type="text"
        name="salesProses"
        placeholder="Masukkan Sales Proses"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.salesProses}
      />
      {formik.touched.salesProses && formik.errors.salesProses && (
        <p className="text-red-500">{formik.errors.salesProses}</p>
      )}

      <label className="text-lg">Customer Response</label>
      <Textarea
        name="customerResponse"
        placeholder="Masukkan respon customer"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.customerResponse}
      />
      {formik.touched.customerResponse && formik.errors.customerResponse && (
        <p className="text-red-500">{formik.errors.customerResponse}</p>
      )}

      <label className="text-lg">Rekomendasi Dari Manager/SPV</label>
      <Textarea
        name="recommendation"
        placeholder="Masukkan rekomendasi"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.recommendation}
      />
      {formik.touched.recommendation && formik.errors.recommendation && (
        <p className="text-red-500">{formik.errors.recommendation}</p>
      )}

      <button
        type="submit"
        className="py-1 w-full bg-black text-white rounded-md disabled:opacity-50"
       
      >
        {isEditMode ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default FollowUpForm;
