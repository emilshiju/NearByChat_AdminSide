

import { createContext ,useState} from 'react';


export const responsiveContext=createContext('')


export const Responsive=({children})=>{

  const [responsiveMd,setResponsiveMd]=useState(true)

  return (
    <responsiveContext.Provider  value={{responsiveMd,setResponsiveMd}}>
      {children}
    </responsiveContext.Provider>
  )
}