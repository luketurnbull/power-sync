import PowerTimers from "@/components/power-timers/index";
import { orpc } from "@/orpc/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
	loader: async ({ context }) => {
		await context.queryClient.prefetchQuery(
			orpc.listPowerTimers.queryOptions({
				input: {},
			}),
		);
	},
});

function App() {
	return (
		<div className="py-30 flex flex-col items-center px-4 container mx-auto gap-10">
			<div className="flex flex-col gap-4 items-center">
				<h1 className="text-5xl font-bold text-primary">Power Sync</h1>
				<p className="text-lg text-muted-foreground">
					Manage your power timers.
				</p>
			</div>

			<PowerTimers />
		</div>
	);
}
