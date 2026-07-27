import { forwardRef, useLayoutEffect, useMemo, useRef } from "react";

import { ErrorMessage } from "@components/admin/ui/form";
import { mergeRefs } from "@utils/admin";
import { cn } from "@utils/shared";
const Textarea = forwardRef(
  (
    {
      name,
      error,
      id = null,
      rows = 3,
      textareaClassName,
      errorClassName,
      resizeKey,
      inputRef,
      onInput,
      ...props
    },
    ref,
  ) => {
    const handleInput = (e) => {
      setSize(e.target);
      onInput?.(e);
    };
    const setSize = (el) => {
      el.style.height = "0px";
      el.style.height = `${el.scrollHeight}px`;
    };

    const innerRef = useRef(null);

    useLayoutEffect(() => {
      const el = innerRef.current;
      if (!el) return;
      setSize(el);
    }, [resizeKey]);

    const setRef = useMemo(
      () => mergeRefs(innerRef, ref, inputRef),
      [ref, inputRef],
    );

    return (
      <div className="flex flex-col gap-2">
        <textarea
          onInput={handleInput}
          ref={setRef}
          id={id ?? name}
          rows={rows}
          {...props}
          className={cn(
            "w-full overflow-hidden rounded-md border border-slate-700 bg-slate-900/40 px-3 py-2 text-[15px] text-slate-100 transition-colors duration-200 outline-none hover:border-indigo-500 hover:ring-2 hover:ring-indigo-500/20 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
            textareaClassName,
          )}
        />
        {error && (
          <ErrorMessage surface="dark" className={errorClassName}>
            {error}
          </ErrorMessage>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";
export default Textarea;
