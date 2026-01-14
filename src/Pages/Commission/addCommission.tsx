
import SecondMain from '../../ components/Main/SecondMain';
import SecondLayout from '../../layouts/SecondLayout';
import Button from '../../ components/Button/Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AddCommissionFormValues } from '../../../services/model';
import Input from '../../ components/Input/Input';
import Select from '../../ components/Select/Select';
import apiService from '../../../services/api';
import toast from "react-hot-toast";




const AddCommission = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, setValue, watch, formState } = useForm<AddCommissionFormValues>({
        defaultValues: {
            nomPers: "",
            pernomPers: "",
            genrePers: "",
            phonePers: "",
            situation: null,
            sousComite: "",
            commission: "",
            motPass: "",
            roleMembre: "",

        }
    });
    const genrePers = watch("genrePers") || "";
    const sousComite = watch("sousComite") || "";
    const commission = watch("commission") || "";
    const roleMembre = watch("roleMembre") || "";
    const situation = watch("situation") || "false";


    const genreOptions = [
        { value: "frere", label: "Frère" },
        { value: "soeur", label: "Soeur" },
    ];

    const sousComiteOptions = [
        { value: "sousComite1", label: "Sous comité 1" },
        { value: "sousComite2", label: "Sous comité 2" },
        { value: "sousComite3", label: "Sous comité 3" },

    ];

    // const commisionOptions = [
    //     { value: "pco", label: "pco" },

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



    const commisionOptions = [
        // { value: "pco", label: "pco" },
        { value: "Communication", label: "Communication" },
        { value: "Formation", label: "Formation" },
        { value: "Restauration", label: "Restauration" },
        { value: "Securite", label: "Securité" },
        { value: "Finance", label: "Finance" },
        { value: "Protocole", label: "Protocole" },
        { value: "Hygiene", label: "Hygiène" },
        { value: "Administration", label: "Administration" },
        { value: "Accueil_Hebergement", label: "Accueil_Hébergement" },
        { value: "Logistique", label: "Logistique" },
        { value: "Pepiniere", label: "Pépinière" },
        { value: "Sante", label: "Santé" },

    ];

    const roleMembreOptions = [
        { value: "responsable", label: "responsable" },
        { value: "reponsable_adjoint", label: "reponsable_adjoint" },
        { value: "simple", label: "simple" },
    ]

    const situationOptions = [
        { value: "true", label: "Sur le camp" },
        { value: "false", label: "Hors du camp" },
    ]


    const { errors } = formState;



    const addCoMember = async (data: any) => {
        console.log("data", data);

        try {
            const { data: addedCoMember } = await apiService.addMembereCo({
                nomPers: data.nomPers,
                pernomPers: data.pernomPers,
                genrePers: data.genrePers,
                phonePers: data.phonePers,
                sousComite: data.sousComite,
                commission: data.commission,
                roleMembre: data.roleMembre,
                situation: data.situation === "Sur le camp" ? 1 : "Hors du camp",
                motPass: data.motPass,
            });
            console.log("addedCoMember", addedCoMember);
            toast.success("Membre du comité d'organisation ajouté avec succès");
            navigate("/comite-organisation");
        } catch (error: any) {
            const status = error.response.status;
            if (status === 701) {
                return toast.error("Vous n'etes pas autorisé à effectuer cette action");
            } else if (status == 704) {
                toast.error("Pas autorisé à ajouter ce membre dans votre commission");
            } else {
                console.log("error", error);
                toast.error("Une erreur s'est produite lors de l'ajout du membre du comité d'organisation");
            }
        }
    }


    return (
        <div>
            <h1>Commission</h1>
            <SecondMain>
                <SecondLayout title={"Comité d'organisation"}>
                    <div className="flex justify-between">
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-2xl font-semibold text-primary_green">Ajouter Co</h1>
                            <Button onClick={() => navigate("/comite-organisation")} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                <Icon icon="solar:arrow-left-linear" className='text-secondary_green w-[20px] h-[20px]' />
                                <p className='text-secondary_green'>Retour</p>
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 border px-[10px] md:px-[40px] shadow-2xl rounded-[10px]">
                        <form onSubmit={handleSubmit(addCoMember)} className='flex flex-col space-y-[20px] md:space-y-[50px] py-[10px] md:py-[30px]'>
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
                                    <Select
                                        options={genreOptions}
                                        label="Genre"
                                        value={genrePers} // Watch the selected value
                                        onChange={(value: any) => setValue("genrePers", value)} // Update form state
                                        placeholder="Choisir une option"
                                    />
                                    <p className="error-message">{errors.genrePers?.message}</p>
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
                                    <Select
                                        options={sousComiteOptions}
                                        label="Sous comité"
                                        value={sousComite} // Watch the selected value
                                        onChange={(value: any) => setValue("sousComite", value)} // Update form state
                                        placeholder="Choisir une option"
                                    />
                                    <p className="error-message">{errors.sousComite?.message}</p>
                                </div>
                                <div className="md:w-[48%]">
                                    <Select
                                        options={commisionOptions}
                                        label="Commission"
                                        value={commission} // Watch the selected value
                                        onChange={(value: any) => setValue("commission", value)} // Update form state
                                        placeholder="Choisir une option"
                                    />
                                    <p className="error-message">{errors.commission?.message}</p>
                                </div>


                            </div>
                            {/* line 4 */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
                                <div className="md:w-[48%]">
                                    <Select
                                        options={roleMembreOptions}
                                        label="Rôle membre"
                                        value={roleMembre} // Watch the selected value
                                        onChange={(value: any) => setValue("roleMembre", value)} // Update form state
                                        placeholder="Choisir une option"
                                    />
                                    <p className="error-message">{errors.roleMembre?.message}</p>
                                </div>

                                <div className="md:w-[48%]">
                                    <Select
                                        options={situationOptions}
                                        label="Situation"
                                        value={situation} // Watch the selected value
                                        onChange={(value: any) => setValue("situation", value)} // Update form state
                                        placeholder="Choisir une option"
                                    />
                                    <p className="error-message">{errors.situation?.message}</p>
                                </div>

                            </div>

                            {/* line 4 */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
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

export default AddCommission;

