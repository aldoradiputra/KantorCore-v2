'use client';

import { useEffect, useRef } from 'react';

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  indeterminate?: boolean;
};

/** A `.kc-check` checkbox that also supports the native indeterminate state,
 * which can only be set imperatively on the DOM node. */
export function Checkbox({ indeterminate = false, className, ...rest }: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      className={`kc-check${className ? ` ${className}` : ''}`}
      {...rest}
    />
  );
}
