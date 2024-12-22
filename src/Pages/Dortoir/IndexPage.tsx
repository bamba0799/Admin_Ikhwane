import React, { useEffect } from 'react';
import Main from '../../ components/Main/Main';
import PrimaryLayout from '../../layouts/PrimaryLayout';
import HomeCard from '../../ components/Card/HomeCard';
import Button from '../../ components/Button/Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';
import Input from '../../ components/Input/Input';
import EditButton from '../../ components/Button/EditButton';
import DeleteButton from '../../ components/Button/DeleteButton';
import apiService from '../../../services/api';
import DeleteModal from '../../ components/Modal/DeleteModal';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
// import '../../assets/css/index.css';
const IndexPage = () => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [seminaristeId, setSeminaristeId] = React.useState<any>(null);
    const [isClicked, setIsClicked] = React.useState<boolean>(false);

    const [totalDortoirByType, setTotalDortoirByType] = React.useState<any>([]);
    const [totalDortoirByGenre, setTotalDortoirByGenre] = React.useState<any>([]);
    const [activeTabIndex, setActiveTabIndex] = React.useState<number>(0);
    const [dortoirList, setDortoirList] = React.useState<any>([]);
    const [currentDortoir, setCurrentDortoir] = React.useState<any>(null);

    const [seminaristeForPdf, setSeminaristeForPdf] = React.useState<any>([]);

    let auth: any = localStorage.getItem("user");
    auth = JSON.parse(auth);

    const columns = [
        { title: "Nom et Prénoms", field: "nomPrenomSemi", },
        { title: "Genre", field: "genreSemi", },
        { title: "Dortoirs", field: "nomdortoir", },
        { title: "Sous comité", field: "souscomite", },
        { title: "Date d'entrée", field: "createdAt", },
        { title: "Santé", field: "etatSante", },
        { title: "Contact", field: "phoneSemi", },
        { title: "Situation", field: "situation", },
        // { title: "Total soeurs", field: "total_soeurs", type: "numeric" },
        // { title: "Total membres", field: 'total_membres', type: "currency" }
    ]

    const navigate = useNavigate();

    const getTotalDortoirByType = async () => {
        try {
            const { data: totalDortoirByType } = await apiService.getTotalDortoirByType();
            console.log("totalDortoirByType", totalDortoirByType);
            setTotalDortoirByType(totalDortoirByType);
        } catch (error) {
            console.error("error", error);

        }
    }

    const getTotalDortoirByGenre = async () => {
        try {
            const { data: totalDortoirByGenre } = await apiService.getTotalDortoirByGenre();
            console.log("totalDortoirByGenre", totalDortoirByGenre);
            setTotalDortoirByGenre(totalDortoirByGenre);
        } catch (error) {
            console.error("error", error);

        }
    }

    const getDortoirList = async () => {
        try {
            const { data: dortoirList } = await apiService.getDortoirList();
            console.log("getDortoirList", dortoirList);
            setDortoirList(dortoirList);
            const currentDortoir = dortoirList.filter((_items: any, index: number) => index == activeTabIndex);
            console.log("currentDortoir", currentDortoir);

            setCurrentDortoir(currentDortoir);
            const seminaristeForPdf = currentDortoir[0]?.seminaristes?.map((item: any) => {
                return {
                    nomPrenomSemi: `${item.nomSemi} ${item.prenomSemi}`,
                    genreSemi: item.genreSemi,
                    nomdortoir: item.nomdortoir,
                    souscomite: item.sousComite,
                    createdAt: new Date(item.createdAt).toLocaleDateString('fr-FR'),
                    etatSante: item.etatSante,
                    phoneSemi: item.phoneSemi,
                    situation: item.situation
                }
            })
            setSeminaristeForPdf(seminaristeForPdf)

        } catch (error) {
            console.error("error", error);

        }
    }

    const deleteSeminariste = async (id: any) => {
        console.log("id", id);
        setOpen(false);
        try {
            const { data: seminariste } = await apiService.deleteSeminariste(id);
            console.log("seminariste", seminariste);
            setOpen(false);
            setIsClicked(!isClicked);
            toast.success("Seminariste supprimé avec succès");
        } catch (error) {
            console.error("Error in deleteSeminariste:", error);
            toast.error("Une erreur s'est produite lors de la suppression du seminariste");
        }
    }

    const downloadPdf = () => {
        const doc: any = new jsPDF()
        doc.text(`Seminariste du dortoir: ${currentDortoir[0]?.nomDortoir}`, 40, 10)
        doc.autoTable({
            theme: "grid",
            columns: columns.map(col => ({ ...col, dataKey: col.field })),
            body: seminaristeForPdf
        })
        doc.save(`seminariste_dortoir_${currentDortoir[0]?.nomDortoir}.pdf`)
    }

    useEffect(() => {
        getDortoirList();
    }, [activeTabIndex, isClicked]);


    useEffect(() => {
        getTotalDortoirByType();
        getTotalDortoirByGenre();

    }, [isClicked]);
    return (
        <div>
            <Main className=''>
                <PrimaryLayout title={"Dortoirs"}>
                    <div>
                        <div className='flex flex-col lg:flex-row lg:items-center '>
                            <div className=' flex flex-col items-center space-y-2 lg:flex-row lg:items-center  lg:space-y-0 lg:space-x-3'>
                                {/* card1 */}
                                <HomeCard bg={'bg-secondary_orange'} title={'Nombre de dortoirs'} item1={{
                                    title: "C.O",
                                    value: totalDortoirByType?.co
                                }} item2={{
                                    title: "Semi",
                                    value: totalDortoirByType?.seminariste
                                }}
                                    item3={{
                                        title: "Total",
                                        value: totalDortoirByType?.seminariste + totalDortoirByType?.co + totalDortoirByType?.non_defini
                                    }}
                                    icon={'fa-solid:home'}
                                    eye={false}
                                />
                                {/* card2 */}
                                <HomeCard bg={'bg-quaternary_green'} title={'Dortoirs par genre'} item1={{
                                    title: "Pépinières",
                                    value: totalDortoirByGenre?.pepiniere
                                }} item2={{
                                    title: "Frères",
                                    value: totalDortoirByGenre?.frere
                                }}
                                    item3={{
                                        title: "Soeurs",
                                        value: totalDortoirByGenre?.soeur
                                    }}
                                    icon={''}
                                    eye={false}
                                />

                            </div>

                        </div>
                        {auth?.rolePers != "Accueil_Hebergement" ? null :
                            <div className='mt-[10px] flex flex-row justify-end items-center'>
                                <Button onClick={() => navigate("/add-dortoir")} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                    <div className='border rounded-full p-[3px] bg-primary_green'>
                                        <Icon icon="mdi:plus" className='text-white' />
                                    </div>
                                    <p className='text-secondary_green'>Ajouter un dortoir </p>
                                </Button>
                            </div>
                        }
                        {/* tableau */}
                        <div className='md:border md:shadow-lg py-[20px] md:px-[10px]  border-gray-300 mt-[14px] rounded-t-[10px]'>
                            <div className='w-full md:border-b-[2px] border-gray-300 flex items-center space-x-[10px] md:space-x-[20px] overflow-x-auto hide-scrollbar'>
                                {
                                    dortoirList?.map((item: any, index: number) => {
                                        return (
                                            <button onClick={() => setActiveTabIndex(index)} className={`flex-shrink-0  px-[12px] py-[8px] ${activeTabIndex == index ? "bg-primary_orange" : ""} rounded-t-[10px]`} key={index}>
                                                <p className={`text-[14px] ${activeTabIndex == index ? "text-white font-bold" : "text-primary_green"}  `}>{item.nomDortoir}</p>
                                            </button>
                                        )
                                    })
                                }

                            </div>
                            <div className=' border-red-600 flex flex-row items-start md:items-center justify-between space-x-[20px] mt-[10px]'>
                                <div className=' '>
                                    <Input className='rounded-[5px]' type='text' id={"recherche"} placeholder='Rechercher' onChange={(e) => console.log(e.target.value)} />
                                </div>
                                <div className='flex flex-col  space-y-[10px] md:flex-row md:items-center md:justify-between md:space-x-[20px] md:space-y-[0px]'>
                                    {/* <Button onClick={() => navigate("/add-commission")} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                        <div className='border rounded-full p-[3px] bg-primary_green'>
                                            <Icon icon="mdi:plus" className='text-white' />
                                        </div>
                                        <p className='text-secondary_green'>Ajouter une personne </p>
                                    </Button> */}
                                    <Button onClick={() => downloadPdf()} outline={true} className='button-icon bg-tertiary_green' bg={''}>
                                        <p className='text-secondary_green'>Exporter</p>
                                    </Button>
                                </div>
                            </div>
                            <div className="relative overflow-x-auto shadow-sm mt-[10px]">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-white  bg-secondary_green">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Nom et prénoms</th>
                                            <th scope="col" className="px-6 py-3">Genre</th>
                                            <th scope="col" className="px-6 py-3">Dortoirs</th>
                                            <th scope="col" className="px-6 py-3">Sous-comités</th>
                                            <th scope="col" className="px-6 py-3">Date d'entrée</th>
                                            <th scope="col" className="px-6 py-3">Santé</th>
                                            <th scope="col" className="px-6 py-3">Contact</th>
                                            <th scope="col" className="px-6 py-3">Situation</th>
                                            {
                                                auth?.rolePers != "Accueil_Hebergement" ? null :
                                                    <th scope="col" className="px-6 py-3">Actions</th>
                                            }

                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {
                                            currentDortoir?.length > 0 ?
                                                currentDortoir[0]?.seminaristes?.map((item: any, index: number) => (
                                                    <tr className={`${index % 2 == 0 ? "bg-white" : "bg-white/50"} dark:bg-gray-800`} key={index}>
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {item.nomSemi} {item.prenomSemi}
                                                        </th>
                                                        <td className="px-6 py-4">{item.genreSemi}</td>
                                                        <td className="px-6 py-4">{item.nomdortoir}</td>
                                                        <td className="px-6 py-4">{item.sousComite}</td>
                                                        <td className="px-6 py-4">{new Date(item.createdAt).toLocaleDateString('fr-FR')}</td>
                                                        <td className="px-6 py-4">{item.etatSante}</td>
                                                        <td className="px-6 py-4">{item.phoneSemi}</td>
                                                        <td className="px-6 py-4">{item.situation}</td>
                                                        {
                                                            auth?.rolePers != "Accueil_Hebergement" ? null :
                                                                <td className="px-6 py-4 text-right">
                                                                    <div className='flex flex-row justify-start items-center space-x-2'>
                                                                        <EditButton onClick={() => {navigate(`/update-dortoir-seminariste/${item.idSemi}`);localStorage.setItem('currentRouteId',"20")}} />
                                                                        <DeleteButton onClick={() => {
                                                                            setOpen(true)
                                                                            setSeminaristeId(item.idSemi)

                                                                        }} />
                                                                    </div>
                                                                </td>
                                                        }


                                                    </tr>
                                                )) :
                                                <tr>
                                                    <td className="text-center">Aucune donnée disponible</td>
                                                </tr>

                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <DeleteModal deleteAction={() => deleteSeminariste(seminaristeId)} cancelAction={() => { setOpen(false); setSeminaristeId("") }} text='Etes vous sur de bien effacer?' open={open} onClose={() => setOpen(false)} />

                    </div>
                </PrimaryLayout>
            </Main>
        </div>
    );
}

export default IndexPage;
