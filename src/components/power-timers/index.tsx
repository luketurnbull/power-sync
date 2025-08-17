import { orpc } from "@/orpc/client";
import { useQuery } from "@tanstack/react-query";
import PowerTimersAccordion from "./power-timers-accordion";
import PowerTimersTable from "./power-timers-table";

export default function PowerTimers() {
	const { data: powerTimers = [], isLoading } = useQuery(
		orpc.listPowerTimers.queryOptions({
			input: {},
		}),
	);

	if (isLoading) {
		return <div className="text-center py-8">Loading...</div>;
	}

	return (
		<div className="w-full">
			{/* Mobile Accordion View */}
			<div className="block md:hidden">
				<PowerTimersAccordion powerTimers={powerTimers} />
			</div>

			{/* Desktop Table View */}
			<div className="hidden md:block">
				<PowerTimersTable powerTimers={powerTimers} />
			</div>
		</div>
	);
}
