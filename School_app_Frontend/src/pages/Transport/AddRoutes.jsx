import React from "react";
import { useState } from "react";
import FormSection from "../../components/Form/FormSection";
import SearchableSelect from "../../components/Form/Select";
import FormButton from "../../components/Form/FormButton";
import Input from "../../components/Form/Input";

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
    console.log(formData);
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
