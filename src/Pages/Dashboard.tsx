import React from 'react';
import PrimaryLayout from '../layouts/PrimaryLayout';
import Input from '../ components/Input/Input';
// import MyInput from '../ components/Input/Input';
// import {   useForm } from 'react-hook-form';
import Button from '../ components/Button/Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import HomeCard from '../ components/Card/HomeCard';
import EditButton from '../ components/Button/EditButton';
import DeleteButton from '../ components/Button/DeleteButton';


// type formValues = {
//     phonePers: string;
//     motPass: string;
// }

const Dashboard: React.FC = () => {

    const send = async () => {
        console.log('ecris je suis la');
        
    }

    // const form = useForm<formValues>({
    //     defaultValues: {
    //         phonePers: "dddd",
    //         motPass: ""
    //     }
    // });
    // const form = useForm<formValues>({
    //     defaultValues: async () => {
    //         const response = await fetch('https://api.example.com/data');
    //         const data = await response.json();
    //         return {
    //             name: data.name,
    //             sc_comite: data.sc_comite
    //     }}
    // });
    // const nameInputRef = useRef<HTMLInputElement>(null);
    // const nameInputRefx = useRef<HTMLInputElement>(null);

    // const { register, control, handleSubmit, formState } = form;
    // const { errors } = formState;

    // const onSubmit = (data: formValues) => {
    //     console.log("data", data);
    // }

    // const onError = (errors: FieldErrors<formValues>) => {
    //     console.log("errors", errors);
    // }
    // useEffect(() => {
    //     if (nameInputRef.current) {
    //         console.log(nameInputRef.current);
    //     }
    // }, []);  
    {/* <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <div>
                        <Input type='text' id={"nom_prenom"} label='Nom et Prénoms' placeholder=''  {...register("name", {
                            required: {
                                value: true,
                                message: "Ce champ est obligatoire"
                            }
                        })}
                        />
                        <p classNameName='error-message'>{errors.name?.message}</p>
                    </div>
                    <div>
                        <Input type='text' id={"sc_comite"} label='Sc comité' placeholder='' {...register("sc_comite", {
                            required: {
                                value: true,
                                message: "Ce champ est obligatoire"
                            },
                            // disabled:true
                        })}

                        />
                        <p className='error-message'>{errors.sc_comite?.message}</p>
                    </div>
          
                    <Button outline={true} className='button-icon bg-tertiary_green'>
                        <Icon icon="fa-solid:home" className=''/>
                        <p className='text-secondary_green'>Exporter</p>
                    </Button> 
                </form> */}
    return (
        <PrimaryLayout title={"Tableau de bord"}>
            <div>
                <div className='flex flex-col lg:flex-row lg:items-center '>
                    <div className=' flex flex-col items-center space-y-0 lg:flex-row lg:items-center  lg:space-y-0'>
                        <HomeCard bg={'bg-secondary_orange'} title={'Membres du C.O'} item1={{
                            title: "Frères",
                            value: 10
                        }} item2={{
                            title: "Sœurs",
                            value: 12
                        }}
                            icon={'fa:group'}
                            eye={false}
                        />
                        <div className='lg:w-[1px]  bg-primary_green lg:h-[100px] w-[95%] h-[1px]'></div>
                        <HomeCard bg={'bg-secondary_orange'} title={'Nombre de séminariste'} item1={{
                            title: "Frères",
                            value: 10
                        }} item2={{
                            title: "Sœurs",
                            value: 12
                        }}
                            icon={'mdi:account-student'}
                            eye={false}
                        />
                        <div className='lg:w-[1px]  bg-primary_green lg:h-[100px] w-[95%] h-[1px]'></div>
                        <HomeCard bg={'bg-secondary_orange'} title={'Nombre de dortoirs'} item1={{
                            title: "Frères",
                            value: 10
                        }} item2={{
                            title: "Sœurs",
                            value: 12
                        }}
                            icon={'fa-solid:home'}
                            eye={false}
                        />
                        <div className='lg:w-[1px]  bg-primary_green lg:h-[100px] w-[95%] h-[1px]'></div>
                        <HomeCard bg={'bg-secondary_orange'} title={'Nombre de formateur'} item1={{
                            title: "Frères",
                            value: 10
                        }} item2={{
                            title: "Sœurs",
                            value: 12
                        }}
                            icon={'fa-solid:home'}
                            eye={false}
                        />

                    </div>
                    <HomeCard bg={'bg-quaternary_green mt-3 lg:mt-0 lg:ml-3'} title={'Nombre total de visite'} item1={{
                        title: "Frères",
                        value: 10
                    }} item2={{
                        title: "Sœurs",
                        value: 12
                    }}
                        icon={'fa-solid:home'}
                        eye={false}
                    />
                </div>
                <div className='flex flex-row items-center justify-between mt-[10px]'>
                    <div className=' '>
                        <Input className='rounded-[5px]' type='text' id={"recherche"}  placeholder='Rechercher' onChange={(e) => console.log(e.target.value)} />
                    </div>
                    <Button onClick={() => send()} outline={true} className='button-icon bg-tertiary_green' bg={''}>
                        <p className='text-secondary_green'>Exporter</p>
                    </Button>
                </div>
                <div className="relative overflow-x-auto shadow-sm mt-[10px]">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-white  bg-secondary_green">
                            <tr>
                                <th scope="col" className="px-6 py-3">Commission</th>
                                <th scope="col" className="px-6 py-3">Total frères</th>
                                <th scope="col" className="px-6 py-3">Total soeurs</th>
                                <th scope="col" className="px-6 py-3">Total membres</th>
                                <th scope="col" className="px-6 py-3">Nom séminaire</th>
                                <th scope="col" className="px-6 py-3">Période séminaire</th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            <tr className="bg-white dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Apple MacBook Pro 17"
                                </th>
                                <td className="px-6 py-4">Silver</td>
                                <td className="px-6 py-4">Laptop</td>
                                <td className="px-6 py-4">$2999</td>
                                <td className="px-6 py-4">$2999</td>
                                <td className="px-6 py-4">$2999</td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                            <tr className="bg-gray-50 dark:bg-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Microsoft Surface Pro
                                </th>
                                <td className="px-6 py-4">White</td>
                                <td className="px-6 py-4">Laptop PC</td>
                                <td className="px-6 py-4">$1999</td>
                                <td className="px-6 py-4">$1999</td>
                                <td className="px-6 py-4">$1999</td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Magic Mouse 2
                                </th>
                                <td className="px-6 py-4">Black</td>
                                <td className="px-6 py-4">Accessories</td>
                                <td className="px-6 py-4">$99</td>
                                <td className="px-6 py-4">$99</td>
                                <td className="px-6 py-4">$99</td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <div className='mt-[10px] flex flex-row justify-between items-center'>
                    <p className=' text-[12px] text-primary_green font-bold'>Les PCO du séminaire</p>
                    <Button outline={true} className='button-icon bg-quaternary_green' bg={''}>
                        <div className='border rounded-full p-[3px] bg-primary_green'>
                            <Icon icon="mdi:plus" className='text-white' />
                        </div>
                        <p className='text-secondary_green'>Ajouter un PCO</p>
                    </Button>
                </div>
                <div className="relative overflow-x-auto shadow-sm mt-[10px]">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-white  bg-secondary_green">
                            <tr>
                                <th scope="col" className="px-6 py-3">Nom et prénoms</th>
                                <th scope="col" className="px-6 py-3">Genre</th>
                                <th scope="col" className="px-6 py-3">Sous-comités</th>
                                <th scope="col" className="px-6 py-3">Contact</th>
                                <th scope="col" className="px-6 py-3">Situation</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            <tr className="bg-white dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Apple MacBook Pro 17"
                                </th>
                                <td className="px-6 py-4">Silver</td>
                                <td className="px-6 py-4">Laptop</td>
                                <td className="px-6 py-4">$2999</td>
                                <td className="px-6 py-4">$udsuf</td>
                                <td className="px-6 py-4 text-right">
                                    <div className='flex flex-row justify-start items-center space-x-2'>
                                        <EditButton />
                                        <DeleteButton />
                                    </div>
                                </td>
                            </tr>
                            <tr className="bg-gray-50 dark:bg-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Microsoft Surface Pro
                                </th>
                                <td className="px-6 py-4">White</td>
                                <td className="px-6 py-4">Laptop PC</td>
                                <td className="px-6 py-4">$1999</td>
                                <td className="px-6 py-4">$1999</td>
                                <td className="px-6 py-4 text-right">
                                    <div className='flex flex-row justify-start items-center space-x-2'>
                                        <EditButton />
                                        <DeleteButton />
                                    </div>
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Magic Mouse 2
                                </th>
                                <td className="px-6 py-4">Black</td>
                                <td className="px-6 py-4">Accessories</td>
                                <td className="px-6 py-4">$99</td>
                                <td className="px-6 py-4">$99</td>
                                <td className="px-6 py-4 text-right">
                                    <div className='flex flex-row justify-start items-center space-x-2'>
                                        <EditButton />
                                        <DeleteButton />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

            </div>
        </PrimaryLayout>
    );
}

export default Dashboard;
