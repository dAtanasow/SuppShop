import userApi from "../аpi/auth-api";

export const useRegister = () => {

    const registerHandler = async (email, username, phone, password, rePass) => {
        if (password !== rePass) {
            return { error: "Passwords don't match" };
        }
        try {
            const authData = await userApi.register(email, username, phone, password, rePass);
            return authData;
        } catch (error) {
            return { error: error.message };
        }
    }

    return registerHandler
}