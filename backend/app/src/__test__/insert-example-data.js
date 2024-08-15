import Doctor from '../dal/Doctor.js';
import AuthService from '../service/AuthService.js';

// The data to be inserted
const doctors = [
  {
    "Gpname": "Dr. Alice Johnson",
    "WorkofPlace": "FRW Quaymed Wynyard",
    "Speciality": "Family Medicine",
    "email": "alice.johnson@example.com",
    "Phone": "+64 980 123 4567",
    "address": "58 Gaunt Street Auckland Central Auckland 1010"
  },
  {
    "Gpname": "Dr. Bob Martin",
    "WorkofPlace": "FRW Quaymed Wynyard",
    "Speciality": "Pediatrics",
    "email": "bob.martin@example.com",
    "Phone": "+64 980 123 4568",
    "address": "58 Gaunt Street Auckland Central Auckland 1010"
  },
  {
    "Gpname": "Dr. Tiffany Lopez",
    "WorkofPlace": "FRW Quaymed Wynyard",
    "Speciality": "Production designer, theatre/television/film",
    "email": "uking@garcia.com",
    "Phone": "+64 980 123 4568",
    "address": "58 Gaunt Street Auckland Central Auckland 1010"
  },
  {
    "Gpname": "Dr. John Villarreal",
    "WorkofPlace": "FRW Quaymed Wynyard",
    "Speciality": "TEFL teacher",
    "email": "ktorres@simpson.com",
    "Phone": "+64 980 123 4568",
    "address": "58 Gaunt Street Auckland Central Auckland 1010"
  },
  {
    "Gpname": "Dr. Derek Martin",
    "WorkofPlace": "FRW Quaymed Wynyard",
    "Speciality": "Lecturer, higher education",
    "email": "carlos80@parker.com",
    "Phone": "+64 980 123 4568",
    "address": "58 Gaunt Street Auckland Central Auckland 1010"
  },
  {
    "Gpname": "Dr. Rachel Daniels",
    "WorkofPlace": "FRW Quaymed Britomart",
    "Speciality": "Doctor, hospital",
    "email": "katherine02@cook-schneider.info",
    "Phone": "+64 99192555",
    "address": "68 Beach Road Auckland Central  Auckland 1010"
  },
  {
    "Gpname": "Dr. Ariel Mcdaniel",
    "WorkofPlace": "FRW Quaymed Britomart",
    "Speciality": "Engineer, biomedical",
    "email": "alexander26@williams.info",
    "Phone": "+64 99192555",
    "address": "68 Beach Road Auckland Central  Auckland 1010"
  },
  {
    "Gpname": "Dr. Emily Clarke",
    "WorkofPlace": "FRW Quaymed Britomart",
    "Speciality": "Civil engineer",
    "email": "emily.clarke@example.com",
    "Phone": "+64 99192555",
    "address": "68 Beach Road Auckland Central  Auckland 1010"
  },
  {
    "Gpname": "Dr. Michael Reynolds",
    "WorkofPlace": "FRW Quaymed Britomart",
    "Speciality": "Cardiologist",
    "email": "michael.reynolds@example.com",
    "Phone": "+64 99192555",
    "address": "68 Beach Road Auckland Central  Auckland 1010"
  },
  {
    "Gpname": "Dr. Laura Hayes",
    "WorkofPlace": "FRW Quaymed Britomart",
    "Speciality": "Dermatologist",
    "email": "laura.hayes@example.com",
    "Phone": "+64 99192555",
    "address": "68 Beach Road Auckland Central  Auckland 1010"
  },
  {
    "Gpname": "Dr. Oliver Thompson",
    "WorkofPlace": "FRW Birkenhead",
    "Speciality": "Neurologist",
    "email": "oliver.thompson@example.com",
    "Phone": "+64 990 654 3213",
    "address": "121 Birkenhead Avenue Birkenhead Auckland 0626"
  },
  {
    "Gpname": "Dr. Sophia Gonzalez",
    "WorkofPlace": "FRW Birkenhead",
    "Speciality": "Psychiatrist",
    "email": "sophia.gonzalez@example.com",
    "Phone": "+64 990 654 3213",
    "address": "121 Birkenhead Avenue Birkenhead Auckland 0626"
  },
  {
    "Gpname": "Dr. Ethan Wright",
    "WorkofPlace": "FRW Birkenhead",
    "Speciality": "Pediatrician",
    "email": "ethan.wright@example.com",
    "Phone": "+64 990 654 3213",
    "address": "121 Birkenhead Avenue Birkenhead Auckland 0626"
  },
  {
    "Gpname": "Dr. Chloe Scott",
    "WorkofPlace": "FRW Birkenhead",
    "Speciality": "Orthopedist",
    "email": "chloe.scott@example.com",
    "Phone": "+64 990 654 3213",
    "address": "121 Birkenhead Avenue Birkenhead Auckland 0626"
  },
  {
    "Gpname": "Dr. Daniel Lee",
    "WorkofPlace": "FRW Birkenhead",
    "Speciality": "Endocrinologist",
    "email": "daniel.lee@example.com",
    "Phone": "+64 990 654 3213",
    "address": "121 Birkenhead Avenue Birkenhead Auckland 0626"
  },
  {
    "Gpname": "Dr. Grace Carter",
    "WorkofPlace": "FRW Mt Roskill",
    "Speciality": "Gastroenterologist",
    "email": "grace.carter@example.com",
    "Phone": "+64 96267750",
    "address": "464 Richardson Road Mt Roskill Auckland 1041"
  },
  {
    "Gpname": "Dr. Jack Martin",
    "WorkofPlace": "FRW Mt Roskill",
    "Speciality": "Ophthalmologist",
    "email": "jack.martin@example.com",
    "Phone": "+64 96267750",
    "address": "464 Richardson Road Mt Roskill Auckland 1041"
  },
  {
    "Gpname": "Dr. Mia Young",
    "WorkofPlace": "FRW Mt Roskill",
    "Speciality": "Obstetrician",
    "email": "mia.young@example.com",
    "Phone": "+64 96267750",
    "address": "464 Richardson Road Mt Roskill Auckland 1041"
  },
  {
    "Gpname": "Dr. Alexander King",
    "WorkofPlace": "FRW Mt Roskill",
    "Speciality": "Oncologist",
    "email": "alexander.king@example.com",
    "Phone": "+64 96267750",
    "address": "464 Richardson Road Mt Roskill Auckland 1041"
  },
  {
    "Gpname": "Dr. Ava Hill",
    "WorkofPlace": "FRW Mt Roskill",
    "Speciality": "Rheumatologist",
    "email": "ava.hill@example.com",
    "Phone": "+64 96267750",
    "address": "464 Richardson Road Mt Roskill Auckland 1041"
  },
  {
    "Gpname": "Dr. Noah Ramirez",
    "WorkofPlace": "FRW Greenlane",
    "Speciality": "Urologist",
    "email": "noah.ramirez@example.com",
    "Phone": "+64 9610667",
    "address": "205 Great South Road Greenlane Auckland 1051"
  },
  {
    "Gpname": "Dr. Isabella Lewis",
    "WorkofPlace": "FRW Greenlane",
    "Speciality": "Anesthesiologist",
    "email": "isabella.lewis@example.com",
    "Phone": "+64 9610667",
    "address": "205 Great South Road Greenlane Auckland 1051"
  },
  {
    "Gpname": "Dr. William Moore",
    "WorkofPlace": "FRW Greenlane",
    "Speciality": "Orthodontist",
    "email": "william.moore@example.com",
    "Phone": "+64 9610667",
    "address": "205 Great South Road Greenlane Auckland 1051"
  },
  {
    "Gpname": "Dr. Emma Taylor",
    "WorkofPlace": "FRW Greenlane",
    "Speciality": "Neurosurgeon",
    "email": "emma.taylor@example.com",
    "Phone": "+64 9610667",
    "address": "205 Great South Road Greenlane Auckland 1051"
  },
  {
    "Gpname": "Dr. James Brown",
    "WorkofPlace": "FRW Greenlane",
    "Speciality": "Allergist",
    "email": "james.brown@example.com",
    "Phone": "+64 9610667",
    "address": "205 Great South Road Greenlane Auckland 1051"
  },
  {
    "Gpname": "Dr. Olivia Jones",
    "WorkofPlace": "FRW Medplus Devonport",
    "Speciality": "Cardiothoracic Surgeon",
    "email": "olivia.jones@example.com",
    "Phone": "+64 94892011",
    "address": "29 Anne Street Devonport Auckland 0624"
  },
  {
    "Gpname": "Dr. Lucas Garcia",
    "WorkofPlace": "FRW Medplus Devonport",
    "Speciality": "Pediatric Surgeon",
    "email": "lucas.garcia@example.com",
    "Phone": "+64 94892011",
    "address": "29 Anne Street Devonport Auckland 0624"
  },

  {
    "Gpname": "Dr. Charlotte Davis",
    "WorkofPlace": "FRW Medplus Devonport",
    "Speciality": "Dentist",
    "email": "charlotte.davis@example.com",
    "Phone": "+64 94892011",
    "address": "29 Anne Street Devonport Auckland 0624"
  },
  {
    "Gpname": "Dr. Benjamin Martinez",
    "WorkofPlace": "FRW Medplus Devonport",
    "Speciality": "Veterinarian",
    "email": "benjamin.martinez@example.com",
    "Phone": "+64 94892011",
    "address": "29 Anne Street Devonport Auckland 0624"
  },
  {
    "Gpname": "Dr. Sophia Anderson",
    "WorkofPlace": "FRW Medplus Devonport",
    "Speciality": "General Surgeon",
    "email": "sophia.anderson@example.com",
    "Phone": "+64 94892011",
    "address": "29 Anne Street Devonport Auckland 0624"
  },
  {
    "Gpname": "Dr. Elijah Wilson",
    "WorkofPlace": "FRW Medplus Takapuna",
    "Speciality": "Orthopedic Surgeon",
    "email": "elijah.wilson@example.com",
    "Phone": "+64 94892012",
    "address": "327 Lake Road Takapuna Auckland 0622"
  },
  {
    "Gpname": "Dr. Amelia Thomas",
    "WorkofPlace": "FRW Medplus Takapuna",
    "Speciality": "Plastic Surgeon",
    "email": "amelia.thomas@example.com",
    "Phone": "+64 94892012",
    "address": "327 Lake Road Takapuna Auckland 0622"
  },
  {
    "Gpname": "Dr. Henry Jackson",
    "WorkofPlace": "FRW Medplus Takapuna",
    "Speciality": "Dermatologist",
    "email": "henry.jackson@example.com",
    "Phone": "+64 94892012",
    "address": "327 Lake Road Takapuna Auckland 0622"
  },
  {
    "Gpname": "Dr. Evelyn White",
    "WorkofPlace": "FRW Medplus Takapuna",
    "Speciality": "Pathologist",
    "email": "evelyn.white@example.com",
    "Phone": "+64 94892012",
    "address": "327 Lake Road Takapuna Auckland 0622"
  },
  {
    "Gpname": "Dr. Sebastian Harris",
    "WorkofPlace": "FRW Medplus Takapuna",
    "Speciality": "Endocrinologist",
    "email": "sebastian.harris@example.com",
    "Phone": "+64 94892012",
    "address": "327 Lake Road Takapuna Auckland 0622"
  },
  {
    "Gpname": "Dr. Zoey Clark",
    "WorkofPlace": "FRW Motueka",
    "Speciality": "Neurologist",
    "email": "zoey.clark@example.com",
    "Phone": "+64 35288358",
    "address": "27 Wallace Street Motueka  7120"
  },
  {
    "Gpname": "Dr. Alexander Lewis",
    "WorkofPlace": "FRW Motueka",
    "Speciality": "Cardiologist",
    "email": "alexander.lewis@example.com",
    "Phone": "+64 35288358",
    "address": "27 Wallace Street Motueka  7120"
  },
  {
    "Gpname": "Dr. Madison Martinez",
    "WorkofPlace": "FRW Motueka",
    "Speciality": "Gastroenterologist",
    "email": "madison.martinez@example.com",
    "Phone": "+64 35288358",
    "address": "27 Wallace Street Motueka  7120"
  },
  {
    "Gpname": "Dr. Logan Robinson",
    "WorkofPlace": "FRW Motueka",
    "Speciality": "Pediatrician",
    "email": "logan.robinson@example.com",
    "Phone": "+64 35288358",
    "address": "27 Wallace Street Motueka  7120"
  },
  {
    "Gpname": "Dr. Harper Lee",
    "WorkofPlace": "FRW Motueka",
    "Speciality": "Neurologist",
    "email": "harper.lee@example.com",
    "Phone": "+64 35288358",
    "address": "27 Wallace Street Motueka  7120"
  },
  {
    "Gpname": "Dr. Ethan Thompson",
    "WorkofPlace": "FRW Richmond",
    "Speciality": "Cardiologist",
    "email": "ethan.thompson@example.com",
    "Phone": "+64 35442255",
    "address": "40A Oxford Street Richmond 7020"
  },
  {
    "Gpname": "Dr. Abigail Garcia",
    "WorkofPlace": "FRW Richmond",
    "Speciality": "Dermatologist",
    "email": "abigail.garcia@example.com",
    "Phone": "+64 35442255",
    "address": "40A Oxford Street Richmond 7020"
  },
  {
    "Gpname": "Dr. Liam Martinez",
    "WorkofPlace": "FRW Richmond",
    "Speciality": "Orthopedic Surgeon",
    "email": "liam.martinez@example.com",
    "Phone": "+64 35442255",
    "address": "40A Oxford Street Richmond 7020"
  },
  {
    "Gpname": "Dr. Ella Robinson",
    "WorkofPlace": "FRW Richmond",
    "Speciality": "Psychiatrist",
    "email": "ella.robinson@example.com",
    "Phone": "+64 35442255",
    "address": "40A Oxford Street Richmond 7020"
  },
  {
    "Gpname": "Dr. Noah Johnson",
    "WorkofPlace": "FRW Richmond",
    "Speciality": "Endocrinologist",
    "email": "noah.johnson@example.com",
    "Phone": "+64 35442255",
    "address": "40A Oxford Street Richmond 7020"
  },
  {
    "Gpname": "Dr. Lucas Williams",
    "WorkofPlace": "High Street Health FRW",
    "Speciality": "Allergist",
    "email": "lucas.williams@example.com",
    "Phone": "+64 45554450",
    "address": "577 High Street Boulcott Lower Hutt 5010"
  },
  {
    "Gpname": "Dr. Mia Brown",
    "WorkofPlace": "High Street Health FRW",
    "Speciality": "Ophthalmologist",
    "email": "mia.brown@example.com",
    "Phone": "+64 45554450",
    "address": "577 High Street Boulcott Lower Hutt 5010"
  },
  {
    "Gpname": "Dr. Mason Harris",
    "WorkofPlace": "High Street Health FRW",
    "Speciality": "Anesthesiologist",
    "email": "mason.harris@example.com",
    "Phone": "+64 45554450",
    "address": "577 High Street Boulcott Lower Hutt 5010"
  },
  {
    "Gpname": "Dr. Isabella Wilson",
    "WorkofPlace": "High Street Health FRW",
    "Speciality": "Radiologist",
    "email": "isabella.wilson@example.com",
    "Phone": "+64 45554450",
    "address": "577 High Street Boulcott Lower Hutt 5010"
  },
  {
    "Gpname": "Dr. Aiden Moore",
    "WorkofPlace": "High Street Health FRW",
    "Speciality": "Nephrologist",
    "email": "aiden.moore@example.com",
    "Phone": "+64 45554450",
    "address": "577 High Street Boulcott Lower Hutt 5010"
  },
  {
    "Gpname": "Dr. Sophia Anderson",
    "WorkofPlace": "FRW Silverstream",
    "Speciality": "Gynecologist",
    "email": "sophia.anderson@example.com",
    "Phone": "+64 45277376",
    "address": "Silverstream Cnr Kiln St and Whiteman Road Upper Hutt 5019"
  },
  {
    "Gpname": "Dr. Jacob Lee",
    "WorkofPlace": "FRW Silverstream",
    "Speciality": "Orthopedic Surgeon",
    "email": "jacob.lee@example.com",
    "Phone": "+64 45277376",
    "address": "Silverstream Cnr Kiln St and Whiteman Road Upper Hutt 5019"
  },
  {
    "Gpname": "Dr. Mila Taylor",
    "WorkofPlace": "FRW Silverstream",
    "Speciality": "Cardiologist",
    "email": "mila.taylor@example.com",
    "Phone": "+64 45277376",
    "address": "Silverstream Cnr Kiln St and Whiteman Road Upper Hutt 5019"
  },
  {
    "Gpname": "Dr. Oliver Smith",
    "WorkofPlace": "FRW Silverstream",
    "Speciality": "Pediatrician",
    "email": "oliver.smith@example.com",
    "Phone": "+64 45277376",
    "address": "Silverstream Cnr Kiln St and Whiteman Road Upper Hutt 5019"
  },
  {
    "Gpname": "Dr. Amelia Davis",
    "WorkofPlace": "FRW Silverstream",
    "Speciality": "Dermatologist",
    "email": "amelia.davis@example.com",
    "Phone": "+64 45277376",
    "address": "Silverstream Cnr Kiln St and Whiteman Road Upper Hutt 5019"
  },
  {
    "Gpname": "Dr. William Martinez",
    "WorkofPlace": "FRW Health Centre",
    "Speciality": "Endocrinologist",
    "email": "william.martinez@example.com",
    "Phone": "+64 63439050",
    "address": "144 Somme Parade Whanganui 4500"
  },
  {
    "Gpname": "Dr. Emma Hernandez",
    "WorkofPlace": "FRW Health Centre",
    "Speciality": "Neurologist",
    "email": "emma.hernandez@example.com",
    "Phone": "+64 63439050",
    "address": "144 Somme Parade Whanganui 4500"
  },
  {
    "Gpname": "Dr. James Rodriguez",
    "WorkofPlace": "FRW Health Centre",
    "Speciality": "Orthopedist",
    "email": "james.rodriguez@example.com",
    "Phone": "+64 63439050",
    "address": "144 Somme Parade Whanganui 4500"
  },
  {
    "Gpname": "Dr. Charlotte Johnson",
    "WorkofPlace": "FRW Health Centre",
    "Speciality": "Cardiologist",
    "email": "charlotte.johnson@example.com",
    "Phone": "+64 63439050",
    "address": "144 Somme Parade Whanganui 4500"
  },
  {
    "Gpname": "Dr. Liam Wilson",
    "WorkofPlace": "FRW Health Centre",
    "Speciality": "Endocrinologist",
    "email": "liam.wilson@example.com",
    "Phone": "+64 63439050",
    "address": "144 Somme Parade Whanganui 4500"
  },
  {
    "Gpname": "Dr. Sophia Martinez",
    "WorkofPlace": "FRW Middlemore",
    "Speciality": "Neurologist",
    "email": "sophia.martinez@example.com",
    "Phone": "+64 92759977",
    "address": "215 Massey Road Mangere East Auckland 2024"
  },
  {
    "Gpname": "Dr. Mason Davis",
    "WorkofPlace": "FRW Middlemore",
    "Speciality": "Dermatologist",
    "email": "mason.davis@example.com",
    "Phone": "+64 92759977",
    "address": "215 Massey Road Mangere East Auckland 2024"
  },
  {
    "Gpname": "Dr. Isabella Brown",
    "WorkofPlace": "FRW Middlemore",
    "Speciality": "Pediatrician",
    "email": "isabella.brown@example.com",
    "Phone": "+64 92759977",
    "address": "215 Massey Road Mangere East Auckland 2024"
  },
  {
    "Gpname": "Dr. Oliver Garcia",
    "WorkofPlace": "FRW Middlemore",
    "Speciality": "Gynecologist",
    "email": "oliver.garcia@example.com",
    "Phone": "+64 92759977",
    "address": "215 Massey Road Mangere East Auckland 2024"
  },
  {
    "Gpname": "Dr. Ava Lee",
    "WorkofPlace": "FRW Middlemore",
    "Speciality": "Cardiothoracic Surgeon",
    "email": "ava.lee@example.com",
    "Phone": "+64 92759977",
    "address": "215 Massey Road Mangere East Auckland 2024"
  },
  {
    "Gpname": "Dr. William Hernandez",
    "WorkofPlace": "FRW Middlemore",
    "Speciality": "Orthopedic Surgeon",
    "email": "william.hernandez@example.com",
    "Phone": "+64 990 654 3268",
    "address": "215 Massey Road Mangere East Auckland 2024"
  },
  {
    "Gpname": "Dr. Mia Thompson",
    "WorkofPlace": "FRW Middlemore",
    "Speciality": "Ophthalmologist",
    "email": "mia.thompson@example.com",
    "Phone": "+64 990 654 3269",
    "address": "215 Massey Road Mangere East Auckland 2024"
  },
  {
    "Gpname": "Dr. Ethan White",
    "WorkofPlace": "FRW Middlemore",
    "Speciality": "Anesthesiologist",
    "email": "ethan.white@example.com",
    "Phone": "+64 990 654 3270",
    "address": "215 Massey Road Mangere East Auckland 2024"
  },
  {
    "Gpname": "Dr. Amelia Robinson",
    "WorkofPlace": "FRW Apollo",
    "Speciality": "Gastroenterologist",
    "email": "amelia.robinson@example.com",
    "Phone": "+64 94773700",
    "address": "119 Apollo Drive Rosedale Auckland 0632"
  },
  {
    "Gpname": "Dr. Jacob Clark",
    "WorkofPlace": "FRW Apollo",
    "Speciality": "Oncologist",
    "email": "jacob.clark@example.com",
    "Phone": "+64 94773700",
    "address": "119 Apollo Drive Rosedale Auckland 0632"
  },
  {
    "Gpname": "Dr. Olivia Lewis",
    "WorkofPlace": "FRW Apollo",
    "Speciality": "Pediatric Surgeon",
    "email": "olivia.lewis@example.com",
    "Phone": "+64 94773700",
    "address": "119 Apollo Drive Rosedale Auckland 0632"
  },
  {
    "Gpname": "Dr. Lucas Moore",
    "WorkofPlace": "FRW Apollo",
    "Speciality": "Neurosurgeon",
    "email": "lucas.moore@example.com",
    "Phone": "+64 94773700",
    "address": "119 Apollo Drive Rosedale Auckland 0632"
  },
  {
    "Gpname": "Dr. Mia Taylor",
    "WorkofPlace": "FRW Apollo",
    "Speciality": "Endocrinologist",
    "email": "mia.taylor@example.com",
    "Phone": "+64 94773700",
    "address": "119 Apollo Drive Rosedale Auckland 0632"
  },
  {
    "Gpname": "Dr. Noah Martinez",
    "WorkofPlace": "Albany Family FRW Centre",
    "Speciality": "Rheumatologist",
    "email": "noah.martinez@example.com",
    "Phone": "+64 94158959",
    "address": "366 Albany High Way Albany Auckland 0632"
  },
  {
    "Gpname": "Dr. Isabella Jackson",
    "WorkofPlace": "Albany Family FRW Centre",
    "Speciality": "Dermatologist",
    "email": "isabella.jackson@example.com",
    "Phone": "+64 94158959",
    "address": "366 Albany High Way Albany Auckland 0632"
  },
  {
    "Gpname": "Dr. William Hernandez",
    "WorkofPlace": "Albany Family FRW Centre",
    "Speciality": "Allergist",
    "email": "william.hernandez@example.com",
    "Phone": "+64 94158959",
    "address": "366 Albany High Way Albany Auckland 0632"
  },
  {
    "Gpname": "Dr. Emma Garcia",
    "WorkofPlace": "Albany Family FRW Centre",
    "Speciality": "Psychiatrist",
    "email": "emma.garcia@example.com",
    "Phone": "+64 94158959",
    "address": "366 Albany High Way Albany Auckland 0632"
  }
];

const users = [
  {
    username: 'admin',
    password: 'admin',
    roles: ['admin'],
  }
]

export const insertExampleData = () => {
  console.log('Inserting data to database ...')
  doctors.forEach(async doctor => {
    await Doctor.create(doctor);
  });
  users.forEach(async user => {
    await AuthService.signup(user);
  });
  console.log("Records inserted.");
}
