import { useState, useMemo } from "react";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import Skeleton from "@mui/material/Skeleton";

import { useLogin } from "../../hooks/useLogin";

import Wrapper from "../../layouts/Wrapper/Wrapper";

import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";
import Link from "../../components/ui/Link/Link";
import Alert from "../../components/ui/Alert/Alert";

import { config } from "../../utils/config";

import { images } from "../../assets/images/images";

import styles from "./styles.module.scss";

const Login = () => {
  const { t } = useTranslation();
  const { login, isLoading } = useLogin(config.baseUrl);
  const [toastError, setToastError] = useState(false);
  const [isLogoLoading, setIsLogoLoading] = useState(true);

  const schema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string().email(t("loginErrorEmailValido")).required(t("loginErrorEmail")),
        password: Yup.string()
          .min(8, t("loginErrorSenhaMinima"))
          .max(15, t("loginErrorSenhaMaxima"))
          .required(t("loginErrorSenhaRequerida")),
      }),
    [t]
  );

  const { control, handleSubmit, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { errors, isValid, isSubmitting } = formState;

  const handleSubmitForm = async (data) => {
    try {
      setToastError(false);
      await login(data);
    } catch (error) {
      console.error("Form submission error:", error);
      setToastError(true);
    }
  };

  const handleCloseToast = () => {
    setToastError(false);
  };

  return (
    <div className={styles.container}>
      <Wrapper>
        <figure>
          {isLogoLoading && (
            <Skeleton
              variant="rectangular"
              width="6.5rem"
              height="6.5rem"
              style={{ margin: "0 auto" }}
            />
          )}

          <img
            src={images.logo2}
            alt="logo USARP"
            onLoad={() => setIsLogoLoading(false)}
            style={{
              width: "6.5rem",
              display: isLogoLoading ? "none" : "block",
            }}
          />
        </figure>

        <form onSubmit={handleSubmit(handleSubmitForm)} noValidate>
          {toastError && (
            <Alert
              severity="error"
              text={t("loginErrorToast")}
              title={"Erro ao fazer Login"}
              onClose={handleCloseToast}
            />
          )}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t("loginEmail")}
                type="email"
                placeholder="exemplo@usarp.com"
                required
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={isLoading}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t("loginPassword")}
                type="password"
                placeholder="••••••"
                required
                minLength={6}
                error={!!errors.password}
                helperText={errors.password?.message}
                showPasswordToggle={true}
                disabled={isLoading}
              />
            )}
          />

          <div className={styles.forgotPasswordContainer}>
            <Link to="/recover" bold underline="always">
              {t("loginEsqueci")}
            </Link>
          </div>

          <Button type="submit" variant="contained" disabled={!isValid || isSubmitting}>
            {isLoading ? t("loginButtonCarregando") : t("loginButton")}
          </Button>
        </form>
        <div>
          <p>
            {t("cadastrarConta")} <Link to="/cadastro">{t("loginCriarAgora")}</Link>
          </p>
        </div>
      </Wrapper>
    </div>
  );
};

export default Login;
