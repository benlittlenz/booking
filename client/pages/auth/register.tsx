import React, { ReactElement, useEffect, useState } from "react";
import { connect } from "react-redux";
import * as z from "zod";
import { register } from "@/store/auth/authActions";
import { Button } from "@/components/Elements";
import { Form, InputField } from "@/components/Form";
import { useRouter } from "next/router";
import Link from "next/link";

const schema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
  confirmPassword: z.string().min(1, "Required"),
});

type RegisterValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterFormProps = {
  isAuthenticated: boolean;
  loading: boolean;
  register: any;
};

const Register = (props: RegisterFormProps): ReactElement => {
  const { isAuthenticated, loading, register } = props;
  const router = useRouter();

  // Redirect to user home route if user is authenticated.
  useEffect(() => {
    if (isAuthenticated) {
      router.push(process.env.NEXT_PUBLIC_USER_HOME_ROUTE);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center"></div>

        <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">Register</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form<RegisterValues, typeof schema>
            onSubmit={async (values: any) => {
              console.log("VALUES >> ", values);
              register(values.name, values.email, values.password, values.confirmPassword);
            }}
            schema={schema}
          >
            {({ register, formState }) => (
              <>
                <InputField
                  type="text"
                  label="Name"
                  error={formState.errors["name"]}
                  registration={register("name")}
                />
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
                <InputField
                  type="password"
                  label="Confirm Password"
                  error={formState.errors["confirmPassword"]}
                  registration={register("confirmPassword")}
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
              <Link href="/auth/login">
                <a className="font-medium text-blue-600 hover:text-blue-500">Register</a>
              </Link>
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
  registerError: state.auth.registerError,
  loading: state.auth.registerLoading,
});

export default connect(mapStateToProps, { register })(Register);
