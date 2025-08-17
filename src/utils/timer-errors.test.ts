import { describe, it, expect } from "vitest";
import { getTimerErrorMessages, hasTimerErrors } from "./timer-errors";

describe("timer-errors", () => {
	describe("getTimerErrorMessages", () => {
		it("should return empty array when no errors", () => {
			expect(getTimerErrorMessages()).toEqual([]);
			expect(getTimerErrorMessages({})).toEqual([]);
		});

		it("should extract error messages from timer errors", () => {
			const timerErrors = {
				powerOffTime: { type: "required", message: "Please select a power off time" },
				powerOnTime: { type: "required", message: "Please select a power on time" },
				daysOfWeek: { type: "required", message: "Enabled timer must have at least one day selected" },
			} as any;

			const result = getTimerErrorMessages(timerErrors);

			expect(result).toEqual([
				"Please select a power off time",
				"Please select a power on time", 
				"Enabled timer must have at least one day selected"
			]);
		});

		it("should filter out undefined messages", () => {
			const timerErrors = {
				powerOffTime: { type: "required", message: "Please select a power off time" },
				powerOnTime: { type: "required", message: undefined },
				daysOfWeek: {},
			} as any;

			const result = getTimerErrorMessages(timerErrors);

			expect(result).toEqual(["Please select a power off time"]);
		});

		it("should handle mixed error types", () => {
			const timerErrors = {
				powerOffTime: { type: "required", message: "Time error" },
				someOtherField: { type: "required", message: "Other error" },
			} as any;

			const result = getTimerErrorMessages(timerErrors);

			expect(result).toEqual(["Time error", "Other error"]);
		});
	});

	describe("hasTimerErrors", () => {
		it("should return false when no errors", () => {
			expect(hasTimerErrors()).toBe(false);
			expect(hasTimerErrors({})).toBe(false);
		});

		it("should return true when errors exist", () => {
			const timerErrors = {
				powerOffTime: { type: "required", message: "Error" },
			} as any;

			expect(hasTimerErrors(timerErrors)).toBe(true);
		});

		it("should return true even for errors without messages", () => {
			const timerErrors = {
				powerOffTime: {},
			} as any;

			expect(hasTimerErrors(timerErrors)).toBe(true);
		});
	});
});