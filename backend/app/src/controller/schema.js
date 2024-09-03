/**
 * @openapi
 * components:
 *   schemas:
 *     CreateDoctorDTO:
 *       type: object
 *       properties:
 *         FirstName:
 *           type: string
 *           description: The first name of the doctor
 *         LastName:
 *           type: string
 *           description: The last name of the doctor
 *         Workplace:
 *           type: string
 *           description: The workplace of the doctor
 *         Specialty:
 *           type: string
 *           description: The specialty of the doctor
 *         Phone:
 *           type: string
 *           description: The phone number of the doctor
 *         Email:
 *           type: string
 *           description: The email of the doctor
 *         Address:
 *           type: string
 *           description: The address where the doctor works
 *     DoctorProperties:
 *       allOf:
 *         - $ref: '#/components/schemas/CreateDoctorDTO'
 *     UpdateDoctorDTO:
 *       allOf:
 *         - $ref: '#/components/schemas/DoctorProperties'
 *         - type: object
 *           properties:
 *             Version:
 *               type: integer
 *               description: The version of the record
 *     DoctorDTO:
 *       allOf:
 *         - $ref: '#/components/schemas/DoctorProperties'
 *         - type: object
 *           properties:
 *             Id:
 *               type: string
 *               description: The ID of the doctor
 *             Version:
 *               type: integer
 *               description: The version of the record
 *     
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateScheduleDTO:
 *       type: object
 *       properties:
 *         DoctorId:
 *           type: string
 *           description: The ID of the doctor
 *         DoctorName:
 *           type: string
 *           description: The name of the doctor
 *         Date:
 *           type: string
 *           format: date
 *           description: The date of the schedule
 *         StartTime:
 *           type: string
 *           format: time
 *           description: The start time of the schedule
 *         EndTime:
 *           type: string
 *           format: time
 *           description: The end time of the schedule
 *     ScheduleProperties:
 *       allOf:
 *         - $ref: '#/components/schemas/CreateScheduleDTO'
 *         - type: object
 *           properties:
 *             Status:
 *               type: string
 *               description: The status of the schedule
 *               enum:
 *                 - available
 *                 - occupied
 *     UpdateScheduleDTO:
 *       allOf:
 *         - $ref: '#/components/schemas/ScheduleProperties'
 *         - type: object
 *           properties:
 *             Version:
 *               type: integer
 *               description: The version of the record
 *     ScheduleDTO:
 *       allOf:
 *         - $ref: '#/components/schemas/ScheduleProperties'
 *         - type: object
 *           properties:
 *             Id:
 *               type: string
 *               description: The ID of the schedule
 *             Version:
 *               type: integer
 *               description: The version of the record
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     CreatePatientDTO:
 *       type: object
 *       properties:
 *         Name:
 *           type: string
 *           description: Name of the patient
 *         Gender:
 *           type: string
 *           description: Gender of the patient
 *         Age:
 *           type: integer
 *           description: Age of the patient
 *         Phone:
 *           type: string
 *           description: Contact phone number of the patient
 *         Email:
 *           type: string
 *           description: Email address of the patient
 *         Address:
 *           type: string
 *           description: Address of the patient
 *     PatientProperties:
 *       allOf:
 *         - $ref: '#/components/schemas/CreatePatientDTO'
 *         - type: object
 *           properties:
 *             UserId:
 *               type: string
 *               description: The ID of the user
 *     UpdatePatientDTO:
 *       allOf:
 *         - $ref: '#/components/schemas/PatientProperties'
 *         - type: object
 *           properties:
 *             Version:
 *               type: integer
 *               description: The version of the record
 *     PatientDTO:
 *       allOf:
 *         - $ref: '#/components/schemas/PatientProperties'
 *         - type: object
 *           properties:
 *             Id:
 *               type: string
 *               description: The ID of the patient
 *             Version:
 *               type: integer
 *               description: The version of the record
 */


/** 
 * @openapi
 * components:
 *   schemas:
 *     CreateAppointmentDTO:
 *       type: object
 *       properties:
 *         ScheduleId:
 *           type: string
 *           description: The ID of the schedule
 *         FirstName:
 *           type: string
 *           description: The first name of the patient
 *         LastName:
 *           type: string
 *           description: The last name of the patient
 *         DateOfBirth:
 *           type: string
 *           format: date
 *           description: The date of birth of the patient
 *         Phone:
 *           type: string
 *           description: The phone number of the patient
 *         Email:
 *           type: string
 *           description: The email of the patient
 *         Address:
 *           type: string
 *           description: The address of the patient
 *     AppointmentProperties:
 *       allOf:
 *         - $ref: '#/components/schemas/CreateAppointmentDTO'
 *         - $ref: '#/components/schemas/CreateScheduleDTO'
 *         - type: object
 *           properties:
 *             BookingReference:
 *               type: string
 *               description: The booking reference of the appointment
 *             Status:
 *               type: string
 *               description: The status of the appointment
 *               enum:
 *                 - active
 *                 - cancelled
 *                 - completed
 *     AppointmentDTO:
 *       allOf:
 *         - $ref: '#/components/schemas/AppointmentProperties'
 *         - type: object
 *           properties:
 *             Id:
 *               type: string
 *               description: The ID of the appointment
 *             Version:
 *               type: integer
 *               description: The version of the record
 */