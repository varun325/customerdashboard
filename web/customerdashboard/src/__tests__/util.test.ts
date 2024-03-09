import { parseDateTime } from "@/lib/utils";

describe("parseDateTime", () => {
    it("parses date and time correctly", () => {
        const dateTimeString = "2022-01-01T00:00:00.000Z";
        const { date, time } = parseDateTime(dateTimeString);
        expect(date).toBe("2022-01-01");
        expect(time).toBe("00:00:00");
    });
});