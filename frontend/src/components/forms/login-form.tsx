"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { z } from "zod";
import { toast } from "sonner";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { login } from "@/actions/login";

const LoginFormSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Email is required" })
		.email({ message: "Invalid email address" }),
	password: z.string().min(1, { message: "Password is required" }),
});

export type LoginFormValues = z.infer<typeof LoginFormSchema>;

const LoginForm = () => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: LoginFormValues) => {
		startTransition(async () => {
			const loginToast = toast.loading("Logging in...");

			const res = await login({
				email: values.email,
				password: values.password,
			});

			if (res?.success === true) {
				toast.success("Successfully Logged In", {
					id: loginToast,
				});
			} else {
				toast.error("An Error Occured", {
					id: loginToast,
				});
			}
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<div className="space-y-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={form.formState.isSubmitting || isPending}
										placeholder="name@example.com"
										type="email"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={form.formState.isSubmitting || isPending}
										placeholder="********"
										type="password"
									/>
								</FormControl>
								<Button size="sm" variant="link" asChild className="px-0 font-normal">
									<Link href="/">Forgot password?</Link>
								</Button>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button
					disabled={form.formState.isSubmitting || isPending}
					type="submit"
					className="w-full"
				>
					Sign In
				</Button>
			</form>
		</Form>
	);
};

export default LoginForm;
