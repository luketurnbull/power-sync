import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { SavePowerTimersInput } from "@/orpc/schema";
import { getTimerErrorMessages } from "@/utils/timer-errors";
import type { Control, FieldArrayWithId, UseFormReturn } from "react-hook-form";
import DaySelectorController from "./day-selector-controller";
import EnabledToggleController from "./enabled-toggle-controller";
import TimerActionsDropdown from "./timer-actions-dropdown";
import TimerErrorAlert from "./timer-error-alert";
import TimerSliderController from "./timer-slider-controller";

interface PowerTimersAccordionProps {
	fields: FieldArrayWithId<SavePowerTimersInput, "powerTimers", "id">[];
	form: UseFormReturn<SavePowerTimersInput>;
	control: Control<SavePowerTimersInput>;
	onDuplicate?: (index: number) => void;
	onDelete?: (index: number) => void;
}

export default function PowerTimersAccordion({
	fields,
	form,
	control,
	onDuplicate,
	onDelete,
}: PowerTimersAccordionProps) {
	const formatTimeRange = (powerOffTime: string, powerOnTime: string) => {
		return `${powerOffTime} - ${powerOnTime}`;
	};

	return (
		<Accordion type="single" collapsible>
			{fields.map((field, index) => {
				const timer = form.watch(`powerTimers.${index}`);
				const timerErrors = form.formState.errors.powerTimers?.[index];
				const errorMessages = getTimerErrorMessages(timerErrors);

				return (
					<div key={field.id} className="space-y-2">
						<AccordionItem value={`timer-${index}`}>
							<div className="relative">
								<div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
									<EnabledToggleController
										index={index}
										control={control}
										form={form}
										timerNumber={timer.timerNumber}
									/>
								</div>
								<div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
									<TimerActionsDropdown
										onDuplicate={() => onDuplicate?.(index)}
										onDelete={() => onDelete?.(index)}
									/>
								</div>
								<AccordionTrigger className="pl-16 pr-16 cursor-pointer">
									<span
										className={cn(
											"text-lg font-medium",
											!timer.enabled && "text-muted-foreground",
											errorMessages.length > 0 && "text-destructive",
										)}
									>
										{formatTimeRange(timer.powerOffTime, timer.powerOnTime)}
									</span>
								</AccordionTrigger>
							</div>
							<AccordionContent className="space-y-8">
								<TimerErrorAlert errorMessages={errorMessages} />

								<TimerSliderController
									index={index}
									control={control}
									disabled={!timer.enabled}
								/>

								<DaySelectorController
									index={index}
									control={control}
									disabled={!timer.enabled}
								/>
							</AccordionContent>
						</AccordionItem>
					</div>
				);
			})}
		</Accordion>
	);
}
