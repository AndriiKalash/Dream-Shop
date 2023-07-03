import { Box, Button, Paper, TextField, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./Login.module.scss";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email")
      .required("E-mail is required"),
    password: yup
      .string()
      .min(5, "Minimum 5 symbols!")
      .required("password is Required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;


const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
        email: "",
        password: "",
    } ,
    mode: "all",
  });
  const onSubmit = (data: FormData) => {
    console.log(data);
  } 

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 8,
          width: 428,
          height: 428,
        },
      }}>
      <Paper style={{ padding: 30 }} elevation={3}>
        <Typography variant="h4" color={"#888484"} className={styles.title}>
          Login to account
        </Typography>
        <Typography
          variant="subtitle2"
          color={"#888484"}
          className={styles.title}>
          If you have an account with us, please log in.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("email")}
            className={styles.field}
            label="E-Mail"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            fullWidth
          />
          <TextField
            {...register("password")}
            className={styles.field}
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            label="Password"
            fullWidth
          />
          <Button
            type="submit"
            size="large"
            variant="contained"
            fullWidth
            className={styles.button}>
            Enter
          </Button>
        </form>
        <Typography
          variant="subtitle2"
          color={"#888484"}
          className={styles.title}>
          Don’t have an account? 
          <Link to="/register">Create an account</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginForm;
