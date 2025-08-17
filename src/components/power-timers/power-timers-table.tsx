import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { SavePowerTimersInput } from "@/orpc/schema";
import { getTimerErrorMessages } from "@/utils/timer-errors";
import type { Control, FieldArrayWithId, UseFormReturn } from "react-hook-form";
import DaySelectorController from "./day-selector-controller";
import EnabledToggleController from "./enabled-toggle-controller";
import TimerErrorAlert from "./timer-error-alert";
import TimerSliderController from "./timer-slider-controller";

interface PowerTimersTableProps {
	fields: FieldArrayWithId<SavePowerTimersInput, "powerTimers", "id">[];
	form: UseFormReturn<SavePowerTimersInput>;
	control: Control<SavePowerTimersInput>;
}

export default function PowerTimersTable({
	fields,
	form,
	control,
}: PowerTimersTableProps) {
	return (
		<div className="space-y-4">
			{fields.map((field, index) => {
				const timer = form.watch(`powerTimers.${index}`);
				const timerErrors = form.formState.errors.powerTimers?.[index];
				const errorMessages = getTimerErrorMessages(timerErrors);

				return (
					<div key={field.id} className="space-y-2">
						<Table>
							<TableBody>
								<TableRow>
									<TableCell className="w-[400px]">
										<TimerSliderController 
											index={index} 
											control={control} 
											disabled={!timer.enabled}
										/>
									</TableCell>
									<TableCell>
										<DaySelectorController 
											index={index} 
											control={control} 
											disabled={!timer.enabled}
										/>
									</TableCell>
									<TableCell className="text-right">
										<EnabledToggleController
											index={index}
											control={control}
											form={form}
											timerNumber={timer.timerNumber}
										/>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>

						<TimerErrorAlert errorMessages={errorMessages} />
					</div>
				);
			})}
		</div>
	);
}
