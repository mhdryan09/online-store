import styles from "./Profile.module.scss";

import MemberLayout from "@/components/layouts/MemberLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Image from "next/image";

const ProfileMemberView = ({ profile }: any) => {
  return (
    <MemberLayout>
      <h1 className={styles.profile__title}>Profile Page</h1>
      <div className={styles.profile__main}>
        <div className={styles.profile__main__avatar}>
          <Image src={profile.image} alt="Profile" width={250} height={250} />
          <label
            className={styles.profile__main__avatar__label}
            htmlFor="upload-image"
          >
            <p>
              Upload a new avatar, Larger image will be resized automatically
            </p>
          </label>
          <br />
          <p>
            Maximum upload size is <b>1 MB</b>
          </p>
          <input
            className={styles.profile__main__avatar__input}
            type="file"
            name="image"
            id="upload-image"
          />
        </div>
        <div className={styles.profile__main__detail}>
          <form>
            <Input
              type="text"
              label="Full Name"
              name="fullname"
              defaultValue={profile.fullname}
            />
            <Input
              type="email"
              label="Email"
              name="email"
              defaultValue={profile.email}
            />
            <Input
              type="number"
              label="Phone"
              name="phone"
              defaultValue={profile.phone}
            />
            {/* <Input
            type="password"
            label="Password"
            name="password"
            defaultValue={profile.password}
          /> */}
            <Button type="submit" variant="primary">
              Update Profile
            </Button>
          </form>
        </div>
      </div>
    </MemberLayout>
  );
};

export default ProfileMemberView;
