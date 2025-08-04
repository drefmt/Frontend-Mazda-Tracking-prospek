import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "@/lib/axios"; // asumsi kamu pakai custom axios
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import toast from "react-hot-toast";

const AddUserForm = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      level: "sales",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Nama wajib diisi"),
      email: Yup.string()
        .email("Email tidak valid")
        .required("Email wajib diisi"),
      password: Yup.string()
        .min(3, "Minimal 3 karakter")
        .required("Password wajib diisi"),
      level: Yup.string().oneOf(["sales", "svp"]),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axiosInstance.post("/users/register", values);
        toast.success("User berhasil ditambahkan")
        console.log("okeee");
        resetForm();
      } catch (error) {
        toast.error("terjadi kesalahaan saat menambahkan user")
        console.log(error);
      }
    },
  });

  return (
    <Card className="p-4">
      <form onSubmit={formik.handleSubmit} className="space-y-4 py-10">
        <Input
          name="username"
          placeholder="username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        {formik.touched.username && formik.errors.username && (
          <p className="text-sm text-red-500">{formik.errors.username}</p>
        )}
        <Input
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          type="email"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-sm text-red-500">{formik.errors.email}</p>
        )}
        <Input
          name="password"
          placeholder="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Select
          value={formik.values.level}
          onValueChange={(val) => formik.setFieldValue("level", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="svp">Supervisor</SelectItem>
          </SelectContent>
        </Select>
          {formik.touched.level && formik.errors.level && (
            <p className="text-sm text-red-500">{formik.errors.level}</p>
          )}

        <Button type="submit">Tambah User</Button>
      </form>
    </Card>
  );
};

export default AddUserForm;
