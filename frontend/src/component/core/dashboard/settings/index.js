//show the change profile picture, edit profile, update password and delete account components.

import ChangeProfilePicture from "./ChangeProfilePicture";
import UpdatePassword from "./UpdatePassword";

export default function Settings() {
  return (
    <div className="p-10">
      <h1 className="mb-14 text-center mt-4 text-xl md:text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />
      
      {/* Password */}
      <UpdatePassword />
    </div>
  );
}
