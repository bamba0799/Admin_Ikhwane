import  { useEffect, useState } from 'react';
import SecondMain from '../../ components/Main/SecondMain';
import SecondLayout from '../../layouts/SecondLayout';
import Button from '../../ components/Button/Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { UpdateSeminaristeFormValues } from '../../../services/model';
import Input from '../../ components/Input/Input';
import Select from '../../ components/Select/Select';
import apiService from '../../../services/api';
import toast from "react-hot-toast";




const UpdateSeminariste = () => {
    const { seminaristeId } = useParams();
    console.log("seminaristeId", seminaristeId);

    let auth: any = localStorage.getItem("user");
    auth = JSON.parse(auth);
    console.log("auth", auth);
    const [allDortoirs, setAllDortoirs] = useState([]);
    console.log("allDortoirs", allDortoirs);
    
    const [dortoirOptions, setDortoirOptions] = useState([]);
    const [relativeDortoirOptions, setRelativeDortoirOptions] = useState([]);
    // const [dortoir, setDortoir] = useState<any>([]);
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState, control } = useForm<UpdateSeminaristeFormValues>({
        defaultValues: {
            nomSemi: "",
            prenomSemi: "",
            age: 0,
            genreSemi: "",
            phoneSemi: "",
            sousComite: "",
            numUrgence: "",
            dortoir: "",
            etatSante: "",
            situation: "",
            problemeSante: "",
            niveau: "",
            categorie: "",

        }
    });
    // const genreSemi = watch("genreSemi") || "";
    // const sousComite = watch("sousComite") || "";
    // const situation = watch("situation");
    // const dortoir = watch("dortoir") || "";
    // const etatSante = watch("etatSante") || "";


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



    const situationOptions = [
        { value: "Sur le camp", label: "Sur le camp" },
        { value: "Hors du camp", label: "Hors du camp" },
    ]

    const niveauOptions = [
        { value: "Pepiniere", label: "Pépinière" },
        { value: "Niveau 1", label: "Niveau 1" },
        { value: "Niveau 2", label: "Niveau 2" },
        { value: "Niveau 3", label: "Niveau 3" },
        { value: "Niveau 4", label: "Niveau 4" },
        { value: "Niveau 5", label: "Niveau 5" },
        { value: "Niveau 6", label: "Niveau 6" },

    ];


    const categorieOptions = [
        { value: "Pepinieres", label: "Pépinière" },
        { value: "Enfants", label: "Enfants" },
        { value: "Jeunes_et_Adultes", label: "Jeunes et Adultes" },
        { value: "Non_specifie", label: "Non spécifié" },
    ];


    const { errors } = formState;

    const updateSeminariste = async (data: any) => {
        console.log("yyyyyyy", data);
        try {
            const datas =
            {
                nomSemi: data.nomSemi,
                prenomSemi: data.prenomSemi,
                age: parseInt(data.age),
                genreSemi: data.genreSemi,
                phoneSemi: data.phoneSemi,
                sousComite: data.sousComite,
                numUrgence: data.numUrgence,
                dortoir: data.dortoir,
                etatSante: data.etatSante,
                situation: data.situation,
                problemeSante: data.problemeSante,
                niveau: data.niveau,
                categorie: data.categorie,
            };
            console.log("zzzzzz", datas);

            const { data: seminariste } = await apiService.updateSeminariste(seminaristeId!,datas);
            console.log("seminariste", seminariste);
            toast.success("Séminariste modifié avec succès");
            navigate("/seminariste");
            localStorage.setItem('currentRouteId',"3")
        } catch (error) {
            console.log("error", error);
            toast.error("Une erreur s'est produite lors de la modification du seminariste");
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
            setRelativeDortoirOptions(options);
        } catch (error) {
            console.log("error", error);
        }
    }

    const getSeminaristeById = async () => {
        try {
            const { data: seminariste } = await apiService.getSeminaristeById(seminaristeId);
            console.log("seminaristeById", seminariste);
            setValue("nomSemi", seminariste.nomSemi);
            setValue("prenomSemi", seminariste.prenomSemi);
            setValue("age", seminariste.age);
            setValue("genreSemi", seminariste.genreSemi);
            setValue("phoneSemi", seminariste.phoneSemi);
            setValue("sousComite", seminariste.sousComite);
            setValue("numUrgence", seminariste.numUrgence);
            setValue("dortoir", seminariste.nomdortoir);
            setValue("etatSante", seminariste.etatSante);
            setValue("situation", seminariste.situation);
            setValue("problemeSante", seminariste.problemeSante);
            setValue("niveau", seminariste.niveau.nomNiveau);
            setValue("categorie", seminariste.categorie);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        getAllDortoir()
        getSeminaristeById()
    }, []);


    return (
        <div>
            <h1>update seminariste</h1>
            <SecondMain>
                <SecondLayout title={"Comité d'organisation"}>
                    <div className="flex justify-between">
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-2xl font-semibold text-primary_green">Modifier un séminariste</h1>
                            <Button onClick={() => {navigate("/seminariste");localStorage.setItem('currentRouteId',"3")}} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                <Icon icon="solar:arrow-left-linear" className='text-secondary_green w-[20px] h-[20px]' />
                                <p className='text-secondary_green'>Retour</p>
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 border px-[10px] md:px-[40px] shadow-2xl rounded-[10px]">
                        <form onSubmit={handleSubmit(updateSeminariste)} className='flex flex-col space-y-[20px] md:space-y-[50px] py-[10px] md:py-[30px]'>
                            {/* line 1 */}
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
                            {/* line 2 */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
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
                                                onChange={(value: any) => {
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
                            </div>
                            {/* line 3 */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>

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
                            </div>
                            {/* line 4 */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
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
                                                placeholder="Choisir un sous comite"
                                            />
                                        )}
                                    />
                                    {errors.etatSante && (<p className="error-message">{errors.etatSante.message}</p>)}
                                </div>
                                <div className=' md:w-[48%]'>
                                    <Input type={'text'} id={'problemeSante'} label='Probleme santé' required={false} {...register("problemeSante", {
                                        required: {
                                            value: false,
                                            message: "Ce champ est obligatoire"
                                        },


                                    })} />
                                    <p className='error-message'>{errors.problemeSante?.message}</p>
                                </div>

                            </div>
                            {/* line 5 */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
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

                            </div>
                            {/* line 6 */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>

                                <div className="md:w-[48%]">
                                    <Controller
                                        name="categorie"
                                        control={control}
                                        rules={{
                                            required: "Ce champ est obligatoire"
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={categorieOptions}
                                                label="Categorie"
                                                value={field.value}
                                                onChange={(value: any) => setValue("categorie", value)} // Mise à jour de la valeur dans React Hook Form
                                                placeholder="Choisir une categorie"
                                            />
                                        )}
                                    />
                                    {errors.categorie && (<p className="error-message">{errors.categorie.message}</p>)}
                                </div>

                        { auth?.rolePers == "Accueil_Hebergement"? null:    
                            <div className="md:w-[48%]">
                                    <Controller
                                        name="niveau"
                                        control={control}
                                        rules={{
                                            required: "Ce champ est obligatoire"
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={niveauOptions}
                                                label="Niveau"
                                                value={field.value}
                                                onChange={(value: any) => setValue("niveau", value)} // Mise à jour de la valeur dans React Hook Form
                                                placeholder="Choisir un niveau"
                                            />
                                        )}
                                    />
                                    {errors.niveau && (<p className="error-message">{errors.niveau.message}</p>)}
                                </div>}
                            </div>
                            {/* line 7 */}
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

export default UpdateSeminariste;





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
