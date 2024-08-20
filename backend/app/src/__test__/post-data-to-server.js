import https from 'https';
import { doctors } from "./data/doctor.js";

// Function to introduce a delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const postDoctorData = (hostname, doctor) => {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(doctor);

        const options = {
            hostname: hostname,
            port: 443,
            path: '/doctors',
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
                console.log(`Posted ${doctor.FirstName} ${doctor.LastName}:`, res.statusCode);
                if (res.statusCode !== 200) {
                    console.error('Response:', responseData);
                }
                resolve();
            });
        });

        req.on('error', (error) => {
            console.error(`Error posting ${doctor.FirstName} ${doctor.LastName}:`, error.message);
            reject(error);
        });

        req.write(data);
        req.end();
    });
};

const postAllDoctors = async (hostname) => {
    for (const doctor of doctors) {
        await postDoctorData(hostname, doctor);
        await delay(1000); // Delay of 1 second between each request
    }
};

// Get the hostname from the command-line arguments
const hostname = process.argv[2];

if (!hostname) {
    console.error('Please provide the hostname as a command-line argument.');
    process.exit(1);
}

postAllDoctors(hostname);