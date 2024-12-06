import React, { useEffect, useRef, useState } from "react";
import logo2 from "../../assets/logo.png";
import { useReactToPrint } from "react-to-print";
import "./style.css";
import { useLocation, useParams } from "react-router-dom";
import formatDate from "../../utility/Helper/formateDate";

const StudentPreFilledFrom = () => {
  const location = useLocation();
  const { studentId } = location.state || {};

  console.log("studentId data is here ", studentId);
  const printRef = useRef();

  const handlePrint = useReactToPrint({ contentRef: printRef });
  return (
    <div
      ref={printRef}
      className="max-w-5xl mx-auto my-0 p-6 bg-indigo-100 shadow-xl border border-gray-200"
    >
      {/* Decorative Border */}
      <div className="border-4  border-green-600 p-1 relative">
        <div className="border-2 border-green-600 p-4 relative">
          {/* Watermark */}
          {/* <div className="absolute inset-0 opacity-20 pointer-events-none flex justify-center items-center">
            <img
              src={logo}
              alt="Watermark"
              className="w-full h-full object-contain"
            />
          </div> */}

          {/* Content Wrapper */}
          <div className="relative z-10">
            {/* School Header */}
            <div className="flex items-center justify-between mb-8">
              {/* Left Logo */}
              <div className="w-1/4 flex justify-start">
                <img
                  src={logo2}
                  alt="School Logo"
                  className="h-40 w-40 object-cover"
                />
              </div>

              {/* School Name and Info */}
              <div className="w-2/4 text-center">
                <h1 className="text-4xl font-heading text-indigo-800 font-bold uppercase tracking-wide">
                  Sample School Name
                </h1>
                <p className="text-lg text-gray-700 mt-1">
                  1234 School Address, City, State, ZIP
                </p>
                <p className="text-lg text-gray-700">
                  Phone: (123) 456-7890 | Email: info@school.com
                </p>
              </div>

              {/* Right Logo */}
              <div className="w-1/4 flex justify-end">
                <img
                  src={logo2}
                  alt="School Logo"
                  className="h-40 w-40 object-cover"
                />
              </div>
            </div>
            <div className=" lg:block">
              <p className="text-xl w-auto font-semibold flex justify-center bg-green-500 text-white ">
                Application Form For Addimission
              </p>
            </div>
            <div className=" lg:block">
              <p className="text-xl font-semibold flex justify-center text-red-500 italic">
                [Affiliated to the State Board of Education]
              </p>
            </div>

            <div className=" lg:block">
              <p className="text-xl my-2 font-semibold flex justify-center text-red-500 italic">
                Session: {studentId.currentSession.sessionYear}
              </p>
            </div>

            {/* <div className="hidden lg:block">
              <p className="text-sm flex justify-center text-green-500 italic">
                "Excellence in Education"
              </p>
            </div> */}
            {/* Important Instructions */}
            <div className="mb-8 p-6 border-l-4 border-y-2 borde  border-vibrant-green bg-indigo-100 rounded-lg">
              <h2 className="text-2xl font-semibold text-indigo-800 underline mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-indigo-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m0 0V9h1v1h-1v1m5 4h.01M21 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z"
                  />
                </svg>
                Important Instructions
              </h2>
              <ul className="list-disc list-inside ml-4 text-gray-800 space-y-2">
                <li className="text-lg">
                  Please fill out all required fields marked with an asterisk
                  (*).
                </li>
                <li className="text-lg">Use block letters for clarity.</li>
                <li className="text-lg">
                  Attach recent photographs where indicated.
                </li>
                <li className="text-lg">
                  Ensure all information provided is accurate and up-to-date.
                </li>
              </ul>
            </div>

            {/* <hr className="border-t-2 border-vibrant-green mb-8" /> */}

            {/* Form Start */}
            <form className="text-gray-800 font-body">
              {/* Student Information */}
              <h2 className="text-2xl font-semibold mb-6 text-indigo-800 border-b-2 border-indigo-800 pb-2">
                Student Information
              </h2>

              {/* Student Photo and Basic Details */}
              <div className="grid grid-cols-3 gap-8 mb-6">
                {/* Student Photo Placeholder */}
                <div className="col-span-1">
                  <label className="block font-medium mb-2 text-indigo-800">
                    Student Photo
                  </label>
                  <div className="border-2 rounded-xl border-green-500 h-40 w-32">
                    <img
                      src={studentId.studentPhoto}
                      alt="Student Photo"
                      className="h-full rounded-xl w-full object-cover"
                    />
                  </div>
                </div>
                {/* Basic Details */}
                <div className="col-span-2 grid grid-cols-2 gap-8">
                  {/* Admission Number */}
                  <div>
                    <label className="block font-medium mb-2 text-indigo-800">
                      Admission Number *
                    </label>
                    <div className="border-b border-gray-500 h-10">
                      {studentId.admissionNo}
                    </div>
                  </div>
                  {/* Roll Number */}
                  <div>
                    <label className="block font-medium mb-2 text-indigo-800">
                      Roll Number
                    </label>
                    <div className="border-b border-gray-500 h-10">
                      {studentId.rollNumber}
                    </div>
                  </div>
                  {/* First Name (Increased Width) */}
                  <div className="col-span-2">
                    <label className="block font-medium mb-2 text-indigo-800">
                      First Name *
                    </label>
                    <div className="border-b border-gray-500 h-10">
                      {studentId.firstName}
                    </div>
                  </div>
                  {/* Last Name (Increased Width) */}
                  <div className="col-span-2">
                    <label className="block font-medium mb-2 text-indigo-800">
                      Last Name
                    </label>
                    <div className="border-b border-gray-500 h-10">
                      {studentId.lastName}
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Class, Section, Session */}
              <div className="grid grid-cols-3 gap-8 mb-6">
                {/* Current Class */}
                <div>
                  <label className="block font-medium mb-2 text-indigo-800">
                    Current Class *
                  </label>
                  <div className="border-b border-gray-500 h-10">
                    {studentId.currentClass.name}
                  </div>
                </div>
                {/* Current Section */}
                <div>
                  <label className="block font-medium mb-2 text-indigo-800">
                    Current Section *
                  </label>
                  <div className="border-b border-gray-500 h-10">
                    {studentId.currentSection.name}
                  </div>
                </div>
                {/* Current Session */}
                <div>
                  <label className="block font-medium mb-2 text-indigo-800">
                    Current Session *
                  </label>
                  <div className="border-b border-gray-500 h-10">
                    {studentId.currentSession.sessionYear}
                  </div>
                </div>
              </div>

              {/* Gender and Date of Birth */}
              <div className="grid grid-cols-2 gap-8 mb-6">
                {/* Gender */}
                <div>
                  <label className="block font-medium mb-2 text-indigo-800">
                    Gender *
                  </label>
                  <div className="border-b border-gray-500 h-10">
                    {studentId.gender}
                  </div>
                </div>
                {/* Date of Birth */}
                <div>
                  <label className="block font-medium mb-2 text-indigo-800">
                    Date of Birth
                  </label>
                  <div className="border-b border-gray-500 h-10">
                    {formatDate(studentId.dateOfBirth)}
                  </div>
                </div>
              </div>

              {/* Category, Religion, Caste */}
              <div className="grid grid-cols-3 gap-8 mb-6">
                {/* Category */}
                <div>
                  <label className="block font-medium mb-2 text-indigo-800">
                    Category
                  </label>
                  <div className="border-b border-gray-500 h-10">
                    {studentId.category}
                  </div>
                </div>
                {/* Religion */}
                <div>
                  <label className="block font-medium mb-2 text-indigo-800">
                    Religion
                  </label>
                  <div className="border-b border-gray-500 h-10">
                    {studentId.religion}
                  </div>
                </div>
                {/* Caste */}
                <div>
                  <label className="block font-medium mb-2 text-indigo-800">
                    Caste
                  </label>
                  <div className="border-b border-gray-500 h-10">
                    {studentId.caste || "N/A"}
                  </div>
                </div>
              </div>

              {/* Age and Admission Date */}
              <div className="grid grid-cols-2 gap-8 mb-6">
                {/* Age */}
                <div>
                  <label className="block font-medium mb-2 text-indigo-800">
                    Age
                  </label>
                  <div className="border-b border-gray-500 h-10">
                    {studentId.age}
                  </div>
                </div>
                {/* Admission Date */}
                <div>
                  <label className="block font-medium mb-2 text-indigo-800">
                    Admission Date
                  </label>
                  <div className="border-b border-gray-500 h-10">
                    {formatDate(studentId.admissionDate)}
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="mb-6">
                <label className=" font-medium mb-2 text-indigo-800">
                  Address
                </label>
                <div className="border-2 p-2 border-indigo-800 h-24">
                  {studentId.address}
                </div>
              </div>

              {/* Mobile Number and Email */}
              <div className="grid grid-cols-2 gap-8 mb-20">
                {/* Mobile Number */}
                <div>
                  <label className="block font-medium mb-2 text-indigo-800">
                    Mobile Number *
                  </label>
                  <div className="border-b border-gray-500 h-10">
                    {studentId.mobileNumber}
                  </div>
                </div>
                {/* Email */}
                <div>
                  <label className="block font-medium mb-2 text-indigo-800">
                    Email *
                  </label>
                  <div className="border-b border-gray-500 h-10">
                    {studentId.email}
                  </div>
                </div>
              </div>

              {/* Page Break for Printing */}
              <div className="page-break"></div>

              {/* Blood Group, House, Medical History */}
              <div className="grid grid-cols-3 gap-8 mb-6 mt-10">
                {/* Blood Group */}
                <div>
                  <label className="block font-medium mb-2 text-indigo-800">
                    Blood Group
                  </label>
                  <div className="border-b border-gray-500 h-10">
                    {studentId.bloodGroup}
                  </div>
                </div>
                {/* House */}
                <div>
                  <label className="block font-medium mb-2 text-indigo-800">
                    House
                  </label>
                  <div className="border-b border-gray-500 h-10">
                    {studentId.house}
                  </div>
                </div>
                {/* Medical History */}
                <div>
                  <label className="block font-medium mb-2 text-indigo-800">
                    Medical History
                  </label>
                  <div className="border-b border-gray-500 h-10">
                    {studentId.medicalHistory}
                  </div>
                </div>
              </div>

              {/* Parent Information */}
              <h2 className="text-2xl font-semibold mt-12 mb-6 text-indigo-800 border-b-2 border-indigo-800 pb-2">
                Parent Information
              </h2>

              {/* Parent Photo */}
              <div className="mb-6">
                <label className="block font-medium mb-2 text-indigo-800">
                  Parent / Guardian Photo
                </label>
                <div className="border-2 rounded-xl border-green-500 h-40 w-32">
                  <img
                    src={studentId.parent.guardianPhoto || "https://i.pinimg.com/originals/4c/cd/08/4ccd086a8b7970c7a1ab4961e9bfcafc.jpg"}
                    alt="Student Photo"
                    className="h-full rounded-xl w-full object-fill"
                  />
                </div>
              </div>

              {/* Father's Details */}
              <div className="mb-6">
                <label className="block font-medium mb-2 text-indigo-800">
                  Father's Name *
                </label>
                <div className="border-b border-gray-500 h-10">
                  {studentId.parent.fatherName}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 mb-6">
                {/* Father's Phone */}
                <div>
                  <label className="block font-medium mb-2 text-indigo-800">
                    Father's Phone
                  </label>
                  <div className="border-b border-gray-500 h-10">
                    {studentId.parent.fatherPhone}
                  </div>
                </div>
                {/* Father's Occupation */}
                <div>
                  <label className="block font-medium mb-2 text-indigo-800">
                    Father's Occupation
                  </label>
                  <div className="border-b border-gray-500 h-10">
                    {studentId.parent.fatherOccupation}
                  </div>
                </div>
              </div>

              {/* Mother's Details */}
              <div className="mb-6">
                <label className="block font-medium mb-2 text-indigo-800">
                  Mother's Name
                </label>
                <div className="border-b border-gray-500 h-10">
                  {studentId.parent.motherName}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 mb-6">
                {/* Mother's Phone */}
                <div>
                  <label className="block font-medium mb-2 text-indigo-800">
                    Mother's Phone
                  </label>
                  <div className="border-b border-gray-500 h-10">
                    {studentId.parent.motherPhone}
                  </div>
                </div>
                {/* Mother's Occupation */}
                <div>
                  <label className="block font-medium mb-2 text-indigo-800">
                    Mother's Occupation
                  </label>
                  <div className="border-b border-gray-500 h-10">
                    {studentId.parent.motherOccupation}
                  </div>
                </div>
              </div>

              {/* Guardian Details */}
              <div className="grid grid-cols-2 gap-8 mb-6">
                {/* Guardian Is */}
                <div>
                  <label className="block font-medium mb-2 text-indigo-800">
                    Guardian Is
                  </label>
                  <div className="border-b border-gray-500 h-10">
                    {studentId.parent.guardianIs}
                  </div>
                </div>
                {/* Guardian's Name */}
                <div>
                  <label className="block font-medium mb-2 text-indigo-800">
                    Guardian's Name
                  </label>
                  <div className="border-b border-gray-500 h-10">
                    {studentId.parent.guardianName}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 mb-6">
                {/* Guardian's Relation */}
                <div>
                  <label className="block font-medium mb-2 text-indigo-800">
                    Guardian's Relation
                  </label>
                  <div className="border-b border-gray-500 h-10">
                    {studentId.parent.guardianRelation || "Father"}
                  </div>
                </div>
                {/* Guardian's Phone */}
                <div>
                  <label className="block font-medium mb-2 text-indigo-800">
                    Guardian's Phone
                  </label>
                  <div className="border-b border-gray-500 h-10">
                    {studentId.parent.guardianPhone || "+91 XXXXXXXXXX"}
                  </div>
                </div>
              </div>
              <div className="mb-6">
                {/* Guardian's Occupation */}
                <label className="block font-medium mb-2 text-indigo-800">
                  Guardian's Occupation
                </label>
                <div className="border-b border-gray-500 h-10">
                  {studentId.parent.gurdianOccupation || "N/A"}
                </div>
              </div>

              {/* Guardian's Address */}
              <div className="mb-6">
                <label className="block font-medium mb-2 text-indigo-800">
                  Guardian's Address
                </label>
                <div className="border p-2 border-gray-500 h-24">
                  {studentId.parent.guardianAddress}
                </div>
              </div>

              {/* Signature Fields */}
              <div className="grid grid-cols-2 gap-8 mt-16">
                <div className="text-center">
                  <div className="border-b border-gray-500 mt-12">Ramesh</div>
                  <p className="mt-2 font-medium text-indigo-800">
                    Parent/Guardian Signature
                  </p>
                </div>
                <div className="text-center">
                  <div className="border-b border-gray-500 mt-12">
                    {formatDate(Date.now())}
                  </div>
                  <p className="mt-2 font-medium text-indigo-800">Date</p>
                </div>
              </div>
            </form>
            {/* Form End */}
          </div>
        </div>
      </div>
      <div className="text-right mt-4">
        <button
          onClick={handlePrint}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Print Form
        </button>
      </div>
    </div>
  );
};

export default StudentPreFilledFrom;
