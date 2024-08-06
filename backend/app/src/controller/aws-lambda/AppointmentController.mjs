import AppointmentService from '../../service/AppointmentService.mjs';

const headers = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
};

export const listAppointments = async (event) => {
  try {
    const result = await AppointmentService.listAppointments();
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

export const createAppointment = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const result = await AppointmentService.createAppointment(body);
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

export const getAppointmentById = async (event) => {
  try {
    const appointmentId = event.pathParameters.appointmentId;
    const result = await AppointmentService.getAppointmentById(appointmentId);
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

export const updateAppointment = async (event) => {
  try {
    const appointmentId = event.pathParameters.appointmentId;
    const body = JSON.parse(event.body);
    const result = await AppointmentService.updateAppointment({id: appointmentId, ...body});
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

export const deleteAppointment = async (event) => {
  try {
    const appointmentId = event.pathParameters.appointmentId;
    const result = await AppointmentService.deleteAppointment(appointmentId);
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
