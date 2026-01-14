

import { useEffect } from 'react';
import SecondMain from '../../ components/Main/SecondMain';
import SecondLayout from '../../layouts/SecondLayout';
import Button from '../../ components/Button/Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { UpdatePcoFormValues } from '../../../services/model';
import Input from '../../ components/Input/Input';
import Select from '../../ components/Select/Select';
import apiService from '../../../services/api';
import toast from "react-hot-toast";




const UpdatePco = () => {
    const { pcoId } = useParams();
    console.log("pcoId", pcoId);

    // const [dortoir, setDortoir] = useState<any>([]);
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState, control } = useForm<UpdatePcoFormValues>({
        defaultValues: {
            nomPers: "",
            pernomPers: "",
            genrePers: "",
            phonePers: "",
            situation: "",
            sousComite: "",
            motPass: "",
            roleMembre: "",

        }
    });
        const { errors } = formState;


    const genreOptions = [
        { value: "frere", label: "Frère" },
        { value: "soeur", label: "Soeur" },
        { value: "pepiniere", label: "Pépinière" },
        { value: "non_defini", label: "Non défini" },
    ];

    const sousComiteOptions = [
        { value: "sousComite1", label: "Sous comité 1" },
        { value: "sousComite2", label: "Sous comité 2" },
        { value: "sousComite3", label: "Sous comité 3" },
    ];

    const roleMembreOptions = [
        { value: "responsable", label: "responsable" },
        { value: "reponsable_adjoint", label: "reponsable_adjoint" },
        { value: "simple", label: "simple" },
    ]

    const situationOptions = [
        { value: "Sur le camp", label: "Sur le camp" },
        { value: "Sur le camp", label: "Sur le camp" },
    ]


    const updatePco = async (data: any) => {
        console.log("yyyyyyy", data);
        try {
            const datas ={
                nomPers: data.nomPers,
                pernomPers: data.pernomPers,
                genrePers: data.genrePers,
                phonePers: data.phonePers,
                situation: data.situation,
                sousComite: data.sousComite,
                motPass: data.motPass,
                roleMembre: data.roleMembre
            };
            console.log("zzzzzz", datas);
            const { data: seminariste } = await apiService.updatePco(pcoId!, datas);
            console.log("seminariste", seminariste);
            toast.success("Séminariste modifié avec succès");
            navigate(-1);
        } catch (error) {
            console.log("error", error);
            toast.error("Une erreur s'est produite lors de la modification du seminariste");
        }
    }

    const getPcoById = async () => {
        try {
            const { data: pco } = await apiService.getPcoById(pcoId);
            console.log("pcoById", pco[0]);

            setValue("nomPers", pco[0].nomPers);
            setValue("pernomPers", pco[0].pernomPers);
            setValue("genrePers", pco[0].genrePers);
            setValue("phonePers", pco[0].phonePers);
            setValue("situation", pco[0].situation);
            setValue("sousComite", pco[0].sousComite);
            setValue("motPass", "");
            setValue("roleMembre", pco[0].roleMembre);


        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        getPcoById()
    }, []);


    return (
        <div>
            <h1>update seminariste</h1>
            <SecondMain>
                <SecondLayout title={"Comité d'organisation"}>
                    <div className="flex justify-between">
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-2xl font-semibold text-primary_green">Modifier pco</h1>
                            <Button onClick={() => navigate("/add-commission")} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                <Icon icon="solar:arrow-left-linear" className='text-secondary_green w-[20px] h-[20px]' />
                                <p className='text-secondary_green'>Retour</p>
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 border px-[10px] md:px-[40px] shadow-2xl rounded-[10px]">


                        <form onSubmit={handleSubmit(updatePco)} className='flex flex-col space-y-[20px] md:space-y-[50px] py-[10px] md:py-[30px]'>
                            {/* line 1 */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
                                <div className='md:w-[48%]'>
                                    <Input type={'text'} id={'nomPers'} label='Nom' required={true} {...register("nomPers", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        }
                                    })} />
                                    <p className='error-message'>{errors.nomPers?.message}</p>
                                </div>
                                <div className=' md:w-[48%]'>
                                    <Input type={'text'} id={'pernomPers'} label='Prénom' required={true} {...register("pernomPers", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        }
                                    })} />
                                    <p className='error-message'>{errors.pernomPers?.message}</p>
                                </div>
                            </div>
                            {/* line 2 */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
                                <div className="md:w-[48%]">
                                    <Controller
                                        name="genrePers"
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
                                                    setValue("genrePers", value)
                                                    console.log("value", value)
                                                }} // Mise à jour de la valeur dans React Hook Form
                                                placeholder="Choisir un genre"
                                            />
                                        )}
                                    />
                                    {errors.genrePers && (<p className="error-message">{errors.genrePers.message}</p>)}
                                </div>
                                <div className=' md:w-[48%]'>
                                    <Input type={'number'} id={'phonePers'} label='Contact' required={true} {...register("phonePers", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: "Le contact doit contenir au maximum 10 caractères"
                                        },
                                        validate: {
                                            length: (value) => value.length === 10 || "Le contact doit contenir 10 caractères"
                                        }

                                    })} />
                                    <p className='error-message'>{errors.phonePers?.message}</p>
                                </div>
                            </div>
                            {/* line 3 */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
                                <div className="md:w-[48%]">
                                    <Controller
                                        name="sousComite"
                                        control={control}
                                        rules={{
                                            required: "Ce champ est obligatoire"
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={sousComiteOptions}
                                                label="Sous comité"
                                                value={field.value}
                                                onChange={(value: any) => {
                                                    setValue("sousComite", value)
                                                    console.log("value", value)
                                                }} // Mise à jour de la valeur dans React Hook Form
                                                placeholder="Choisir un genre"
                                            />
                                        )}
                                    />
                                    {errors.sousComite && (<p className="error-message">{errors.sousComite.message}</p>)}
                                </div>

                                <div className="md:w-[48%]">
                                    <Controller
                                        name="roleMembre"
                                        control={control}
                                        rules={{
                                            required: "Ce champ est obligatoire"
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={roleMembreOptions}
                                                label="Rôle membre"
                                                value={field.value}
                                                onChange={(value: any) => {
                                                    setValue("roleMembre", value)
                                                    console.log("value", value)
                                                }} // Mise à jour de la valeur dans React Hook Form
                                                placeholder="Choisir un rôle"
                                            />
                                        )}
                                    />
                                    {errors.roleMembre && (<p className="error-message">{errors.roleMembre.message}</p>)}
                                </div>

                            </div>
                            {/* line 4 */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
                                <div className="md:w-[48%]">
                                    <Controller
                                        name="situation"
                                        control={control}
                                        rules={{
                                            required: "Ce champ est obligatoire"
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={situationOptions}
                                                label="Situation"
                                                value={field.value || ""}
                                                onChange={(value: any) => {
                                                    setValue("situation", value)
                                                    console.log("value", value)
                                                }} // Mise à jour de la valeur dans React Hook Form
                                                placeholder="Choisir une situation"
                                            />
                                        )}
                                    />
                                    {errors.situation && (<p className="error-message">{errors.situation.message}</p>)}
                                </div>
                                <div className=' md:w-[48%]'>
                                    <Input type={'text'} id={'motPass'} label='Mot de passe' required={true} {...register("motPass", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        }
                                    })} />
                                    <p className='error-message'>{errors.motPass?.message}</p>
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

export default UpdatePco;





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
