import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ExistingTabMaintainSession } from './broadcastChannel';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData , setFormData]  =  useState({
    name:'',
    email:'',
    company:''
  })

  useEffect(() => {
    console.log('sarthak');
    ExistingTabMaintainSession({ setIsVisible });
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  if (!isVisible) return <>
  
    <h1>open another tab to see result</h1>

    {Object.keys(formData).map((key) => (
      <input
        key={key}
        name={key}
        value={formData[key]}
        onChange={handleChange}
        placeholder={`Enter ${key}`}
      />
    ))}
  </>
  

  const component = (
    <div class="grey-mask">
      <div className="popup">
        <heading>Multi tab openedd</heading>
        <button onClick={()=>setIsVisible(false)}>Close</button>
      </div>
    </div>
  );
  return createPortal(component, document.body);
}

export default App;
