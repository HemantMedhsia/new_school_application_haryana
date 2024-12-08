import React, { useEffect } from "react";
import FormSection from "../../components/Form/FormSection";
import Input from "../../components/Form/Input";
import { useState } from "react";
import SearchableSelect from "../../components/Form/Select";
import FormButton from "../../components/Form/FormButton";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

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
  const [driverOptions, setDriverOptions] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/drivers`)
      .then((response) => {
        setDriverOptions(
          response.data.map((driver) => ({
            id: driver._id,
            name: driver.name,
          }))
        );
      })
      .catch((error) => {
        setDriverOptions([
          {
            id: "6734aa7bc2188df64817294f",
            name: "John Doe",
          },
          {
            id: "6734aa7bc2188df64817294f",
            name: "Jane Smith",
          },
        ]);
        console.error(error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      busNo: formData.busNumber,
      kmReading: parseFloat(formData.kmReading),
      serviceOnKm: parseFloat(formData.serviceOnKm),
      insuranceExpiry: formData.insurenceExpiryDate,
      milageApprox: parseFloat(formData.approxMileage),
      polluationExpiry: formData.pollutionExpiryDate,
      driverId: formData.selectDriver,
    };

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/registerbus`, payload)
      .then((res) => {
        console.log(res);
        toast.success("Transport added successfully");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to add transport");
      });
  };

  return (
    <div className="w-full bg-[#283046] rounded-md p-12">
      <ToastContainer />
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
          onChange={(e) =>
            setFormData({ ...formData, selectDriver: e.target.value })
          }
          options={driverOptions}
        />
      </FormSection>
      <div className="flex gap-2 flex-row-reverse" onClick={handleSubmit}>
        <FormButton name="Submit" />
      </div>
    </div>
  );
};

export default AddTransport;
