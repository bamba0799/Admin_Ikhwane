


import { useEffect, useState } from 'react';
import SecondMain from '../../ components/Main/SecondMain';
import SecondLayout from '../../layouts/SecondLayout';
import Button from '../../ components/Button/Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { UpdateDortoirSeminaristeFormValues } from '../../../services/model';
import Select from '../../ components/Select/Select';
import apiService from '../../../services/api';
import toast from "react-hot-toast";




const UpdateDortoirSeminariste = () => {
    const { seminaristeId } = useParams();
    console.log("seminaristeId", seminaristeId);

    const [allDortoirs, setAllDortoirs] = useState([]);
    console.log("allDortoirs", allDortoirs);
    const [genreSemi, setGenreSemi] = useState("");

    const [dortoirOptions, setDortoirOptions] = useState([]);
    console.log("dortoirOptions", dortoirOptions);
    
    const [relativeDortoirOptions, setRelativeDortoirOptions] = useState([]);
    // const [dortoir, setDortoir] = useState<any>([]);
    const navigate = useNavigate();
    const { handleSubmit, setValue, formState, control } = useForm<UpdateDortoirSeminaristeFormValues>({
        defaultValues: {

            dortoir: "",

        }
    });
    const { errors } = formState;

    const updateDortoirSeminariste = async (data: any) => {
        console.log("yyyyyyy", data);
        try {
            const datas =
            {
                genreSemi: genreSemi,
                dortoir: data.dortoir,

            };
            console.log("zzzzzz", datas);

            const { data: seminariste } = await apiService.updateDortoirSeminariste(seminaristeId!, datas);
            console.log("seminariste", seminariste);
            toast.success("Séminariste modifié avec succès");
            navigate("/dortoir");
        } catch (error: any) {
            const status = error?.response?.status;
            if (status === 701) {
                console.log("error", error);
                toast.error("Le genre du seminariste n'est pas autorisé pour ce dortoir");
            } else {
                console.log("error", error);
                toast.error("Une erreur s'est produite lors de la modification du seminariste");
            }

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
            setGenreSemi(seminariste.genreSemi);

            setValue("dortoir", seminariste.nomdortoir);

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
                            <h1 className="text-2xl font-semibold text-primary_green">Modifier le dortoir du seminariste</h1>
                            <Button onClick={() => navigate("/dortoir")} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                <Icon icon="solar:arrow-left-linear" className='text-secondary_green w-[20px] h-[20px]' />
                                <p className='text-secondary_green'>Retour</p>
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 border px-[10px] md:px-[40px] shadow-2xl rounded-[10px]">
                        <form onSubmit={handleSubmit(updateDortoirSeminariste)} className='flex flex-col space-y-[20px] md:space-y-[50px] py-[10px] md:py-[30px]'>
                            {/* line 1 */}
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

export default UpdateDortoirSeminariste;





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
