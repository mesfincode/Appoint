
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
        {
            "clerkId": "CLK001",
            "firstName": "Olivia",
            "lastName": "Miller",
            "name": "Olivia Miller",
            "email": "olivia.miller@example.com",
            "phone": "555-1234",
            "profileUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB3VlIHqJmoDG-I8ml40GACuxG2dn671rKfw&s",
            "service": "Accounting",
            "companyName": "Acme Accounting Solutions",
            "profession": "Accountant",
            "serviceDscription": "Providing comprehensive accounting services, including tax preparation, financial reporting, and auditing for small and medium-sized businesses.",
            "readyForAppointments":true, 
        },
        {
            "clerkId": "CLK003",
            "firstName": "Isabella",
            "lastName": "Gonzalez",
            "name": "Isabella Gonzalez",
            "email": "isabella.gonzalez@example.com",
            "phone": "555-9012",
            "profileUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYxsG3Ac8-CCLG3PzEvZXAfVoQxmjHleJqjg&s",
            "service": "IT Services",
            "companyName": "Cybertech Solutions",
            "profession": "IT Support Technician",
            "serviceDscription": "Providing comprehensive IT support and managed services, including network administration, software deployment, and cybersecurity solutions for small and medium-sized businesses."
          },
          {
            "clerkId": "CLK004",
            "firstName": "William",
            "lastName": "Chen",
            "name": "William Chen",
            "email": "william.chen@example.com",
            "phone": "555-3456",
            "profileUrl": "https://www.shutterstock.com/image-photo/happy-mid-aged-business-man-600nw-2307212331.jpg",
            "service": "Legal",
            "companyName": "Evergreen Law Firm",
            "profession": "Lawyer",
            "serviceDscription": "Offering a wide range of legal services, including corporate law, intellectual property, real estate, and litigation support to clients across various industries."
          },
          {
            "clerkId": "CLK005",
            "firstName": "Sophia",
            "lastName": "Tanaka",
            "name": "Sophia Tanaka",
            "email": "sophia.tanaka@example.com",
            "phone": "555-7890",
            "profileUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu8LmmBwVsAUBYYsEJ32jaAT9Rov1CsGQUDZMk3ahgMI2gOiA4Sn2UjuAwcwYwc7iF6n4&usqp=CAU",
            "service": "Marketing",
            "companyName": "Blue Sky Marketing Agency",
            "profession": "Marketing Coordinator",
            "serviceDscription": "Specializing in developing and implementing comprehensive marketing strategies, including branding, content creation, digital marketing, and campaign management."
          },
          {
            "clerkId": "CLK006",
            "firstName": "Jacob",
            "lastName": "Dupont",
            "name": "Jacob Dupont",
            "email": "jacob.dupont@example.com",
            "phone": "555-2109",
            "profileUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYH_VDaGfxQ_cPhkgDPyoxXJgnnKHzEw7kdg&s",
            "service": "Human Resources",
            "companyName": "HR Experts",
            "profession": "HR Specialist",
            "serviceDscription": "Providing end-to-end human resources services, such as talent acquisition, employee onboarding, performance management, and compliance support for businesses of all sizes."
          },
        
    ],
  });

//   await prisma.user.createMany({
//     data: [
//       { title: 'My First Post', content: 'This is the content of my first post.', authorId: 1 },
//       { title: 'Another Post', content: 'This is the content of another post.', authorId: 2 },
//       { title: 'A Third Post', content: 'This is the content of a third post.', authorId: 1 },
//     ],
//   });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });