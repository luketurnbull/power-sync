import { z } from "zod";

export const powerTimerSchema = z
	.object({
		timerNumber: z.number().int().min(1),
		enabled: z.boolean(),
		powerOffTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
			message: "Please select a power off time",
		}),
		powerOnTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
			message: "Please select a power on time",
		}),
		daysOfWeek: z.array(
			z.enum([
				"MONDAY",
				"TUESDAY",
				"WEDNESDAY",
				"THURSDAY",
				"FRIDAY",
				"SATURDAY",
				"SUNDAY",
			]),
		),
	})
	.refine(
		(data) => {
			if (!data.enabled) return true;
			return data.daysOfWeek.length > 0;
		},
		{
			message: "Enabled timer must have at least one day selected",
			path: ["daysOfWeek"],
		},
	)
;

export const powerTimersArraySchema = z
	.array(powerTimerSchema)
	.max(7, "Maximum 7 timers allowed")
	.min(0, "At least 0 timers required");

export const savePowerTimersInputSchema = z.object({
	powerTimers: powerTimersArraySchema,
});

export const savePowerTimersOutputSchema = z.void();

export type PowerTimer = z.infer<typeof powerTimerSchema>;
export type SavePowerTimersInput = z.infer<typeof savePowerTimersInputSchema>;
