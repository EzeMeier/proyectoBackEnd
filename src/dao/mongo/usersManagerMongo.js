import { usersModel } from "./models/users.model.js";

export class UsersManagerMongo {
  constructor() {
    this.model = usersModel;
  }

  //add user
  async addUser(userInfo) {
    try {
      if (
        userInfo.email === "adminCoder@coder.com" &&
        userInfo.password === "adminCod3r123"
      ) {
        userInfo.role = "admin";
      } else {
        userInfo.role = "user";
      }
      const result = await this.model.create(userInfo);
      return result;
    } catch (error) {
      console.log(`Error al agregar el usuario: ${error.message}`);
      throw new Error(`Error al agregar el usuario: ${error.message}`);
    }
  }

  //get user by ID
  async getUserById(id) {
    try {
      const result = await this.model.findById(id);
      return result;
    } catch (error) {
      console.log(`Error al obtener el usuario por ID: ${error.message}`);
      throw new Error(`Error al obtener el usuario por ID: ${error.message}`);
    }
  }

  //get user by email
  async getUserByEmail(email) {
    try {
      const result = await this.model.findOne({ email: email });
      return result;
    } catch (error) {
      console.log(`Error al obtener el usuario por mail: ${error.message}`);
      throw new Error(`Error al obtener el usuario por mail: ${error.message}`);
    }
  }
}
