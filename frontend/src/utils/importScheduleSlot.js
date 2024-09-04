import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const doctors = [
  {
    Speciality: "Lecturer, higher education",
    Email: "carlos80@parker.com",
    Address: "58 Gaunt Street Auckland Central Auckland 1010",
    Version: 1,
    FirstName: "Derek",
    Phone: "+64 980 123 4568",
    Id: "73c2c862-be25-4425-b62f-9463af3d7c2b",
    LastName: "Martin",
    Workplace: "FRW Quaymed Wynyard",
  },
  {
    Speciality: "Urologist",
    Email: "noah.ramirez@example.com",
    Address: "205 Great South Road Greenlane Auckland 1051",
    Version: 1,
    FirstName: "Noah",
    Phone: "+64 9610667",
    Id: "959216da-5ffb-46c6-9e29-d1b4a1182010",
    LastName: "Ramirez",
    Workplace: "FRW Greenlane",
  },
  {
    Speciality: "Cardiologist",
    Email: "alexander.lewis@example.com",
    Address: "27 Wallace Street Motueka 7120",
    Version: 1,
    FirstName: "Alexander",
    Phone: "+64 35288358",
    Id: "777318e6-afa7-4997-9b09-03801002c647",
    LastName: "Lewis",
    Workplace: "FRW Motueka",
  },
  {
    Speciality: "Endocrinologist",
    Email: "sebastian.harris@example.com",
    Address: "327 Lake Road Takapuna Auckland 0622",
    Version: 1,
    FirstName: "Sebastian",
    Phone: "+64 94892012",
    Id: "be938c86-6445-4c93-b35b-db688854b740",
    LastName: "Harris",
    Workplace: "FRW Medplus Takapuna",
  },
  {
    Speciality: "Engineer, biomedical",
    Email: "alexander26@williams.info",
    Address: "68 Beach Road Auckland Central Auckland 1010",
    Version: 1,
    FirstName: "Ariel",
    Phone: "+64 99192555",
    Id: "bfa7fa30-b09d-4351-bf74-8ef1b0869c2e",
    LastName: "Mcdaniel",
    Workplace: "FRW Quaymed Britomart",
  },
  {
    Speciality: "TEFL teacher",
    Email: "ktorres@simpson.com",
    Address: "58 Gaunt Street Auckland Central Auckland 1010",
    Version: 1,
    FirstName: "John",
    Phone: "+64 980 123 4568",
    Id: "cd7ca2d6-af14-44c0-a571-4da1edf8aa18",
    LastName: "Villarreal",
    Workplace: "FRW Quaymed Wynyard",
  },
  {
    Speciality: "Dermatologist",
    Email: "laura.hayes@example.com",
    Address: "68 Beach Road Auckland Central Auckland 1010",
    Version: 1,
    FirstName: "Laura",
    Phone: "+64 99192555",
    Id: "1fe9b290-d670-45fd-a830-54963e43a8a9",
    LastName: "Hayes",
    Workplace: "FRW Quaymed Britomart",
  },
  {
    Speciality: "Cardiologist",
    Email: "michael.reynolds@example.com",
    Address: "68 Beach Road Auckland Central Auckland 1010",
    Version: 1,
    FirstName: "Michael",
    Phone: "+64 99192555",
    Id: "7346daac-ed60-4b55-b970-550b87a9d0bb",
    LastName: "Reynolds",
    Workplace: "FRW Quaymed Britomart",
  },
  {
    Speciality: "Gastroenterologist",
    Email: "grace.carter@example.com",
    Address: "464 Richardson Road Mt Roskill Auckland 1041",
    Version: 1,
    FirstName: "Grace",
    Phone: "+64 96267750",
    Id: "edacdc3b-97ed-4df4-b12d-8e63608e2796",
    LastName: "Carter",
    Workplace: "FRW Mt Roskill",
  },
  {
    Speciality: "Gastroenterologist",
    Email: "madison.martinez@example.com",
    Address: "27 Wallace Street Motueka 7120",
    Version: 1,
    FirstName: "Madison",
    Phone: "+64 35288358",
    Id: "3a31fe21-3b28-426f-896e-16699e36a5bc",
    LastName: "Martinez",
    Workplace: "FRW Motueka",
  },
  {
    Speciality: "Pediatrician",
    Email: "ethan.wright@example.com",
    Address: "121 Birkenhead Avenue Birkenhead Auckland 0626",
    Version: 1,
    FirstName: "Ethan",
    Phone: "+64 990 654 3213",
    Id: "4f24552b-8b0d-4578-9c5c-f700aa557b1b",
    LastName: "Wright",
    Workplace: "FRW Birkenhead",
  },
  {
    Speciality: "Neurosurgeon",
    Email: "emma.taylor@example.com",
    Address: "205 Great South Road Greenlane Auckland 1051",
    Version: 1,
    FirstName: "Emma",
    Phone: "+64 9610667",
    Id: "492ede2a-e3b3-4968-a181-a8a8b48e0d0e",
    LastName: "Taylor",
    Workplace: "FRW Greenlane",
  },
  {
    Speciality: "Plastic Surgeon",
    Email: "amelia.thomas@example.com",
    Address: "327 Lake Road Takapuna Auckland 0622",
    Version: 1,
    FirstName: "Amelia",
    Phone: "+64 94892012",
    Id: "7daf34f1-e844-4777-9624-1819921455b7",
    LastName: "Thomas",
    Workplace: "FRW Medplus Takapuna",
  },
  {
    Speciality: "Dermatologist",
    Email: "henry.jackson@example.com",
    Address: "327 Lake Road Takapuna Auckland 0622",
    Version: 1,
    FirstName: "Henry",
    Phone: "+64 94892012",
    Id: "2a1e82ef-f960-497c-ab35-a6d93b09d8ce",
    LastName: "Jackson",
    Workplace: "FRW Medplus Takapuna",
  },
  {
    Speciality: "Pediatric Surgeon",
    Email: "lucas.garcia@example.com",
    Address: "29 Anne Street Devonport Auckland 0624",
    Version: 1,
    FirstName: "Lucas",
    Phone: "+64 94892011",
    Id: "96a475b6-d628-43ac-b984-670374b7bf0c",
    LastName: "Garcia",
    Workplace: "FRW Medplus Devonport",
  },
  {
    Speciality: "Pediatrics",
    Email: "bob.martin@example.com",
    Address: "58 Gaunt Street Auckland Central Auckland 1010",
    Version: 1,
    FirstName: "Bob",
    Phone: "+64 980 123 4568",
    Id: "8a62071d-c5ae-48ef-b195-6d557bddbab8",
    LastName: "Martin",
    Workplace: "FRW Quaymed Wynyard",
  },
  {
    Speciality: "Neurologist",
    Email: "oliver.thompson@example.com",
    Address: "121 Birkenhead Avenue Birkenhead Auckland 0626",
    Version: 1,
    FirstName: "Oliver",
    Phone: "+64 990 654 3213",
    Id: "cdf9de0f-75f4-4e80-ba15-8fecba8c5fa3",
    LastName: "Thompson",
    Workplace: "FRW Birkenhead",
  },
  {
    Speciality: "Rheumatologist",
    Email: "ava.hill@example.com",
    Address: "464 Richardson Road Mt Roskill Auckland 1041",
    Version: 1,
    FirstName: "Ava",
    Phone: "+64 96267750",
    Id: "1777d2f1-3fde-4402-adab-8b2f1e3352d5",
    LastName: "Hill",
    Workplace: "FRW Mt Roskill",
  },
  {
    Speciality: "Doctor, hospital",
    Email: "katherine02@cook-schneider.info",
    Address: "68 Beach Road Auckland Central Auckland 1010",
    Version: 1,
    FirstName: "Rachel",
    Phone: "+64 99192555",
    Id: "a1a1afdb-9f31-4eba-84af-3f6f0fee43d0",
    LastName: "Daniels",
    Workplace: "FRW Quaymed Britomart",
  },
  {
    Speciality: "Allergist",
    Email: "james.brown@example.com",
    Address: "205 Great South Road Greenlane Auckland 1051",
    Version: 1,
    FirstName: "James",
    Phone: "+64 9610667",
    Id: "ddf34c6e-82b6-46e2-a11e-eccadd0dd126",
    LastName: "Brown",
    Workplace: "FRW Greenlane",
  },
  {
    Speciality: "Production designer, theatre/television/film",
    Email: "uking@garcia.com",
    Address: "58 Gaunt Street Auckland Central Auckland 1010",
    Version: 1,
    FirstName: "Tiffany",
    Phone: "+64 980 123 4568",
    Id: "9c2925ff-6a72-4881-9a8d-9e41417d0056",
    LastName: "Lopez",
    Workplace: "FRW Quaymed Wynyard",
  },
  {
    Speciality: "Family Medicine",
    Email: "alice.johnson@example.com",
    Address: "58 Gaunt Street Auckland Central Auckland 1010",
    Version: 1,
    FirstName: "Alice",
    Phone: "+64 980 123 4567",
    Id: "e4ff1370-ed7b-44a1-9099-60b39110b5c7",
    LastName: "Johnson",
    Workplace: "FRW Quaymed Wynyard",
  },
  {
    Speciality: "Ophthalmologist",
    Email: "jack.martin@example.com",
    Address: "464 Richardson Road Mt Roskill Auckland 1041",
    Version: 1,
    FirstName: "Jack",
    Phone: "+64 96267750",
    Id: "86a7bc54-7483-4463-9a93-dd9ba5bf23f3",
    LastName: "Martin",
    Workplace: "FRW Mt Roskill",
  },
  {
    Speciality: "Civil engineer",
    Email: "emily.clarke@example.com",
    Address: "68 Beach Road Auckland Central Auckland 1010",
    Version: 1,
    FirstName: "Emily",
    Phone: "+64 99192555",
    Id: "4998a2fb-be87-4a16-b105-715e5f769a6f",
    LastName: "Clarke",
    Workplace: "FRW Quaymed Britomart",
  },
  {
    Speciality: "Dentist",
    Email: "charlotte.davis@example.com",
    Address: "29 Anne Street Devonport Auckland 0624",
    Version: 1,
    FirstName: "Charlotte",
    Phone: "+64 94892011",
    Id: "a575598f-7d3c-4b18-98c7-498bd457975c",
    LastName: "Davis",
    Workplace: "FRW Medplus Devonport",
  },
  {
    Speciality: "Anesthesiologist",
    Email: "isabella.lewis@example.com",
    Address: "205 Great South Road Greenlane Auckland 1051",
    Version: 1,
    FirstName: "Isabella",
    Phone: "+64 9610667",
    Id: "b3506d72-ac6e-4814-b9ec-1a585e2f04a2",
    LastName: "Lewis",
    Workplace: "FRW Greenlane",
  },
  {
    Speciality: "Neurologist",
    Email: "zoey.clark@example.com",
    Address: "27 Wallace Street Motueka 7120",
    Version: 1,
    FirstName: "Zoey",
    Phone: "+64 35288358",
    Id: "a5163daf-aacc-4a8f-b402-58c024872f8d",
    LastName: "Clark",
    Workplace: "FRW Motueka",
  },
  {
    Speciality: "Pathologist",
    Email: "evelyn.white@example.com",
    Address: "327 Lake Road Takapuna Auckland 0622",
    Version: 1,
    FirstName: "Evelyn",
    Phone: "+64 94892012",
    Id: "c8148c9d-97a2-4a74-920b-4ca14010bad5",
    LastName: "White",
    Workplace: "FRW Medplus Takapuna",
  },
  {
    Speciality: "Veterinarian",
    Email: "benjamin.martinez@example.com",
    Address: "29 Anne Street Devonport Auckland 0624",
    Version: 1,
    FirstName: "Benjamin",
    Phone: "+64 94892011",
    Id: "75f43c11-454f-4bd2-b097-c7359e17912a",
    LastName: "Martinez",
    Workplace: "FRW Medplus Devonport",
  },
  {
    Speciality: "Orthodontist",
    Email: "william.moore@example.com",
    Address: "205 Great South Road Greenlane Auckland 1051",
    Version: 1,
    FirstName: "William",
    Phone: "+64 9610667",
    Id: "1a66f167-08b4-4336-8c4b-32e073bddfca",
    LastName: "Moore",
    Workplace: "FRW Greenlane",
  },
  {
    Speciality: "Orthopedist",
    Email: "chloe.scott@example.com",
    Address: "121 Birkenhead Avenue Birkenhead Auckland 0626",
    Version: 1,
    FirstName: "Chloe",
    Phone: "+64 990 654 3213",
    Id: "4d911d0b-ec31-4001-a4cc-583c965b685a",
    LastName: "Scott",
    Workplace: "FRW Birkenhead",
  },
  {
    Speciality: "Oncologist",
    Email: "alexander.king@example.com",
    Address: "464 Richardson Road Mt Roskill Auckland 1041",
    Version: 1,
    FirstName: "Alexander",
    Phone: "+64 96267750",
    Id: "9ea8f7e1-014f-4b1d-8081-40d9fb3c7406",
    LastName: "King",
    Workplace: "FRW Mt Roskill",
  },
  {
    Speciality: "Obstetrician",
    Email: "mia.young@example.com",
    Address: "464 Richardson Road Mt Roskill Auckland 1041",
    Version: 1,
    FirstName: "Mia",
    Phone: "+64 96267750",
    Id: "22f7b3a5-6d70-4134-b1ea-50a8e704f6a5",
    LastName: "Young",
    Workplace: "FRW Mt Roskill",
  },
  {
    Speciality: "Cardiothoracic Surgeon",
    Email: "olivia.jones@example.com",
    Address: "29 Anne Street Devonport Auckland 0624",
    Version: 1,
    FirstName: "Olivia",
    Phone: "+64 94892011",
    Id: "a6cbfa13-fca0-49bd-b2c9-852eb2b65e5c",
    LastName: "Jones",
    Workplace: "FRW Medplus Devonport",
  },
  {
    Speciality: "Orthopedic Surgeon",
    Email: "elijah.wilson@example.com",
    Address: "327 Lake Road Takapuna Auckland 0622",
    Version: 1,
    FirstName: "Elijah",
    Phone: "+64 94892012",
    Id: "84f9938d-d186-466d-8346-5eaeeb4e9683",
    LastName: "Wilson",
    Workplace: "FRW Medplus Takapuna",
  },
  {
    Speciality: "General Surgeon",
    Email: "sophia.anderson@example.com",
    Address: "29 Anne Street Devonport Auckland 0624",
    Version: 1,
    FirstName: "Sophia",
    Phone: "+64 94892011",
    Id: "1dd40066-2a90-4d61-bc51-430c53b23bae",
    LastName: "Anderson",
    Workplace: "FRW Medplus Devonport",
  },
  {
    Speciality: "Psychiatrist",
    Email: "sophia.gonzalez@example.com",
    Address: "121 Birkenhead Avenue Birkenhead Auckland 0626",
    Version: 1,
    FirstName: "Sophia",
    Phone: "+64 990 654 3213",
    Id: "c73112a0-74f6-4e95-abd0-f05bafa11f15",
    LastName: "Gonzalez",
    Workplace: "FRW Birkenhead",
  },
  {
    Speciality: "Endocrinologist",
    Email: "daniel.lee@example.com",
    Address: "121 Birkenhead Avenue Birkenhead Auckland 0626",
    Version: 1,
    FirstName: "Daniel",
    Phone: "+64 990 654 3213",
    Id: "aa9e9c3a-891c-4f74-9745-e456b3c68997",
    LastName: "Lee",
    Workplace: "FRW Birkenhead",
  },
];
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNzI1MjM0MDQ4LCJleHAiOjE3MjUyMzc2NDh9.puZBrKxnSvP3T5OW4-LwMyJDI_boeyXhyD1ltBm1Bww";

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
          Id: uuidv4(),
          DoctorId: doctor.Id,
          DoctorName: `${doctor.FirstName} ${doctor.LastName}`,
          Date: dateStr,
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
