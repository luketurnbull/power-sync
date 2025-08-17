import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import type { SavePowerTimersInput } from "@/orpc/schema";
import type { FieldArrayWithId, UseFormReturn } from "react-hook-form";
import DaySelector from "./day-selector";
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
									powerOffTimeError={
										form.formState.errors.powerTimers?.[index]?.powerOffTime
											?.message
									}
									powerOnTimeError={
										form.formState.errors.powerTimers?.[index]?.powerOnTime
											?.message
									}
									onValidate={() =>
										form.trigger([
											`powerTimers.${index}.powerOffTime`,
											`powerTimers.${index}.powerOnTime`,
										])
									}
								/>
							</TableCell>
							<TableCell>
								<DaySelector
									selectedDays={timer.daysOfWeek}
									onDaysChange={(days) =>
										form.setValue(`powerTimers.${index}.daysOfWeek`, days)
									}
									error={
										form.formState.errors.powerTimers?.[index]?.daysOfWeek
											?.message
									}
								/>
							</TableCell>
							<TableCell>
								<Switch
									checked={timer.enabled}
									onCheckedChange={(enabled) =>
										form.setValue(`powerTimers.${index}.enabled`, enabled)
									}
									aria-label={`${timer.enabled ? "Disable" : "Enable"} timer ${timer.timerNumber}`}
								/>
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
