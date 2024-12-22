import SecondMain from '../../ components/Main/SecondMain';
import SecondLayout from '../../layouts/SecondLayout';
import Button from '../../ components/Button/Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AddVisiteurFormValues } from '../../../services/model';
import Input from '../../ components/Input/Input';
import Select from '../../ components/Select/Select';
import apiService from '../../../services/api';
import toast  from "react-hot-toast";




const AddVisiteur = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, watch, formState } = useForm<AddVisiteurFormValues>({
        defaultValues: {
            nomVisiteur: "",
            pernomVisiteur: "",
            genreVisiteur: "",
            phoneVisiteur: "",
            roleVisiteur: "",
            sousComite: ""
    

        }
    });
    // const nomVisiteur = watch("nomVisiteur") || "";
    // const pernomVisiteur = watch("pernomVisiteur") || "";
    const sousComite = watch("sousComite") || "";
    const genreVisiteur = watch("genreVisiteur") || "";
    // const phoneVisiteur = watch("phoneVisiteur") || "";
    // const roleVisiteur = watch("roleVisiteur") || "";


    const genreOptions = [
        { value: "frere", label: "Frère" },
        { value: "soeur", label: "Soeur" },
    ];

    const sousComiteOptions = [
        { value: "sousComite1", label: "Sous comité 1" },
        { value: "sousComite2", label: "Sous comité 2" },
        { value: "sousComite3", label: "Sous comité 3" },

    ];


    const { errors } = formState;

    const addVisiteur = async (data: any) => {
        console.log("data", data);
        
       try {
        const {data: addVisiteur} = await apiService.addVisiteur(data);
        console.log("addVisiteur", addVisiteur);
        toast.success("Visiteur ajouté avec succès");
        navigate("/visiteur");
        localStorage.setItem('currentRouteId',"5")
       } catch (error) {
        console.log("error", error);
        toast.error("Une erreur s'est produite lors de l'ajout du membre du comité d'organisation");
       }
    }

    return (
        <div>
            <h1>Visiteur</h1>
            <SecondMain>
                <SecondLayout title={"Visiteur"}>
                    <div className="flex justify-between">
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-2xl font-semibold text-primary_green">Ajouter Visiteur</h1>
                            <Button onClick={() => {navigate("/visiteur");localStorage.setItem('currentRouteId',"5")}} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                <Icon icon="solar:arrow-left-linear" className='text-secondary_green w-[20px] h-[20px]' />
                                <p className='text-secondary_green'>Retour</p>
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 border px-[10px] md:px-[40px] shadow-2xl rounded-[10px]">
                        <form onSubmit={handleSubmit(addVisiteur)} className='flex flex-col space-y-[20px] md:space-y-[50px] py-[10px] md:py-[30px]'>
                            {/* line 1 */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
                                <div className='md:w-[48%]'>
                                    <Input type={'text'} id={'nomVisiteur'} label='Nom' required={true} {...register("nomVisiteur", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        }
                                    })} />
                                    <p className='error-message'>{errors.nomVisiteur?.message}</p>
                                </div>
                                <div className=' md:w-[48%]'>
                                    <Input type={'text'} id={'pernomVisiteur'} label='Prénom' required={true} {...register("pernomVisiteur", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        }
                                    })} />
                                    <p className='error-message'>{errors.pernomVisiteur?.message}</p>
                                </div>
                            </div>
                            {/* line 2 */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
                                <div className="md:w-[48%]">
                                    <Select
                                        options={genreOptions}
                                        label="Genre"
                                        value={genreVisiteur} // Watch the selected value
                                        onChange={(value: any) => setValue("genreVisiteur", value)} // Update form state
                                        placeholder="Choisir une option"
                                    />
                                    <p className="error-message">{errors.genreVisiteur?.message}</p>
                                </div>
                                <div className=' md:w-[48%]'>
                                    <Input type={'number'} id={'phoneVisiteur'} label='Contact' required={true} {...register("phoneVisiteur", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: "Le contact doit contenir au maximum 10 caractères"
                                        },

                                    })} />
                                    <p className='error-message'>{errors.phoneVisiteur?.message}</p>
                                </div>
                            </div>
                            {/* line 3 */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
                                <div className="md:w-[48%]">
                                    <Select
                                        options={sousComiteOptions}
                                        label="Sous comité"
                                        value={sousComite} // Watch the selected value
                                        onChange={(value: any) => setValue("sousComite", value)} // Update form state
                                        placeholder="Choisir une option"
                                    />
                                    <p className="error-message">{errors.sousComite?.message}</p>
                                </div>

                                    <div className=' md:w-[48%]'>
                                    <Input type={'text'} id={'phoneVisiteur'} label='Rôle' required={true} {...register("roleVisiteur", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: "Le contact doit contenir au maximum 10 caractères"
                                        },

                                    })} />
                                    <p className='error-message'>{errors.roleVisiteur?.message}</p>
                                </div>
                            </div>
                 
                            <div className=' md:px-[300px] mt-[300px]'>
                                <Button className=' w-full rounded-full ' isLoading={false} outline={false} bg='bg-primary_green'>
                                    <p className=' text-white font-bold text-[14px]'>Valider</p>
                                </Button>
                            </div>
                        </form>
                    </div>
                </SecondLayout>

            </SecondMain>
        </div>
    );
}

export default AddVisiteur;
