import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ExistingTabMaintainSession } from "./broadcastChannel";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const formDataRef = useRef({
    name: "",
    email: "",
    company: "",
  });

  useEffect(() => {
    ExistingTabMaintainSession({ setIsVisible, formDataRef });
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    formDataRef.current[name] = value;
  }

  if (!isVisible)
    return (
      <>
        <h1>Open another tab to see the result</h1>
        {Object.keys(formDataRef.current).map((key) => (
          <input
            key={key}
            name={key}
            defaultValue={formDataRef.current[key]}
            onChange={handleChange}
            placeholder={`Enter ${key}`}
          />
        ))}
      </>
    );

  const component = (
    <div className="grey-mask">
      <div className="popup">
        <heading>Multi tab opened</heading>
        <button onClick={() => setIsVisible(false)}>Close</button>
      </div>
    </div>
  );

  return createPortal(component, document.body);
}

export default App;
