import { orpc } from "@/orpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { type SavePowerTimersInput } from "@/orpc/schema";
import PowerTimersForm from "./power-timers-form";

export default function PowerTimers() {
	const { data: powerTimers = [], isLoading } = useQuery(
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

	const handleSubmit = (data: SavePowerTimersInput) => {
		updatePowerTimers(data);
	};

	if (isLoading) {
		return <div className="text-center py-8">Loading...</div>;
	}

	return (
		<PowerTimersForm 
			powerTimers={powerTimers} 
			onSubmit={handleSubmit}
			isSubmitting={isPending}
		/>
	);
}
