import React, { useState } from "react";
import { Collapse } from "react-bootstrap";

const PatientDetails = () => {
  const [caseCounter, setCaseCounter] = useState(1);
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    gender: "",
    dob: "",
    address: "",
    phone: "",
    email: "",
    emergencyContact: "",
    pastDiagnoses: "",
    surgeries: "",
    allergies: "",
    currentMedications: "",
    appointmentDate: "",
    doctorName: "",
    insuranceProvider: "",
    policyNumber: "",
    coverageDetails: "",
    doctorsNotes: "",
    patientNotes: "",
    additionalObservations: "",
  });
  const [patients, setPatients] = useState([]);
  const [sortBy, setSortBy] = useState("caseNumber");
  const [openSections, setOpenSections] = useState([true, false, false, false, false, false]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const validateSection = (sectionIndex) => {
    let isValid = true;
    setError("");

    switch (sectionIndex) {
      case 0: // Personal Information section
        if (!patientData.name || !patientData.age || !patientData.gender || !patientData.dob) {
          setError("Please fill in all required fields.");
          isValid = false;
        }
        break;
      case 1: // Contact Information section
        if (!patientData.phone || !patientData.emergencyContact) {
          setError("Please fill in all required fields.");
          isValid = false;
        }
        break;
      case 2: // Medical History section
        // No required fields here, but you can add if necessary
        break;
      case 3: // Appointment History section
        // No required fields here, but you can add if necessary
        break;
      case 4: // Insurance Information section
        // No required fields here, but you can add if necessary
        break;
      default:
        break;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedPatients = patients.map((patient, index) =>
        index === editingIndex ? { ...patientData, caseNumber: patient.caseNumber } : patient
      );
      setPatients(updatedPatients);
      setIsEditing(false);
      setEditingIndex(null);
    } else {
      const newPatient = { caseNumber: `CN${caseCounter.toString().padStart(4, "0")}`, ...patientData };
      setPatients([...patients, newPatient]);
      setCaseCounter(caseCounter + 1);
    }
    resetForm();
  };

  const resetForm = () => {
    setPatientData({
      name: "",
      age: "",
      gender: "",
      dob: "",
      address: "",
      phone: "",
      email: "",
      emergencyContact: "",
      pastDiagnoses: "",
      surgeries: "",
      allergies: "",
      currentMedications: "",
      appointmentDate: "",
      doctorName: "",
      insuranceProvider: "",
      policyNumber: "",
      coverageDetails: "",
      doctorsNotes: "",
      patientNotes: "",
      additionalObservations: "",
    });
    setOpenSections([true, false, false, false, false, false]);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortedPatients = [...patients].sort((a, b) => {
    if (sortBy === "caseNumber") {
      return a.caseNumber.localeCompare(b.caseNumber);
    }
    return a.name.localeCompare(b.name);
  });

  const handleEditPatient = (index) => {
    const patientToEdit = patients[index];
    setPatientData(patientToEdit);
    setIsEditing(true);
    setEditingIndex(index);
    setOpenSections([true, false, false, false, false, false]); // Open first section for editing
  };

  const goToNextSection = (currentIndex) => {
    if (validateSection(currentIndex)) {
      setOpenSections((prev) => {
        const newSections = [...prev];
        newSections[currentIndex] = false;
        if (currentIndex < newSections.length - 1) {
          newSections[currentIndex + 1] = true;
        }
        return newSections;
      });
    }
  };

  const goToPreviousSection = (currentIndex) => {
    setOpenSections((prev) => {
      const newSections = [...prev];
      newSections[currentIndex] = false;
      if (currentIndex > 0) {
        newSections[currentIndex - 1] = true;
      }
      return newSections;
    });
  };

  return (
    <div>
      <div className="new d-flex align-items-center justify-content-center">
        <div className="login-form p-4">
          <h2>{isEditing ? "Edit Patient Details" : "Add Patient Details"}</h2>
          <form onSubmit={handleSubmit}>
            {/* Personal Details Section */}
            <Collapse in={openSections[0]}>
              <div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" className="form-control" name="name" value={patientData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Age:</label>
                  <input type="number" className="form-control" name="age" value={patientData.age} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Gender:</label>
                  <select className="form-control" name="gender" value={patientData.gender} onChange={handleInputChange} required>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Date of Birth:</label>
                  <input type="date" className="form-control" name="dob" value={patientData.dob} onChange={handleInputChange} required />
                </div>
                <button type="button" className="btn btn-primary" onClick={() => goToNextSection(0)}>Next</button>
              </div>
            </Collapse>

            {/* Contact Information Section */}
            <Collapse in={openSections[1]}>
              <div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="form-group">
                  <label>Address:</label>
                  <input type="text" className="form-control" name="address" value={patientData.address} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Phone Number:</label>
                  <input type="text" className="form-control" name="phone" value={patientData.phone} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Email Address:</label>
                  <input type="email" className="form-control" name="email" value={patientData.email} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Emergency Contact:</label>
                  <input type="text" className="form-control" name="emergencyContact" value={patientData.emergencyContact} onChange={handleInputChange} required />
                </div>
                <button type="button" className="btn btn-secondary" onClick={() => goToPreviousSection(1)}>Previous</button>
                <button type="button" className="btn btn-primary" onClick={() => goToNextSection(1)}>Next</button>
              </div>
            </Collapse>

            {/* Medical History Section */}
            <Collapse in={openSections[2]}>
              <div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="form-group">
                  <label>Past Diagnoses:</label>
                  <input type="text" className="form-control" name="pastDiagnoses" value={patientData.pastDiagnoses} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Surgeries:</label>
                  <input type="text" className="form-control" name="surgeries" value={patientData.surgeries} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Allergies:</label>
                  <input type="text" className="form-control" name="allergies" value={patientData.allergies} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Current Medications:</label>
                  <input type="text" className="form-control" name="currentMedications" value={patientData.currentMedications} onChange={handleInputChange} />
                </div>
                <button type="button" className="btn btn-secondary" onClick={() => goToPreviousSection(2)}>Previous</button>
                <button type="button" className="btn btn-primary" onClick={() => goToNextSection(2)}>Next</button>
              </div>
            </Collapse>

            {/* Appointment History Section */}
            <Collapse in={openSections[3]}>
              <div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="form-group">
                  <label>Appointment Date:</label>
                  <input type="date" className="form-control" name="appointmentDate" value={patientData.appointmentDate} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Doctor Name:</label>
                  <input type="text" className="form-control" name="doctorName" value={patientData.doctorName} onChange={handleInputChange} />
                </div>
                <button type="button" className="btn btn-secondary" onClick={() => goToPreviousSection(3)}>Previous</button>
                <button type="button" className="btn btn-primary" onClick={() => goToNextSection(3)}>Next</button>
              </div>
            </Collapse>

            {/* Insurance Information Section */}
            <Collapse in={openSections[4]}>
              <div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="form-group">
                  <label>Insurance Provider:</label>
                  <input type="text" className="form-control" name="insuranceProvider" value={patientData.insuranceProvider} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Policy Number:</label>
                  <input type="text" className="form-control" name="policyNumber" value={patientData.policyNumber} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Coverage Details:</label>
                  <input type="text" className="form-control" name="coverageDetails" value={patientData.coverageDetails} onChange={handleInputChange} />
                </div>
                <button type="button" className="btn btn-secondary" onClick={() => goToPreviousSection(4)}>Previous</button>
                <button type="button" className="btn btn-primary" onClick={() => goToNextSection(4)}>Next</button>
              </div>
            </Collapse>

            {/* Notes and Other Sections */}
            <Collapse in={openSections[5]}>
              <div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="form-group">
                  <label>Doctor's Notes:</label>
                  <textarea className="form-control" name="doctorsNotes" value={patientData.doctorsNotes} onChange={handleInputChange}></textarea>
                </div>
                <div className="form-group">
                  <label>Patient Notes:</label>
                  <textarea className="form-control" name="patientNotes" value={patientData.patientNotes} onChange={handleInputChange}></textarea>
                </div>
                <div className="form-group">
                  <label>Additional Observations:</label>
                  <textarea className="form-control" name="additionalObservations" value={patientData.additionalObservations} onChange={handleInputChange}></textarea>
                </div>
                <button type="button" className="btn btn-secondary" onClick={() => goToPreviousSection(5)}>Previous</button>
              </div>
            </Collapse>
                <button type="submit" className="btn btn-primary mt-3">
                  {isEditing ? "Update Patient Details" : "Add Patient Details"}
                </button>
          </form>
        </div>
      </div>

      {/* Patients List */}
      <div className="mainlist">
        <h3>Patients List</h3>
        <div className="form-group-sort form-group">
          <label>Sort by:</label>
          <select className="form-control" value={sortBy} onChange={handleSortChange}>
            <option value="caseNumber">Case Number</option>
            <option value="name">Patient Name</option>
          </select>
        </div>
        <ul className="listtable">
          {sortedPatients.map((patient, index) => (
            <li key={index} className="list">
              <div className="patient-detail">
                <strong>Case Number:</strong> {patient.caseNumber}
              </div>
              <div className="patient-detail">
                <strong>Name:</strong> {patient.name}
              </div>
              <div className="patient-detail">
                <strong>Age:</strong> {patient.age} years old
              </div>
              <div className="patient-detail">
                <strong>Gender:</strong> {patient.gender}
              </div>
              <div className="patient-detail">
                <strong>Date of Birth:</strong> {patient.dob}
              </div>
              <div className="patient-detail">
                <strong>Address:</strong> {patient.address}
              </div>
              <div className="patient-detail">
                <strong>Phone Number:</strong> {patient.phone}
              </div>
              <div className="patient-detail">
                <strong>Email:</strong> {patient.email}
              </div>
              <div className="patient-detail">
                <strong>Emergency Contact:</strong> {patient.emergencyContact}
              </div>
              <div className="patient-detail">
                <strong>Past Diagnoses:</strong> {patient.pastDiagnoses}
              </div>
              <div className="patient-detail">
                <strong>Surgeries:</strong> {patient.surgeries}
              </div>
              <div className="patient-detail">
                <strong>Allergies:</strong> {patient.allergies}
              </div>
              <div className="patient-detail">
                <strong>Current Medications:</strong> {patient.currentMedications}
              </div>
              <div className="patient-detail">
                <strong>Appointment Date:</strong> {patient.appointmentDate}
              </div>
              <div className="patient-detail">
                <strong>Doctor Name:</strong> {patient.doctorName}
              </div>
              <div className="patient-detail">
                <strong>Insurance Provider:</strong> {patient.insuranceProvider}
              </div>
              <div className="patient-detail">
                <strong>Policy Number:</strong> {patient.policyNumber}
              </div>
              <div className="patient-detail">
                <strong>Coverage Details:</strong> {patient.coverageDetails}
              </div>
              <div className="patient-detail">
                <strong>Doctor's Notes:</strong> {patient.doctorsNotes}
              </div>
              <div className="patient-detail">
                <strong>Patient Notes:</strong> {patient.patientNotes}
              </div>
              <div className="patient-detail">
                <strong>Additional Observations:</strong> {patient.additionalObservations}
              </div>
              <button className="btn btn-warning mt-2" onClick={() => handleEditPatient(index)}>
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PatientDetails;
