
import { useState } from 'react'

import ConnexionInput from '../ components/Input/ConnexionInput'
import logo from '../assets/LogoAEEMCI.png';
import coran from '../assets/coran.png';
import Button from '../ components/Button/Button'
import {  useForm } from 'react-hook-form';

import { useAuth } from '../contexts/AuthContext'


type formValues = {
    phonePers: string;
    motPass: string;
}




function Login() {
    const auth: any = useAuth();
    console.log("bbbbbbb", auth);

    const [isLoading, setIsLoading] = useState(false)


    const form = useForm<formValues>({
        defaultValues: {
            phonePers: "",
            motPass: ""
        }
    });

    const { register, handleSubmit, formState } = form;
    const { errors } = formState;



    const loginUser = (data: any) => {
        // navigate('/about');
        setIsLoading(true);
        auth.loginAction(data);
        setIsLoading(false);
    }

 
    return (
        <form onSubmit={handleSubmit(loginUser)} className='min-h-screen px-[18px] md:px-[0px] md:pl-[18px] bg-white md:flex md:flex-col md:justify-center'>
            <div className=' md:flex md:flex-row md:items-center md:space-x-2'>
                <div className='md:w-[40%] md:h-screen md:px-[40px]'>
                    <div className='flex flex-col items-center'>
                        <img src={logo} className=' w-[100px] h-[100px]' />
                        <span className=' text-[12px] text-primary_green'>Système de gestion administrative du séminaire Al Ikhwane</span>
                    </div>
                    <div className='flex flex-col items-center mt-[50px]'>
                        <h1 className='text-primary_green font-bold text-[20px]'>Bienvenue</h1>
                        <span className='text-[12px] text-primary_green'>Merci de vous identifier pour accéder à la plateforme</span>
                    </div>
                    <div className='flex flex-col justify-center space-y-[20px] mt-[24px]'>
                        <div>
                            <ConnexionInput isPassword={false} icon={'ph:user'} placeholder='Entrez votre Contact' {...register("phonePers", {
                                required: {
                                    value: true,
                                    message: "Ce champ est obligatoire"
                                }
                            })} />
                            <p className='error-message'>{errors.phonePers?.message}</p>
                        </div>
                        <div>
                            <ConnexionInput isPassword={true} icon={'ph:lock'} placeholder='Entrez le mot de passe' {...register("motPass", {
                                required: {
                                    value: true,
                                    message: "Ce champ est obligatoire"
                                }
                            })} />
                            <p className='error-message'>{errors.phonePers?.message}</p>
                        </div>
                    </div>
                    <div>
                    </div>
                    <Button className=' w-full rounded-full mt-[300px]' isLoading={isLoading} outline={false} bg='bg-primary_orange'>
                        <p className=' text-white font-bold text-[14px]'>Se connecter</p>
                    </Button>
                </div>
                <div className='border hidden md:flex h-full md:w-[60%] md:h-screen'>
                    <img src={coran} alt="" className='w-full object-cover' />
                </div>
            </div>


        </form>
    )
}

export default Login
