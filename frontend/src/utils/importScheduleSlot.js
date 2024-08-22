import axios from "axios";
const doctors = [
  {
    Speciality: "Pediatrician",
    Email: "ethan.wright@example.com",
    Address: "121 Birkenhead Avenue Birkenhead Auckland 0626",
    FirstName: "Ethan",
    Phone: "+64 990 654 3213",
    Id: "063253f5-6322-48c8-89be-b91ff32ae6b1",
    LastName: "Wright",
    Workplace: "FRW Birkenhead",
  },
  {
    Speciality: "Civil engineer",
    Email: "emily.clarke@example.com",
    Address: "68 Beach Road Auckland Central Auckland 1010",
    FirstName: "Emily",
    Phone: "+64 99192555",
    Id: "a3c9b1c8-556b-4898-b951-8a1941f8b717",
    LastName: "Clarke",
    Workplace: "FRW Quaymed Britomart",
  },
  {
    Speciality: "Orthodontist",
    Email: "william.moore@example.com",
    Address: "205 Great South Road Greenlane Auckland 1051",
    FirstName: "William",
    Phone: "+64 9610667",
    Id: "13fdc813-a530-4366-a1e3-b754956ce4a8",
    LastName: "Moore",
    Workplace: "FRW Greenlane",
  },
  {
    Speciality: "Dermatologist",
    Email: "henry.jackson@example.com",
    Address: "327 Lake Road Takapuna Auckland 0622",
    FirstName: "Henry",
    Phone: "+64 94892012",
    Id: "a0642765-15af-4607-8c13-c6550a4492c5",
    LastName: "Jackson",
    Workplace: "FRW Medplus Takapuna",
  },
  {
    Speciality: "Pediatric Surgeon",
    Email: "lucas.garcia@example.com",
    Address: "29 Anne Street Devonport Auckland 0624",
    FirstName: "Lucas",
    Phone: "+64 94892011",
    Id: "37484da1-c336-455d-87fd-f7617eead0ba",
    LastName: "Garcia",
    Workplace: "FRW Medplus Devonport",
  },
  {
    Speciality: "Veterinarian",
    Email: "benjamin.martinez@example.com",
    Address: "29 Anne Street Devonport Auckland 0624",
    FirstName: "Benjamin",
    Phone: "+64 94892011",
    Id: "587b42bd-d777-4fd8-9186-d31e36788002",
    LastName: "Martinez",
    Workplace: "FRW Medplus Devonport",
  },
  {
    Speciality: "Anesthesiologist",
    Email: "isabella.lewis@example.com",
    Address: "205 Great South Road Greenlane Auckland 1051",
    FirstName: "Isabella",
    Phone: "+64 9610667",
    Id: "62fe2eb6-c358-41c5-aef1-c69b7138ffe2",
    LastName: "Lewis",
    Workplace: "FRW Greenlane",
  },
  {
    Speciality: "Pathologist",
    Email: "evelyn.white@example.com",
    Address: "327 Lake Road Takapuna Auckland 0622",
    FirstName: "Evelyn",
    Phone: "+64 94892012",
    Id: "4d820422-f30d-4c91-95c2-cad0da3b12e5",
    LastName: "White",
    Workplace: "FRW Medplus Takapuna",
  },
  {
    Speciality: "Lecturer, higher education",
    Email: "carlos80@parker.com",
    Address: "58 Gaunt Street Auckland Central Auckland 1010",
    FirstName: "Derek",
    Phone: "+64 980 123 4568",
    Id: "101dd27c-1b44-471e-94a1-661e5bce6a76",
    LastName: "Martin",
    Workplace: "FRW Quaymed Wynyard",
  },
  {
    Speciality: "Allergist",
    Email: "james.brown@example.com",
    Address: "205 Great South Road Greenlane Auckland 1051",
    FirstName: "James",
    Phone: "+64 9610667",
    Id: "3aa4f31b-2be8-4421-81f6-ddb1209173cc",
    LastName: "Brown",
    Workplace: "FRW Greenlane",
  },
  {
    Speciality: "Cardiothoracic Surgeon",
    Email: "olivia.jones@example.com",
    Address: "29 Anne Street Devonport Auckland 0624",
    FirstName: "Olivia",
    Phone: "+64 94892011",
    Id: "97b6d0ae-8e1d-49f2-83a0-fa746f14e2ef",
    LastName: "Jones",
    Workplace: "FRW Medplus Devonport",
  },
  {
    Speciality: "Psychiatrist",
    Email: "sophia.gonzalez@example.com",
    Address: "121 Birkenhead Avenue Birkenhead Auckland 0626",
    FirstName: "Sophia",
    Phone: "+64 990 654 3213",
    Id: "e0834618-5b48-4c79-b8c2-e99537ea0bc9",
    LastName: "Gonzalez",
    Workplace: "FRW Birkenhead",
  },
  {
    Speciality: "Urologist",
    Email: "noah.ramirez@example.com",
    Address: "205 Great South Road Greenlane Auckland 1051",
    FirstName: "Noah",
    Phone: "+64 9610667",
    Id: "dffbe31e-3e09-4d86-a4f1-6a7c0431e24e",
    LastName: "Ramirez",
    Workplace: "FRW Greenlane",
  },
  {
    Speciality: "Dermatologist",
    Email: "laura.hayes@example.com",
    Address: "68 Beach Road Auckland Central Auckland 1010",
    FirstName: "Laura",
    Phone: "+64 99192555",
    Id: "468f5ac7-7d25-4d37-ae46-bf72aa35498e",
    LastName: "Hayes",
    Workplace: "FRW Quaymed Britomart",
  },
  {
    Speciality: "Oncologist",
    Email: "alexander.king@example.com",
    Address: "464 Richardson Road Mt Roskill Auckland 1041",
    FirstName: "Alexander",
    Phone: "+64 96267750",
    Id: "e3570e12-24b2-4c5d-a518-099a0b44b231",
    LastName: "King",
    Workplace: "FRW Mt Roskill",
  },
  {
    Speciality: "Endocrinologist",
    Email: "daniel.lee@example.com",
    Address: "121 Birkenhead Avenue Birkenhead Auckland 0626",
    FirstName: "Daniel",
    Phone: "+64 990 654 3213",
    Id: "25694b9a-7a4a-4a2b-84fc-2e54d2abedab",
    LastName: "Lee",
    Workplace: "FRW Birkenhead",
  },
  {
    Speciality: "Obstetrician",
    Email: "mia.young@example.com",
    Address: "464 Richardson Road Mt Roskill Auckland 1041",
    FirstName: "Mia",
    Phone: "+64 96267750",
    Id: "126689b9-895f-4445-a157-f81d35d6b166",
    LastName: "Young",
    Workplace: "FRW Mt Roskill",
  },
  {
    Speciality: "Gastroenterologist",
    Email: "grace.carter@example.com",
    Address: "464 Richardson Road Mt Roskill Auckland 1041",
    FirstName: "Grace",
    Phone: "+64 96267750",
    Id: "f9927773-1eef-489c-a736-b89959ac9026",
    LastName: "Carter",
    Workplace: "FRW Mt Roskill",
  },
  {
    Speciality: "Dentist",
    Email: "charlotte.davis@example.com",
    Address: "29 Anne Street Devonport Auckland 0624",
    FirstName: "Charlotte",
    Phone: "+64 94892011",
    Id: "33fe4205-daa5-4ac9-97a0-8d20e004925a",
    LastName: "Davis",
    Workplace: "FRW Medplus Devonport",
  },
  {
    Speciality: "TEFL teacher",
    Email: "ktorres@simpson.com",
    Address: "58 Gaunt Street Auckland Central Auckland 1010",
    FirstName: "John",
    Phone: "+64 980 123 4568",
    Id: "5895880e-35c4-4934-a55d-f7e307a9bc78",
    LastName: "Villarreal",
    Workplace: "FRW Quaymed Wynyard",
  },
  {
    Speciality: "Gastroenterologist",
    Email: "madison.martinez@example.com",
    Address: "27 Wallace Street Motueka 7120",
    FirstName: "Madison",
    Phone: "+64 35288358",
    Id: "7e95f2e7-90c8-458b-bed3-4e00f0b7894e",
    LastName: "Martinez",
    Workplace: "FRW Motueka",
  },
  {
    Speciality: "Family Medicine",
    Email: "alice.johnson@example.com",
    Address: "58 Gaunt Street Auckland Central Auckland 1010",
    FirstName: "Alice",
    Phone: "+64 980 123 4567",
    Id: "1534fc38-f996-422f-b1bc-acbd74760659",
    LastName: "Johnson",
    Workplace: "FRW Quaymed Wynyard",
  },
  {
    Speciality: "Neurosurgeon",
    Email: "emma.taylor@example.com",
    Address: "205 Great South Road Greenlane Auckland 1051",
    FirstName: "Emma",
    Phone: "+64 9610667",
    Id: "7998c62b-6f24-40b3-8c26-3cc328446dfb",
    LastName: "Taylor",
    Workplace: "FRW Greenlane",
  },
  {
    Speciality: "Production designer, theatre/television/film",
    Email: "uking@garcia.com",
    Address: "58 Gaunt Street Auckland Central Auckland 1010",
    FirstName: "Tiffany",
    Phone: "+64 980 123 4568",
    Id: "792f5000-2833-4ea0-9afd-90a13e9576ec",
    LastName: "Lopez",
    Workplace: "FRW Quaymed Wynyard",
  },
  {
    Speciality: "Ophthalmologist",
    Email: "jack.martin@example.com",
    Address: "464 Richardson Road Mt Roskill Auckland 1041",
    FirstName: "Jack",
    Phone: "+64 96267750",
    Id: "9cc15194-49ea-4d97-add7-7f7245d1824e",
    LastName: "Martin",
    Workplace: "FRW Mt Roskill",
  },
  {
    Speciality: "Endocrinologist",
    Email: "sebastian.harris@example.com",
    Address: "327 Lake Road Takapuna Auckland 0622",
    FirstName: "Sebastian",
    Phone: "+64 94892012",
    Id: "cd766e3c-9e52-47f6-87bb-491fbe73c05d",
    LastName: "Harris",
    Workplace: "FRW Medplus Takapuna",
  },
  {
    Speciality: "Rheumatologist",
    Email: "ava.hill@example.com",
    Address: "464 Richardson Road Mt Roskill Auckland 1041",
    FirstName: "Ava",
    Phone: "+64 96267750",
    Id: "857dd74b-27ce-44fd-8175-3169293067d0",
    LastName: "Hill",
    Workplace: "FRW Mt Roskill",
  },
  {
    Speciality: "Doctor, hospital",
    Email: "katherine02@cook-schneider.info",
    Address: "68 Beach Road Auckland Central Auckland 1010",
    FirstName: "Rachel",
    Phone: "+64 99192555",
    Id: "3f6222a4-f022-4aa3-b252-d7636395261f",
    LastName: "Daniels",
    Workplace: "FRW Quaymed Britomart",
  },
  {
    Speciality: "Orthopedist",
    Email: "chloe.scott@example.com",
    Address: "121 Birkenhead Avenue Birkenhead Auckland 0626",
    FirstName: "Chloe",
    Phone: "+64 990 654 3213",
    Id: "c3139dea-ef1d-412e-836a-6f427c966a2d",
    LastName: "Scott",
    Workplace: "FRW Birkenhead",
  },
  {
    Speciality: "Engineer, biomedical",
    Email: "alexander26@williams.info",
    Address: "68 Beach Road Auckland Central Auckland 1010",
    FirstName: "Ariel",
    Phone: "+64 99192555",
    Id: "248bd869-3883-4ad4-9c75-be516dfb6ed2",
    LastName: "Mcdaniel",
    Workplace: "FRW Quaymed Britomart",
  },
  {
    Speciality: "Pediatrics",
    Email: "bob.martin@example.com",
    Address: "58 Gaunt Street Auckland Central Auckland 1010",
    FirstName: "Bob",
    Phone: "+64 980 123 4568",
    Id: "415ff380-b408-4e75-8bbd-2ed93e937c6d",
    LastName: "Martin",
    Workplace: "FRW Quaymed Wynyard",
  },
  {
    Speciality: "Plastic Surgeon",
    Email: "amelia.thomas@example.com",
    Address: "327 Lake Road Takapuna Auckland 0622",
    FirstName: "Amelia",
    Phone: "+64 94892012",
    Id: "9b3ebbf5-876a-4267-844a-440f15da2c4e",
    LastName: "Thomas",
    Workplace: "FRW Medplus Takapuna",
  },
  {
    Speciality: "Cardiologist",
    Email: "alexander.lewis@example.com",
    Address: "27 Wallace Street Motueka 7120",
    FirstName: "Alexander",
    Phone: "+64 35288358",
    Id: "07a6400c-91ed-4522-a2dd-33a2037021a1",
    LastName: "Lewis",
    Workplace: "FRW Motueka",
  },
  {
    Speciality: "Cardiologist",
    Email: "michael.reynolds@example.com",
    Address: "68 Beach Road Auckland Central Auckland 1010",
    FirstName: "Michael",
    Phone: "+64 99192555",
    Id: "20963934-5db6-45ff-abeb-4b6e4269984f",
    LastName: "Reynolds",
    Workplace: "FRW Quaymed Britomart",
  },
  {
    Speciality: "General Surgeon",
    Email: "sophia.anderson@example.com",
    Address: "29 Anne Street Devonport Auckland 0624",
    FirstName: "Sophia",
    Phone: "+64 94892011",
    Id: "03a75a2d-cf3e-4230-ae23-5dba614ee994",
    LastName: "Anderson",
    Workplace: "FRW Medplus Devonport",
  },
  {
    Speciality: "Neurologist",
    Email: "zoey.clark@example.com",
    Address: "27 Wallace Street Motueka 7120",
    FirstName: "Zoey",
    Phone: "+64 35288358",
    Id: "b016f820-6a14-4e2c-b64d-03accf4302f9",
    LastName: "Clark",
    Workplace: "FRW Motueka",
  },
  {
    Speciality: "Orthopedic Surgeon",
    Email: "elijah.wilson@example.com",
    Address: "327 Lake Road Takapuna Auckland 0622",
    FirstName: "Elijah",
    Phone: "+64 94892012",
    Id: "ebafac3f-3b0a-4b12-9dea-19791788de3e",
    LastName: "Wilson",
    Workplace: "FRW Medplus Takapuna",
  },
  {
    Speciality: "Neurologist",
    Email: "oliver.thompson@example.com",
    Address: "121 Birkenhead Avenue Birkenhead Auckland 0626",
    FirstName: "Oliver",
    Phone: "+64 990 654 3213",
    Id: "7b754eb7-fd7b-46c8-9173-afcd36ec7e1b",
    LastName: "Thompson",
    Workplace: "FRW Birkenhead",
  },
];

const date = "2024-08-28";

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

const timeSlots = generateTimeSlots(
  new Date(`${date}T08:00:00`),
  new Date(`${date}T17:00:00`),
  15 * 60 * 1000
);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNzI0MjkzMTAxLCJleHAiOjE3MjQyOTY3MDF9.MG_d_JQhKjYpmGU8U-g025B52hRdTAbjsZDUtE7WJ7s";
let scheduleId = 1;

async function createSchedules() {
  for (const doctor of doctors) {
    for (const slot of timeSlots) {
      const schedule = {
        Id: String(scheduleId),
        DoctorId: doctor.Id,
        DoctorName: `${doctor.FirstName} ${doctor.LastName}`,
        Date: date,
        StartTime: slot.startTime,
        EndTime: slot.endTime,
        Status: "available",
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/schedules",
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
            `Schedule created for ${doctor.FirstName} ${doctor.LastName} from ${slot.startTime} to ${slot.endTime}`
          );
        } else {
          console.error("Failed to create schedule:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
      scheduleId++;
    }
  }
}

createSchedules();
