import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/forms/login-form";
import RegisterForm from "@/components/forms/register-form";

const AuthModal = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Login</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Auth</DialogTitle>
					<DialogDescription>Get Started by either Loggin in or Signing Up</DialogDescription>
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
	);
};

export default AuthModal;
