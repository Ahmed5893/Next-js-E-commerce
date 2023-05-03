import * as bcrypt from "bcryptjs";

const Users = [
    {
      name: "Admin",
      email: "admin@example.com",
      password: "AdminPassword123",
      isAdmin: true,
    },
    {
      name: "User1",
      email: "user1@example.com",
      password: "User1Password456",
    },
    {
      name: "User2",
      email: "user2@example.com",
      password:"User2Password789",
    },
  ];
  
  async function hashPasswords() {
    for (let i = 0; i < Users.length; i++) {
      const user = Users[i];
      const hashedPassword = await bcrypt.hash(user.password || "", 10);
      user.password = hashedPassword;
    }
  }
  
  async function main() {
    await hashPasswords();
  }
  
  main();

export default Users;
