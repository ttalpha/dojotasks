import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { NAME_MAX_LENGTH, PASSWORD_REGEX } from "@/utils/constants";
import { timeout } from "@/utils/timeout";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../utils/routes";
import { useApolloClient, useMutation } from "@apollo/client/react";
import { getFragmentData, graphql } from "../generated";
import { loginMutation, registerMutation } from "../schema/mutations";
import { userFragment } from "../schema/fragments";
import { meQuery } from "../schema/queries";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(NAME_MAX_LENGTH, {
      message: "Name is too long",
    }),
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Invalid email provided",
  }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .regex(PASSWORD_REGEX, {
      message: "Password is not strong enough",
    }),
});

export const useSignup = () => {
  const [register] = useMutation(graphql(registerMutation));
  const [login] = useMutation(graphql(loginMutation));
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const client = useApolloClient();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    await timeout();
    try {
      await register({ variables: { input: values } });
      const response = await login({
        variables: {
          loginInput: { email: values.email, password: values.password },
        },
      });
      console.log({ response });

      const UserFragment = graphql(userFragment);
      const error = response.error?.message;
      console.log({ response });

      if (error) throw new Error(error);
      const user = getFragmentData(UserFragment, response.data?.login);
      client.writeQuery({
        query: graphql(meQuery),
        data: {
          me: { ...user!, email: response.data?.login.email! },
        },
      });
      const { dismiss } = toast({
        variant: "success",
        title: "New account created successfully!",
        description: `Welcome to DojoTasks, ${values.name} :)`,
      });

      setTimeout(dismiss, 2000);
      form.reset();
      console.log("Navigate to /");

      navigate(AppRoute.Home);
    } catch (error: any) {
      toast({ variant: "error", title: "Error", description: error.message });
    } finally {
      setLoading(false);
    }
  }
  return { form, onSubmit, loading };
};
