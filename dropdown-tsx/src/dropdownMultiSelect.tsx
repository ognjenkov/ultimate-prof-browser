import React, { useState, useEffect } from "react"
import './App.css'
import DropdownModuo from "./DropdownModuo"
interface interfaceImport {
    uniqueSelectedItems: string[],
    setUniqueSelectedItems: React.Dispatch<React.SetStateAction<string[]>>,
    profesori:Profesor[]
  }
  interface Profesor {
    ime: string,
    prezime: string,
    katedra: string[],
    rank: string[],
    _id:string,
    email:string,
    kabinet:string,
    vreme_konsultacija:string,
    prefix:string
  }
export default function DropdownMultiSelect(importVariables: interfaceImport): JSX.Element {
    const [moduo, setModuo] = useState<boolean>(false)
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    // const [uniqueSelectedItems, setUniqueSelectedItems] = useState<string[]>([])
    useEffect(() => {
        importVariables.setUniqueSelectedItems([...new Set(selectedItems)])
        // console.log(uniqueSelectedItems)
       

    }, [selectedItems])
    function removeAButton(button:string){
        const newSelectedItems = selectedItems.filter(item => item!=button)
        const newUniqueSelectedItems = importVariables.uniqueSelectedItems.filter(item => item!=button)
        setSelectedItems(newSelectedItems)
        importVariables.setUniqueSelectedItems(newUniqueSelectedItems)

    }
    function buttonX(){
        setSelectedItems([])
        importVariables.setUniqueSelectedItems([])
        setModuo(false)
    }
    return (
        <>
            <div className="classicWhiteSelect">
                <span className="spanTags">
                    {importVariables.uniqueSelectedItems.length == 0 ? <span>Select:</span> :
                        importVariables.uniqueSelectedItems.map((itemus, index) => (<button key={index} onClick={
                            () => removeAButton(itemus)
                        }>{itemus}</button>))
                    }

                </span>
                <div className="oneLineDiv">
                    <span className="icons" onClick={buttonX}>✖</span>
                    <span className="icons">|</span>
                    <span className="icons" onClick={() => setModuo(!moduo)}>▼</span>
                </div>
            </div>
            {moduo && <DropdownModuo selectedItems={selectedItems} setSelectedItems={setSelectedItems} profesori={importVariables.profesori}/>}
        </>
    )
}