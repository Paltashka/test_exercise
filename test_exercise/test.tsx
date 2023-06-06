import StudentsPicker from "../components/StudentsPicker";
import StudentsTable from "../components/StudentsTable";
import {
  fetchStudentData,
  fetchSchoolData,
  fetchLegalguardianData,
} from "../utils";
import { useState } from "react";
import { useEffect } from "react";

const result: any[] = [];

const studentsDataComponent = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [schoolsData, setSchoolsData] = useState([]);
  const [legalguardiansData, setLegalguardiansData] = useState([]);

  const onStudentsPick = async (studentIds) => {
    const fetchStudentData = [];
    const fetchSchoolData = [];
    const fetchLegalguardianData = [];

    for (const studentId of studentIds) {
      const studentData = await fetchStudentData[studentId];
      fetchStudentData.push(studentData);

      const { schoolId, legalguardianId } = studentData;
      const schoolData = await fetchSchoolData[schoolId];
      fetchSchoolData.push(schoolData);

      const legalguardianData = await fetchLegalguardianData[legalguardianId];
      fetchLegalguardianData.push(legalguardianData);
    }

    setStudentsData([...studentsData, ...fetchStudentData]);
    setSchoolsData([...schoolsData, ...fetchSchoolData]);
    setLegalguardiansData([...legalguardiansData, ...fetchLegalguardianData]);
  };

  // to perform necessary actions when all the required data is loaded
  useEffect(() => {
    if (
      studentsData.length > 0 &&
      schoolsData.length > 0 &&
      legalguardiansData.length > 0
    ) {
    }
  }, [studentsData, schoolsData, legalguardiansData]);

  return (
    <>
      <StudentsPicker onPickHandler={onStudentsPick} />
      <StudentsTable
        studentsData={studentsData}
        schoolsData={schoolsData}
        LegalguardiansData={legalguardiansData}
      />
    </>
  );
};

export default studentsDataComponent;
