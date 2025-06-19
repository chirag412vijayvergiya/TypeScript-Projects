// import Heading from "./components/Heading";
// import { Section } from "./components/Section";
// import Counter from "./components/Counter";
// import List from "./components/List";
// import { useState } from "react";

// function App() {
//   const [count, setCount] = useState(1);

//   return (
//     <div>
//       <h1>I am telling you a Heading</h1>
//       <Heading title="xyz"/>
//       <Section title={"This is my different title"}>
//         <h1>This is my section</h1>
//       </Section>
//       <Counter setCount={setCount}>Count is {count}</Counter>
//       <List items={['apple', 'banana', 'orange']} render={(item: string) => <span className="gold">{item.toUpperCase()}</span>} />
//     </div>
//   )
// }

// export default App

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";

interface Users {
  id: number,
  name: string
}

type fibFunc = (n: number) => number 

const fib: fibFunc = (n) => {
  if (n < 2) return n 
  return fib(n - 1) + fib(n - 2) 
}

const myNum: number = 37 

function App() {
  const [count, setCount] = useState(1);
  const [users, setUsers] = useState<Users[] | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  console.log(inputRef?.current) 
  console.log(inputRef?.current?.value)

  useEffect(() => {
  const fetchedUsers = [
    { id: 1, name: "Chirag" },
    { id: 2, name: "John" },
  ];

  setUsers(fetchedUsers);
}, []);

  useEffect(() => {
    console.log("Mounting")
    console.log("Users :- ", users);

    return () => console.log("Unmounting");
}, [users])

  const addTwo = useCallback((e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement> ): void => setCount(prev => prev + 2), []);

  const result = useMemo<number>(() => fib(myNum),[myNum])

  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={addTwo}></button>
      <h2>{result}</h2>
      <input ref={inputRef} type="text" 
          onChange={() => {
            console.log("Input value:", inputRef.current?.value);
          }}/>
      {users?.map((user, i) => (
            <li key={i}>
                <p>{user.name} with {user.id}</p>
            </li>
        ))}
    </div>
  )
}

export default App
