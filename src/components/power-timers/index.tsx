import { orpc } from "@/orpc/client";
import { useQuery } from "@tanstack/react-query";
import { Plus, Save } from "lucide-react";
import { Button } from "../ui/button";
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
		<div className="w-full flex flex-col gap-4">
			{/* Mobile Accordion View */}
			<div className="block md:hidden">
				<PowerTimersAccordion powerTimers={powerTimers} />
			</div>

			{/* Desktop Table View */}
			<div className="hidden md:block">
				<PowerTimersTable powerTimers={powerTimers} />
			</div>

			<div className="flex flex-col md:flex-row justify-end gap-2">
				<Button variant="outline">
					<Plus className="w-4 h-4" />
					Add New
				</Button>
				<Button>
					<Save className="w-4 h-4" />
					Save
				</Button>
			</div>
		</div>
	);
}
