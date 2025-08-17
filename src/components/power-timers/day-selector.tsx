import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

type DayOfWeek =
	| "MONDAY"
	| "TUESDAY"
	| "WEDNESDAY"
	| "THURSDAY"
	| "FRIDAY"
	| "SATURDAY"
	| "SUNDAY";

const DAYS = [
	{ short: "Mon", full: "MONDAY" as const },
	{ short: "Tue", full: "TUESDAY" as const },
	{ short: "Wed", full: "WEDNESDAY" as const },
	{ short: "Thu", full: "THURSDAY" as const },
	{ short: "Fri", full: "FRIDAY" as const },
	{ short: "Sat", full: "SATURDAY" as const },
	{ short: "Sun", full: "SUNDAY" as const },
];

interface DaySelectorProps {
	selectedDays: DayOfWeek[];
	onDaysChange: (days: DayOfWeek[]) => void;
	error?: string;
}

export default function DaySelector({
	selectedDays,
	onDaysChange,
	error,
}: DaySelectorProps) {
	return (
		<div className="space-y-2">
			<ToggleGroup
				type="multiple"
				value={selectedDays}
				onValueChange={onDaysChange}
				variant="outline"
				size="lg"
				className="w-full"
			>
				{DAYS.map((day) => (
					<ToggleGroupItem
						key={day.full}
						value={day.full}
						aria-label={`Toggle ${day.full.toLowerCase()}`}
					>
						{day.short}
					</ToggleGroupItem>
				))}
			</ToggleGroup>

			{error && <p className="text-sm text-destructive">{error}</p>}
		</div>
	);
}
