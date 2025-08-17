import { os } from "@orpc/server";
import * as z from "zod";
import { type PowerTimer, powerTimersArraySchema } from "../schema";

const powerTimers: PowerTimer[] = [
	{
		timerNumber: 1,
		enabled: true,
		powerOnTime: "13:00",
		powerOffTime: "17:00",
		daysOfWeek: ["MONDAY", "WEDNESDAY", "FRIDAY"],
	},
	{
		timerNumber: 2,
		enabled: true,
		powerOnTime: "06:00",
		powerOffTime: "10:00",
		daysOfWeek: ["MONDAY", "TUESDAY", "SATURDAY", "SUNDAY"],
	},
	{
		timerNumber: 3,
		enabled: false,
		powerOnTime: "05:00",
		powerOffTime: "19:00",
		daysOfWeek: ["SATURDAY", "SUNDAY"],
	},
];

export const listPowerTimers = os.input(z.object({})).handler(() => {
	return powerTimers;
});

export const updatePowerTimers = os
	.input(z.object({ powerTimers: powerTimersArraySchema }))
	.handler(async ({ input }) => {
		// TODO: This will just call the mock function outlined in the requirements
		console.info("Updating power timers", input.powerTimers);

		// Show timeout to replicate loading state

		await new Promise((resolve) => setTimeout(resolve, 5000));

		return {
			success: true,
		};
	});
