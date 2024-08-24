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
  const [sortOrder, setSortOrder] = useState("ascending");
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

  const handleOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortedPatients = [...patients].sort((a, b) => {
    let comparison = 0;

    if (sortBy === "caseNumber") {
      comparison = a.caseNumber.localeCompare(b.caseNumber);
    } else if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name);
    }

    return sortOrder === "ascending" ? comparison : -comparison;
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

    // Define the handleButtonClick function
    const handleButtonClick = () => {
      // Scroll to the form with the specified ID
      document.getElementById('form').scrollIntoView({ behavior: 'smooth' });
    };

    return (
      <div>
        <div id="patientDetails" className="text-center">
          <button type="button" id="homeButton" className="btn btn-primary mx-2">
            Home
          </button>
          <button
            type="button"
            id="addAppointmentButton"
            className="btn btn-secondary mx-2"
            onClick={handleButtonClick}
          >
            Add Patient Details
          </button>
        </div>
        <div className="new d-flex align-items-center justify-content-center">
          <div className="login-form p-4">
            <h2>{isEditing ? "Edit Patient Details" : "Add Patient Details"}</h2>
            <form id="form" onSubmit={handleSubmit}>
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
            <div>
              <label>Sort by:</label>
              <select className="form-control" value={sortBy} onChange={handleSortChange}>
                <option value="caseNumber">Case Number</option>
                <option value="name">Patient Name</option>
              </select>

              <label>Order:</label>
              <select className="form-control" value={sortOrder} onChange={handleOrderChange}>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>

              {/* Render sorted patients here */}
            </div>
          </div>
          <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>Case Number</th>
                  <th style={{ width: '150px' }}>Name</th>
                  <th style={{ width: '50px' }}>Age</th>
                  <th style={{ width: '80px' }}>Gender</th>
                  <th style={{ width: '120px' }}>Date of Birth</th>
                  <th style={{ width: '200px' }}>Address</th>
                  <th style={{ width: '120px' }}>Phone Number</th>
                  <th style={{ width: '150px' }}>Email</th>
                  <th style={{ width: '150px' }}>Emergency Contact</th>
                  <th style={{ width: '150px' }}>Past Diagnoses</th>
                  <th style={{ width: '150px' }}>Surgeries</th>
                  <th style={{ width: '150px' }}>Allergies</th>
                  <th style={{ width: '150px' }}>Current Medications</th>
                  <th style={{ width: '120px' }}>Appointment Date</th>
                  <th style={{ width: '150px' }}>Doctor Name</th>
                  <th style={{ width: '150px' }}>Insurance Provider</th>
                  <th style={{ width: '150px' }}>Policy Number</th>
                  <th style={{ width: '150px' }}>Coverage Details</th>
                  <th style={{ width: '150px' }}>Doctor's Notes</th>
                  <th style={{ width: '150px' }}>Patient Notes</th>
                  <th style={{ width: '150px' }}>Additional Observations</th>
                  <th style={{ width: '100px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedPatients.map((patient, index) => (
                  <tr key={index}>
                    <td>{patient.caseNumber}</td>
                    <td>{patient.name}</td>
                    <td>{patient.age} years old</td>
                    <td>{patient.gender}</td>
                    <td>{patient.dob}</td>
                    <td>{patient.address}</td>
                    <td>{patient.phone}</td>
                    <td>{patient.email}</td>
                    <td>{patient.emergencyContact}</td>
                    <td>{patient.pastDiagnoses}</td>
                    <td>{patient.surgeries}</td>
                    <td>{patient.allergies}</td>
                    <td>{patient.currentMedications}</td>
                    <td>{patient.appointmentDate}</td>
                    <td>{patient.doctorName}</td>
                    <td>{patient.insuranceProvider}</td>
                    <td>{patient.policyNumber}</td>
                    <td>{patient.coverageDetails}</td>
                    <td>{patient.doctorsNotes}</td>
                    <td>{patient.patientNotes}</td>
                    <td>{patient.additionalObservations}</td>
                    <td>
                      <button className="btn btn-warning" onClick={() => handleEditPatient(index)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    );
  };

  export default PatientDetails;
