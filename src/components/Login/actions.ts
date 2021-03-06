import { naxios } from "../../utilities/axios";
import { routes } from "../../routes/routes";

interface userData {
  email: string;
  password: string;
}

export const signIn = async ({ email, password }: userData) => {
  try {
    const { data } = await naxios.post(routes.HOST + routes.login, {
      email: email,
      password: password,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (name, email, password) => {
  try {
    const { data } = await naxios.post(routes.HOST + routes.signUp, {
      name: name,
      email: email,
      password: password,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
