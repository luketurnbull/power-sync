import { orpc } from "@/orpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function PowerTimers() {
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

	return (
		<div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
