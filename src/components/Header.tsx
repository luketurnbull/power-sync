import { Link } from "@tanstack/react-router";
import { PowerCircle } from "lucide-react";

export default function Header() {
	return (
		<header className="p-4 fixed top-0 left-0 right-0 flex gap-2 bg-background text-foreground justify-between border-b border-border">
			<nav className="flex flex-row justify-between container mx-auto items-center">
				<div className="px-2 font-bold">
					<Link
						to="/"
						className="flex items-center gap-2 text-primary hover:text-primary/80"
					>
						<PowerCircle className="w-6 h-6" />
						Power Sync
					</Link>
				</div>

				<div className="text-sm text-muted-foreground">
					by{" "}
					<a
						href="https://github.com/luketurnbull"
						className="hover:underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						Luke Turnbull
					</a>
				</div>
			</nav>
		</header>
	);
}
