import { Button } from "./button";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "../forms/login-form";
import RegisterForm from "../forms/register-form";

import { Dancing_Script } from "next/font/google";

const ds = Dancing_Script({ subsets: ["latin"] });

function SignOut() {
	return (
		<form
			action={async () => {
				"use server";
				cookies().delete("session-token");
			}}
		>
			<Button type="submit">Sign out</Button>
		</form>
	);
}

const Header = async () => {
	const session = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${cookies().get("session-token")?.value ?? ""}`,
		},
		cache: "no-store",
	}).then(res => res.json());

	return (
		<header className="border bottom-1">
			<nav className="bg-white border-gray-200 px-4 py-2.5">
				<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
					<Link href="/">
						<h1 className={`${ds.className} text-3xl`}>Form Builder</h1>
					</Link>
					<div>
						{session?.user?.id ? (
							<div className="flex items-center gap-4">
								<Link href="/view-forms">
									<Button variant="outline">Dashboard</Button>
								</Link>
								{session.user?.name && session.user?.image && (
									<Image
										src={session.user?.image}
										alt={session.user?.name}
										width={32}
										height={32}
										className="rounded-full"
									/>
								)}
								<SignOut />
							</div>
						) : (
							<Dialog>
								<DialogTrigger asChild>
									<Button>Login</Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-[425px]">
									<DialogHeader>
										<DialogTitle>Auth</DialogTitle>
										<DialogDescription>
											Get Started by either Loggin in or Signing Up
										</DialogDescription>
									</DialogHeader>
									<Tabs defaultValue="login">
										<TabsList className="grid w-full grid-cols-2">
											<TabsTrigger value="login">Login</TabsTrigger>
											<TabsTrigger value="register">Register</TabsTrigger>
										</TabsList>
										<TabsContent value="login">
											<LoginForm />
										</TabsContent>
										<TabsContent value="register">
											<RegisterForm />
										</TabsContent>
									</Tabs>
								</DialogContent>
							</Dialog>
						)}
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
