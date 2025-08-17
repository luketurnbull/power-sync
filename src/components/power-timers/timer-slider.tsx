import { Clock } from "lucide-react";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";

interface TimerSliderProps {
	powerOffTime: string;
	powerOnTime: string;
	onPowerOffTimeChange: (time: string) => void;
	onPowerOnTimeChange: (time: string) => void;
	powerOffTimeError?: string;
	powerOnTimeError?: string;
	onValidate?: () => void;
	disabled?: boolean;
}

export default function TimerSlider({
	powerOffTime,
	powerOnTime,
	onPowerOffTimeChange,
	onPowerOnTimeChange,
	powerOffTimeError,
	powerOnTimeError,
	onValidate,
	disabled = false,
}: TimerSliderProps) {
	// Convert time string to minutes since midnight
	const timeToMinutes = (time: string): number => {
		if (!time || !time.includes(":")) return 0;
		const [hours, minutes] = time.split(":").map(Number);
		if (Number.isNaN(hours) || Number.isNaN(minutes)) return 0;
		return hours * 60 + minutes;
	};

	// Convert minutes since midnight to time string
	const minutesToTime = (minutes: number): string => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
	};

	const powerOffMinutes = timeToMinutes(powerOffTime);
	const powerOnMinutes = timeToMinutes(powerOnTime);

	const handleSliderChange = (values: number[]) => {
		if (values.length === 2) {
			onPowerOffTimeChange(minutesToTime(values[0]));
			onPowerOnTimeChange(minutesToTime(values[1]));
			onValidate?.();
		}
	};

	const handlePowerOffInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		onPowerOffTimeChange(e.target.value);
		onValidate?.();
	};

	const handlePowerOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onPowerOnTimeChange(e.target.value);
		onValidate?.();
	};

	return (
		<div className="space-y-2">
			{/* Mobile: Inputs in row, Desktop: All in row */}
			<div className="flex flex-col md:flex-row md:items-center gap-4">
				{/* Mobile: Both inputs in grid, Desktop: Just start input */}
				<div className="grid grid-cols-2 gap-4 md:grid-cols-1 md:w-24">
					<Input
						type="time"
						value={powerOffTime}
						onChange={handlePowerOffInputChange}
						startIcon={<Clock className="w-4 h-4" />}
						aria-invalid={!!powerOffTimeError}
						disabled={disabled}
					/>
					{/* End input - hidden on desktop, shown on mobile */}
					<Input
						type="time"
						value={powerOnTime}
						onChange={handlePowerOnInputChange}
						startIcon={<Clock className="w-4 h-4" />}
						className="md:hidden"
						aria-invalid={!!powerOnTimeError}
						disabled={disabled}
					/>
				</div>

				{/* Slider - separate row on mobile, middle on desktop */}
				<div className="md:flex-1 px-2">
					<Slider
						value={[powerOffMinutes, powerOnMinutes]}
						onValueChange={handleSliderChange}
						max={1439} // 23:59 in minutes
						min={0}
						step={15}
						className="relative"
						disabled={disabled}
					/>
				</div>

				{/* End input - hidden on mobile, shown on desktop */}
				<Input
					type="time"
					value={powerOnTime}
					onChange={handlePowerOnInputChange}
					startIcon={<Clock className="w-4 h-4" />}
					className="hidden md:block md:w-24"
					aria-invalid={!!powerOnTimeError}
					disabled={disabled}
				/>
			</div>
		</div>
	);
}
