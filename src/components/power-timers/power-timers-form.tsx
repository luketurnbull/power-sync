import { Plus, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { savePowerTimersInputSchema, type SavePowerTimersInput, type PowerTimer } from "@/orpc/schema";
import PowerTimersAccordion from "./power-timers-accordion";
import PowerTimersTable from "./power-timers-table";

interface PowerTimersFormProps {
	powerTimers: PowerTimer[];
	onSubmit: (data: SavePowerTimersInput) => void;
	isSubmitting?: boolean;
}

export default function PowerTimersForm({ powerTimers, onSubmit, isSubmitting = false }: PowerTimersFormProps) {
	const form = useForm<SavePowerTimersInput>({
		resolver: zodResolver(savePowerTimersInputSchema),
		defaultValues: {
			powerTimers,
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
				{/* Mobile Accordion View */}
				<div className="block md:hidden">
					<PowerTimersAccordion form={form} />
				</div>

				{/* Desktop Table View */}
				<div className="hidden md:block">
					<PowerTimersTable form={form} />
				</div>

				<div className="flex flex-col md:flex-row justify-end gap-2">
					<Button type="button" variant="outline">
						<Plus className="w-4 h-4" />
						Add New
					</Button>
					<Button type="submit" disabled={isSubmitting}>
						<Save className="w-4 h-4" />
						{isSubmitting ? "Saving..." : "Save"}
					</Button>
				</div>
			</form>
		</Form>
	);
}