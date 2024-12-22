import SecondMain from '../../ components/Main/SecondMain';
import SecondLayout from '../../layouts/SecondLayout';
import Button from '../../ components/Button/Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { AddDortoirFormValues, } from '../../../services/model';
import Select from '../../ components/Select/Select';
import apiService from '../../../services/api';
import toast from "react-hot-toast";
import Input from '../../ components/Input/Input';


const AddDortoir = () => {
    // const [open, setOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const { handleSubmit, register, setValue, formState, control } = useForm<AddDortoirFormValues>({
        defaultValues: {
            nomDortoir: "",
            typedortoir: "",
            genre: "",
            nbPlace: 0
        }
    });



    const genreDortoirOptions = [
        { value: "frere", label: "Frère" },
        { value: "soeur", label: "Soeur" },
        { value: "pepiniere", label: "Pépinière" },
        { value: "non_defini", label: "Non defini" },
    ];

    const typeDortoirOptions = [
        { value: "co", label: "Co" },
        { value: "seminariste", label: "séminariste" },
        { value: "non_defini", label: "Non defini" },
    ];

    const { errors } = formState;

    const addDortoir = async (data: any) => {
        console.log("yyyyyyy", data);
        try {
            const datas = {
                nomDortoir: data.nomDortoir,
                genre: data.genre,
                typedortoir: data.typedortoir,
                nbPlace: parseInt(data.nbPlace)
            };
            const { data: dortoir } = await apiService.addDortoir(datas);
            console.log("dortoir", dortoir);
            toast.success("Dortoir ajouté avec succès");
            navigate("dortoir");
            localStorage.setItem('currentRouteId',"4")
        } catch (error) {
            console.log("error", error);
            toast.error("Une erreur s'est produite lors de l'ajout du dortoir");
        }
    }


    return (
        <div>

            <h1>add dortoir</h1>
            <SecondMain>
                <SecondLayout title={"Comité d'organisation"}>
                    <div className="flex justify-between">
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-2xl font-semibold text-primary_green">Ajouter un dortoir</h1>
                            <Button onClick={() => {navigate("dortoir");localStorage.setItem('currentRouteId',"4")}} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                <Icon icon="solar:arrow-left-linear" className='text-secondary_green w-[20px] h-[20px]' />
                                <p className='text-secondary_green'>Retour</p>
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 border px-[10px] md:px-[40px] shadow-2xl rounded-[10px]">
                        <form onSubmit={handleSubmit(addDortoir)} className='flex flex-col space-y-[20px] md:space-y-[50px] py-[10px] md:py-[30px]'>
                            {/* line 1 */}
                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
                                <div className=' md:w-[48%]'>
                                    <Input type={'text'} id={'nomDortoir'} label='Nom du dortoir' required={true} {...register("nomDortoir", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        }
                                    })} />
                                    <p className='error-message'>{errors.nomDortoir?.message}</p>
                                </div>
                                <div className=' md:w-[48%]'>
                                    <Input type={'number'} id={'nbPlace'} label='Nom du dortoir' required={true} {...register("nbPlace", {
                                        required: {
                                            value: true,
                                            message: "Ce champ est obligatoire"
                                        }
                                    })} />
                                    <p className='error-message'>{errors.nbPlace?.message}</p>
                                </div>

                            </div>
                                 {/* line 1 */}
                                 <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
                                 <div className="md:w-[48%]">
                                    <Controller
                                        name="genre"
                                        control={control}
                                        rules={{
                                            required: "Ce champ est obligatoire"
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={genreDortoirOptions}
                                                label="Genre du dortoir"
                                                value={field.value}
                                                onChange={(value: any) => setValue("genre", value)} // Mise à jour de la valeur dans React Hook Form
                                                placeholder="Choisir un genre de dortoir"
                                                required={true}
                                            />
                                        )}
                                    />
                                    {errors.genre && (<p className="error-message">{errors.genre.message}</p>)}
                                </div>
                                <div className="md:w-[48%]">
                                    <Controller
                                        name="typedortoir"
                                        control={control}
                                        rules={{
                                            required: "Ce champ est obligatoire"
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={typeDortoirOptions}
                                                label="Type du dortoir"
                                                value={field.value}
                                                onChange={(value: any) => setValue("typedortoir", value)} // Mise à jour de la valeur dans React Hook Form
                                                placeholder="Choisir un type de dortoir"
                                                required={true}
                                            />
                                        )}
                                    />
                                    {errors.typedortoir && (<p className="error-message">{errors.typedortoir.message}</p>)}
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

export default AddDortoir;





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
