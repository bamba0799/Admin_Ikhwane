import SecondMain from '../../ components/Main/SecondMain';
import SecondLayout from '../../layouts/SecondLayout';
import Button from '../../ components/Button/Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { AddNiveauFormValues } from '../../../services/model';
import Select from '../../ components/Select/Select';
import apiService from '../../../services/api';
import toast from "react-hot-toast";


const AddNiveau = () => {
    // const [open, setOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const { handleSubmit, setValue, formState, control } = useForm<AddNiveauFormValues>({
        defaultValues: {
            nomNiveau: "",
        }
    });

    const niveauOptions = [
        { value: "Pepiniere", label: "Pépinière" },
        { value: "Niveau 1", label: "Niveau 1" },
        { value: "Niveau 2", label: "Niveau 2" },
        { value: "Niveau 3", label: "Niveau 3" },
        { value: "Niveau 4", label: "Niveau 4" },
        { value: "Niveau 5", label: "Niveau 5" },
        { value: "Niveau 6", label: "Niveau 6" },

    ];

    const { errors } = formState;

    const addNiveau = async (data: any) => {
        console.log("yyyyyyy", data);
        try {
            const datas = {
                nomNiveau: data.nomNiveau,
            };
            const { data: niveau } = await apiService.addNiveau(datas);
            console.log("niveau", niveau);
            toast.success("Niveau ajouté avec succès");
            navigate("/seminariste");
        } catch (error) {
            console.log("error", error);
            toast.error("Une erreur s'est produite lors de l'ajout du membre du comité d'organisation");
        }
    }


    return (
        <div>
          
            <h1>Commission</h1>
            <SecondMain>
                <SecondLayout title={"Comité d'organisation"}>
                    <div className="flex justify-between">
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-2xl font-semibold text-primary_green">Ajouter une commission</h1>
                            <Button onClick={() => {navigate("seminariste");localStorage.setItem('currentRouteId',"3")}} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                <Icon icon="solar:arrow-left-linear" className='text-secondary_green w-[20px] h-[20px]' />
                                <p className='text-secondary_green'>Retour</p>
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 border px-[10px] md:px-[40px] shadow-2xl rounded-[10px]">
                        <form onSubmit={handleSubmit(addNiveau)} className='flex flex-col space-y-[20px] md:space-y-[50px] py-[40px] md:py-[130px]'>
                            {/* line 1 */}

                            <div className='flex flex-col space-y-[20px] md:space-y-[0px]  md:flex-row md:justify-between md:items-center'>
                                <div className="md:w-full md:mx-[300px]">
                                    <Controller
                                        name="nomNiveau"
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
                                                onChange={(value: any) => setValue("nomNiveau", value)} // Mise à jour de la valeur dans React Hook Form
                                                placeholder="Choisir un niveau"
                                                required={true}
                                            />
                                        )}
                                    />
                                    {errors.nomNiveau && (<p className="error-message">{errors.nomNiveau.message}</p>)}
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

export default AddNiveau;





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
