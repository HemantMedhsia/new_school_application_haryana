import React from "react";
import { useState } from "react";
import FormSection from "../../components/Form/FormSection";
import SearchableSelect from "../../components/Form/Select";
import FormButton from "../../components/Form/FormButton";
import Input from "../../components/Form/Input";
import axios from "axios";

const AddRoutes = () => {
  const [formData, setFormData] = useState({
    routeName: "",
    routeFarePerMonth: "",
    approxRouteLengthOneSide: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      routeName: formData.routeName,
      routeFare: formData.routeFarePerMonth,
      routeLengthOneSide: formData.approxRouteLengthOneSide,
    };
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/createbusroute`, payload)
      .then((response) => {
        console.log("Route added successfully:", response.data);
        alert("Route added successfully!");
      })
      .catch((error) => {
        console.error("There was an error adding the route:", error);
        alert("There was an error adding the route.");
      });
  };

  return (
    <div className="w-full bg-[#283046] rounded-md p-12">
      <FormSection title={"Add Route"}>
        <Input
          labelName="Route Name"
          name="routeName"
          value={formData.routeName}
          onChange={handleChange}
          placeholder="Enter Route Name"
        />
        <Input
          labelName="Route Fare Per Month"
          name="routeFarePerMonth"
          value={formData.routeFarePerMonth}
          onChange={handleChange}
          placeholder="Enter Route Fare Per Month"
        />
        <Input
          labelName="Approx Route Length One Side"
          name="approxRouteLengthOneSide"
          value={formData.approxRouteLengthOneSide}
          onChange={handleChange}
          placeholder="Enter Approx Route Length One Side"
        />
      </FormSection>
      <div className="flex gap-2 flex-row-reverse" onClick={handleSubmit}>
        <FormButton name="Submit" />
      </div>
    </div>
  );
};

export default AddRoutes;
