/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { format } from "date-fns";
import { useCreateActivity } from "@/hooks/daily-activity/useCreateActiviity";
import { useEditActivity } from "@/hooks/daily-activity/useEditActivity";
import { useFetchActifity } from "@/hooks/daily-activity/useFetchActivity";

const ActivityForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const createActivity = useCreateActivity();
  const editActivity = useEditActivity();
  const { data: activities } = useFetchActifity();

  const formik = useFormik({
    initialValues: {
      date: "",
      activityType: "Prospecting",
      description: "",
      isDone: false,
      location: "",
      notes: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        if (id) {
          await editActivity.mutateAsync({ id, activityData: values });
        } else {
          await createActivity.mutateAsync(values);
        }
        resetForm();
        navigate("/sales/activity");
      } catch (err) {
        console.error("Failed to submit activity:", err);
      }
    },
  });

  useEffect(() => {
    if (id && activities) {
      const activity = activities.find((a: any) => a.id === id);
      if (activity) {
        formik.setValues({
          ...activity,
          date: activity.date
            ? format(new Date(activity.date), "yyyy-MM-dd")
            : "",
        });
      }
    }
  }, [id, activities]);

  return (
    <div>
      <div className="overflow-hidden mt-4 p-4 rounded-md border border-gray-300 dark:border-gray-800 dark:text-white shadow-sm h-full mb-10">
        <h1 className="text-3xl">
          {id ? "Edit Activity" : "Add New Activity"}
        </h1>
        <p className="pb-4">
          {id
            ? "Edit your activity details"
            : "Fill in the new activity information."}
        </p>
        <form className="h-full justify-between" onSubmit={formik.handleSubmit}>
          <div className="flex justify-between pb-4">
            <Link to="/sales/activities">
              <Button variant="ghost" className="border border-gray-300">
                Back
              </Button>
            </Link>
            <Button type="submit" className="bg-black hover:bg-black/90">
              Submit
            </Button>
          </div>

          {/* Date */}
          <div className="flex-col pb-4">
            <Label htmlFor="date">Date</Label>
            <Input
              type="date"
              id="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              className="w-full"
            />
          </div>

          {/* Activity Type */}
          <div className="flex-col pb-4">
            <Label htmlFor="activityType">Activity Type</Label>
            <select
              id="activityType"
              name="activityType"
              value={formik.values.activityType}
              onChange={formik.handleChange}
              className="w-full py-2 border border-gray-300 rounded-md"
            >
              <option value="Meeting">Meeting</option>
              <option value="Follow Up">Follow Up</option>
              <option value="Test Drive">Test Drive</option>
              <option value="Prospecting">Prospecting</option>
              <option value="Admin Work">Admin Work</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div className="flex-col pb-4">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              placeholder="Activity Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              className="w-full"
            />
          </div>

          {/* Location */}
          <div className="flex-col pb-4">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              type="text"
              placeholder="Activity Location"
              value={formik.values.location}
              onChange={formik.handleChange}
              className="w-full"
            />
          </div>

          {/* Notes */}
          <div className="flex-col pb-4">
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              type="text"
              placeholder="Additional Notes"
              value={formik.values.notes}
              onChange={formik.handleChange}
              className="w-full"
            />
          </div>

          {/* isDone */}
          <div className="flex items-center space-x-2 pb-4">
            <input
              type="checkbox"
              id="isDone"
              name="isDone"
              checked={formik.values.isDone}
              onChange={formik.handleChange}
              className="w-4 h-4"
            />
            <Label htmlFor="isDone">Mark as Done</Label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityForm;
