import axios from 'axios';

const BASE_URL = 'http://192.168.246.190:8004';

const handleError = error => {
  const detail = error.response?.data?.detail;
  const message = typeof detail === 'string' ? detail : error.message;
  throw new Error(message);
};

const extractDoctorsArray = data => {
  if (Array.isArray(data)) return data;
  if (typeof data !== 'object' || data === null) return [];

  const seen = new Set();
  const queue = [data];

  while (queue.length) {
    const node = queue.shift();
    if (seen.has(node)) continue;
    seen.add(node);

    if (Array.isArray(node)) {
      return node;
    }

    if (typeof node === 'object' && node !== null) {
      for (const value of Object.values(node)) {
        if (Array.isArray(value)) return value;
        if (typeof value === 'object' && value !== null) queue.push(value);
      }
    }
  }

  return [];
};

// Home Screen
export const getDoctorsByPatient = async mpi => {
  try {
    const response = await axios.get(
      `${BASE_URL}/doctor-encountered-by-patient/${mpi}`,
    );
    console.log('Doctor API response:', response.data);
    return extractDoctorsArray(response.data);
  } catch (error) {
    handleError(error);
  }
};

// View Doctor Screen
export const getDoctorById = async doctor_id => {
  try {
    const response = await axios.get(`${BASE_URL}/single-doctor/${doctor_id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getDoctorVisitNotes = async (mpi, doctor_id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/doctor-visit-notes/${mpi}/${doctor_id}`,
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// View Notes Screen
export const getVisitNoteDetails = async note_id => {
  try {
    const response = await axios.get(
      `${BASE_URL}/visit-note-details/${note_id}`,
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getLabReportsBase = async note_id => {
  try {
    const response = await axios.get(`${BASE_URL}/lab-reports-base/${note_id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// CBC Report Screen
export const getLabResults = async report_id => {
  try {
    const response = await axios.get(`${BASE_URL}/lab-results/${report_id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Profile Screen
export const getPatientProfile = async mpi => {
  try {
    const response = await axios.get(`${BASE_URL}/patients/${mpi}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const signupAPI = async ({ nic, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, { nic, password });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const loginAPI = async ({ nic, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { nic, password });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
