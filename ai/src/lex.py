import json
import urllib.request
import urllib.parse
from datetime import datetime

BASE_URL = "https://api.gpbooking.icu"

# Helper function to list clinic names for web chat display
def list_clinics():
    url = f"{BASE_URL}/public/clinics"
    headers = {'Content-Type': 'application/json'}
    
    req = urllib.request.Request(url, headers=headers, method='GET')
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        
        # Format each clinic with a numbered list
        formatted_clinics = []
        for i, clinic in enumerate(data, 1):
            formatted_clinics.append(f"{i}. {clinic['workplace']}")
        
        # Join all formatted clinics into a single string with new lines
        clinics_str = "\n".join(formatted_clinics)
        
        return f"Here are the available clinics:\n{clinics_str}"

# Helper function to list doctors for web chat display
def list_doctors():
    url = f"{BASE_URL}/public/doctors"
    headers = {'Content-Type': 'application/json'}
    
    req = urllib.request.Request(url, headers=headers, method='GET')
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        
        # Format each doctor with a numbered list
        formatted_doctors = []
        for i, doctor in enumerate(data, 1):
            formatted_doctors.append(f"{i}. Dr. {doctor['FirstName']} {doctor['LastName']}")
        
        # Join all formatted doctors into a single string with new lines
        doctors_str = "\n".join(formatted_doctors)
        
        return f"Here are the available doctors:\n{doctors_str}"

# Helper function to list doctors in a specific clinic for web chat display
def list_doctors_by_clinic(clinic_name):
    url = f"{BASE_URL}/public/doctors?workplace={urllib.parse.quote(clinic_name)}"
    headers = {'Content-Type': 'application/json'}
    
    req = urllib.request.Request(url, headers=headers, method='GET')
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        
        if not data:
            return f"No doctors found in {clinic_name}."
        
        # Format each doctor with a numbered list
        formatted_doctors = []
        for i, doctor in enumerate(data, 1):
            formatted_doctors.append(f"{i}. Dr. {doctor['FirstName']} {doctor['LastName']}")
        
        # Join all formatted doctors into a single string with new lines
        doctors_str = "\n".join(formatted_doctors)
        
        return f"Here are the available doctors in {clinic_name}:\n{doctors_str}"

# Helper function to fetch DoctorId by first name and last name
def get_doctor_id(doctor_name):
    # Strip "Dr." prefix if present
    if doctor_name.startswith("Dr. "):
        doctor_name = doctor_name[4:]  # Remove the "Dr. " prefix

    # Split the doctor's name into first name and last name
    name_parts = doctor_name.split()
    
    if len(name_parts) == 2:
        first_name, last_name = name_parts
    elif len(name_parts) > 2:  # Handle cases with middle names
        first_name = name_parts[0]
        last_name = " ".join(name_parts[1:])
    else:
        return None  # Return None if name is invalid

    # Construct the API endpoint with query parameters for first name and last name
    query_params = urllib.parse.urlencode({
        'firstname': first_name,
        'lastname': last_name
    })
    url = f"{BASE_URL}/public/doctors?{query_params}"
    headers = {'Content-Type': 'application/json'}
    
    req = urllib.request.Request(url, headers=headers, method='GET')
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        
        # Check if the response contains any doctor records
        if not data or len(data) == 0:
            return None
        
        # Return the DoctorId of the first matching doctor
        return data[0]['Id']

# Helper function to fetch available timeslots for a doctor on a specific date
def get_available_timeslots(doctor_id, date):
    url = f"{BASE_URL}/public/schedules/available-timeslots?doctorId={doctor_id}&date={date}"
    headers = {'Content-Type': 'application/json'}
    
    req = urllib.request.Request(url, headers=headers, method='GET')
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        
        # Check if there are any available timeslots
        if not data:
            return "No available timeslots found."

        # Format the available times into a list of StartTime-EndTime ranges
        formatted_times = []
        for timeslot in data:
            start_time = timeslot['StartTime']
            end_time = timeslot['EndTime']
            formatted_times.append(f"{start_time} - {end_time}")
        
        # Join all formatted timeslots into a single string with new lines
        available_times_str = "\n".join(formatted_times)
        
        return available_times_str
        
# Helper function to cancel an appointment
def cancel_appointment(booking_reference, lastname, dob):
    url = f"{BASE_URL}/public/appointments/cancel"
    headers = {'Content-Type': 'application/json'}
    body = json.dumps({
        "BookingReference": booking_reference,
        "LastName": lastname,
        "DateOfBirth": dob
    }).encode('utf-8')
    
    req = urllib.request.Request(url, headers=headers, data=body, method='POST')
    with urllib.request.urlopen(req) as response:
        return response.getcode() == 200

# Helper function to modify an appointment
def modify_appointment(booking_reference, lastname, dob, new_schedule_id):
    url = f"{BASE_URL}/public/appointments/reschedule"
    headers = {'Content-Type': 'application/json'}
    body = json.dumps({
        "BookingReference": booking_reference,
        "LastName": lastname,
        "DateOfBirth": dob,
        "ScheduleId": new_schedule_id
    }).encode('utf-8')
    
    req = urllib.request.Request(url, headers=headers, data=body, method='POST')
    with urllib.request.urlopen(req) as response:
        return response.getcode() == 200

# Helper function to check appointment status
def check_appointment_status(reference_number):
    url = f"{BASE_URL}/public/appointments?reference={reference_number}"
    headers = {'Content-Type': 'application/json'}
    
    req = urllib.request.Request(url, headers=headers, method='GET')
    
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            if data:
                # Assuming the first result is the relevant appointment
                appointment_status = data[0]['Status']
                return f"Your appointment status is: {appointment_status}."
            else:
                return "No appointment found with that reference number."
    except urllib.error.HTTPError as e:
        print(f"HTTPError: {e.code} - {e.reason}")
        return "There was an issue retrieving your appointment status. Please try again later."

# Helper function to book an appointment and return the booking reference
def book_appointment(schedule_id, firstname, lastname, dob, email):
    url = f"{BASE_URL}/public/appointments"
    headers = {'Content-Type': 'application/json'}
    
    # Construct the payload dynamically by excluding empty values (both None and empty strings)
    body = {
        "ScheduleId": schedule_id,
        "FirstName": firstname,
        "LastName": lastname,
        "DateOfBirth": dob,
        "Email": email
    }
    
    # Remove any empty or placeholder fields
    body = {k: v for k, v in body.items() if v and v != "string"}
    
    print("Booking request body:", json.dumps(body, indent=4))
    print("Request URL:", url)
    
    # Convert the body to JSON and send the request
    body_json = json.dumps(body).encode('utf-8')
    
    try:
        req = urllib.request.Request(url, headers=headers, data=body_json, method='POST')
        with urllib.request.urlopen(req) as response:
            if response.getcode() == 201:
                data = json.loads(response.read().decode())
                return f"Your appointment is successfully booked. Your reference number is {data['BookingReference']}."
            else:
                return "Failed to book the appointment."
    
    except urllib.error.HTTPError as e:
        error_message = e.read().decode()
        print(f"HTTPError: {e.code} - {error_message}")
        return f"Failed to book the appointment. Server responded with: {error_message}"
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return f"An unexpected error occurred: {str(e)}"

def get_slot_value(slots, slot_name):
    if slot_name in slots and slots[slot_name] and 'value' in slots[slot_name]:
        return slots[slot_name]['value'].get('interpretedValue', None)
    return None

def get_available_timeslots_1(doctor_id, appointment_date, target_time=None):
    # Ensure doctor_id and appointment_date are valid
    if not doctor_id:
        raise ValueError("Doctor ID is missing")
    if not appointment_date:
        raise ValueError("Appointment Date is missing")

    # Construct the URL for fetching available timeslots
    url = f"{BASE_URL}/public/schedules/available-timeslots?doctorId={urllib.parse.quote(doctor_id)}&date={urllib.parse.quote(appointment_date)}"
    headers = {'Content-Type': 'application/json'}

    # Send the GET request to fetch available timeslots
    req = urllib.request.Request(url, headers=headers, method='GET')

    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())

            # Debugging print statements
            print(f"Available timeslot response: {data}")

            # Normalize the target_time format to match StartTime format
            if target_time:
                target_time = target_time.strip()  # remove any leading/trailing spaces

                # Convert target_time to HH:MM format (remove seconds)
                target_time = datetime.strptime(target_time, "%H:%M").strftime("%H:%M")

            # Traverse the available time slots
            for timeslot in data:
                # Normalize the StartTime format (extract HH:MM)
                start_time = timeslot['StartTime'][:5]  # Take only the first 5 characters (HH:MM)

                # Check if the timeslot is available
                if timeslot['Status'] == "available":
                    # If target_time is provided, match it with StartTime
                    if target_time and start_time == target_time:
                        print(f"Available timeslot found at {target_time}: {timeslot}")
                        return timeslot['Id']
                    elif not target_time:
                        # Return the first available timeslot if no specific time is provided
                        print(f"First available timeslot: {timeslot}")
                        return timeslot['Id']

            # If no matching or available timeslot was found
            print(f"No available timeslot found for Doctor ID: {doctor_id} on {appointment_date} matching {target_time}")
            return None

    except urllib.error.HTTPError as e:
        print(f"HTTPError: {e.code} - {e.reason} while fetching timeslots for Doctor ID: {doctor_id} on {appointment_date}")
        return None

    except Exception as e:
        print(f"Error: {str(e)} while fetching timeslots for Doctor ID: {doctor_id} on {appointment_date}")
        return None

# Helper function to handle the time slot format
def format_time(time_str):
    from datetime import datetime
    try:
        # Convert '08:00AM' to '08:00' (24-hour format)
        formatted_time = datetime.strptime(time_str, '%I:%M%p').strftime('%H:%M')
        return formatted_time
    except ValueError:
        # If time_str doesn't match, return it unchanged
        return time_str


# Helper function to get slot values
def get_slot_value(slots, slot_name):
    if slot_name in slots and slots[slot_name] and 'value' in slots[slot_name]:
        return slots[slot_name]['value'].get('interpretedValue', None)
    return None

# Helper function to elicit missing slot from the user
def elicit_slot(slots, slot_to_elicit, message):
    return {
        "sessionState": {
            "dialogAction": {
                "type": "ElicitSlot",
                "slotToElicit": slot_to_elicit
            },
            "intent": {
                "name": "BookAppointmentIntent",
                "state": "InProgress",
                "slots": slots
            }
        },
        "messages": [
            {
                "contentType": "PlainText",
                "content": message
            }
        ]
    }

# Helper function to return a failed intent response
def failed_intent_response(intent_name, message):
    return {
        "sessionState": {
            "dialogAction": {
                "type": "Close"
            },
            "intent": {
                "name": intent_name,
                "state": "Failed"
            }
        },
        "messages": [
            {
                "contentType": "PlainText",
                "content": message
            }
        ]
    }

# Helper function to return a fulfilled intent response
def fulfilled_intent_response(intent_name, message):
    return {
        "sessionState": {
            "dialogAction": {
                "type": "Close"
            },
            "intent": {
                "name": intent_name,
                "state": "Fulfilled"
            }
        },
        "messages": [
            {
                "contentType": "PlainText",
                "content": message
            }
        ]
    }


# Main Lambda handler for booking appointments
def handle_book_appointment_intent(slots):
    # Extract slot values using a helper function
    doctor_name = get_slot_value(slots, 'DoctorName')
    appointment_date = get_slot_value(slots, 'AppointmentDate')
    appointment_time = get_slot_value(slots, 'AppointmentTime')
    firstname = get_slot_value(slots, 'FirstName')
    lastname = get_slot_value(slots, 'LastName')
    dob = get_slot_value(slots, 'DateOfBirth')
    email = get_slot_value(slots, 'Email')

    # Ensure we have all necessary slots
    if not doctor_name:
        return elicit_slot(slots, "DoctorName", "Which doctor would you like to see?")
    if not appointment_date:
        return elicit_slot(slots, "AppointmentDate", "What date would you like to schedule your appointment?")
    if not appointment_time:
        return elicit_slot(slots, "AppointmentTime", "At what time would you like to schedule your appointment?")
    if not lastname:
        return elicit_slot(slots, "LastName", "What is your last name?")
    if not firstname:
        return elicit_slot(slots, "FirstName", "What is your first name?")
    if not dob:
        return elicit_slot(slots, "DateOfBirth", "What is your date of birth?")
    if not email:
        return elicit_slot(slots, "Email", "What is your email address?")

    # Get the doctor ID based on the provided name
    doctor_id = get_doctor_id(doctor_name)
    
    # Log doctor ID
    print(f"Doctor ID for {doctor_name}: {doctor_id}")
    
    if not doctor_id:
        return failed_intent_response("BookAppointmentIntent", f"Sorry, I couldn't find Dr. {doctor_name} in our system.")
    
    # Get the available timeslot (ScheduleId) using the doctor_id and appointment_date
    schedule_id = get_available_timeslots_1(doctor_id, appointment_date, appointment_time)

    # Log schedule ID
    print(f"Schedule ID for {doctor_name} on {appointment_date} at {appointment_time}: {schedule_id}")

    if not schedule_id:
        return failed_intent_response("BookAppointmentIntent", f"Sorry, no available timeslot for Dr. {doctor_name} on {appointment_date}.")

    # Book the appointment
    booking_message = book_appointment(
        schedule_id=schedule_id,
        firstname=firstname,
        lastname=lastname,
        dob=dob,
        email=email,
    )
    
    # Log booking message
    print(f"Booking Message: {booking_message}")
    
    # Return the booking confirmation
    return fulfilled_intent_response("BookAppointmentIntent", booking_message)


# Main Lambda handler
def lambda_handler(event, context):
    intent_name = event['sessionState']['intent']['name']
    slots = event['sessionState']['intent']['slots']
    
     # Route to the correct function based on the intent
    if intent_name == "ListDoctorsIntent":
        if 'ClinicName' in slots and slots['ClinicName'] and slots['ClinicName']['value']:
            clinic_name = slots['ClinicName']['value']['interpretedValue']
            message = list_doctors_by_clinic(clinic_name)
        else:
            message = list_doctors()

    elif intent_name == "ListClinicsIntent":
        message = list_clinics()
   
    elif intent_name == "CancelAppointmentIntent":
        success = cancel_appointment(slots['BookingReference']['value'], slots['LastName']['value'], slots['DateOfBirth']['value'])
        message = "Your appointment has been successfully cancelled." if success else "Failed to cancel the appointment."
        
    elif intent_name == "ModifyAppointmentIntent":
        success = modify_appointment(slots['BookingReference']['value'], slots['LastName']['value'], slots['DateOfBirth']['value'], slots['NewScheduleId']['value'])
        message = "Your appointment has been successfully rescheduled." if success else "Failed to reschedule the appointment."
        
    elif intent_name == "CheckAppointmentStatusIntent":
        # Get the ReferenceNumber slot value
        reference_number = slots['ReferenceNumber']['value']['interpretedValue']
        
        # Check the appointment status using the provided reference number
        appointment_status_message = check_appointment_status(reference_number)
    
    elif intent_name == "ListAvailableTimeslotsIntent":
        # Check if DoctorName slot exists
        if 'DoctorName' in slots and slots['DoctorName'] and 'value' in slots['DoctorName']:
            doctor_name = slots['DoctorName']['value']['interpretedValue']
            
            # Split the doctor's name into first and last name (assuming space-separated)
            name_parts = doctor_name.split(' ', 1)
            first_name = name_parts[0]
            last_name = name_parts[0]
            
            # Fetch DoctorId using the first and last name
            doctor_id = get_doctor_id(doctor_name)
            
            if not doctor_id:
                return {
                    "sessionState": {
                        "dialogAction": {
                            "type": "Close"
                        },
                        "intent": {
                            "name": intent_name,
                            "state": "Failed"
                        }
                    },
                    "messages": [
                        {
                            "contentType": "PlainText",
                            "content": f"Sorry, I couldn't find Dr. {doctor_name} in our system."
                        }
                    ]
                }
        
        # Get the AppointmentDate slot value
        if 'AppointmentDate' in slots and slots['AppointmentDate'] and 'value' in slots['AppointmentDate']:
            appointment_date = slots['AppointmentDate']['value']['interpretedValue']
        else:
            return {
                "sessionState": {
                    "dialogAction": {
                        "type": "ElicitSlot",
                        "slotToElicit": "AppointmentDate"
                    },
                    "intent": {
                        "name": intent_name,
                        "slots": slots,
                        "state": "InProgress"
                    }
                },
                "messages": [
                    {
                        "contentType": "PlainText",
                        "content": "Please provide the date you'd like to check for available times."
                    }
                ]
            }
        
        # Fetch the available timeslots for the doctor on the specified date
        available_times = get_available_timeslots(doctor_id, appointment_date)
        
        # Construct the response message
        message = f"Here are the available timeslots for Dr. {doctor_name} on {appointment_date}:\n{available_times}"
        
    elif intent_name == "BookAppointmentIntent":
      return handle_book_appointment_intent(slots)

    else:
        message = "Sorry, I don't understand that request."

    # Construct and return the response
    return {
        "sessionState": {
            "dialogAction": {
                "type": "Close"
            },
            "intent": {
                "name": intent_name,
                "state": "Fulfilled"
            }
        },
        "messages": [
            {
                "contentType": "PlainText",
                "content": message
            }
        ]
    }
