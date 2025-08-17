import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import type { SavePowerTimersInput } from "@/orpc/schema";
import { getTimerErrorMessages } from "@/utils/timer-errors";
import type { Control, FieldArrayWithId, UseFormReturn } from "react-hook-form";
import DaySelectorController from "./day-selector-controller";
import EnabledToggleController from "./enabled-toggle-controller";
import TimerErrorAlert from "./timer-error-alert";
import TimerSliderController from "./timer-slider-controller";

interface PowerTimersAccordionProps {
	fields: FieldArrayWithId<SavePowerTimersInput, "powerTimers", "id">[];
	form: UseFormReturn<SavePowerTimersInput>;
	control: Control<SavePowerTimersInput>;
}

export default function PowerTimersAccordion({
	fields,
	form,
	control,
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
								<AccordionTrigger className="pl-16 cursor-pointer">
									<span className="text-lg font-medium">
										{formatTimeRange(timer.powerOffTime, timer.powerOnTime)}
									</span>
								</AccordionTrigger>
							</div>
							<AccordionContent className="space-y-4">
								<TimerSliderController index={index} control={control} />

								<DaySelectorController index={index} control={control} />
							</AccordionContent>
						</AccordionItem>

						<TimerErrorAlert errorMessages={errorMessages} />
					</div>
				);
			})}
		</Accordion>
	);
}
