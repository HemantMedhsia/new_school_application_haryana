import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignRoutePopUp = ({ closeModal, studentId }) => {
  const [roundNumber, setRoundNumber] = useState("");

  const handleSubmit = async () => {
    const payload = {
      studentId,
      previousBalance: parseInt(roundNumber, 10),
    };

    console.log("Payload:", payload);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/add-student-previous-balance`,
        payload
      );
      alert("Route assigned successfully!");
      closeModal();
    } catch (error) {
      console.error("Error assigning route:", error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          {/* Modal Header */}
          <div className="flex justify-between items-center border-b pb-3">
            <h2 className="text-lg text-black font-semibold">
              Assign Previous Year Fees
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Modal Content */}
          <div className="mt-4">
            <p className="text-gray-600">
              Please fill in the required details to assing Previous Year Fees.
            </p>
            <form className="mt-4">
              {/* Round Number */}
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Enter Previous Year Fees"
                  value={roundNumber}
                  onChange={(e) => setRoundNumber(e.target.value)}
                  className="w-full px-3 py-2 border text-black rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
            </form>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end mt-4 space-x-3">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Assign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignRoutePopUp;
