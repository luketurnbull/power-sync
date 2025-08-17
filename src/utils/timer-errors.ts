import type { FieldErrors } from "react-hook-form";
import type { SavePowerTimersInput } from "@/orpc/schema";

/**
 * Extracts and maps error messages for a specific timer from form errors
 * @param timerErrors - The form errors for a specific timer
 * @returns An array containing all error messages
 */
export function getTimerErrorMessages(
	timerErrors?: FieldErrors<SavePowerTimersInput["powerTimers"][0]>
): string[] {
	if (!timerErrors) {
		return [];
	}

	return Object.values(timerErrors)
		.map(error => error?.message)
		.filter((message): message is string => typeof message === "string");
}

/**
 * Checks if a timer has any validation errors
 * @param timerErrors - The form errors for a specific timer
 * @returns True if there are any errors, false otherwise
 */
export function hasTimerErrors(
	timerErrors?: FieldErrors<SavePowerTimersInput["powerTimers"][0]>
): boolean {
	return timerErrors ? Object.keys(timerErrors).length > 0 : false;
}