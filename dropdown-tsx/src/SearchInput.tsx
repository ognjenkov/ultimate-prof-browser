import React from 'react'
import './App.css'
interface interfaceImport {
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
}
export default function SearchInput(importovaneVariable: interfaceImport): JSX.Element  {
  return (
    <div className="searchInputDiv">
        <input value={importovaneVariable.query}type="text" name="" id="" placeholder='Search:' onChange={(e)=>importovaneVariable.setQuery(e.target.value)}/>
        <span>$</span>

    </div>
  )
}
