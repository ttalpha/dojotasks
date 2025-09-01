import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { timeout } from "@/utils/timeout";
import { AppRoute } from "../utils/routes";
import { useApolloClient, useMutation } from "@apollo/client/react";
import { getFragmentData, graphql } from "../generated";
import { loginMutation } from "../schema/mutations";
import { meQuery } from "../schema/queries";
import { userFragment } from "../schema/fragments";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Email is invalid",
  }),
  password: z.string().min(1, { message: "Password is required." }),
});

export const useLogin = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const client = useApolloClient();
  const { toast } = useToast();
  const [login] = useMutation(graphql(loginMutation));
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });

    setLoading(true);
    await timeout();
    try {
      const { data, error } = await login({
        variables: { loginInput: values },
      });
      console.log({ data, error });
      const UserFragment = graphql(userFragment);
      const user = getFragmentData(UserFragment, data?.login);
      if (error) throw new Error(error.message);
      client.writeQuery({
        query: graphql(meQuery),
        data: { me: { ...user!, email: data?.login.email! } },
      });
      const { dismiss } = toast({
        variant: "success",
        title: "Login successfully!",
        description: `Welcome back, ${user?.name} :)`,
      });
      setTimeout(dismiss, 2000);
      // form.reset();
      navigate(AppRoute.Home);
    } catch (error: any) {
      toast({ title: "Error", variant: "error", description: error.message });
    } finally {
      setLoading(false);
    }
  }
  return { form, onSubmit, loading };
};
