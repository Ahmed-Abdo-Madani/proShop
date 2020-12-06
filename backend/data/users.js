import bcrypt from "bcryptjs";
const users = [
  {
    name: "Admin User",
    email: "Admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Watashi Doe",
    email: "Watashi@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Himeko Doe",
    email: "Himeko@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
