import {
	type PowerTimer,
	type SavePowerTimersInput,
	savePowerTimersInputSchema,
} from "@/orpc/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2, Plus, Save } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import PowerTimersAccordion from "./power-timers-accordion";
import PowerTimersTable from "./power-timers-table";

interface PowerTimersFormProps {
	powerTimers: PowerTimer[];
	onSubmit: (data: SavePowerTimersInput) => void;
	isSubmitting?: boolean;
}

export default function PowerTimersForm({
	powerTimers,
	onSubmit,
	isSubmitting = false,
}: PowerTimersFormProps) {
	const form = useForm<SavePowerTimersInput>({
		resolver: zodResolver(savePowerTimersInputSchema),
		mode: "onChange",
		defaultValues: {
			powerTimers,
		},
	});

	const { fields, append } = useFieldArray({
		control: form.control,
		name: "powerTimers",
	});

	const addTimer = () => {
		const newTimer: PowerTimer = {
			timerNumber: fields.length + 1,
			enabled: true,
			powerOffTime: "09:00",
			powerOnTime: "17:00",
			daysOfWeek: [],
		};

		append(newTimer);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full flex flex-col gap-4"
			>
				{form.formState.errors.powerTimers?.root?.message && (
					<Alert variant="destructive">
						<AlertCircle className="w-4 h-4" />
						<AlertTitle>Too many timers</AlertTitle>
						<AlertDescription>
							{form.formState.errors.powerTimers.root.message}
						</AlertDescription>
					</Alert>
				)}

				{/* Mobile Accordion View */}
				<div className="block md:hidden">
					<PowerTimersAccordion
						fields={fields}
						form={form}
						control={form.control}
					/>
				</div>

				{/* Desktop Table View */}
				<div className="hidden md:block">
					<PowerTimersTable
						fields={fields}
						form={form}
						control={form.control}
					/>
				</div>

				<div className="flex flex-col md:flex-row justify-end gap-2">
					<Button type="button" variant="outline" onClick={addTimer}>
						<Plus className="w-4 h-4" />
						Add New
					</Button>
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? (
							<>
								<Loader2 className="w-4 h-4 animate-spin" />
								Saving...
							</>
						) : (
							<>
								<Save className="w-4 h-4" />
								Save
							</>
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
}
