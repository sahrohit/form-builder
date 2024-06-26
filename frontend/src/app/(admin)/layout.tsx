import Header from "@/components/ui/header";
import DashboardNav from "@/components/navigation/navbar";
import { SidebarNavItem } from "@/types/nav-types";
import { getUser } from "@/actions/getUser";
import { redirect } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getUser();

	if (!session?.user?.id) {
		redirect("/");
	}

	return (
		<div className="flex min-h-screen flex-col space-y-6">
			<Header />
			<div className="container grid gap-12 md:grid-cols-[200px_1fr] flex-1">
				<aside className="hidden w-[200px] flex-col md:flex pr-2 border-r justify-between">
					<DashboardNav
						items={[
							{
								title: "My Forms",
								href: "/view-forms",
								icon: "library",
							},
							{
								title: "Results",
								href: "/results",
								icon: "list",
							},
						]}
					/>
				</aside>
				<main className="flex w-full flex-1 flex-col overflow-hidden">
					<header className="flex items-center">
						<h1 className="text-4xl m-5 p-4 font-semibold">Dashboard</h1>
					</header>
					<hr className="my-4" />
					{children}

					<Link className={buttonVariants({ variant: "default" })} href="/forms/create">
						Create New Form
					</Link>
				</main>
			</div>
		</div>
	);
}
