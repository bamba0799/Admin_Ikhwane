
import SecondMain from '../../ components/Main/SecondMain';
import SecondLayout from '../../layouts/SecondLayout';
import Button from '../../ components/Button/Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AddRapportFormValues } from '../../../services/model';
import Input from '../../ components/Input/Input';
import apiService from '../../../services/api';
import toast from "react-hot-toast";


const AddRapport = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm<AddRapportFormValues>({
        defaultValues: {
            libelleRapport: "",
            tacheRealisees: "",
            commentaires: "",
            tachesNonRealisees: "",
            causes: "",
            difficultes: "",
            suggestions: "",
            infoSuplementaire: ""

        }
    });

    const { errors } = formState;

    const addRapport = async (data: any) => {
        console.log("rapport", data);
        try {
            const datas =
            {
                libelleRapport: data.libelleRapport,
                tacheRealisees: data.tacheRealisees,
                commentaires: data.commentaires,
                tachesNonRealisees: data.tachesNonRealisees,
                causes: data.causes,
                difficultes: data.difficultes,
                suggestions: data.suggestions,
                infoSuplementaire: data.infoSuplementaire

            };
            await apiService.addRapport(datas);
            toast.success("Rpport ajouté avec succès");
            navigate('/comite-organisation');
            localStorage.setItem('currentRouteId',"2")
        } catch (error) {
            console.log("error", error);
            toast.error("Une erreur s'est produite lors de l'ajout de rapport");
        }
    }
    return (
        <div>
            <h1>Rapport</h1>
            <SecondMain>
                <SecondLayout title={"Rapport"}>
                    <div className="flex justify-between">
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-2xl font-semibold text-primary_green">Ajouter un rapport</h1>
                            <Button onClick={() => {navigate("/comite-organisation");localStorage.setItem('currentRouteId',"2")}} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                <Icon icon="solar:arrow-left-linear" className='text-secondary_green w-[20px] h-[20px]' />
                                <p className='text-secondary_green'>Retour</p>
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 border px-[10px] md:px-[40px] shadow-2xl rounded-[10px]">
                        <form onSubmit={handleSubmit(addRapport)} className='flex flex-col space-y-[20px] md:space-y-[50px] py-[10px] md:py-[30px]'>
                            {/* line 1 */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
                                <div className='md:w-[48%]'>
                                    <Input type={'text'} id={'libelleRapport'} label='Libellé rapport' required={true} {...register("libelleRapport", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        }
                                    })} />
                                    <p className='error-message'>{errors.libelleRapport?.message}</p>
                                </div>
                                <div className=' md:w-[48%]'>
                                    <Input type={'text'} id={'tacheRealisees'} label='Tâches réalisées' required={true} {...register("tacheRealisees", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        }
                                    })} />
                                    <p className='error-message'>{errors.tacheRealisees?.message}</p>
                                </div>
                            </div>
                            {/* line 2 */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
                                <div className=' md:w-[48%]'>
                                    <Input type={'text'} id={'tachesNonRealisees'} label='TachesNonRealisees' required={true} {...register("tachesNonRealisees", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        },


                                    })} />
                                    <p className='error-message'>{errors.tachesNonRealisees?.message}</p>
                                </div>

                                <div className=' md:w-[48%]'>
                                    <Input type={'text'} id={'commentaires'} label='Commentaires' required={true} {...register("commentaires", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        },

                                    })} />
                                    <p className='error-message'>{errors.commentaires?.message}</p>
                                </div>
                            </div>
                            {/* line 3 */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
                                <div className=' md:w-[48%]'>
                                    <Input type={'text'} id={'infoSuplementaire'} label='Info Supplémentaire' required={true} {...register("infoSuplementaire", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        },


                                    })} />
                                    <p className='error-message'>{errors.infoSuplementaire?.message}</p>
                                </div>
                                <div className=' md:w-[48%]'>
                                    <Input type={'text'} id={'causes'} label='Causes' required={true} {...register("causes", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        },

                                    })} />
                                    <p className='error-message'>{errors.causes?.message}</p>
                                </div>
                            </div>
                            {/* line 4 */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
                                <div className=' md:w-[48%]'>
                                    <Input type={'text'} id={'difficultes'} label='Difficultés' required={true} {...register("difficultes", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        },


                                    })} />
                                    <p className='error-message'>{errors.difficultes?.message}</p>
                                </div>
                                <div className=' md:w-[48%]'>
                                    <Input type={'text'} id={'suggestions'} label='Suggestions' required={false} {...register("suggestions", {
                                        required: {
                                            value: false,
                                            message: "Ce champ est obligatoire"
                                        },
                                    })} />
                                    <p className='error-message'>{errors.suggestions?.message}</p>
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

export default AddRapport;





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
