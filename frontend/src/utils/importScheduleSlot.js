import axios from "axios";

const doctors =
  [
    {
      "Phone": "+64 96267750",
      "Address": "464 Richardson Road Mt Roskill Auckland 1041",
      "Workplace": "FRW Mt Roskill",
      "Detail": "Grace provides rapid diagnosis and treatment of acute illnesses such as minor trauma, infections or respiratory illnesses.",
      "Version": 1,
      "FirstName": "Grace",
      "Id": "f2ffc0e5-aba3-430d-97ec-2111dca32561",
      "Speciality": "Emergency Medicine in GP",
      "LastName": "Carter",
      "Email": "grace.carter@example.com",
      "CreatedAt": "2024-09-11T09:58:15.608Z"
    },
    {
      "Phone": "+64 96267750",
      "Address": "464 Richardson Road Mt Roskill Auckland 1041",
      "Workplace": "FRW Mt Roskill",
      "Detail": "Mia specialise in the prevention, diagnosis and treatment of sports-related injuries, helping athletes and general patients with post-injury recovery and health maintenance.",
      "Version": 1,
      "FirstName": "Mia",
      "Id": "b4273ad2-cf32-4b06-b436-ba64a318e89a",
      "Speciality": "Sports Medicine",
      "LastName": "Young",
      "Email": "mia.young@example.com",
      "CreatedAt": "2024-09-11T09:58:16.889Z"
    },
    {
      "Phone": "+64 94892011",
      "Address": "29 Anne Street Devonport Auckland 0624",
      "Workplace": "FRW Medplus Devonport",
      "Detail": "Lucas are responsible for identifying and treating common mental health problems such as depression and anxiety, providing psychological counselling, medication and referring patients to specialists when necessary.",
      "Version": 1,
      "FirstName": "Lucas",
      "Id": "b993a1e3-a943-47a8-8075-c371096600cf",
      "Speciality": "Mental Health",
      "LastName": "Garcia",
      "Email": "lucas.garcia@example.com",
      "CreatedAt": "2024-09-11T09:58:18.209Z"
    },
    {
      "Phone": "+64 94892012",
      "Address": "327 Lake Road Takapuna Auckland 0622",
      "Workplace": "FRW Medplus Takapuna",
      "Detail": "Elijah provide work-related medical care, diagnosis, treatment and rehabilitation of work-related injuries and illnesses.",
      "Version": 1,
      "FirstName": "Elijah",
      "Id": "82f5acf1-eaa5-4824-a247-33657ffa7eef",
      "Speciality": "Occupational Health",
      "LastName": "Wilson",
      "Email": "elijah.wilson@example.com",
      "CreatedAt": "2024-09-11T09:58:19.485Z"
    },
    {
      "Phone": "+64 99192555",
      "Address": "68 Beach Road Auckland Central Auckland 1010",
      "Workplace": "FRW Quaymed Britomart",
      "Detail": "Emily deal with issues related to family planning, contraception, sexual health education and early pregnancy care to ensure patients' reproductive health.",
      "Version": 1,
      "FirstName": "Emily",
      "Id": "ec91f550-d888-41ea-a838-2236373f89b6",
      "Speciality": "Reproductive health",
      "LastName": "Clarke",
      "Email": "emily.clarke@example.com",
      "CreatedAt": "2024-09-11T09:58:20.729Z"
    },
    {
      "Phone": "+64 99192555",
      "Address": "68 Beach Road Auckland Central Auckland 1010",
      "Workplace": "FRW Quaymed Britomart",
      "Detail": "Ariel diagnose and treat common skin conditions such as eczema and infections, and refer complex cases to dermatologists.",
      "Version": 1,
      "FirstName": "Ariel",
      "Id": "2fe4cc86-748c-45a9-9782-60da25803dc7",
      "Speciality": "Dermatology",
      "LastName": "Mcdaniel",
      "Email": "alexander26@williams.info",
      "CreatedAt": "2024-09-11T09:58:21.965Z"
    },
    {
      "Phone": "+64 94892011",
      "Address": "29 Anne Street Devonport Auckland 0624",
      "Workplace": "FRW Medplus Devonport",
      "Detail": "Benjamin are responsible for STI testing, treatment, contraceptive advice and sexual health education to promote healthy sexual behaviour.",
      "Version": 1,
      "FirstName": "Benjamin",
      "Id": "21521491-eaf0-43ef-b04b-196031c4754a",
      "Speciality": "Sexual Health",
      "LastName": "Martinez",
      "Email": "benjamin.martinez@example.com",
      "CreatedAt": "2024-09-11T09:58:23.207Z"
    },
    {
      "Phone": "+64 94892011",
      "Address": "29 Anne Street Devonport Auckland 0624",
      "Workplace": "FRW Medplus Devonport",
      "Detail": "Sophia help patients manage long-term pain through a multidisciplinary approach of medication, therapy and psychological support.",
      "Version": 1,
      "FirstName": "Sophia",
      "Id": "f098218f-9459-4ac3-9b48-9cecbfdc19b8",
      "Speciality": "Chronic Pain Management",
      "LastName": "Anderson",
      "Email": "sophia.anderson@example.com",
      "CreatedAt": "2024-09-11T09:58:24.447Z"
    },
    {
      "Phone": "+64 94892011",
      "Address": "29 Anne Street Devonport Auckland 0624",
      "Workplace": "FRW Medplus Devonport",
      "Detail": "Olivia help patients overcome tobacco, alcohol and drug addiction through behavioural therapy, medication and psychological counselling.",
      "Version": 1,
      "FirstName": "Olivia",
      "Id": "4c3d9bbe-f40d-4800-b9c1-35a3c75d9c3a",
      "Speciality": "Addiction Medicine",
      "LastName": "Jones",
      "Email": "olivia.jones@example.com",
      "CreatedAt": "2024-09-11T09:58:25.686Z"
    },
    {
      "Phone": "+64 96267750",
      "Address": "464 Richardson Road Mt Roskill Auckland 1041",
      "Workplace": "FRW Mt Roskill",
      "Detail": "Jack provide advice on preventative care, vaccinations and health risks for individuals travelling abroad.",
      "Version": 1,
      "FirstName": "Jack",
      "Id": "487912d3-fc88-4ec6-84f1-9a38c9d6b1b0",
      "Speciality": "Travel Medicine",
      "LastName": "Martin",
      "Email": "jack.martin@example.com",
      "CreatedAt": "2024-09-11T09:58:26.939Z"
    },
    {
      "Phone": "+64 96267750",
      "Address": "464 Richardson Road Mt Roskill Auckland 1041",
      "Workplace": "FRW Mt Roskill",
      "Detail": "Ava provide advice on preventative care, vaccinations and health risks for individuals travelling abroad.",
      "Version": 1,
      "FirstName": "Ava",
      "Id": "37079654-a1fd-4fc2-84fa-72e108eb6c87",
      "Speciality": "Travel Medicine",
      "LastName": "Hill",
      "Email": "ava.hill@example.com",
      "CreatedAt": "2024-09-11T09:58:28.186Z"
    },
    {
      "Phone": "+64 990 654 3213",
      "Address": "121 Birkenhead Avenue Birkenhead Auckland 0626",
      "Workplace": "FRW Birkenhead",
      "Detail": "Daniel provide early pregnancy care, health checks and postnatal recovery support for mothers and babies.",
      "Version": 1,
      "FirstName": "Daniel",
      "Id": "ab0f5e6c-a505-4f29-81a6-02805275fb96",
      "Speciality": "Antenatal and postnatal care",
      "LastName": "Lee",
      "Email": "daniel.lee@example.com",
      "CreatedAt": "2024-09-11T09:58:29.472Z"
    },
    {
      "Phone": "+64 980 123 4568",
      "Address": "58 Gaunt Street Auckland Central Auckland 1010",
      "Workplace": "FRW Quaymed Wynyard",
      "Detail": "Bob address adolescent health issues such as growing up, mental health and sexual health, guiding them through puberty.",
      "Version": 1,
      "FirstName": "Bob",
      "Id": "c0f83885-7243-4a7b-9efe-ea3a5a86bba3",
      "Speciality": "Adolescent health",
      "LastName": "Martin",
      "Email": "bob.martin@example.com",
      "CreatedAt": "2024-09-11T09:58:30.708Z"
    },
    {
      "Phone": "+64 990 654 3213",
      "Address": "121 Birkenhead Avenue Birkenhead Auckland 0626",
      "Workplace": "FRW Birkenhead",
      "Detail": "Chloe provide advice on diet and lifestyle changes to help patients manage their weight and prevent related health problems.",
      "Version": 1,
      "FirstName": "Chloe",
      "Id": "e8f0a7e8-1e14-47e1-9fa9-565f9725cbd5",
      "Speciality": "Weight management and nutrition",
      "LastName": "Scott",
      "Email": "chloe.scott@example.com",
      "CreatedAt": "2024-09-11T09:58:31.946Z"
    },
    {
      "Phone": "+64 99192555",
      "Address": "68 Beach Road Auckland Central Auckland 1010",
      "Workplace": "FRW Quaymed Britomart",
      "Detail": "Rachel perform minor operations and deal with routine surgical problems, referring complex cases to specialists when necessary.",
      "Version": 1,
      "FirstName": "Rachel",
      "Id": "eab6f342-c6eb-4e82-9de1-bce596db8f1e",
      "Speciality": "Doctor, hospital",
      "LastName": "Daniels",
      "Email": "katherine02@cook-schneider.info",
      "CreatedAt": "2024-09-11T09:58:33.240Z"
    },
    {
      "Phone": "+64 35288358",
      "Address": "27 Wallace Street Motueka 7120",
      "Workplace": "FRW Motueka",
      "Detail": "Madison specialise in caring for older people, managing chronic illnesses, cognitive problems and improving the quality of life for older patients.",
      "Version": 1,
      "FirstName": "Madison",
      "Id": "2a28fdc9-442d-44c2-94ef-2c4ca7998f75",
      "Speciality": "Geriatrics",
      "LastName": "Martinez",
      "Email": "madison.martinez@example.com",
      "CreatedAt": "2024-09-11T09:58:34.490Z"
    },
    {
      "Phone": "+64 94892012",
      "Address": "327 Lake Road Takapuna Auckland 0622",
      "Workplace": "FRW Medplus Takapuna",
      "Detail": "Amelia assess and treat bone, joint and muscle problems, provide initial care and refer patients to specialists when necessary.",
      "Version": 1,
      "FirstName": "Amelia",
      "Id": "a7030e58-794d-458e-be49-e43ec33cc394",
      "Speciality": "Orthopaedics",
      "LastName": "Thomas",
      "Email": "amelia.thomas@example.com",
      "CreatedAt": "2024-09-11T09:58:35.740Z"
    },
    {
      "Phone": "+64 990 654 3213",
      "Address": "121 Birkenhead Avenue Birkenhead Auckland 0626",
      "Workplace": "FRW Birkenhead",
      "Detail": "Ethan provide comprehensive primary care for patients of all ages, manage acute and chronic conditions and coordinate specialist care.",
      "Version": 1,
      "FirstName": "Ethan",
      "Id": "5081abd1-e47c-4539-8109-65853d97f4e2",
      "Speciality": "General Practitioners",
      "LastName": "Wright",
      "Email": "ethan.wright@example.com",
      "CreatedAt": "2024-09-11T09:58:36.994Z"
    },
    {
      "Phone": "+64 990 654 3213",
      "Address": "121 Birkenhead Avenue Birkenhead Auckland 0626",
      "Workplace": "FRW Birkenhead",
      "Detail": "Sophia provide support for mental health at a community level, treating common psychological problems and promoting mental health through education and counselling.",
      "Version": 1,
      "FirstName": "Sophia",
      "Id": "f70000a3-de44-4764-b96a-af84126aabcb",
      "Speciality": "Community Mental Health",
      "LastName": "Gonzalez",
      "Email": "sophia.gonzalez@example.com",
      "CreatedAt": "2024-09-11T09:58:38.249Z"
    },
    {
      "Phone": "+64 980 123 4568",
      "Address": "58 Gaunt Street Auckland Central Auckland 1010",
      "Workplace": "FRW Quaymed Wynyard",
      "Detail": " John provides rapid diagnosis and treatment of acute illnesses such as minor trauma, infections or respiratory illnesses. They provide emergency care and refer patients to specialists when necessary.",
      "Version": 1,
      "FirstName": "John",
      "Id": "b0d44d71-d9ef-438c-843b-69398700797f",
      "Speciality": "Emergency Medicine",
      "LastName": "Villarreal",
      "Email": "ktorres@simpson.com",
      "CreatedAt": "2024-09-11T09:58:39.597Z"
    },
    {
      "Phone": "+64 9610667",
      "Address": "205 Great South Road Greenlane Auckland 1051",
      "Workplace": "FRW Greenlane",
      "Detail": "James specialises in the prevention, diagnosis and treatment of sports-related injuries, helping athletes and general patients with post-injury recovery and health maintenance.",
      "Version": 1,
      "FirstName": "James",
      "Id": "900356eb-2650-4fd6-9991-2c4b63cbb9b6",
      "Speciality": "Sports Medicine",
      "LastName": "Brown",
      "Email": "james.brown@example.com",
      "CreatedAt": "2024-09-11T09:58:40.966Z"
    },
    {
      "Phone": "+64 980 123 4567",
      "Address": "58 Gaunt Street Auckland Central Auckland 1010",
      "Workplace": "FRW Quaymed Wynyard",
      "Detail": "Alice provide work-related medical care, diagnosis, treatment and rehabilitation of work-related injuries and illnesses.",
      "Version": 1,
      "FirstName": "Alice",
      "Id": "f752a32a-6e6e-4363-b3d9-055341b78ade",
      "Speciality": "Occupational Health",
      "LastName": "Johnson",
      "Email": "alice.johnson@example.com",
      "CreatedAt": "2024-09-11T09:58:42.207Z"
    },
    {
      "Phone": "+64 9610667",
      "Address": "205 Great South Road Greenlane Auckland 1051",
      "Workplace": "FRW Greenlane",
      "Detail": "Isabella deal with issues related to family planning, contraception, sexual health education and early pregnancy care to ensure patients' reproductive health.",
      "Version": 1,
      "FirstName": "Isabella",
      "Id": "3f3ba272-f36f-4e75-be85-0aea0b52e72b",
      "Speciality": "Reproductive health",
      "LastName": "Lewis",
      "Email": "isabella.lewis@example.com",
      "CreatedAt": "2024-09-11T09:58:43.446Z"
    },
    {
      "Phone": "+64 94892012",
      "Address": "327 Lake Road Takapuna Auckland 0622",
      "Workplace": "FRW Medplus Takapuna",
      "Detail": "Sebastian diagnose and treat common skin conditions such as eczema and infections, and refer complex cases to dermatologists.",
      "Version": 1,
      "FirstName": "Sebastian",
      "Id": "6a84085e-9625-488a-b7ed-84ca56596fb2",
      "Speciality": "Dermatology",
      "LastName": "Harris",
      "Email": "sebastian.harris@example.com",
      "CreatedAt": "2024-09-11T09:58:44.685Z"
    },
    {
      "Phone": "+64 35288358",
      "Address": "27 Wallace Street Motueka 7120",
      "Workplace": "FRW Motueka",
      "Detail": "Zoey are responsible for STI testing, treatment, contraceptive advice and sexual health education to promote healthy sexual behaviour.",
      "Version": 1,
      "FirstName": "Zoey",
      "Id": "1ad5c03a-642e-4339-8bd9-123646b65a0d",
      "Speciality": "Sexual Health",
      "LastName": "Clark",
      "Email": "zoey.clark@example.com",
      "CreatedAt": "2024-09-11T09:58:45.922Z"
    },
    {
      "Phone": "+64 94892011",
      "Address": "29 Anne Street Devonport Auckland 0624",
      "Workplace": "FRW Medplus Devonport",
      "Detail": "Charlotte help patients manage long-term pain through a multidisciplinary approach of medication, therapy and psychological support.",
      "Version": 1,
      "FirstName": "Charlotte",
      "Id": "f73a4c53-6df0-41e0-9b5a-85aa2b2b4232",
      "Speciality": "Chronic Pain Management",
      "LastName": "Davis",
      "Email": "charlotte.davis@example.com",
      "CreatedAt": "2024-09-11T09:58:48.386Z"
    },
    {
      "Phone": "+64 9610667",
      "Address": "205 Great South Road Greenlane Auckland 1051",
      "Workplace": "FRW Greenlane",
      "Detail": "William provide healthcare for migrants and refugees, with a focus on disease prevention, vaccinations and mental health support.",
      "Version": 1,
      "FirstName": "William",
      "Id": "b315ac56-2bae-45af-91fa-e489ac644b4c",
      "Speciality": "Migrant Health",
      "LastName": "Moore",
      "Email": "william.moore@example.com",
      "CreatedAt": "2024-09-11T09:58:49.760Z"
    },
    {
      "Phone": "+64 9610667",
      "Address": "205 Great South Road Greenlane Auckland 1051",
      "Workplace": "FRW Greenlane",
      "Detail": "Noah help patients overcome tobacco, alcohol and drug addiction through behavioural therapy, medication and psychological counselling.",
      "Version": 1,
      "FirstName": "Noah",
      "Id": "79deed39-4881-4bf0-a5d7-c32124b17882",
      "Speciality": "Addiction Medicine",
      "LastName": "Ramirez",
      "Email": "noah.ramirez@example.com",
      "CreatedAt": "2024-09-11T09:58:50.996Z"
    },
    {
      "Phone": "+64 980 123 4568",
      "Address": "58 Gaunt Street Auckland Central Auckland 1010",
      "Workplace": "FRW Quaymed Wynyard",
      "Detail": "Tiffany provide advice on preventative care, vaccinations and health risks for individuals travelling abroad.",
      "Version": 1,
      "FirstName": "Tiffany",
      "Id": "4b5f6533-7abe-45ed-accc-53461fda68f9",
      "Speciality": "Travel Medicine",
      "LastName": "Lopez",
      "Email": "uking@garcia.com",
      "CreatedAt": "2024-09-11T09:58:52.233Z"
    },
    {
      "Phone": "+64 35288358",
      "Address": "27 Wallace Street Motueka 7120",
      "Workplace": "FRW Motueka",
      "Detail": "Alexander provide early pregnancy care, health checks and postnatal recovery support for mothers and babies.",
      "Version": 1,
      "FirstName": "Alexander",
      "Id": "7a09d179-d98a-4672-b612-b5d34a25e212",
      "Speciality": "Antenatal and postnatal care",
      "LastName": "Lewis",
      "Email": "alexander.lewis@example.com",
      "CreatedAt": "2024-09-11T09:58:53.470Z"
    },
    {
      "Phone": "+64 99192555",
      "Address": "68 Beach Road Auckland Central Auckland 1010",
      "Workplace": "FRW Quaymed Britomart",
      "Detail": "Laura address adolescent health issues such as growing up, mental health and sexual health, guiding them through puberty.",
      "Version": 1,
      "FirstName": "Laura",
      "Id": "a1a4777f-c5da-4bda-8279-4eb062f5c09d",
      "Speciality": "Adolescent health",
      "LastName": "Hayes",
      "Email": "laura.hayes@example.com",
      "CreatedAt": "2024-09-11T09:58:54.723Z"
    },
    {
      "Phone": "+64 94892012",
      "Address": "327 Lake Road Takapuna Auckland 0622",
      "Workplace": "FRW Medplus Takapuna",
      "Detail": "Henry provide advice on diet and lifestyle changes to help patients manage their weight and prevent related health problems.",
      "Version": 1,
      "FirstName": "Henry",
      "Id": "a120dc38-263e-4c60-b02a-3d20b3968da1",
      "Speciality": "Weight management and nutrition",
      "LastName": "Jackson",
      "Email": "henry.jackson@example.com",
      "CreatedAt": "2024-09-11T09:58:55.952Z"
    },
    {
      "Phone": "+64 9610667",
      "Address": "205 Great South Road Greenlane Auckland 1051",
      "Workplace": "FRW Greenlane",
      "Detail": "Emma perform minor operations and deal with routine surgical problems, referring complex cases to specialists when necessary.",
      "Version": 1,
      "FirstName": "Emma",
      "Id": "7cbcfebf-3324-4232-9764-69388962df42",
      "Speciality": "General Surgery",
      "LastName": "Taylor",
      "Email": "emma.taylor@example.com",
      "CreatedAt": "2024-09-11T09:58:57.189Z"
    },
    {
      "Phone": "+64 94892012",
      "Address": "327 Lake Road Takapuna Auckland 0622",
      "Workplace": "FRW Medplus Takapuna",
      "Detail": "Evelyn specialise in caring for older people, managing chronic illnesses, cognitive problems and improving the quality of life for older patients.",
      "Version": 1,
      "FirstName": "Evelyn",
      "Id": "9aacd77b-d487-45be-9b45-edf6d31e83ae",
      "Speciality": "Geriatrics",
      "LastName": "White",
      "Email": "evelyn.white@example.com",
      "CreatedAt": "2024-09-11T09:58:58.436Z"
    },
    {
      "Phone": "+64 990 654 3213",
      "Address": "121 Birkenhead Avenue Birkenhead Auckland 0626",
      "Workplace": "FRW Birkenhead",
      "Detail": "Oliver assess and treat bone, joint and muscle problems, provide initial care and refer patients to specialists when necessary.",
      "Version": 1,
      "FirstName": "Oliver",
      "Id": "7b0946ea-7f99-4250-9094-2ffa1c699fd4",
      "Speciality": "Orthopaedics",
      "LastName": "Thompson",
      "Email": "oliver.thompson@example.com",
      "CreatedAt": "2024-09-11T09:58:59.681Z"
    },
    {
      "Phone": "+64 99192555",
      "Address": "68 Beach Road Auckland Central Auckland 1010",
      "Workplace": "FRW Quaymed Britomart",
      "Detail": "Michael provide comprehensive primary care for patients of all ages, manage acute and chronic conditions and coordinate specialist care.",
      "Version": 1,
      "FirstName": "Michael",
      "Id": "e2cda1a5-3580-42ad-b274-57a90b2f99bc",
      "Speciality": "General Practitioners",
      "LastName": "Reynolds",
      "Email": "michael.reynolds@example.com",
      "CreatedAt": "2024-09-11T09:59:00.928Z"
    },
    {
      "Phone": "+64 96267750",
      "Address": "464 Richardson Road Mt Roskill Auckland 1041",
      "Workplace": "FRW Mt Roskill",
      "Detail": "Alexander provide support for mental health at a community level, treating common psychological problems and promoting mental health through education and counselling.",
      "Version": 1,
      "FirstName": "Alexander",
      "Id": "11f5949b-025f-4fea-971e-67d860814769",
      "Speciality": "Community Mental Health",
      "LastName": "King",
      "Email": "alexander.king@example.com",
      "CreatedAt": "2024-09-11T09:59:02.174Z"
    },
    {
      "Phone": "+64 980 123 4568",
      "Address": "58 Gaunt Street Auckland Central Auckland 1010",
      "Workplace": "FRW Quaymed Wynyard",
      "Detail": "Derek provide healthcare for children, managing common illnesses, vaccinations, and monitoring growth. They offer preventive care, address developmental issues, and guide parents on childhood health. ",
      "Version": 1,
      "FirstName": "Derek",
      "Id": "0186116d-a0e3-4214-b86c-f18fea1a2eb8",
      "Speciality": "Pediatrics in GP",
      "LastName": "Martin",
      "Email": "carlos80@parker.com",
      "CreatedAt": "2024-09-11T09:59:03.415Z"
    }
  ]

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNzI2MTI5Mjk1LCJleHAiOjE3MjYxMzI4OTV9.7KbIPnPBWtMPAwZfmh4eeNJY8CV2orGEGmzdf8LuBME";

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
  endDate.setDate(currentDate.getDate() + 8); // set 10 days' schedule
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
            // "http://localhost:3000/admin/schedules",
            "https://api.gpbooking.icu/admin/schedules",
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
