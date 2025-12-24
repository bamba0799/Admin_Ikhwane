import  { useEffect, useState } from 'react';
import SecondMain from '../../ components/Main/SecondMain';
import SecondLayout from '../../layouts/SecondLayout';
import Button from '../../ components/Button/Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { AddSeminaristeFormValues } from '../../../services/model';
import Input from '../../ components/Input/Input';
import Select from '../../ components/Select/Select';
import apiService from '../../../services/api';
import toast from "react-hot-toast";






const AddSeminariste = () => {
    const [allDortoirs, setAllDortoirs] = useState([]);
    const [dortoirOptions, setDortoirOptions] = useState([]);
    const [relativeDortoirOptions, setRelativeDortoirOptions] = useState([]);
    // const [dortoir, setDortoir] = useState<any>([]);
    console.log("dortoirOptions", allDortoirs);
    
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState, control } = useForm<AddSeminaristeFormValues>({
        defaultValues: {
            nomSemi: "",
            prenomSemi: "",
            matricule: "ikh-",
            age: 0,
            genreSemi: "",
            phoneSemi: "",
            sousComite: "",
            numUrgence: "",
            dortoir: "",
            etatSante: "",
            situation: "",
            problemeSante: "",
        }
    });
    // const genreSemi = watch("genreSemi") || "";
    // const sousComite = watch("sousComite") || "";
    // const situation = watch("situation");
    // const dortoir = watch("dortoir") || "";
    // const etatSante = watch("etatSante") || "";
    // const commission = watch("commission") || "";
    // const rolePers = watch("rolePers") || "";
    // const roleMembre = watch("roleMembre") || "";
    // const [selectedValue, setSelectedValue] = useState("");

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

    const etatSanteOptions = [
        { value: "Ras", label: "Ras" },
        { value: "Malade", label: "Malade" },
        { value: "Autres", label: "Autres" },
        { value: "Non_specifie", label: "Non specifié" },
    ];

    // const commisionOptions = [
    //     { value: "pco", label: "pco" },
    //     { value: "Communication", label: "Communication" },
    //     { value: "Formation", label: "Formation" },
    //     { value: "Restauration", label: "Restauration" },
    //     { value: "Securite", label: "Securité" },
    //     { value: "Finance", label: "Finance" },
    //     { value: "Protocole", label: "Protocole" },
    //     { value: "Hygiene", label: "Hygiène" },
    //     { value: "Administration", label: "Administration" },
    //     { value: "Accueil_Hebegement", label: "Accueil_Hébergement" },
    //     { value: "Logistique", label: "Logistique" },
    //     { value: "Pepiniere", label: "Pépinière" },
    //     { value: "Sante", label: "Santé" },

    // ];

    // const rolePersOptions = [
    //     { value: "pco", label: "pco" },
    //     { value: "simple", label: "simple" },
    //     { value: "responsable_admininistrion", label: "responsable_admininistrion" },
    //     { value: "responsable_Communication", label: "responsable_Communication" },
    //     { value: "responsable_Formation", label: "responsable_Formation" },
    //     { value: "responsable_Restauration", label: "responsable_Restauration" },
    //     { value: "responsable_Securité", label: "responsable_Securité" },
    //     { value: "responsable_Finance", label: "responsable_Finance" },
    //     { value: "responsable_Protocole", label: "responsable_Protocole" },
    //     { value: "responsable_Hygiène", label: "responsable_Hygiène" },
    //     { value: "responsable_Accueil", label: "responsable_Accueil" },
    //     { value: "responsable_Logistique", label: "responsable_Logistique" },
    //     { value: "responsable_Logistique", label: "responsable_Logistique" },
    //     { value: "responsable_santé", label: "responsable_santé" },
    //     { value: "responsable_adjoint_admininistrion", label: "responsable_adjoint_admininistrion" },
    //     { value: "responsable_adjoint_Communication", label: "responsable_adjoint_Communication" },
    //     { value: "responsable_adjoint_Formation", label: "responsable_adjoint_Formation" },
    //     { value: "responsable_adjoint_Restauration", label: "responsable_adjoint_Restauration" },
    //     { value: "responsable_adjoint_Securité", label: "responsable_adjoint_Securité" },
    //     { value: "responsable_adjoint_Finance", label: "responsable_adjoint_Finance" },
    //     { value: "responsable_adjoint_Protocole", label: "responsable_adjoint_Protocole" },
    //     { value: "responsable_adjoint_Hygiène", label: "responsable_adjoint_Hygiène" },
    //     { value: "responsable_adjoint_Accueil", label: "responsable_adjoint_Accueil" },
    //     { value: "responsable_adjoint_Logistique", label: "responsable_adjoint_Logistique" },
    //     { value: "responsable_adjoint_Pépinière", label: "responsable_adjoint_Pépinière" },
    //     { value: "responsable_adjoint_santé", label: "responsable_adjoint_santé" },
    // ]

    // const roleMembreOptions = [
    //     { value: "responsable", label: "responsable" },
    //     { value: "reponsable_adjoint", label: "reponsable_adjoint" },
    //     { value: "simple", label: "simple" },
    // ]

    const situationOptions = [
        { value: "Sur le camp", label: "Sur le camp" },
        { value: "Hors du camp", label: "Hors du camp" },
    ]

    const { errors } = formState;

    const addSeminariste = async (data: any) => {
        console.log("yyyyyyy", data);
        try {
            const datas = {
                nomSemi: data.nomSemi,
                prenomSemi: data.prenomSemi,
                matricule: data.matricule,
                age: parseInt(data.age),
                genreSemi: data.genreSemi,
                phoneSemi: data.phoneSemi,
                sousComite: data.sousComite,
                numUrgence: data.numUrgence,
                dortoir: data.dortoir,
                etatSante: data.etatSante,
                situation: data.situation,
                problemeSante: data.problemeSante,
            };
            console.log("zzzzzz", datas);

            const { data: seminariste } = await apiService.addSeminariste(datas);
            console.log("seminariste", seminariste);
            toast.success("Membre du comité d'organisation ajouté avec succès");
            navigate('/seminariste');
        } catch (error) {
            console.log("error", error);
            toast.error("Une erreur s'est produite lors de l'ajout du membre du comité d'organisation");
        }
    }

    const getAllDortoir = async () => {
        try {
            const { data: allDortoirs } = await apiService.getAllDortoir();
            console.log("allDortoirs", allDortoirs);
            setAllDortoirs(allDortoirs);
            const options = allDortoirs.map((dortoir: any) => ({
                value: dortoir.id,
                label: dortoir.nomDortoir,
                genre: dortoir.genre
            }));
            console.log("options", options);
            
            setDortoirOptions(options);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        getAllDortoir()
    }, []);

    return (
        <div>
            <h1>Commission</h1>
            <SecondMain>
                <SecondLayout title={"Comité d'organisation"}>
                    <div className="flex justify-between">
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-2xl font-semibold text-primary_green">Ajouter un Séminariste</h1>
                            <Button onClick={() => navigate("/seminariste")} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                <Icon icon="solar:arrow-left-linear" className='text-secondary_green w-[20px] h-[20px]' />
                                <p className='text-secondary_green'>Retour</p>
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 border px-[10px] md:px-[40px] shadow-2xl rounded-[10px]">
                        <form onSubmit={handleSubmit(addSeminariste)} className='flex flex-col space-y-[20px] md:space-y-[50px] py-[10px] md:py-[30px]'>
                            {/* line 1: Nom and Prénom */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
                                <div className='md:w-[48%]'>
                                    <Input type={'text'} id={'nomSemi'} label='Nom' required={true} {...register("nomSemi", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        }
                                    })} />
                                    <p className='error-message'>{errors.nomSemi?.message}</p>
                                </div>
                                <div className=' md:w-[48%]'>
                                    <Input type={'text'} id={'prenomSemi'} label='Prénom' required={true} {...register("prenomSemi", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        }
                                    })} />
                                    <p className='error-message'>{errors.prenomSemi?.message}</p>
                                </div>
                            </div>
                            {/* line 2: Matricule and Genre */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
                                <div className='md:w-[48%]'>
                                    <Controller
                                        name="matricule"
                                        control={control}
                                        rules={{
                                            required: "Ce champ est obligatoire",
                                            pattern: {
                                                value: /^ikh-/,
                                                message: "Le matricule doit commencer par 'ikh-'"
                                            }
                                        }}
                                        render={({ field }) => (
                                            <>
                                                <label htmlFor="matricule" className="block text-sm font-medium text-gray-700">Matricule *</label>
                                                <div className="flex">
                                                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                                                        ikh-
                                                    </span>
                                                    <input
                                                        type="text"
                                                        id="matricule"
                                                        className="rounded-none rounded-r-lg bg-white border text-gray-900 focus:ring-green-500 focus:border-green-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                                                        value={field.value.slice(4)}
                                                        onChange={(e) => field.onChange(`ikh-${e.target.value}`)}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    />
                                    <p className='error-message'>{errors.matricule?.message}</p>
                                </div>
                                <div className="md:w-[48%]">
                                    <Controller
                                        name="genreSemi"
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
                                                onChange={(value: any) =>{
                                                    setValue("genreSemi", value)
                                                    console.log("value", value)
                                                    console.log("dortoirOptions", dortoirOptions);
                                                    
                                                    const dortoirs = dortoirOptions.filter((dortoir: any) => dortoir.genre === value);
                                                    console.log("dortoirs", dortoirs);
                                                    setRelativeDortoirOptions(dortoirs)
                                                }} // Mise à jour de la valeur dans React Hook Form
                                                placeholder="Choisir une option"
                                            />
                                        )}
                                    />
                                    {errors.genreSemi && (<p className="error-message">{errors.genreSemi.message}</p>)}
                                </div>
                            </div>
                            {/* line 3: Age and Dortoir */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
                                <div className=' md:w-[48%]'>
                                    <Input type={'number'} id={'age'} label='Age' required={true} {...register("age", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: "Le contact doit contenir au maximum 10 caractères"
                                        },

                                    })} />
                                    <p className='error-message'>{errors.age?.message}</p>
                                </div>
                                <div className="md:w-[48%]">
                                    <Controller
                                        name="dortoir"
                                        control={control}
                                        rules={{
                                            required: "Ce champ est obligatoire"
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={relativeDortoirOptions}
                                                label="Dortoir"
                                                value={field.value}
                                                onChange={(value: any) => setValue("dortoir", value)} // Mise à jour de la valeur dans React Hook Form
                                                placeholder="Choisir un dortoir"
                                            />
                                        )}
                                    />
                                    {errors.dortoir && (<p className="error-message">{errors.dortoir.message}</p>)}
                                </div>
                            </div>
                            {/* line 4: Sous comité and Etat de santé */}
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
                                                onChange={(value: any) => setValue("sousComite", value)} // Mise à jour de la valeur dans React Hook Form
                                                placeholder="Choisir un sous comite"
                                            />
                                        )}
                                    />
                                    {errors.sousComite && (<p className="error-message">{errors.sousComite.message}</p>)}
                                </div>
                                <div className="md:w-[48%]">
                                    <Controller
                                        name="etatSante"
                                        control={control}
                                        rules={{
                                            required: "Ce champ est obligatoire"
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={etatSanteOptions}
                                                label="Etat de santé"
                                                value={field.value}
                                                onChange={(value: any) => setValue("etatSante", value)} // Mise à jour de la valeur dans React Hook Form
                                                placeholder="Choisir un état de santé"
                                            />
                                        )}
                                    />
                                    {errors.etatSante && (<p className="error-message">{errors.etatSante.message}</p>)}
                                </div>
                            </div>
                            {/* line 5: Probleme santé and Contact */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
                                <div className=' md:w-[48%]'>
                                    <Input type={'text'} id={'problemeSante'} label='Probleme santé' required={false} {...register("problemeSante", {
                                        required: {
                                            value: false,
                                            message: "Ce champ est obligatoire"
                                        },
                                    })} />
                                    <p className='error-message'>{errors.problemeSante?.message}</p>
                                </div>
                                <div className=' md:w-[48%]'>
                                    <Input type={'number'} id={'phoneSemi'} label='Contact' required={true} {...register("phoneSemi", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        },
                                        validate: (value) => {
                                            const isValid = value.length === 10;
                                            return isValid || "Le contact doit contenir 10 caractères";
                                        }

                                    })} />
                                    <p className='error-message'>{errors.phoneSemi?.message}</p>
                                </div>
                            </div>
                            {/* line 6: Contact d'urgence and Situation */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
                                <div className=' md:w-[48%]'>
                                    <Input type={'number'} id={'numUrgence'} label="Contact d'urgence" required={true} {...register("numUrgence", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        },
                                        validate: (value) => {
                                            const isValid = value.length === 10;
                                            return isValid || "Le numero d'urgence doit contenir 10 caractères";
                                        }

                                    })} />
                                    <p className='error-message'>{errors.numUrgence?.message}</p>
                                </div>
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
                                                value={field.value}
                                                onChange={(value: any) => setValue("situation", value)} // Mise à jour de la valeur dans React Hook Form
                                                placeholder="Choisir une situation"
                                            />
                                        )}
                                    />
                                    {errors.situation && (<p className="error-message">{errors.situation.message}</p>)}
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

export default AddSeminariste;