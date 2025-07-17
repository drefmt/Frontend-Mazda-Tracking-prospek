import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useCreateProspek } from "@/hooks/prospek/useCreateProspek";
import { useEditProspek } from "@/hooks/prospek/useEditProspek";
import { useFetchProspek } from "@/hooks/prospek/useFetchProspek";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { format } from "date-fns";

const SalesProspekForm = () => {
  const { id } = useParams();
  const { data: prospekData } = useFetchProspek();
  const createProspek = useCreateProspek();
  const editProspek = useEditProspek();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      date: "",
      whatsappNum: "",
      address: "",
      source: "",
      status: "Prospek",
      carType: "",
      category: "Low",
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        if (id) {
          await editProspek.mutateAsync({ id, prospekData: values });
        } else {
          await createProspek.mutateAsync(values);
        }
        resetForm();
        navigate("/sales/prospek");
      } catch (error) {
        console.error("Failed to submit prospek:", error);
      }
    },
  });

  useEffect(() => {
    if (id && prospekData) {
      const prospek = prospekData.find((p: { id: string }) => p.id === id);
      if (prospek) {
        formik.setValues({
          ...prospek,
          date: prospek.date
            ? format(new Date(prospek.date), "yyyy-MM-dd")
            : "",
        });
      }
    }
  }, [id, prospekData]);

  return (
    <div>
      <div className="overflow-hidden mt-4 p-4 rounded-md border border-gray-300 dark:border-gray-800 dark:text-white shadow-sm h-full mb-10">
        <h1 className="text-3xl">{id ? "Edit Prospek" : "Add New Prospek"}</h1>
        <p className="pb-4">
          {id ? "Halaman Edit Prospek" : "Halaman Tambah Prospek"}.
        </p>
        <form className="h-full justify-between" onSubmit={formik.handleSubmit}>
          <div className="flex justify-between pb-4">
            <Link to="/sales/prospek">
              <Button variant="ghost" className="border border-gray-300">
                Back
              </Button>
            </Link>
            <Button type="submit" className="bg-black hover:bg-black/90">
              Submit
            </Button>
          </div>
          <div className="flex-grow pb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Name"
              className="w-full"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex-col pb-4">
            <Label htmlFor="date">Date</Label>
            <div className="w-full">
              <Input
                type="date"
                id="date"
                value={formik.values.date}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="flex-grow pb-4">
            <Label htmlFor="whatsappNum">WhatsApp Number</Label>
            <Input
              type="text"
              id="whatsappNum"
              placeholder="WhatsApp Number"
              className="w-full"
              value={formik.values.whatsappNum}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex-grow pb-4">
            <Label htmlFor="address">Address</Label>
            <Input
              type="text"
              id="address"
              placeholder="Address"
              className="w-full"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex-grow">
            <Label htmlFor="source">Source</Label>
            <Input
              type="text"
              id="source"
              placeholder="Source"
              className="w-full"
              value={formik.values.source}
              onChange={formik.handleChange}
            />
          </div>

          <div className="flex-grow pb-4">
            <Label htmlFor="status">Status</Label>
            <select
              name="status"
              id="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              defaultValue={formik.values.status}
              className="w-full py-1 border border-gray-300 rounded-md focus:border-1 focus:border-black focus:ring-3 focus:ring-gray-400"
            >
              <option value="Prospek">Prospek</option>
              <option value="TestDrive">Test Drive</option>
              <option value="Retail">Retail</option>
            </select>
          </div>

          <div className="flex-grow pb-4">
            <Label htmlFor="carType">Car Type</Label>
            <Input
              type="text"
              id="carType"
              placeholder="Car Type"
              className="w-full"
              value={formik.values.carType}
              onChange={formik.handleChange}
            />
          </div>

          <div className="flex-grow pb-4">
            <Label htmlFor="category">Category</Label>
            <select
              name="category"
              id="category"
              onChange={formik.handleChange}
              value={formik.values.category}
              defaultValue={formik.values.category}
              className="w-full py-1 border border-gray-300 rounded-md focus:border-1 focus:border-black focus:ring-3 focus:ring-gray-400"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="Hot">Hot</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalesProspekForm;
