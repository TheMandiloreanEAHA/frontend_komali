const Login = () => { 
    return(
    <div class="flex items-center justify-center h-screen">
        
        <div class='pt-16 relative flex items-center justify-center text-center'>
            <div class='absolute top-0 w-[8rem] h-[8rem] bg-black rounded-full'>
                <img src="https://scontent.fjal1-1.fna.fbcdn.net/v/t39.30808-6/411160989_992213728969583_2537555176822595160_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=h19Q_HOyQ44Q7kNvgHVjgbQ&_nc_ht=scontent.fjal1-1.fna&oh=00_AfC-kvv-gjkDfTwnXcrmnZofFhLh_jYm9A4z-tgghJFrYg&oe=6630DCFE" alt="Logo de comedores universitarios uv"/>
            </div>
            <div class='rounded-lg flex items-center justify-center text-center shadow-[#999] shadow-inner px-8 py-6'>
                <div>
                    <br />
                    <h1 class='mb-4 mt-8 font-semibold text-lg'>Iniciar sesión</h1>
                    <div class='mb-4'>
                        <input class='bg-gray-100 border-b-2 border-uv-blue text-md focus:outline-none focus:ring-2 focus:ring-uv-blue focus:border-transparent w-full p-2' type="text" placeholder='Usuario' required />
                    </div>
                    <div class='mb-4'>
                        <input class='bg-gray-100 border-b-2 border-uv-blue text-md focus:outline-none focus:ring-2 focus:ring-uv-blue focus:border-transparent w-full p-2' type="password" placeholder='Contraseña' required />
                    </div>
                    <div class='mb-2'>
                        <label>
                            <input type="checkbox"/> Recuérdame
                        </label>
                    </div>
                    <div class='font-semibold text-uv-green mb-6'>
                        <a href="#">
                            ¿Problemas para ingresar? ¡Contactanos!
                        </a>
                    </div>
                    <div>
                        <button type="submit" class='bg-uv-blue rounded-full p-2 text-white font-semibold hover:bg-black'>Ingresar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
};
export default Login;