import { useCallback, useEffect } from "react";

export const useClickOutside = (ref, callback) => {
    const handleClickOutside = useCallback(
        (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        },
        [ref, callback]
    );

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside, ref]);
};