import ProfileMemberView from "@/components/views/member/Profile";
import usersServices from "@/services/user";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const ProfilPage = () => {
  const [profile, setProfile] = useState({});
  const session: any = useSession();

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await usersServices.getProfile(
        session.data?.accessToken
      );
      setProfile(data.data);
    };

    getAllUsers();
  }, [session]);
  return (
    <>
      <ProfileMemberView profile={profile} />
    </>
  );
};

export default ProfilPage;
