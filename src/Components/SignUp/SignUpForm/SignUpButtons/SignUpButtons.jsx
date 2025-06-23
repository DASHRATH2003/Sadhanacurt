import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { googleIcon } from "src/Assets/Images/Images";
import { setLoginData } from "src/Features/userSlice";
import { signInWithGoogle } from "src/services/authService";
import { showAlert } from "src/Features/alertsSlice";
import s from "./SignUpButtons.module.scss";

const SignUpButtons = () => {
  const { t } = useTranslation();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  
  const handleSignUpWithGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        dispatch(setLoginData(result.user));
        dispatch(showAlert({ 
          alertText: t("toastAlert.signInSuccess"), 
          alertState: "success",
          alertType: "alert"
        }));
        navigateTo("/");
      } else {
        dispatch(showAlert({ 
          alertText: t("toastAlert.loginFailed"), 
          alertState: "error",
          alertType: "alert"
        }));
      }
    } catch (error) {
      console.error("Google sign in error:", error);
      dispatch(showAlert({ 
        alertText: t("toastAlert.loginFailed"), 
        alertState: "error",
        alertType: "alert"
      }));
    }
  };

  return (
    <div className={s.buttons}>
      <button type="submit" className={s.createAccBtn}>
        {t("buttons.createAccount")}
      </button>

      <button
        type="button"
        className={s.signUpBtn}
        onClick={handleSignUpWithGoogle}
      >
        <img src={googleIcon} alt="Colored Google icon" />
        <span>{t("buttons.signUpWithGoogle")}</span>
      </button>

      <p>
        <span>{t("loginSignUpPage.alreadyHaveAcc")}</span>
        <Link to="/login">{t("buttons.login")}</Link>
      </p>
    </div>
  );
};

export default SignUpButtons;
