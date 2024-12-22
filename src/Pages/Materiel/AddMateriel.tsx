



import SecondMain from '../../ components/Main/SecondMain';
import SecondLayout from '../../layouts/SecondLayout';
import Button from '../../ components/Button/Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { AddMaterielFormValues } from '../../../services/model';
import Input from '../../ components/Input/Input';
import apiService from '../../../services/api';
import toast from "react-hot-toast";
import Select from '../../ components/Select/Select';



const AddMateriel = () => {
    let auth: any = localStorage.getItem("user");
    auth = JSON.parse(auth);
    console.log("auth", auth);

    const { commission } = useParams();
    console.log("commission", commission);
    const navigate = useNavigate();
    const { register, setValue, control, handleSubmit, formState } = useForm<AddMaterielFormValues>({
        defaultValues: {
            designation: "",
            quantite: 0,
            statut: "",
            date: "", //arriere plan
            lieu: "",
            cout: 0
        }
    });

    const statutOptions = [
        { value: "loue", label: "Loué" },
        { value: "achete", label: "Achete" },
        { value: "NON_SPECIFIE", label: "Non spécifié" },
    ];


    const { errors } = formState;

    const addMateriel = async (data: any) => {
        console.log("data", data);
        const datas = {
            designation: data.designation,
            quantite: parseInt(data.quantite),
            statut: data.statut,
            date: data.date,
            lieu: data.lieu,
            cout: parseInt(data.cout)
        }
        try {
            const { data: addMateriel } = await apiService.addMateriel(datas);
            console.log("addMateriel", addMateriel);
            toast.success("Matériel ajouté avec succès");
            navigate(`/materiel-detail`);
            localStorage.setItem('currentRouteId',"20")
        } catch (error) {
            console.log("error", error);
            toast.error("Une erreur s'est produite lors de l'ajout du matériel");
        }
    }

    return (
        <div>
            <h1></h1>
            <SecondMain>
                <SecondLayout title={"Visiteur"}>
                    <div className="flex justify-between">
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-2xl font-semibold text-primary_green">Ajouter Materiel</h1>
                            <Button onClick={() => {navigate(`/materiel-detail`);localStorage.setItem('currentRouteId',"20")}} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                <Icon icon="solar:arrow-left-linear" className='text-secondary_green w-[20px] h-[20px]' />
                                <p className='text-secondary_green'>Retour</p>
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 border px-[10px] md:px-[40px] shadow-2xl rounded-[10px]">
                        <form onSubmit={handleSubmit(addMateriel)} className='flex flex-col space-y-[20px] md:space-y-[50px] py-[10px] md:py-[30px]'>
                            {/* line 1 */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
                                <div className='md:w-[48%]'>
                                    <Input type={'text'} id={'designation'} label='Désignation' required={true} {...register("designation", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        }
                                    })} />
                                    <p className='error-message'>{errors.designation?.message}</p>
                                </div>
                                <div className=' md:w-[48%]'>
                                    <Input type={'text'} id={'quantite'} label='Quantité' required={true} {...register("quantite", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        }
                                    })} />
                                    <p className='error-message'>{errors.quantite?.message}</p>
                                </div>
                            </div>
                            {/* line 2 */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>

                                <div className="md:w-[48%]">
                                    <Controller
                                        name="statut"
                                        control={control}
                                        rules={{
                                            required: "Ce champ est obligatoire"
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={statutOptions}
                                                label="Statut"
                                                value={field.value}
                                                onChange={(value: any) => setValue("statut", value)} // Mise à jour de la valeur dans React Hook Form
                                                placeholder="Choisir un statut"
                                                required={true}
                                            />
                                        )}
                                    />
                                    {errors.statut && (<p className="error-message">{errors.statut.message}</p>)}
                                </div>
                                <div className=' md:w-[48%]'>
                                    <Input type={'date'} id={'date'} label='Date' required={true} {...register("date", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        }
                                    })} />
                                    <p className='error-message'>{errors.date?.message}</p>
                                </div>
                            </div>
                            {/* line 2 */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
                                <div className=' md:w-[48%]'>
                                    <Input type={'text'} id={'lieu'} label='Lieu' required={true} {...register("lieu", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        }
                                    })} />
                                    <p className='error-message'>{errors.lieu?.message}</p>
                                </div>
                                <div className='md:w-[48%]'>
                                    <Input type={'text'} id={'cout'} label='Coût' required={true} {...register("cout", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        }
                                    })} />
                                    <p className='error-message'>{errors.cout?.message}</p>
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

export default AddMateriel;
