import { useState } from 'react'

const ScanCredential = ({onChangeMatricula, onChangeScaning}) => {

    const [matricula, setMatricula] = useState('')

    const onGoStore = () => {
        onChangeMatricula(matricula)
        onChangeScaning(false)
    }

    return (
        <>
            <div className="flex justify-center items-center flex-col pt-8 mx-16">
                <h1 className='text-uv-blue text-5xl font-bold'>Bienvenido Estudiante</h1>
                <h3 className='text-4xl font-bold m-12'>Escanea tu matrícula desde tu credencial</h3>
                <p className='text-2xl'>El código de barras va hacia arriba</p>
                <img src="tilin" alt="Imagen de escaneo" />
                <input
                    className="bg-gray-100 rounded-full border-2 border-uv-blue text-md focus:outline-none focus:ring-2 focus:ring-uv-blue focus:border-transparent p-2 text-xl text-center w-3/4"
                    type="number"
                    name="matricula"
                    value={matricula}
                    onChange={e => setMatricula(e.target.value)}
                    placeholder="Matrícula"
                />
                <button onClick={onGoStore}>Continuar</button>
                <div className='flex justify-center items-center flex-row'>
                    <img src="tilin1" alt="Imagen docente" />
                    <img src="tilin2" alt="Imagen invitado" />
                </div>
            </div>
        </>
    )
}

export default ScanCredential