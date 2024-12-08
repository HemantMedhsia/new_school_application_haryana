import React, { useEffect, useState } from "react";
import Datatable from "../../common/Datatables/Datatable";
import SearchBar from "../../common/SearchBar/SearchBar";
import { deleteAPI, getAPI } from "../../utility/api/apiCall";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../common/ConfirmationModal/ConfirmationModal";
import DetailsSelectionModal from "../../common/ConfirmationModal/DetailsSelectionModal";
import StudentSearchPopup from "../Student/StudentPopup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SiblingModal from "../../components/Student/SiblingModal";
import AssignRoutePopUp from "./AssingRoutePopUp";

const StudentInfo = () => {
  const [allStudentData, setAllStudentData] = useState([]);
  const [filteredStudentData, setFilteredStudentData] = useState([]);
  const [classItems, setClassItems] = useState([]);
  const [sectionItems, setSectionItems] = useState([]);
  const [sessionItems, setSessionItems] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isStudentSearchOpen, setIsStudentSearchOpen] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);
  const [currentParentId, setCurrentParentId] = useState(null);
  const [siblingsData, setSiblingsData] = useState([]);
  const [siblingGroupId, setSiblingGroupId] = useState([]);
  const [isSiblingsModalOpen, setIsSiblingsModalOpen] = useState(false);
  const [filterMessage, setFilterMessage] = useState("");
  const [assignPopup, setAssignPopup] = useState(false);

  const navigate = useNavigate();

  const fetchDropdownData = async () => {
    try {
      await getAPI("getAllClasses", {}, setClassItems);
      await getAPI("getAllSections", {}, setSectionItems);
      await getAPI("getAllSessions", {}, setSessionItems);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const clearFilters = () => {
    setSelectedClass(null);
    setSelectedSection(null);
    setSelectedSession(null);
    setSearchText("");
    setFilteredStudentData(allStudentData);
    fetchDropdownData();
  };

  const handleFilter = async () => {
    setLoading(true);

    try {
      let response;

      if (selectedClass && selectedSection && selectedSession) {
        response = await axios.post(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/get-student-by-classid-sectionid-sessionid`,
          {
            classId: selectedClass._id,
            sectionId: selectedSection._id,
            sessionId: selectedSession._id,
          }
        );
      } else if (selectedClass && selectedSection) {
        response = await axios.post(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/get-student-by-classandsection`,
          {
            classId: selectedClass._id,
            sectionId: selectedSection._id,
          }
        );
      } else if (selectedClass) {
        response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/getallstudents/${
            selectedClass._id
          }`
        );
      } else {
        setFilteredStudentData([]);
        setFilterMessage("Please select at least one filter to view students.");
        setLoading(false);
        return;
      }

      if (
        response?.data.data &&
        Array.isArray(response.data.data) &&
        response.data.data.length > 0
      ) {
        setAllStudentData(response.data.data);
        setFilteredStudentData(response.data.data);
        setFilterMessage("");
        toast.success("Students loaded successfully.");
      } else {
        toast.info("No students found with the selected filters.");
        setFilterMessage("No students found with the selected filters.");
      }
    } catch (error) {
      console.error("Error fetching filtered student data:", error);

      if (error.response) {
        if (error.response.status === 404) {
          toast.error("No students found with the selected filters.");
          setFilterMessage("No students found with the selected filters.");
        } else {
          toast.error(`An error occurred: ${error.response.statusText}`);
          setFilterMessage("An error occurred while fetching student data.");
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response from the server. Please try again later.");
        setFilterMessage("Unable to connect to the server.");
      } else {
        console.error("Error setting up request:", error.message);
        toast.error("An unexpected error occurred.");
        setFilterMessage("An unexpected error occurred while fetching data.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filteredData = allStudentData.filter(
      (student) =>
        student.firstName.toLowerCase().includes(text.toLowerCase()) ||
        student.lastName.toLowerCase().includes(text.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredStudentData(filteredData);
  };

  const handleDetailsSelect = (type) => {
    if (type === "student") {
      navigate(`/school/student-admission/${selectedStudent._id}`);
    } else if (type === "parent") {
      navigate(`/school/parent-update-student/${selectedStudent._id}`);
    }
  };

  const closeDetailsModal = () => {
    setSelectedStudent(null);
    setIsDetailsModalOpen(false);
  };

  const columns = [
    { header: "First Name", accessor: "firstName" },
    { header: "Last Name", accessor: "lastName" },
    { header: "Roll Number", accessor: "rollNumber" },
    { header: "Age", accessor: "age" },
    {
      header: "Father Name",
      accessor: (rowData) => rowData?.parent?.fatherName || "N/A",
    },
    {
      header: "Class",
      accessor: (rowData) => rowData?.currentClass?.name || "N/A",
    },
    {
      header: "Section",
      accessor: (rowData) => rowData?.currentSection?.name || "N/A",
    },
  ];

  const handleEdit = (studentData) => {
    setSelectedStudent(studentData);
    setIsDetailsModalOpen(true);
  };

  const handleView = (studentData) => {
    navigate(`/school/profile/${studentData._id}`);
  };

  const handleDelete = (studentData) => {
    setStudentToDelete(studentData);
    setIsModalOpen(true);
  };

  useEffect(() => {
    handleFilter();
  }, [selectedClass, selectedSection, selectedSession]);

  const handleCustomAction = (studentData) => {
    setAssignPopup(true);
    setCurrentStudentId(studentData._id);
    setCurrentParentId(studentData.parent);
    setIsStudentSearchOpen(true);
  };

  const confirmDelete = async () => {
    if (studentToDelete) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/delete-student/${
            studentToDelete._id
          }`
        );
        toast.dismiss();
        setAllStudentData((prevData) =>
          prevData.filter((student) => student._id !== studentToDelete._id)
        );
        setFilteredStudentData((prevData) =>
          prevData.filter((student) => student._id !== studentToDelete._id)
        );

        toast.success(
          `${studentToDelete.firstName} has been deleted successfully`
        );
      } catch (error) {
        console.error("Error deleting student:", error);
        toast.error("Failed to delete the student.");
      } finally {
        setIsModalOpen(false);
        setStudentToDelete(null);
      }
    }
  };

  const handleAddStudent = (student) => {
    console.log("Student added:", student);
    toast.success(`Added successfully.`);
    setIsStudentSearchOpen(false);
  };

  return (
    <div>
      <SearchBar
        classItems={classItems}
        sectionItems={sectionItems}
        sessionItems={sessionItems}
        onFilter={({ type, value }) => {
          if (type === "class") setSelectedClass(value);
          if (type === "section") setSelectedSection(value);
          if (type === "session") setSelectedSession(value);
        }}
        onSearch={handleSearch}
        onClearFilters={clearFilters}
      />

      {loading ? (
        <div className="loader-wrapper">
          <span className="loader"></span>
        </div>
      ) : filteredStudentData.length === 0 ? (
        <div className="no-data-message text-xl flex justify-center text-red-500">
          Oops! No Students Records Found.
        </div>
      ) : (
        <Datatable
          data={filteredStudentData}
          columns={columns}
          actions={{
            onView: handleView,
            onEdit: handleEdit,
            onDelete: handleDelete,
            onCustomAction1: handleCustomAction,
          }}
        />
      )}

      {assignPopup && (
        <AssignRoutePopUp
          isOpen={assignPopup}
          closeModal={() => setAssignPopup(false)}
          studentId={currentStudentId}
        />
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete ${
          studentToDelete ? studentToDelete.firstName : ""
        }?`}
      />
      <DetailsSelectionModal
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        onSelect={handleDetailsSelect}
      />

      {filterMessage && (
        <div className="text-center text-red-500 text-lg mt-4">
          {filterMessage}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default StudentInfo;
