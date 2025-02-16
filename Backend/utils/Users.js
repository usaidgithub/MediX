import Users from "../models/Users.js";

export const createUser = async (email, password,age,gender,medicalHistory) => {
    const user = new Users({ email ,password,age,gender,medicalHistory});
    await user.save();
    return user;
};

export const getUserByEmail = async (email) => {
    return Users.findOne({ email });
};