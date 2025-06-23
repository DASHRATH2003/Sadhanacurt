import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showAlert } from "src/Features/alertsSlice";
import { signOut } from "src/Features/userSlice";
import { signOutUser } from "src/services/authService";

const useSignOut = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { t } = useTranslation();

  const handleSignOut = async () => {
    try {
      const result = await signOutUser();
      if (result.success) {
        dispatch(signOut());
        dispatch(
          showAlert({
            alertText: t("toastAlert.signOutSuccess"),
            alertState: "success",
            alertType: "alert",
          })
        );
        navigateTo("/");
      } else {
        dispatch(
          showAlert({
            alertText: t("toastAlert.signOutFailed"),
            alertState: "error",
            alertType: "alert",
          })
        );
      }
    } catch (error) {
      console.error("Sign out error:", error);
      dispatch(
        showAlert({
          alertText: t("toastAlert.signOutFailed"),
          alertState: "error",
          alertType: "alert",
        })
      );
    }
  };

  return handleSignOut;
};

export default useSignOut;
