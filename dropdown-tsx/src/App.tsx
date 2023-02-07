import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import DropdownMultiSelect from './dropdownMultiSelect'
import SearchInput from './SearchInput'
import exportFromJSON from 'export-from-json'

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
function exportJson(data1:Profesor[]){
  const data = data1
  const fileName = 'download'  
  const exportType = 'xls' 
  exportFromJSON({ data, fileName, exportType }) 
} 

function App() {
  const [query, setQuery] = useState<string>("");
  const [profesori, setProfesori] = useState<Profesor[]>([]);
  useEffect(() => {
    fetch(`http://localhost:3000/professors`, {
      method: 'GET',
    }).then(res => res.json())
      .then((res: Profesor[]) => {
        setProfesori(res)
      });
  }, [])
  const [tagovaniProfesori, setTagovaniProfesori] = useState<Profesor[]>(profesori);//ovo nisi morao kao state ,mislim, mozda si mogao samo promenljivu
  // const [profesorAfterQuery, setProfesorAfterQuery] = useState<Profesor[]>(profesori);
  

  //ovo dole mozes i da zoves unique selected tags takodje ne zaboravi ovo da drilujes
  const [uniqueSelectedItems, setUniqueSelectedItems] = useState<string[]>([])
  
  // dev log 3 , ipak izgleda da radi sve kako treba ali zbog nekog razloga mi se ne loaduju profesori vrv negde drugde problem
  // mislim da mozes ceo useEffect da preskocis al videcu
  useEffect(()=>{
    if(uniqueSelectedItems.length != 0){
      
      let noviProfesori = profesori.filter(profesor => profesor.katedra.some(item=> uniqueSelectedItems.includes(item)))
      setTagovaniProfesori(noviProfesori)
      console.log("uniqueselecteditems leng NIJE 0")
    }
    if(uniqueSelectedItems.length==0){
      setTagovaniProfesori(profesori)
      console.log("uniqueselecteditems leng NIJE 0")
    }
    
  },[uniqueSelectedItems, profesori])// ZAJEBANA SITUACIJA < OVAJ USEEFFECT NIJE VIDEO PROFESORE DOK GA NISAM DODAO U TRIGGERE, PROBLEM JE STO SAD IMAM 5 rerendera na svaki klik jbg DEV LOG 20
  // const filtriraniProf:Profesor[]= profesori.forEach(prof => prof.forEach(property=> property.filter())) OVDE SI STAO
  const filtriraniProf:Profesor[]= profesori.filter(profesor =>{
    let ime_prezime = profesor.ime.concat(" ").concat(profesor.prezime)
    let prezime_ime = profesor.prezime.concat(" ").concat(profesor.ime)
    let TF= false;
    profesor.katedra.forEach(k=> {
        if(k.toLowerCase().includes(query.toLowerCase()))
        {
          TF =true;
        }
    })
    return TF || profesor.ime.toLowerCase().includes(query.toLowerCase()) || profesor.prezime.toLowerCase().includes(query.toLowerCase()) || ime_prezime.toLowerCase().includes(query.toLowerCase()) || prezime_ime.toLowerCase().includes(query.toLowerCase())
  })
  //hotfix might be to just make konacniProf a state which updated triggers a dom rerender
  
  const konacniProf:Profesor[]= tagovaniProfesori.filter(value => filtriraniProf.includes(value));
 
  
  
  return (
    <div className="App">
      <div className="flexContainer">
        <div className="leftFlex">
          <SearchInput query={query} setQuery={setQuery}/>
          <DropdownMultiSelect uniqueSelectedItems={uniqueSelectedItems} setUniqueSelectedItems={setUniqueSelectedItems} profesori={profesori}/>
          <button type='button' onClick={()=> exportJson(konacniProf)}>ExportJson</button>
        </div>
        
      
  
        <div className="results">
          {
            konacniProf?.map(profesor =>{
              let img_link = "http://www.fon.bg.ac.rs/wp-content/uploads/nastavnici/";
              let prof_link = "http://www.fon.bg.ac.rs/o-fakultetu/organizacija/nastavnici/";
              let img_link_2 = img_link.concat(profesor.ime.toLowerCase()).concat("-").concat(profesor.prezime.includes(" ")?profesor.prezime.replace(" ", "-").toLowerCase():profesor.prezime.toLowerCase()).concat(".jpg");
              let prof_link_2 = prof_link.concat(profesor.ime.toLowerCase()).concat("-").concat(profesor.prezime.includes(" ")?profesor.prezime.replace(" ", "-").toLowerCase():profesor.prezime.toLowerCase()).concat("/")
              return (
                <div className='pojedinacniProfesor' key={profesor._id} >
                  <a href={prof_link_2} target="_blank">
                    <img className='profImg' src={img_link_2} alt="alt" onError={(e) => e.target.src="http://www.fon.bg.ac.rs/wp-content/uploads/nastavnici/missing_teacher.png"} />
                  </a>
                  <div >
                    <p className='profesorInfo'>{profesor.ime} {profesor.prezime}</p>
                    <p className='profesorInfo'>{profesor.katedra}</p>
                    <p className='profesorInfo'>{profesor.rank[0]}</p>
                    <p className='profesorInfo'>{profesor.email}</p>
                    <p className='profesorInfo'>Kabinet: {profesor.kabinet}</p>
                  </div>
                
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default App
