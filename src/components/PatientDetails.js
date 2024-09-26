import React, { useEffect, useState } from "react";
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
  const [isChecked, setIsChecked] = useState(false);
  const [expandedPatientIndex, setExpandedPatientIndex] = useState(null);

  // Fetch patients data
  const fetchPatients = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/patients");
      const data = await response.json();
      setPatients(data);
    } catch (err) {
      setError("Failed to fetch patients.");
    }
  };

  // Retrieve the case counter from localStorage when the component mounts
  useEffect(() => {
    const savedCaseCounter = localStorage.getItem("caseCounter");
    if (savedCaseCounter) {
      setCaseCounter(parseInt(savedCaseCounter, 10));
    }
    fetchPatients();
  }, []);

  // Save case counter to localStorage every time it updates
  useEffect(() => {
    localStorage.setItem("caseCounter", caseCounter.toString());
  }, [caseCounter]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await fetch(`http://localhost:3000/api/patients/${patientData.caseNumber}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patientData),
        });
      } else {
        const newPatient = { caseNumber: `CN${caseCounter.toString().padStart(4, "0")}`, ...patientData };
        await fetch("http://localhost:3000/api/patients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPatient),
        });
        setCaseCounter(caseCounter + 1);
      }
      resetForm();
      fetchPatients();
    } catch (error) {
      setError("An error occurred while submitting data.");
    }
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
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleEditPatient = (index) => {
    const patientToEdit = patients[index];
    setPatientData(patientToEdit);
    setIsEditing(true);
    setEditingIndex(index);
    setOpenSections([true, false, false, false, false, false]);
  };

  const toggleExpandedPatient = (index) => {
    setExpandedPatientIndex(expandedPatientIndex === index ? null : index);
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

  const validateSection = (sectionIndex) => {
    let isValid = true;
    setError("");

    switch (sectionIndex) {
      case 0:
        if (!patientData.name || !patientData.age || !patientData.gender || !patientData.dob) {
          setError("Please fill in all required fields.");
          isValid = false;
        }
        break;
      case 1:
        if (!patientData.phone || !patientData.emergencyContact) {
          setError("Please fill in all required fields.");
          isValid = false;
        }
        break;
      default:
        break;
    }
    return isValid;
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
      <div id="patientDetails" className="container-fluid d-flex align-items-center flex-column">
        <div className="row">
          <div className="patient-details-home homeset col-md-6 d-flex flex-column justify-content-center">
            <h2 className="your-health mb-4">Your Health Story</h2>
            <p className="pa mb-4">
              In the quiet grove, add your details to the Book of Health. Each entry is a step in your journey, carefully recorded to ensure personalized care.
            </p>
            <div className="btnset">
              <button type="button" id="homeButton" className="btn btn-primary mx-2">
                Home
              </button>
              <button
                type="button"
                id="addAppointmentButton"
                className="btn btn-secondary mx-2"
                onClick={() => setIsChecked(prev => !prev)}
                aria-controls="example-collapse-text"
                aria-expanded={isChecked}
              >
                {isChecked ? "Hide Form" : "Add Patient"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="new1 d-flex align-items-center justify-content-center">
        <Collapse in={isChecked}>
          <div id="example-collapse-text" className="login-form login-form-width custom-collapse">
            <h2>{isEditing ? "Edit Details" : "Add Details"}</h2>
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
                  <button type="button" className="btnnext btn btn-primary" onClick={() => goToNextSection(0)}>Next</button>
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
                    <label>Email:</label>
                    <input type="email" className="form-control" name="email" value={patientData.email} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Emergency Contact:</label>
                    <input type="text" className="form-control" name="emergencyContact" value={patientData.emergencyContact} onChange={handleInputChange} required />
                  </div>
                  <button type="button" className="btnprev btn btn-secondary" onClick={() => goToPreviousSection(1)}>Previous</button>
                  <button type="button" className="btnnext btn btn-primary" onClick={() => goToNextSection(1)}>Next</button>
                </div>
              </Collapse>

              {/* Medical History Section */}
              <Collapse in={openSections[2]}>
                <div>
                  <div className="form-group">
                    <label>Past Diagnoses:</label>
                    <textarea className="form-control" name="pastDiagnoses" value={patientData.pastDiagnoses} onChange={handleInputChange}></textarea>
                  </div>
                  <div className="form-group">
                    <label>Surgeries:</label>
                    <textarea className="form-control" name="surgeries" value={patientData.surgeries} onChange={handleInputChange}></textarea>
                  </div>
                  <div className="form-group">
                    <label>Allergies:</label>
                    <textarea className="form-control" name="allergies" value={patientData.allergies} onChange={handleInputChange}></textarea>
                  </div>
                  <div className="form-group">
                    <label>Current Medications:</label>
                    <textarea className="form-control" name="currentMedications" value={patientData.currentMedications} onChange={handleInputChange}></textarea>
                  </div>
                  <button type="button" className="btnprev btn btn-secondary" onClick={() => goToPreviousSection(2)}>Previous</button>
                  <button type="button" className="btnnext btn btn-primary" onClick={() => goToNextSection(2)}>Next</button>
                </div>
              </Collapse>

              {/* Appointment History Section */}
              <Collapse in={openSections[3]}>
                <div>
                  <div className="form-group">
                    <label>Appointment Date:</label>
                    <input type="date" className="form-control" name="appointmentDate" value={patientData.appointmentDate} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Doctor Name:</label>
                    <input type="text" className="form-control" name="doctorName" value={patientData.doctorName} onChange={handleInputChange} />
                  </div>
                  <button type="button" className="btnprev btn btn-secondary" onClick={() => goToPreviousSection(3)}>Previous</button>
                  <button type="button" className="btnnext btn btn-primary" onClick={() => goToNextSection(3)}>Next</button>
                </div>
              </Collapse>

              {/* Insurance Information Section */}
              <Collapse in={openSections[4]}>
                <div>
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
                    <textarea className="form-control" name="coverageDetails" value={patientData.coverageDetails} onChange={handleInputChange}></textarea>
                  </div>
                  <button type="button" className="btnprev btn btn-secondary" onClick={() => goToPreviousSection(4)}>Previous</button>
                  <button type="button" className="btnnext btn btn-primary" onClick={() => goToNextSection(4)}>Next</button>
                </div>
              </Collapse>

              {/* Notes and Other Sections */}
              <Collapse in={openSections[5]}>
                <div>
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
                  <button type="button" className="btnprev btn btn-secondary" onClick={() => goToPreviousSection(5)}>Previous</button>
                </div>
              </Collapse>
              <button type="submit" className="btn btn-primary">{isEditing ? "Update" : "Submit"}</button>
            </form>
          </div>
        </Collapse>
      </div>

      {/* Patients List */}
      <div className="patient-list">
        <h3>Patient List</h3>
        <div className="sort" >
          <label htmlFor="sortOrder">Sort By:</label>
          <select className="form-control" id="sortOrder" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="caseNumber">Case Number</option>
            <option value="name">Name</option>
          </select>

          <label htmlFor="sortOrderDirection">Sort Order:</label>
          <select className="form-control" id="sortOrderDirection" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
        <ul className="list-group">
          {sortedPatients.map((patient, index) => (
            <li key={index} className="list-group-item">
              <div onClick={() => toggleExpandedPatient(index)}>
                {patient.caseNumber} - {patient.name}
              </div>
              <Collapse in={expandedPatientIndex === index}>
                <div>
                  <div>{`Case Number: ${patient.caseNumber}`}</div>
                  <div>{`Name: ${patient.name}`}</div>
                  <div>{`Age: ${patient.age}`}</div>
                  <div>{`Gender: ${patient.gender}`}</div>
                  <div>{`Date of Birth: ${new Date(patient.dob).toLocaleDateString()}`}</div> {/* Format the date */}
                  <div>{`Address: ${patient.address}`}</div>
                  <div>{`Phone: ${patient.phone}`}</div>
                  <div>{`Email: ${patient.email}`}</div>
                  <div>{`Emergency Contact: ${patient.emergencyContact}`}</div>
                  <div>{`Past Diagnoses: ${patient.pastDiagnoses || 'N/A'}`}</div> {/* Show N/A if empty */}
                  <div>{`Surgeries: ${patient.surgeries || 'N/A'}`}</div>
                  <div>{`Allergies: ${patient.allergies || 'N/A'}`}</div>
                  <div>{`Current Medications: ${patient.currentMedications || 'N/A'}`}</div>
                  <div>{`Appointment Date: ${patient.appointmentDate ? new Date(patient.appointmentDate).toLocaleDateString() : 'N/A'}`}</div>
                  <div>{`Doctor Name: ${patient.doctorName || 'N/A'}`}</div>
                  <div>{`Insurance Provider: ${patient.insuranceProvider || 'N/A'}`}</div>
                  <div>{`Policy Number: ${patient.policyNumber || 'N/A'}`}</div>
                  <div>{`Coverage Details: ${patient.coverageDetails || 'N/A'}`}</div>
                  <div>{`Doctor's Notes: ${patient.doctorsNotes || 'N/A'}`}</div>
                  <div>{`Patient Notes: ${patient.patientNotes || 'N/A'}`}</div>
                  <div>{`Additional Observations: ${patient.additionalObservations || 'N/A'}`}</div>
                  <button type="button" className="btn btn-secondary" onClick={() => handleEditPatient(index)}>Edit</button>
                </div>
              </Collapse>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PatientDetails;
