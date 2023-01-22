import { useRef, useState, useEffect, useCallback } from "react";
import { parse, parseToRun, markdownToRehypeReact, markdownToReactComponent } from "./lib";
import content from "./content.md?raw";

function App() {
  const mountRef = useRef(false);
  const [output, setOutput] = useState<any>();

  const parser = useCallback(async () => {
    const debugParse = await parse(content);
    console.log('Parse', debugParse);
    const debugParseToRun = await parseToRun(content);
    console.log('Parse To Run', debugParseToRun);
    const debugRehypeReact = await markdownToRehypeReact(content);
    console.log(debugRehypeReact);
    const parseData = await markdownToReactComponent(content);
    setOutput(parseData);
  }, []);

  useEffect(() => {
    if (mountRef.current === false) {
      mountRef.current = true;
      parser();
    }
  }, [parser]);

  return (
    <div className="App">
      <div className="card">
        <h3>Vite + React</h3>
        <p>Markdown Parser result is below</p>
      </div>
      <div>
        {output && output.result}
      </div>
    </div>
  );
}

export default App;
