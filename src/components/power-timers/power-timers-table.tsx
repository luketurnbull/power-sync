import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { UseFormReturn, FieldArrayWithId } from "react-hook-form";
import type { SavePowerTimersInput } from "@/orpc/schema";
import TimerSlider from "./timer-slider";

interface PowerTimersTableProps {
	fields: FieldArrayWithId<SavePowerTimersInput, "powerTimers", "id">[];
	form: UseFormReturn<SavePowerTimersInput>;
}

export default function PowerTimersTable({
	fields,
	form,
}: PowerTimersTableProps) {
	return (
		<Table>
			<TableBody>
				{fields.map((field, index) => {
					const timer = form.watch(`powerTimers.${index}`);
					return (
						<TableRow key={field.id}>
							<TableCell className="w-[400px]">
								<TimerSlider
									powerOffTime={timer.powerOffTime}
									powerOnTime={timer.powerOnTime}
									onPowerOffTimeChange={(time) => 
										form.setValue(`powerTimers.${index}.powerOffTime`, time)
									}
									onPowerOnTimeChange={(time) => 
										form.setValue(`powerTimers.${index}.powerOnTime`, time)
									}
									powerOffTimeError={form.formState.errors.powerTimers?.[index]?.powerOffTime?.message}
									powerOnTimeError={form.formState.errors.powerTimers?.[index]?.powerOnTime?.message}
									onValidate={() => form.trigger([`powerTimers.${index}.powerOffTime`, `powerTimers.${index}.powerOnTime`])}
								/>
							</TableCell>
							<TableCell>{timer.daysOfWeek.join(", ")}</TableCell>
							<TableCell>{timer.enabled ? "Yes" : "No"}</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
