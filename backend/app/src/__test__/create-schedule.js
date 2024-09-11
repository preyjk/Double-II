import https from 'https';

const getToken = () => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      email: 'admin',
      password: 'admin'
    });

    const options = {
      hostname: 'api.gpbooking.icu', // Replace with actual API URL
      port: 443,
      path: '/public/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          const responseJson = JSON.parse(responseData);
          resolve(responseJson.token);
        } else {
          reject(new Error('Failed to get token'));
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(data);
    req.end();
  });
};

// Function to create schedules
const createSchedules = async (doctorId, date, token) => {
  const baseUrl = 'https://api.gpbooking.icu/admin/schedules'; // Replace with actual API URL

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  const createSchedule = async (startTime, endTime) => {
    const schedule = {
      DoctorId: doctorId,
      Date: date,
      StartTime: startTime,
      EndTime: endTime
    };

    const options = {
      method: 'POST',
      headers: headers
    };

    const postData = JSON.stringify(schedule);

    return new Promise((resolve, reject) => {
      const req = https.request(baseUrl, options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log(`Schedule created: ${data}`);
            resolve(data);
          } else {
            reject(new Error(`HTTP error! status: ${res.statusCode}`));
          }
        });
      });

      req.on('error', (e) => {
        reject(new Error(`Problem with request: ${e.message}`));
      });

      req.write(postData);
      req.end();
    });
  };

  const generateTimeSlots = (startHour, endHour) => {
    const slots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const startTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        const endTime = `${String(hour).padStart(2, '0')}:${String(minute + 15).padStart(2, '0')}`;
        slots.push({ startTime, endTime });
      }
    }
    return slots;
  };

  const morningSlots = generateTimeSlots(9, 12);
  const afternoonSlots = generateTimeSlots(14, 17);

  for (const slot of [...morningSlots, ...afternoonSlots]) {
    await createSchedule(slot.startTime, slot.endTime);
  }
};

// Get command-line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node create-schedule.js <doctorId> <date>');
  process.exit(1);
}

const [doctorId, date] = args;

getToken()
  .then(token => {
    createSchedules(doctorId, date, token);
  })
  .catch(error => {
    console.error('Error:', error);
  });