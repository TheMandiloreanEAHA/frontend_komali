import { useState } from 'react'
import ScanCredential from './ScanCredential'
import Menu from './Menu'

const Store = () => {

    const [scaning, setScaning] = useState(true)
    const [matricula, setMatricula] = useState('')
    
    const onChangeMatricula = (matricula) => {
        setMatricula(matricula)
    }

    const onChangeScaning = (scaning) => {
        setScaning(scaning)
    }

    const isScaning = () => {
        if(scaning){
            return (
                <ScanCredential onChangeMatricula={onChangeMatricula} onChangeScaning={onChangeScaning}/>
            )
        }else{
            return(
                <Menu matricula={matricula} onChangeMatricula={onChangeMatricula}  onChangeScaning={onChangeScaning}/>
            )
        }
    }

    return (
        <>
            {isScaning()}
        </>
    )
}

export default Store