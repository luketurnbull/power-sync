import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import type { PowerTimer } from "@/orpc/schema";

interface PowerTimersAccordionProps {
	powerTimers: PowerTimer[];
}

export default function PowerTimersAccordion({
	powerTimers,
}: PowerTimersAccordionProps) {
	const formatTimeRange = (timer: PowerTimer) => {
		return `${timer.powerOffTime} - ${timer.powerOnTime}`;
	};

	return (
		<Accordion type="single">
			{powerTimers.map((timer, index) => (
				<AccordionItem key={timer.timerNumber} value={`timer-${index}`}>
					<AccordionTrigger>{formatTimeRange(timer)}</AccordionTrigger>
					<AccordionContent>
						<div className="text-sm text-muted-foreground">
							Days: {timer.daysOfWeek.join(", ")}
						</div>
						<div className="text-sm text-muted-foreground">
							Enabled: {timer.enabled ? "Yes" : "No"}
						</div>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
