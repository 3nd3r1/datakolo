import { NewUser, toUserDTO, UserDTO } from "@/validators/user.ts";
import User from "@/models/user.ts";

export class DuplicateUserError extends Error {}

const createUser = async (newUser: NewUser): Promise<UserDTO> => {
    if (await User.findOne({ username: newUser.username })) {
        throw new DuplicateUserError();
    }

    const createdUser = new User(newUser);
    await createdUser.save();

    return toUserDTO(createdUser);
};

const getUserByUsername = async (username: string): Promise<UserDTO | null> => {
    const user = await User.findOne({ username });
    if (user) {
        return toUserDTO(user);
    }
    return null;
};

const verifyUserPassword = async (
    username: string,
    password: string,
): Promise<boolean> => {
    const user = await User.findOne({ username });
    if (!user) {
        return false;
    }

    return await user.comparePassword(password);
};

const userService = {
    createUser,
    getUserByUsername,
    verifyUserPassword,
};
export default userService;
