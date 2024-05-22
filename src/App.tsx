import React, { useState } from 'react';
import Doubling from './arrays/Doubling';
import Sitarski from './arrays/Sitarski';
import Brodnik from './arrays/Brodnik';
import DoublingVisualization from './components/DoublingVisualization';
import SitarskiVisualization from './components/SitarskiVisualization';
import BrodnikVisualization from './components/BrodnikVisualization';

function App() {
    const [doublingArray, setDoublingArray] = useState(new Doubling());
    const [sitarskiArray, setSitarskiArray] = useState(new Sitarski());
    const [brodnikArray, setBrodnikArray] = useState(new Brodnik());
    const [inputValue, setInputValue] = useState(1);

    const handleAdd = () => {
        const newDoubling = new Doubling();
        newDoubling.copyFrom(doublingArray);
        const newSitarski = new Sitarski();
        newSitarski.copyFrom(sitarskiArray);
        const newBrodnik = new Brodnik();
        newBrodnik.copyFrom(brodnikArray);

        for (let i = 0; i < inputValue; i++) {
            newDoubling.addElement();
            newSitarski.addElement(newSitarski.getElementCount() + 1);
            newBrodnik.addElement(newBrodnik.getElementCount() + 1);
        }

        setDoublingArray(newDoubling);
        setSitarskiArray(newSitarski);
        setBrodnikArray(newBrodnik);
        setInputValue(1);
    };

    const handleRemove = () => {
        const newDoubling = new Doubling();
        newDoubling.copyFrom(doublingArray);
        const newSitarski = new Sitarski();
        newSitarski.copyFrom(sitarskiArray);
        const newBrodnik = new Brodnik();
        newBrodnik.copyFrom(brodnikArray);

        for (let i = 0; i < inputValue; i++) {
            if (newDoubling.getElementCount() > 0) {
                newDoubling.removeElement();
            }
            if (newSitarski.getElementCount() > 0) {
                newSitarski.removeElement();
            }
            if (newBrodnik.getElementCount() > 0) {
                newBrodnik.removeElement();
            }
        }

        setDoublingArray(newDoubling);
        setSitarskiArray(newSitarski);
        setBrodnikArray(newBrodnik);
        setInputValue(1);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(Math.max(1, parseInt(event.target.value, 10)));
    };

    return (
        <div className="App">
            <header className="wrapper">
                <h1>Dynamic Arrays</h1>
                <input type="number" value={inputValue} onChange={handleChange} min="1" />
                <div className="button-container">
                    <button onClick={handleAdd}>Add Elements</button>
                    <button onClick={handleRemove}>Remove Elements</button>
                </div>
                <div className="array-container" style={{ height: '100px' }}>
                    <h2>Doubling Array:</h2>
                    <DoublingVisualization 
                      totalUnits={doublingArray.getCapacity()}
                      filledUnits={doublingArray.getElementCount()}
                    />
                </div>
                <div className="array-row">
                    <div className="array-container">
                        <h2>Sitarski Array:</h2>
                        <SitarskiVisualization 
                          hat={sitarskiArray.getArray()}
                        />
                    </div>
                    <div className="array-container">
                        <h2>Brodnik Array:</h2>
                        <BrodnikVisualization data={brodnikArray.getArray()} />
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
