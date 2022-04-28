import * as AsyncStorage from "asyncStorage";

const IP = {
  pc: '192.168.0.103',
  phone: '172.20.10.2',
  sstu: '192.168.156.84'
}

const _rootUrl = `http://${IP.pc}:3000/api`;
const _tagsUrl = '/tags';
const _notesUrl = '/notes';

export enum UserFields {
  first_name,
  last_name,
  login,
  password,
  date_of_birth,
  photo_uri,
  token
}

export type UserDataType = {
  [key in keyof typeof UserFields]: string;
} & { id: number }

export type LoginUserDataType = Pick<UserDataType, 'login' | 'password'>


const headers: { [key: string]: string } = {
  'Content-Type': 'application/json',
}

export const useApi = () => {
  const getData = async (url: string) => {
    const response = await fetch(`${_rootUrl}${url}`);

    if (!response.ok) {
      throw new Error(
        `Couldn't fetch data from ${url}, status ${response.status}`
      );
    }

    return await response.json();
  };

  const postData = async (url: string, data: unknown) => {

    const response = await fetch(`${_rootUrl}${url}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(
        `Couldn't post data to ${url}, status ${response.status}, message: ${await response.text()}`
      );
    }
    return await response.json();
  };

  const deleteData = async (url: string, id: number) => {
    const response = await fetch(`${_rootUrl}${url}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(
        `Couldn't post data to ${url}, status ${response.status}`
      );
    }
    return await response.json();
  };

  const updateData = async (url: string, id: number, data: unknown) => {
    const response = await fetch(`${_rootUrl}${url}/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Couldn't put data to ${url}, status ${response.status}`);
    }
    return await response.json();
  };

  const register = async (params: UserDataType): Promise<UserDataType> => {
    return await postData('/register', params).then(async res => {
      await AsyncStorage.storeData('x-access-token', res.token)
      return res
    })
  }

  const login = async (params: LoginUserDataType): Promise<UserDataType> => {
    return await postData('/login', params).then(async res => {
      await AsyncStorage.storeData('x-access-token', res.token)
      console.log(res)
      return res
    })
  }

  const checkAuth = async (params: { token: string }) => {
    return postData('/check-auth', params)
  }

  const updateUserData = async (params: Partial<Pick<UserDataType, 'password' | 'photo_uri'>>, id: number) => {
    return updateData(`/update`, id, params)
  }

  return {
    register,
    login,
    checkAuth,
    updateUserData
  };
};
