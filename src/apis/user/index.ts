import instance from "@apis/axios";

import { User, UserProfile } from "@templates/user";

const validateStatus = () => true;

export const fetchUser = async (): Promise<User | null> => {
  const { data, status } = await instance.get(`/v2/user/profile`, {
    validateStatus,
  });

  if (status === 200) return data;

  return null;
};

export const fetchProfileImages = async (): Promise<UserProfile[]> => {
  const { data } = await instance.get(`/v2/user/profile/list`);

  return data;
};

export const setProfileImage = async (
  profile: UserProfile
): Promise<boolean> => {
  const { status } = await instance.patch(
    `/v2/user/profile`,
    {
      type: profile.type,
    },
    {
      validateStatus,
    }
  );

  return status === 201;
};

export const setUsername = async (name: string): Promise<boolean> => {
  const { status } = await instance.patch(
    `/v2/user/name`,
    {
      name,
    },
    {
      validateStatus,
    }
  );

  return status === 201;
};

export const removeUser = async (): Promise<boolean> => {
  const { status } = await instance.delete(`/v2/user/remove`, {
    validateStatus,
  });

  return status === 200;
};
