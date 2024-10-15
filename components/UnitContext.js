import { createContext } from 'react';

const UnitContext = createContext({
    unit: 'km',
    setUnit: () => {},
});

export default UnitContext;