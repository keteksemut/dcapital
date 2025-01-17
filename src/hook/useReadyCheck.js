import { useState, useMemo, useEffect } from "react";
import { useDocumentReadyState } from "@darkroom.engineering/hamo";

export default function useReadyCheck() {
    const { delay: mainDelay = 100, condition: mainCondition = true } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    const readyState = useDocumentReadyState();

    const delayCheck = function () {
        const { delay: innerDelay = 0, condition: innerCondition = true } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        const [isReady, setIsReady] = useState(false);

        useEffect(() => {
            if (!innerCondition) return;
            let timeoutId = setTimeout(() => {
                setIsReady(true);
            }, innerDelay);
            return () => {
                clearTimeout(timeoutId);
            };
        }, [innerDelay, innerCondition]);

        return isReady;
    }({
        delay: mainDelay,
        condition: mainCondition
    });

    const isReady = useMemo(() => delayCheck && ["interactive", "complete"].includes(readyState), [readyState, delayCheck]);
    return isReady;
}
