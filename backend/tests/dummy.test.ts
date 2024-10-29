import { expect } from "jsr:@std/expect";

import { dummy } from "../src/utils/dummy.ts";

Deno.test("dummy test", () => {
    expect(dummy()).toBe("dummy");
});
