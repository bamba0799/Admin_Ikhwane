import  { useEffect } from 'react';
import SecondMain from '../../ components/Main/SecondMain';
import SecondLayout from '../../layouts/SecondLayout';
import Button from '../../ components/Button/Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { UpdateVisiteurFormValues } from '../../../services/model';
import Input from '../../ components/Input/Input';
import Select from '../../ components/Select/Select';
import apiService from '../../../services/api';
import toast from "react-hot-toast";




const UpdateVisiteur = () => {
    const { visiteurId } = useParams();
    console.log("visiteurId", visiteurId);

    // const [dortoir, setDortoir] = useState<any>([]);
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState, control } = useForm<UpdateVisiteurFormValues>({
        defaultValues: {
            nomVisiteur: "",
            pernomVisiteur: "",
            genreVisiteur: "",
            phoneVisiteur: "",
            sousComite: "",
            roleVisiteur: "",

        }
    });
 


    const genreOptions = [
        { value: "frere", label: "Frère" },
        { value: "soeur", label: "Soeur" },
        { value: "pepiniere", label: "Pépinière" },
        { value: "non_defini", label: "Non défini" },
    ];

    const { errors } = formState;

    const updateVisiteur = async (data: any) => {
        console.log("yyyyyyy", data);
        try {
            const datas =
            {
                nomVisiteur: data.nomVisiteur,
                pernomVisiteur: data.pernomVisiteur,
                age: parseInt(data.age),
                genreVisiteur: data.genreVisiteur,
                phoneVisiteur: data.phoneVisiteur,
                sousComite: data.sousComite,
                roleVisiteur: data.roleVisiteur,
            };
            console.log("zzzzzz", datas);

            const { data: seminariste } = await apiService.updateVisiteur(visiteurId!, datas);
            console.log("seminariste", seminariste);
            toast.success("Séminariste modifié avec succès");
            localStorage.setItem('currentRouteId',"5")
            navigate("/visiteur");
        } catch (error) {
            console.log("error", error);
            toast.error("Une erreur s'est produite lors de la modification du seminariste");
        }
    }



    const getVisiteurById = async () => {
        try {
            const { data: visiteur } = await apiService.getVisiteurById(visiteurId);
            console.log("visiteur", visiteur);
            setValue("nomVisiteur", visiteur.nomVisiteur);
            setValue("pernomVisiteur", visiteur.pernomVisiteur);
            setValue("genreVisiteur", visiteur.genreVisiteur);
            setValue("phoneVisiteur", visiteur.phoneVisiteur);
            setValue("sousComite", visiteur.sousComite);
            setValue("roleVisiteur", visiteur.roleVisiteur);
      
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        getVisiteurById()
    }, []);


    return (
        <div>
            <h1>update seminariste</h1>
            <SecondMain>
                <SecondLayout title={"Comité d'organisation"}>
                    <div className="flex justify-between">
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-2xl font-semibold text-primary_green">Modifier un séminariste</h1>
                            <Button onClick={() => {navigate("/visiteur");localStorage.setItem('currentRouteId',"5")}} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                <Icon icon="solar:arrow-left-linear" className='text-secondary_green w-[20px] h-[20px]' />
                                <p className='text-secondary_green'>Retour</p>
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 border px-[10px] md:px-[40px] shadow-2xl rounded-[10px]">
                        <form onSubmit={handleSubmit(updateVisiteur)} className='flex flex-col space-y-[20px] md:space-y-[50px] py-[10px] md:py-[30px]'>
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
                                    <Controller
                                        name="genreVisiteur"
                                        control={control}
                                        rules={{
                                            required: "Ce champ est obligatoire"
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={genreOptions}
                                                label="Genre"
                                                value={field.value}
                                                onChange={(value: any) => {
                                                    setValue("genreVisiteur", value)
                                                    console.log("value", value)
                                                  
                                                }} // Mise à jour de la valeur dans React Hook Form
                                                placeholder="Choisir une option"
                                            />
                                        )}
                                    />
                                    {errors.genreVisiteur && (<p className="error-message">{errors.genreVisiteur.message}</p>)}
                                </div>
                                <div className=' md:w-[48%]'>
                                    <Input type={'number'} id={'phoneVisiteur'} label='Contact' required={true} {...register("phoneVisiteur", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        },
                                        validate: (value) => {
                                            const isValid = value.length === 10;
                                            return isValid || "Le contact doit contenir 10 caractères";
                                        }

                                    })} />
                                    <p className='error-message'>{errors.phoneVisiteur?.message}</p>
                                </div>

                            </div>
                            {/* line 3 */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>

                                <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>

                                    <div className=' md:w-[48%]'>
                                        <Input type={'text'} id={'roleVisiteur'} label="Contact d'urgence" required={true} {...register("roleVisiteur", {
                                            required: {
                                                value: true,
                                                message: "Ce champ est obligatoire"
                                            },
                                       

                                        })} />
                                        <p className='error-message'>{errors.roleVisiteur?.message}</p>
                                    </div>

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

export default UpdateVisiteur;


