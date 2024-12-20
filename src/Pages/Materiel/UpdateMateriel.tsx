

import { useEffect, useState } from 'react';
import SecondMain from '../../ components/Main/SecondMain';
import SecondLayout from '../../layouts/SecondLayout';
import Button from '../../ components/Button/Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { UpdateMaterielFormValues } from '../../../services/model';
import Select from '../../ components/Select/Select';
import apiService from '../../../services/api';
import toast from "react-hot-toast";
import Input from '../../ components/Input/Input';




const UpdateMateriel = () => {
    const { materielId } = useParams();
    console.log("materielId", materielId);
;


    const navigate = useNavigate();
    const { handleSubmit, setValue, formState, control, register } = useForm<UpdateMaterielFormValues>({
        defaultValues: {
            designation: "",
            quantite: 0,
            statut: "",
            date: "",
            lieu: "",
            cout: 0
        }
    });
    const { errors } = formState;

    const statutOptions = [
        { value: "loue", label: "Loué" },
        { value: "achete", label: "Achete" },
        { value: "NON_SPECIFIE", label: "Non spécifié" },
    ];


    const updateMateriel = async (data: any) => {
        console.log("yyyyyyy", data);
        try {
            const datas={
                designation: data.designation,
                quantite: parseInt(data.quantite),
                statut: data.statut,
                date: data.date,
                lieu: data.lieu,
                cout: parseInt(data.cout)
            };
            console.log("datas", datas);
            
            const { data: materiel } = await apiService.updateMateriel(materielId!, datas);
            console.log("materiel", materiel);
            toast.success("materiel modifié avec succès");
            navigate("/materiel-detail");
        } catch (error: any) {
            console.log("error", error);
            toast.error("Une erreur s'est produite lors de la modification du seminariste");
        }
    }


    const getMaterielById = async () => {
        try {
            const { data: materiel } = await apiService.getMaterielById(materielId);
            console.log("materielById", materiel);
            setValue("designation", materiel.designation);
            setValue("quantite", materiel.quantite);
            setValue("statut", materiel.statut);
            setValue("date", materiel.date);
            setValue("lieu", materiel.lieu);
            setValue("cout", materiel.cout);


        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        getMaterielById()
    }, []);


    return (
        <div>
            <h1>update materiel</h1>
            <SecondMain>
                <SecondLayout title={"Comité d'organisation"}>
                    <div className="flex justify-between">
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-2xl font-semibold text-primary_green">Modifier le matériel</h1>
                            <Button onClick={() => navigate("/materiel-detail")} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                <Icon icon="solar:arrow-left-linear" className='text-secondary_green w-[20px] h-[20px]' />
                                <p className='text-secondary_green'>Retour</p>
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 border px-[10px] md:px-[40px] shadow-2xl rounded-[10px]">
                        <form onSubmit={handleSubmit(updateMateriel)} className='flex flex-col space-y-[20px] md:space-y-[50px] py-[10px] md:py-[30px]'>
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

export default UpdateMateriel;





{/* <div className="md:w-[48%]">
<Controller
  name="inputTexte"
  control={control}
  rules={{
    required: "Ce champ est obligatoire",
  }}
  render={({ field }) => (
    <input
      {...field}
      type="text"
      className="input"
      placeholder="Saisir du texte"
    />
  )}
/>
{errors.inputTexte && (
  <p className="error-message">{errors.inputTexte.message}</p>
)}
</div> */}
