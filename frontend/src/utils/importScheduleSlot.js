import axios from "axios";

const doctors = [
  {
      "Speciality": "Doctor, hospital",
      "Email": "katherine02@cook-schneider.info",
      "Address": "68 Beach Road Auckland Central Auckland 1010",
      "Version": 1,
      "FirstName": "Rachel",
      "Phone": "+64 99192555",
      "CreatedAt": "2024-09-09T00:34:25.799Z",
      "Id": "911d6c93-f497-484c-8b4d-5ed1cd53ef5a",
      "LastName": "Daniels",
      "Workplace": "FRW Quaymed Britomart"
  },
  {
      "Speciality": "Cardiologist",
      "Email": "michael.reynolds@example.com",
      "Address": "68 Beach Road Auckland Central Auckland 1010",
      "Version": 1,
      "FirstName": "Michael",
      "Phone": "+64 99192555",
      "CreatedAt": "2024-09-09T00:34:25.799Z",
      "Id": "120cf6de-e63e-4392-9dfb-2485a01680d2",
      "LastName": "Reynolds",
      "Workplace": "FRW Quaymed Britomart"
  },
  {
      "Speciality": "Ophthalmologist",
      "Email": "jack.martin@example.com",
      "Address": "464 Richardson Road Mt Roskill Auckland 1041",
      "Version": 1,
      "FirstName": "Jack",
      "Phone": "+64 96267750",
      "CreatedAt": "2024-09-09T00:34:25.800Z",
      "Id": "8a86653d-13bf-43a0-be4a-f525d02867a7",
      "LastName": "Martin",
      "Workplace": "FRW Mt Roskill"
  },
  {
      "Speciality": "Cardiothoracic Surgeon",
      "Email": "olivia.jones@example.com",
      "Address": "29 Anne Street Devonport Auckland 0624",
      "Version": 1,
      "FirstName": "Olivia",
      "Phone": "+64 94892011",
      "CreatedAt": "2024-09-09T00:34:25.801Z",
      "Id": "7316dc77-366a-4826-b7c6-b06e6c934b66",
      "LastName": "Jones",
      "Workplace": "FRW Medplus Devonport"
  },
  {
      "Speciality": "Orthopedic Surgeon",
      "Email": "elijah.wilson@example.com",
      "Address": "327 Lake Road Takapuna Auckland 0622",
      "Version": 1,
      "FirstName": "Elijah",
      "Phone": "+64 94892012",
      "CreatedAt": "2024-09-09T00:34:25.801Z",
      "Id": "b151ea5a-c6cc-496c-b074-95859f53e465",
      "LastName": "Wilson",
      "Workplace": "FRW Medplus Takapuna"
  },
  {
      "Speciality": "Lecturer, higher education",
      "Email": "carlos80@parker.com",
      "Address": "58 Gaunt Street Auckland Central Auckland 1010",
      "Version": 1,
      "FirstName": "Derek",
      "Phone": "+64 980 123 4568",
      "CreatedAt": "2024-09-09T00:34:25.799Z",
      "Id": "d154f615-ebfa-4936-bf0e-951452ca3c37",
      "LastName": "Martin",
      "Workplace": "FRW Quaymed Wynyard"
  },
  {
      "Speciality": "Neurologist",
      "Email": "zoey.clark@example.com",
      "Address": "27 Wallace Street Motueka 7120",
      "Version": 1,
      "FirstName": "Zoey",
      "Phone": "+64 35288358",
      "CreatedAt": "2024-09-09T00:34:25.801Z",
      "Id": "cd702fae-e598-4844-b9bb-6508c5f673fd",
      "LastName": "Clark",
      "Workplace": "FRW Motueka"
  },
  {
      "Speciality": "Endocrinologist",
      "Email": "sebastian.harris@example.com",
      "Address": "327 Lake Road Takapuna Auckland 0622",
      "Version": 1,
      "FirstName": "Sebastian",
      "Phone": "+64 94892012",
      "CreatedAt": "2024-09-09T00:34:25.801Z",
      "Id": "d7d897de-5061-4923-80c6-78a1cf66640c",
      "LastName": "Harris",
      "Workplace": "FRW Medplus Takapuna"
  },
  {
      "Speciality": "Pathologist",
      "Email": "evelyn.white@example.com",
      "Address": "327 Lake Road Takapuna Auckland 0622",
      "Version": 1,
      "FirstName": "Evelyn",
      "Phone": "+64 94892012",
      "CreatedAt": "2024-09-09T00:34:25.801Z",
      "Id": "c479e4c9-125e-42df-bc94-4ac14761519d",
      "LastName": "White",
      "Workplace": "FRW Medplus Takapuna"
  },
  {
      "Speciality": "Dermatologist",
      "Email": "laura.hayes@example.com",
      "Address": "68 Beach Road Auckland Central Auckland 1010",
      "Version": 1,
      "FirstName": "Laura",
      "Phone": "+64 99192555",
      "CreatedAt": "2024-09-09T00:34:25.799Z",
      "Id": "f51e7217-cf44-47bb-8a16-52a81274de8d",
      "LastName": "Hayes",
      "Workplace": "FRW Quaymed Britomart"
  },
  {
      "Speciality": "Engineer, biomedical",
      "Email": "alexander26@williams.info",
      "Address": "68 Beach Road Auckland Central Auckland 1010",
      "Version": 1,
      "FirstName": "Ariel",
      "Phone": "+64 99192555",
      "CreatedAt": "2024-09-09T00:34:25.799Z",
      "Id": "fca3aee0-ab0c-487f-be1b-0b270ec98a14",
      "LastName": "Mcdaniel",
      "Workplace": "FRW Quaymed Britomart"
  },
  {
      "Speciality": "Endocrinologist",
      "Email": "daniel.lee@example.com",
      "Address": "121 Birkenhead Avenue Birkenhead Auckland 0626",
      "Version": 1,
      "FirstName": "Daniel",
      "Phone": "+64 990 654 3213",
      "CreatedAt": "2024-09-09T00:34:25.800Z",
      "Id": "64e5b4f8-58ad-421d-965c-d511695ea293",
      "LastName": "Lee",
      "Workplace": "FRW Birkenhead"
  },
  {
      "Speciality": "Dentist",
      "Email": "charlotte.davis@example.com",
      "Address": "29 Anne Street Devonport Auckland 0624",
      "Version": 1,
      "FirstName": "Charlotte",
      "Phone": "+64 94892011",
      "CreatedAt": "2024-09-09T00:34:25.801Z",
      "Id": "ea3c71e5-f6c6-4719-a7b8-f27661fc5e34",
      "LastName": "Davis",
      "Workplace": "FRW Medplus Devonport"
  },
  {
      "Speciality": "Neurosurgeon",
      "Email": "emma.taylor@example.com",
      "Address": "205 Great South Road Greenlane Auckland 1051",
      "Version": 1,
      "FirstName": "Emma",
      "Phone": "+64 9610667",
      "CreatedAt": "2024-09-09T00:34:25.801Z",
      "Id": "be01cb62-dabc-47d2-9675-bc4c5d0c9947",
      "LastName": "Taylor",
      "Workplace": "FRW Greenlane"
  },
  {
      "Speciality": "Urologist",
      "Email": "noah.ramirez@example.com",
      "Address": "205 Great South Road Greenlane Auckland 1051",
      "Version": 1,
      "FirstName": "Noah",
      "Phone": "+64 9610667",
      "CreatedAt": "2024-09-09T00:34:25.800Z",
      "Id": "d52277df-bf67-4805-88cf-8dc3ff03a2be",
      "LastName": "Ramirez",
      "Workplace": "FRW Greenlane"
  },
  {
      "Speciality": "Cardiologist",
      "Email": "alexander.lewis@example.com",
      "Address": "27 Wallace Street Motueka 7120",
      "Version": 1,
      "FirstName": "Alexander",
      "Phone": "+64 35288358",
      "CreatedAt": "2024-09-09T00:34:25.801Z",
      "Id": "866acf9f-f0f3-4373-9820-8b5736c162e1",
      "LastName": "Lewis",
      "Workplace": "FRW Motueka"
  },
  {
      "Speciality": "Gastroenterologist",
      "Email": "grace.carter@example.com",
      "Address": "464 Richardson Road Mt Roskill Auckland 1041",
      "Version": 1,
      "FirstName": "Grace",
      "Phone": "+64 96267750",
      "CreatedAt": "2024-09-09T00:34:25.800Z",
      "Id": "612d4329-633e-4ce5-82fe-e19c28da3a9c",
      "LastName": "Carter",
      "Workplace": "FRW Mt Roskill"
  },
  {
      "Speciality": "Pediatric Surgeon",
      "Email": "lucas.garcia@example.com",
      "Address": "29 Anne Street Devonport Auckland 0624",
      "Version": 1,
      "FirstName": "Lucas",
      "Phone": "+64 94892011",
      "CreatedAt": "2024-09-09T00:34:25.801Z",
      "Id": "94b17c7c-816e-4b46-b544-3440681a7544",
      "LastName": "Garcia",
      "Workplace": "FRW Medplus Devonport"
  },
  {
      "Speciality": "Civil engineer",
      "Email": "emily.clarke@example.com",
      "Address": "68 Beach Road Auckland Central Auckland 1010",
      "Version": 1,
      "FirstName": "Emily",
      "Phone": "+64 99192555",
      "CreatedAt": "2024-09-09T00:34:25.799Z",
      "Id": "7231d800-a73f-4a52-94fd-c04b4711d823",
      "LastName": "Clarke",
      "Workplace": "FRW Quaymed Britomart"
  },
  {
      "Speciality": "General Surgeon",
      "Email": "sophia.anderson@example.com",
      "Address": "29 Anne Street Devonport Auckland 0624",
      "Version": 1,
      "FirstName": "Sophia",
      "Phone": "+64 94892011",
      "CreatedAt": "2024-09-09T00:34:25.801Z",
      "Id": "b7b77f5a-ab93-4368-8cb9-3c1b5df906f6",
      "LastName": "Anderson",
      "Workplace": "FRW Medplus Devonport"
  },
  {
      "Speciality": "Oncologist",
      "Email": "alexander.king@example.com",
      "Address": "464 Richardson Road Mt Roskill Auckland 1041",
      "Version": 1,
      "FirstName": "Alexander",
      "Phone": "+64 96267750",
      "CreatedAt": "2024-09-09T00:34:25.800Z",
      "Id": "771f54e8-bfac-4ea2-93a7-6d4fbd2a4de3",
      "LastName": "King",
      "Workplace": "FRW Mt Roskill"
  },
  {
      "Speciality": "Production designer, theatre/television/film",
      "Email": "uking@garcia.com",
      "Address": "58 Gaunt Street Auckland Central Auckland 1010",
      "Version": 1,
      "FirstName": "Tiffany",
      "Phone": "+64 980 123 4568",
      "CreatedAt": "2024-09-09T00:34:25.798Z",
      "Id": "845490d4-1d3f-4400-afde-8c680afe5bf6",
      "LastName": "Lopez",
      "Workplace": "FRW Quaymed Wynyard"
  },
  {
      "Speciality": "Anesthesiologist",
      "Email": "isabella.lewis@example.com",
      "Address": "205 Great South Road Greenlane Auckland 1051",
      "Version": 1,
      "FirstName": "Isabella",
      "Phone": "+64 9610667",
      "CreatedAt": "2024-09-09T00:34:25.800Z",
      "Id": "e9131b8a-f914-4e72-9809-ad7b4fc4bad2",
      "LastName": "Lewis",
      "Workplace": "FRW Greenlane"
  },
  {
      "Speciality": "Orthopedist",
      "Email": "chloe.scott@example.com",
      "Address": "121 Birkenhead Avenue Birkenhead Auckland 0626",
      "Version": 1,
      "FirstName": "Chloe",
      "Phone": "+64 990 654 3213",
      "CreatedAt": "2024-09-09T00:34:25.799Z",
      "Id": "e553d79c-f8cc-44b9-b8f5-fcbbaf74e0ee",
      "LastName": "Scott",
      "Workplace": "FRW Birkenhead"
  },
  {
      "Speciality": "Psychiatrist",
      "Email": "sophia.gonzalez@example.com",
      "Address": "121 Birkenhead Avenue Birkenhead Auckland 0626",
      "Version": 1,
      "FirstName": "Sophia",
      "Phone": "+64 990 654 3213",
      "CreatedAt": "2024-09-09T00:34:25.799Z",
      "Id": "ad93b344-144b-4e26-a0de-4e80b0533620",
      "LastName": "Gonzalez",
      "Workplace": "FRW Birkenhead"
  },
  {
      "Speciality": "Family Medicine",
      "Email": "alice.johnson@example.com",
      "Address": "58 Gaunt Street Auckland Central Auckland 1010",
      "Version": 1,
      "FirstName": "Alice",
      "Phone": "+64 980 123 4567",
      "CreatedAt": "2024-09-09T00:34:25.797Z",
      "Id": "fa552ce6-1892-487c-9730-03e43e2dfa68",
      "LastName": "Johnson",
      "Workplace": "FRW Quaymed Wynyard"
  },
  {
      "Speciality": "Pediatrics",
      "Email": "bob.martin@example.com",
      "Address": "58 Gaunt Street Auckland Central Auckland 1010",
      "Version": 1,
      "FirstName": "Bob",
      "Phone": "+64 980 123 4568",
      "CreatedAt": "2024-09-09T00:34:25.798Z",
      "Id": "8b1a8c5f-fbc9-4191-9cd3-80a4cbe2ac67",
      "LastName": "Martin",
      "Workplace": "FRW Quaymed Wynyard"
  },
  {
      "Speciality": "TEFL teacher",
      "Email": "ktorres@simpson.com",
      "Address": "58 Gaunt Street Auckland Central Auckland 1010",
      "Version": 1,
      "FirstName": "John",
      "Phone": "+64 980 123 4568",
      "CreatedAt": "2024-09-09T00:34:25.798Z",
      "Id": "4e1a4ccf-655c-49ba-be06-d909a2f8a1a6",
      "LastName": "Villarreal",
      "Workplace": "FRW Quaymed Wynyard"
  },
  {
      "Speciality": "Veterinarian",
      "Email": "benjamin.martinez@example.com",
      "Address": "29 Anne Street Devonport Auckland 0624",
      "Version": 1,
      "FirstName": "Benjamin",
      "Phone": "+64 94892011",
      "CreatedAt": "2024-09-09T00:34:25.801Z",
      "Id": "e3258017-f67b-426c-9903-c116609549fc",
      "LastName": "Martinez",
      "Workplace": "FRW Medplus Devonport"
  },
  {
      "Speciality": "Neurologist",
      "Email": "oliver.thompson@example.com",
      "Address": "121 Birkenhead Avenue Birkenhead Auckland 0626",
      "Version": 1,
      "FirstName": "Oliver",
      "Phone": "+64 990 654 3213",
      "CreatedAt": "2024-09-09T00:34:25.799Z",
      "Id": "69d1418f-3f4f-4a13-a1f6-4ef96047d8fb",
      "LastName": "Thompson",
      "Workplace": "FRW Birkenhead"
  },
  {
      "Speciality": "Orthodontist",
      "Email": "william.moore@example.com",
      "Address": "205 Great South Road Greenlane Auckland 1051",
      "Version": 1,
      "FirstName": "William",
      "Phone": "+64 9610667",
      "CreatedAt": "2024-09-09T00:34:25.800Z",
      "Id": "a022ba07-1d68-4be6-a86e-089eff813e85",
      "LastName": "Moore",
      "Workplace": "FRW Greenlane"
  },
  {
      "Speciality": "Gastroenterologist",
      "Email": "madison.martinez@example.com",
      "Address": "27 Wallace Street Motueka 7120",
      "Version": 1,
      "FirstName": "Madison",
      "Phone": "+64 35288358",
      "CreatedAt": "2024-09-09T00:34:25.801Z",
      "Id": "0e0ed3b3-8f66-4245-baba-a17a38b055e8",
      "LastName": "Martinez",
      "Workplace": "FRW Motueka"
  },
  {
      "Speciality": "Plastic Surgeon",
      "Email": "amelia.thomas@example.com",
      "Address": "327 Lake Road Takapuna Auckland 0622",
      "Version": 1,
      "FirstName": "Amelia",
      "Phone": "+64 94892012",
      "CreatedAt": "2024-09-09T00:34:25.801Z",
      "Id": "2fad21a7-2662-4a74-a151-674c4487f9dd",
      "LastName": "Thomas",
      "Workplace": "FRW Medplus Takapuna"
  },
  {
      "Speciality": "Allergist",
      "Email": "james.brown@example.com",
      "Address": "205 Great South Road Greenlane Auckland 1051",
      "Version": 1,
      "FirstName": "James",
      "Phone": "+64 9610667",
      "CreatedAt": "2024-09-09T00:34:25.801Z",
      "Id": "91450943-ee6e-4fc4-aa0f-c2d2db087e66",
      "LastName": "Brown",
      "Workplace": "FRW Greenlane"
  },
  {
      "Speciality": "Rheumatologist",
      "Email": "ava.hill@example.com",
      "Address": "464 Richardson Road Mt Roskill Auckland 1041",
      "Version": 1,
      "FirstName": "Ava",
      "Phone": "+64 96267750",
      "CreatedAt": "2024-09-09T00:34:25.800Z",
      "Id": "cd89ef8f-c06d-42da-a6d5-294e2c8c0bc1",
      "LastName": "Hill",
      "Workplace": "FRW Mt Roskill"
  },
  {
      "Speciality": "Obstetrician",
      "Email": "mia.young@example.com",
      "Address": "464 Richardson Road Mt Roskill Auckland 1041",
      "Version": 1,
      "FirstName": "Mia",
      "Phone": "+64 96267750",
      "CreatedAt": "2024-09-09T00:34:25.800Z",
      "Id": "f61485a0-899c-42ca-833d-120fde38db08",
      "LastName": "Young",
      "Workplace": "FRW Mt Roskill"
  },
  {
      "Speciality": "Pediatrician",
      "Email": "ethan.wright@example.com",
      "Address": "121 Birkenhead Avenue Birkenhead Auckland 0626",
      "Version": 1,
      "FirstName": "Ethan",
      "Phone": "+64 990 654 3213",
      "CreatedAt": "2024-09-09T00:34:25.799Z",
      "Id": "a9dffab6-39f6-49e8-b65f-c8676e8e4cf3",
      "LastName": "Wright",
      "Workplace": "FRW Birkenhead"
  },
  {
      "Speciality": "Dermatologist",
      "Email": "henry.jackson@example.com",
      "Address": "327 Lake Road Takapuna Auckland 0622",
      "Version": 1,
      "FirstName": "Henry",
      "Phone": "+64 94892012",
      "CreatedAt": "2024-09-09T00:34:25.801Z",
      "Id": "15d156af-59f9-496f-974a-56a89bfed80e",
      "LastName": "Jackson",
      "Workplace": "FRW Medplus Takapuna"
  }
];

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzMjRmMTMzLTgwMTktNGQ3MC04YjZmLTQyYTVmNzFlMTYyZCIsInJvbGVzIjpbImFkbWluIl0sImlhdCI6MTcyNjAzMDM2OCwiZXhwIjoxNzI2MDMzOTY4fQ.W0lwWLQ7N65_1RC21U8n8vPIOTvRJVBn6nfPqUat1bo";

function generateTimeSlots(startTime, endTime, interval) {
  const slots = [];
  let current = new Date(startTime);
  const end = new Date(endTime);

  while (current < end) {
    let next = new Date(current.getTime() + interval);
    slots.push({
      startTime: current.toTimeString().split(" ")[0],
      endTime: next.toTimeString().split(" ")[0],
    });
    current = next;
  }

  return slots;
}

async function createSchedules() {
  const currentDate = new Date();
  const endDate = new Date(currentDate);
  endDate.setDate(currentDate.getDate() + 10); // set 10 days' schedule
  // endDate.setMonth(currentDate.getMonth() + 3);

  while (currentDate < endDate) {
    const dateStr = currentDate.toISOString().split("T")[0];

    const timeSlots = generateTimeSlots(
      new Date(`${dateStr}T08:00:00`),
      new Date(`${dateStr}T17:00:00`),
      15 * 60 * 1000
    );

    for (const doctor of doctors) {
      for (const slot of timeSlots) {
        const schedule = {
          DoctorId: doctor.Id,
          DoctorName: `${doctor.FirstName} ${doctor.LastName}`,
          Date: dateStr,
          StartTime: slot.startTime,
          EndTime: slot.endTime,
        };

        try {
          const response = await axios.post(
            "http://localhost:3000/admin/schedules",
            schedule,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200 || response.status === 201) {
            console.log(
              `Schedule created for ${doctor.FirstName} ${doctor.LastName} on ${dateStr} from ${slot.startTime} to ${slot.endTime}`
            );
          } else {
            console.error("Failed to create schedule:", response.statusText);
          }
        } catch (error) {
          console.error("Error:", error.message);
        }
      }
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }
}

createSchedules();
