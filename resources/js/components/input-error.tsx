import React from "react";

function InputError({
    message,
    className = "",
    ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <p {...props} className={"text-sm text-red-500 mt-2" + className}>
            {message}
        </p>
    ) : null;
}

export default InputError;
