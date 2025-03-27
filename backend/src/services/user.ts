import { NewUser, toUserDTO, UserDTO } from "@/validators/user.ts";
import User from "@/models/user.ts";
import { DuplicateUserError, UserNotFoundError } from "@/utils/errors.ts";

const createUser = async (newUser: NewUser): Promise<UserDTO> => {
    if (await User.exists({ username: newUser.username })) {
        throw new DuplicateUserError();
    }

    const createdUser = new User(newUser);
    await createdUser.save();

    return toUserDTO(createdUser);
};

const getUserByUsername = async (username: string): Promise<UserDTO> => {
    const user = await User.findOne({ username });

    if (!user) {
        throw new UserNotFoundError();
    }

    return toUserDTO(user);
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
