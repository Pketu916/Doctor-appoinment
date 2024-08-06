import React, { useState } from "react";

const PatientDetails = () => {
  const [caseCounter, setCaseCounter] = useState(1); // Counter for generating case numbers
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");
  const [patients, setPatients] = useState([]);
  const [sortBy, setSortBy] = useState("caseNumber"); // State for sorting criteria

  const handleSubmit = (e) => {
    e.preventDefault();
    const caseNumber = `CN${caseCounter.toString().padStart(4, "0")}`; // Generate case number
    const newPatient = { caseNumber, patientName, age, gender, contact, note };
    setPatients([...patients, newPatient]);
    setCaseCounter(caseCounter + 1); // Increment counter for next case number
    setPatientName("");
    setAge("");
    setGender("");
    setContact("");
    setNote("");
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortedPatients = [...patients].sort((a, b) => {
    if (sortBy === "caseNumber") {
      return a.caseNumber.localeCompare(b.caseNumber);
    }
    return a.patientName.localeCompare(b.patientName);
  });

  return (
    <div>
      <div
        id="patientDetails"
        className="new d-flex align-items-center justify-content-center"
      >
        <div className="login-form p-4">
          <h2> Add Patient Details </h2>{" "}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label> Case Number: </label>{" "}
              <input
                type="text"
                className="form-control"
                value={`CN${caseCounter.toString().padStart(4, "0")}`}
                disabled
              />
            </div>{" "}
            <div className="form-group">
              <label> Patient Name: </label>{" "}
              <input
                type="text"
                className="form-control"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </div>{" "}
            <div className="form-group">
              <label> Age: </label>{" "}
              <input
                type="number"
                className="form-control"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>{" "}
            <div className="form-group">
              <label> Gender: </label>{" "}
              <select
                className="form-control"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value=""> Select </option>{" "}
                <option value="Male"> Male </option>{" "}
                <option value="Female"> Female </option>{" "}
                <option value="Other"> Other </option>{" "}
              </select>{" "}
            </div>{" "}
            <div className="form-group">
              <label> Contact: </label>{" "}
              <input
                type="text"
                className="form-control"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>{" "}
            <div className="form-group">
              <label> Note(optional): </label>{" "}
              <textarea
                className="form-control"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              >
                {" "}
              </textarea>{" "}
            </div>{" "}
            <button type="submit" className="btn btn-primary">
              {" "}
              Add Patient Details{" "}
            </button>{" "}
          </form>{" "}
        </div>{" "}
      </div>{" "}
      <div className="mt-4">
        <h3> Patients List </h3>{" "}
        <div className="form-group">
          <label> Sort by: </label>{" "}
          <select
            className="form-control"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="caseNumber"> Case Number </option>{" "}
            <option value="patientName"> Patient Name </option>{" "}
          </select>{" "}
        </div>{" "}
        <ul className="list-group">
          {" "}
          {sortedPatients.map((patient, index) => (
            <li key={index} className="list-group-item">
              <div className="patient-detail">
                {" "}
                <strong> Case Number: </strong> {patient.caseNumber}{" "}
              </div>{" "}
              <div className="patient-detail">
                {" "}
                <strong> Name: </strong> {patient.patientName}{" "}
              </div>{" "}
              <div className="patient-detail">
                {" "}
                <strong> Age: </strong> {patient.age} years old{" "}
              </div>{" "}
              <div className="patient-detail">
                {" "}
                <strong> Gender: </strong> {patient.gender}{" "}
              </div>{" "}
              <div className="patient-detail">
                {" "}
                <strong> Contact: </strong> {patient.contact}{" "}
              </div>{" "}
              {patient.note && (
                <div className="patient-detail">
                  {" "}
                  <strong> Note: </strong> {patient.note}{" "}
                </div>
              )}{" "}
            </li>
          ))}{" "}
        </ul>{" "}
      </div>{" "}
    </div>
  );
};

export default PatientDetails;
