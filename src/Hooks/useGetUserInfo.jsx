export const useGetUserInfo = () => {
    const { userName,userProfilePhotoURL,userId,isAuth } = JSON.parse(localStorage.getItem("authentication")) || {};

    return { userName,userProfilePhotoURL,userId,isAuth };
}