import React, { ReactElement, useEffect, useState } from "react";
import { connect } from "react-redux";
import * as z from "zod";
import { login } from "@/store/auth/authActions";
import { UserValidator } from "@/services/UserValidator";
import { Button } from "@/components/Elements";
import { Form, InputField } from "@/components/Form";
import { useRouter } from "next/router";
import Link from "next/link";

const schema = z.object({
  email: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

type LoginValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

const Login = (props: any): ReactElement => {
  /**
   * The state.
   */
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
    emailError: string;
    passwordError: string;
  }>({
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
  });

  // The router object used for redirecting after login.
  const router = useRouter();

  // Redirect to user home route if user is authenticated.
  useEffect(() => {
    if (props.isAuthenticated && !props.loading) {
      router.push(process.env.NEXT_PUBLIC_USER_HOME_ROUTE);
    }
  }, [props.isAuthenticated, props.loading]);

  /**
   * Handle input change.
   *
   * @param {object} e
   *   The event object.
   */
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
      emailError: "",
      passwordError: "",
    });
  };

  /**
   * Submit the form.
   */
  const submit = (): Promise<void> => {
    const userValidator: UserValidator = new UserValidator();
    const { email, password } = formData;

    // Check for valid email address.
    const isEmailValid: boolean = userValidator.validateEmail(email);
    if (!isEmailValid) {
      setFormData({
        ...formData,
        emailError: "Please provide a valid email address",
      });
      return;
    }

    // Check for valid password.
    if (!password) {
      setFormData({
        ...formData,
        passwordError: "Please provide a valid password",
      });
      return;
    }

    // Make API call if everything is fine.
    props.login(email, password);
  };

  // Return statement.
  return (
    <div>
      <Form<LoginValues, typeof schema>
        onSubmit={async (values) => {
          console.log('VALUES >> ', values)
          // props.login()
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="email"
              label="Email Address"
              error={formState.errors["email"]}
              registration={register("email")}
            />
            <InputField
              type="password"
              label="Password"
              error={formState.errors["password"]}
              registration={register("password")}
            />
            <div>
              {/* <Button isLoading={isLoggingIn} type="submit" className="w-full">
                Log in
              </Button> */}
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link href="../register">
            <a className="font-medium text-blue-600 hover:text-blue-500">Register</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Map redux states to local component props.
const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loginError: state.auth.loginError,
  loading: state.auth.loginLoading,
});

export default connect(mapStateToProps, { login })(Login);
