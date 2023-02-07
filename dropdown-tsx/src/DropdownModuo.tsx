import React, { useEffect, useState } from "react"
interface DeExport {
    selectedItems: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>,
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

export default function DropdownModuo(importDeExport: DeExport): JSX.Element {
    
    const sveKatedre = importDeExport.profesori?.map(x => x.katedra);
    const sveKatedre1 = sveKatedre?.flat(1)
    const katedre = [...new Set(sveKatedre1)]
    
    return (
        <div className="dropdown-moduo">
            <ul>
                {katedre.map((katedra) =>
                    <li className="liItem" key={katedra}
                        onClick={(e) => {
                            importDeExport.setSelectedItems([...importDeExport.selectedItems, katedra])
                        }
                        }>{katedra}</li>)}
            </ul>
        </div>
    )
}