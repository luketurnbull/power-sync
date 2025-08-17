import { orpc } from "@/orpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
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
	const { data, isLoading } = useQuery(
		orpc.listPowerTimers.queryOptions({
			input: {},
		}),
	);

	const { mutate: updatePowerTimers, isPending } = useMutation({
		mutationFn: orpc.updatePowerTimers.call,
		onSuccess: () => {
			console.info("Power timers updated");
		},
	});

	if (isLoading || !data) return <div>Loading...</div>;

	return (
		<div className="text-center">
			<h1>Power Sync</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<button
				type="button"
				onClick={() => updatePowerTimers({ powerTimers: data })}
				disabled={isPending}
			>
				{isPending ? "Updating..." : "Update Power Timers"}
			</button>
		</div>
	);
}
