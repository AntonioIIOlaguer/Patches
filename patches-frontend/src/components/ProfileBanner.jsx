import dp from "../assets/react.svg";

const DisplayPicture = () => {
  return <img src={dp} />;
};
const ProfileNavBar = () => {
  return (
    <div>
      <span>Patchwork</span>
      <span>My Quilts</span>
      <span>Other Quilts</span>
    </div>
  );
};

export const ProfileBanner = () => {
  return (
    <>
      <DisplayPicture />
      <p>username</p>
      <p>@handle</p>
      <p>ProfileBanner</p>
      <ProfileNavBar />
    </>
  );
};
