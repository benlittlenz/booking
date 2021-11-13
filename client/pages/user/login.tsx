import React, { ReactElement, useEffect, useState } from "react";
import { connect } from "react-redux";
import * as z from "zod";
import { login } from "@/store/auth/authActions";
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
  isAuthenticated: boolean;
  loading: boolean;
  login: any;
};

const Login = (props: LoginFormProps): ReactElement => {
  const { isAuthenticated, loading, login } = props;

  console.log("PROPS >>", isAuthenticated, loading);
  // The router object used for redirecting after login.
  const router = useRouter();

  // Redirect to user home route if user is authenticated.
  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push(process.env.NEXT_PUBLIC_USER_HOME_ROUTE);
    }
  }, [isAuthenticated, loading]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
        </div>

        <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">Login</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form<LoginValues, typeof schema>
            onSubmit={async (values: any) => {
              console.log("VALUES >> ", values);
              login(values.email, values.password);
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
                  <Button type="submit" className="w-full">
                    Log in
                  </Button>
                </div>
              </>
            )}
          </Form>
          <div className="mt-2 flex items-center justify-end">
            <div className="text-sm">
              {/* <Link>
            <a className="font-medium text-blue-600 hover:text-blue-500">Register</a>
          </Link> */}
            </div>
          </div>
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
