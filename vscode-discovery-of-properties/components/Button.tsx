import { IS_BROWSER } from "$fresh/runtime.ts";
import { JSX } from "preact";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="px-2 py-1 border-gray-500 border-2 rounded bg-white hover:bg-gray-200 transition-colors"
    />
  );
}

export const GroupItems = (
  { prefix, value, postfix, title }: {
    prefix: string; // <- From here Shift-F12 won't discover the usage
    value: number;
    postfix: string;
    title: string;
  },
) => {
  return (
    <>
      <span title={title}>
        {prefix}
        <span>
          {value}
          {postfix}
        </span>
      </span>
    </>
  );
};
