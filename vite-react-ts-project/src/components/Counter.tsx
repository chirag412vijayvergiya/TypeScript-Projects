// import { useState } from "react";

import type { ReactNode } from "react";

// const Counter = () => {
//     // const [count, setCount] = useState<number | null>(1)
//     const [count, setCount] = useState(1);

//     return (
//         <>
//         <div>Counter</div>
//         <h1>Count: {count}</h1>
//         <button onClick={() => setCount((count) => count+1)}>+</button>
//         <button onClick={() => setCount((count) => count-1)}>-</button>
//         </>
//     )

// }

// export default Counter;

type CounterProps = {
    setCount: React.Dispatch<React.SetStateAction<number>>,
    children: ReactNode
}

const Counter = ({setCount, children}: CounterProps) => {

    return (
        <>
        <div>Counter</div>
        <h1>{children}</h1>
        <button onClick={() => setCount((count) => count+1)}>+</button>
        <button onClick={() => setCount((count) => count-1)}>-</button>
        </>
    )

}

export default Counter;