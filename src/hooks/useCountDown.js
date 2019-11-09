import { useState, useEffect, useRef } from 'react'
//  倒计时
export default function useCountDown() {
    const ref = useRef();
    const [num, setNum] = useState(0);
    const stop = () => {
        if (ref.current) {
            clearTimeout(ref.current);
        }
    };
    const start = targetNum => {
        setNum(targetNum);
    };
    const reStart = targetNum => {
        if (ref.current) {
            clearTimeout(ref.current);
            setNum(targetNum);
        }
    };
    const reset = () => {
        if (ref.current) {
            clearTimeout(ref.current);
            setNum(0);
        }
    };
    useEffect(() => {
        if (num > 0) {
            const newNum = num - 1
            const iTimer = setTimeout(() => setNum(newNum), 1000);
            ref.current = iTimer;
        }
        return () => {
            if (ref.current) {
                clearTimeout(ref.current);
            }
        };
    }, [num]);
    return {
        stop,
        start,
        reStart,
        reset,
        isRunning: num > 0,
        num
    };
}
