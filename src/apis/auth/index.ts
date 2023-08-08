import instance from "@apis/axios";

const AUTH_URL = "/auth";

export const fetchUserInfo = async () => {
  const { data } = await instance.get(`${AUTH_URL}`);
  return data;
};

export const deleteUser = async () => {
  const { data } = await instance.delete(`${AUTH_URL}/remove`);
  return data;
};
