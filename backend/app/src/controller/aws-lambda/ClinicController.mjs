import ClinicService from '../../service/ClinicService.mjs';

const headers = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
};

export const listClinics = async (event) => {
  try {
    const result = await ClinicService.listClinics();
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