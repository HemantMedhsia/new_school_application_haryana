import React from "react";
import FormSection from "../../components/Form/FormSection";
import Input from "../../components/Form/Input";
import { useState } from "react";
import SearchableSelect from "../../components/Form/Select";
import FormButton from "../../components/Form/FormButton";

const AddTransport = () => {
  const [formData, setFormData] = useState({
    busNumber: "",
    kmReading: "",
    serviceOnKm: "",
    insurenceExpiryDate: "",
    approxMileage: "",
    pollutionExpiryDate: "",
    selectDriver: "",
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
      <FormSection title={"Add Transport"}>
        <Input
          labelName="Bus / Van Number"
          name="busNumber"
          value={formData.busNumber}
          onChange={handleChange}
          placeholder="Enter Bus / Van Number"
        />
        <Input
          labelName="K.M Reading ..."
          name="kmReading"
          value={formData.kmReading}
          onChange={handleChange}
          placeholder="Enter K.M Reading ..."
        />
        <Input
          labelName="Service on K.M ..."
          name="serviceOnKm"
          value={formData.serviceOnKm}
          onChange={handleChange}
          placeholder="Enter Service on K.M ..."
        />
        <Input
          labelName="Insurence Expiry Date"
          name="insurenceExpiryDate"
          value={formData.insurenceExpiryDate}
          onChange={handleChange}
          placeholder="Enter Insurence Expiry Date"
          type="date"
        />
        <Input
          labelName="Approx Mileage"
          name="approxMileage"
          value={formData.approxMileage}
          onChange={handleChange}
          placeholder="Enter Approx Mileage in K.M"
        />
        <Input
          labelName="Pollution Expiry Date"
          name="pollutionExpiryDate"
          value={formData.pollutionExpiryDate}
          onChange={handleChange}
          placeholder="Enter Pollution Expiry Date"
          type="date"
        />
        <SearchableSelect
          labelName="Select Bus / Van Driver"
          name="selectDriver"
          placeholder="Select Bus / Van Driver"
          value={formData.selectDriver}
          onChange={handleChange}
          options={[
            { id: "Event", name: "Event" },
            { id: "Holiday", name: "Holiday" },
            { id: "Announcement", name: "Announcement" },
            { id: "General", name: "General" },
          ]}
        />
      </FormSection>
      <div className="flex gap-2 flex-row-reverse" onClick={handleSubmit}>
        <FormButton name="Submit" />
      </div>
    </div>
  );
};

export default AddTransport;
