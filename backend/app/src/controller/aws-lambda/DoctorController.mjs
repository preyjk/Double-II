import DoctorService from '../../service/DoctorService.mjs';

const headers = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
};

export const listDoctors = async (event) => {
  try {
    const { workplace } = event.queryStringParameters || {};
    let result;

    if (workplace) {
      result = await DoctorService.listDoctorsByWorkplace(workplace);
    } else {
      result = await DoctorService.listDoctors();
    }

    return {
      statusCode: result.success ? 200 : 500,
      headers,
      body: JSON.stringify(result.success ? result.data : result.message)
    }; 
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify('Internal server error')
    };
  }
};

export const createDoctor = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const result = await DoctorService.createDoctor(body);
    return {
      statusCode: result.success ? 201 : 500,
      headers,
      body: JSON.stringify(result.success ? result.data : result.message)
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify('Internal server error')
    };
  }
};

export const getDoctorById = async (event) => {
  try {
    const doctorId = event.pathParameters.doctorId;
    const result = await DoctorService.getDoctorById(doctorId);
    return {
      statusCode: result.success ? 200 : 404,
      headers,
      body: JSON.stringify(result.success ? result.data : result.message)
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify('Internal server error')
    };
  }
};

export const updateDoctor = async (event) => {
  try {
    const doctorId = event.pathParameters.doctorId;
    const body = JSON.parse(event.body);
    const result = await DoctorService.updateDoctor({id: doctorId, ...body});
    return {
      statusCode: result.success ? 200 : 500,
      headers,
      body: JSON.stringify(result.success ? result.data : result.message)
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify('Internal server error')
    };
  }
};

export const deleteDoctor = async (event) => {
  try {
    const doctorId = event.pathParameters.doctorId;
    const result = await DoctorService.deleteDoctor(doctorId);
    return {
      statusCode: result.success ? 204 : 500,
      headers,
      body: JSON.stringify(result.success ? result.message : 'Internal server error')
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify('Internal server error')
    };
  }
};
