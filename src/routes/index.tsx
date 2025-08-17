import PowerTimers from "@/components/power-timers";
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
		<div className="text-center">
			<h1>Power Sync</h1>
			<PowerTimers />
		</div>
	);
}
