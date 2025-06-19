import Heading from "./components/Heading";
import { Section } from "./components/Section";
import Counter from "./components/Counter";
import List from "./components/List";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(1);

  return (
    <div>
      <h1>I am telling you a Heading</h1>
      <Heading title="xyz"/>
      <Section title={"This is my different title"}>
        <h1>This is my section</h1>
      </Section>
      <Counter setCount={setCount}>Count is {count}</Counter>
      <List items={['apple', 'banana', 'orange']} render={(item: string) => <span className="gold">{item.toUpperCase()}</span>} />
    </div>
  )
}

export default App
