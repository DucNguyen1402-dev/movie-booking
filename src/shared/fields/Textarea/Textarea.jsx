import { forwardRef, useLayoutEffect, useMemo, useRef } from "react";

import { ErrorMessage } from "@shared/fields";
import { mergeRefs } from "@shared/utils";
import { cn } from "@shared/utils";
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
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const innerRef = useRef(null);

    const handleInput = (e) => {
      setSize(e.target);
      onInput?.(e);
    };
    const setSize = (el) => {
      el.style.height = "0px";
      el.style.height = `${el.scrollHeight}px`;
    };

    useLayoutEffect(() => {
      const el = innerRef.current;
      if (!el) return;
      setSize(el);
    }, [resizeKey]);

    // setRef shared textareaElement to all ref in the merge list
    const setRef = useMemo(
      () => mergeRefs(innerRef, ref, inputRef),
      [ref, inputRef],
    );
    return (
      <div className="flex flex-col gap-2">
        <textarea
          name={name}
          onInput={handleInput}
          ref={setRef}
          disabled={disabled}
          id={id ?? name}
          rows={rows}
          {...props}

          className={cn(
            "input",
            disabled ? "input-disabled" : "input-default",
            "overflow-hidden text-[15px]",
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
