import { assert } from "https://deno.land/std@0.215.0/assert/assert.ts";
import { assertEquals } from "https://deno.land/std@0.215.0/assert/mod.ts";
import { SetWithContentEquality } from "./main.ts";

Deno.test("SetWithContentEquality", () => {
  const set = new SetWithContentEquality<
    { from: string; to: string; enabled: boolean }
  >((v) => {
    return v.from + "|" + v.to;
  });
  set.add({ from: "one", to: "second", enabled: false });
  assert(set.length == 1);
  set.add({ from: "one", to: "second", enabled: true });
  assert(set.length == 1);
  set.add({ from: "second", to: "third", enabled: true });
  assert(set.length == 2);
  set.add({ from: "second", to: "third", enabled: false });
  assert(set.length == 2);
  const cloned = set.clone();
  assert(cloned.length == 2);

  const v = set.get("one|second");
  assertEquals(v, { from: "one", to: "second", enabled: true });
  const absent = set.get("some|second");
  assertEquals(absent, undefined);
  const s = set.get("second|third");
  assertEquals(s, { from: "second", to: "third", enabled: false });
  const deleted = set.delete({
    from: "second",
    to: "third",
    enabled: true, /*this value shouldn't matter*/
  });
  assertEquals(deleted, { from: "second", to: "third", enabled: false });
  const del = set.delete("one|second");
  assertEquals(del, { from: "one", to: "second", enabled: true });
  const d = set.get("one|second");
  assertEquals(d, undefined);
  assert(set.length == 0);
});
