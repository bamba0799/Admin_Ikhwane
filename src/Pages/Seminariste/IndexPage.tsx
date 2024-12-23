import React, { useEffect, useState } from 'react';
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
import * as XLSX from 'xlsx';

const IndexPage = () => {

    let auth: any = localStorage.getItem("user");
    auth = JSON.parse(auth);
    console.log("auth", auth);

    const [open, setOpen] = React.useState<boolean>(false);

    const [isClicked, setIsClicked] = React.useState<boolean>(false);

    const [activeTabIndex, setActiveTabIndex] = React.useState<number>(0);
    const [statistiqueSeminariste, setStatistiqueSeminariste] = React.useState<any>(null);
    const [totalSeminariste, setTotalSeminariste] = React.useState<any>(null);
    const [totalFrereSeminariste, setTotalFrereSeminariste] = React.useState<any>(null);
    const [totalSoeurSeminariste, setTotalSoeurSeminariste] = React.useState<any>(null);

    const [seminaristeId, setSeminaristeId] = React.useState<any>(null);


    const [currentNiveauData, setCurrentNiveauData] = React.useState<any>([]);
    const [niveau, setNiveau] = React.useState<any>(null);
    const [currentNiveauForpdf, setCurrentNiveauForpdf] = useState<any>([])

    const [searchTerm, setSearchTerm] = useState<string>("");
    const filteredSeminariste = currentNiveauData[0]?.seminariste?.filter((item: any) =>
        item.nomSemi.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const columns = [
        { title: "Nom et Prénoms", field: "nomPrenomSemi", },
        { title: "Genre", field: "genrePers", },
        { title: "Sous comité", field: "sousComite", },
        { title: "Santé", field: "etatSante", },
        { title: "Dortoir", field: "nomdortoir", },
        { title: "Contact", field: "phonePers", },
        { title: "situation", field: "situation", },
    ]
    const columnsTous = [
        { title: "Nom et Prénoms", field: "nomPrenomSemi", },
        { title: "Genre", field: "genreSemi", },
        { title: "Sous comité", field: "sousComite", },
        { title: "Niveau", field: "nomNiveau", },
        { title: "Santé", field: "etatSante", },
        { title: "Dortoir", field: "nomdortoir", },
        { title: "Contact", field: "phoneSemi", },
        { title: "situation", field: "situation", },
    ]

    const navigate = useNavigate();


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

    const getStatistiqueSeminariste = async () => {
        try {
            const { data: stat } = await apiService.getStatistiqueSeminariste();
            const totalFrereSeminariste = stat?.Enfants.totalFrere + stat?.Jeunes_et_Adultes.totalFrere + stat?.Pepinieres.totalFrere + stat?.Non_specifie.totalFrere;
            const totalSoeurSeminariste = stat?.Enfants.totalSoeur + stat?.Jeunes_et_Adultes.totalSoeur + stat?.Pepinieres.totalSoeur + stat?.Non_specifie.totalSoeur;
            const totalSeminarist = totalFrereSeminariste + totalSoeurSeminariste;
            setStatistiqueSeminariste(stat);
            setTotalFrereSeminariste(totalFrereSeminariste);
            setTotalSoeurSeminariste(totalSoeurSeminariste);
            setTotalSeminariste(totalSeminarist);
            console.log("statistiqueSeminariste", stat);
        } catch (error) {
            console.error("Error in getStatistiqueSeminariste:", error);
        }
    }



    const getNiveau = async () => {
        try {
            const { data: nivo } = await apiService.getNiveau();
            console.log("niveausssssss", nivo);
            setNiveau(nivo);
            const currentNiveauDataByNiveau = nivo?.filter((_item: any, index: number) => index == activeTabIndex);
            setCurrentNiveauData(currentNiveauDataByNiveau);
            console.log("currentNiveauDataByNiveau", currentNiveauDataByNiveau);
            const currentNiveauDataByNiveauForpdf = currentNiveauDataByNiveau[0]?.seminariste.map((item: any) => {
                return {
                    nomPrenomSemi: item.nomSemi + " " + item.prenomSemi,
                    genreSemi: item.genreSemi,
                    sousComite: item.sousComite,
                    nomNiveau: item.nomNiveau,
                    etatSante: item.etatSante,
                    nomdortoir: item.nomdortoir,
                    phoneSemi: item.phoneSemi,
                    situation: item.situation ?? 'Néant',
                }
            })
            setCurrentNiveauForpdf(currentNiveauDataByNiveauForpdf);

        } catch (error) {
            console.error("Error in getNiveau:", error);
        }
    }
    const downloadExcel = () => {
        const newData = currentNiveauForpdf.map((row: any) => {
            const newRow = { ...row };
            delete newRow.tableData;
            return newRow;
        });
        const workSheet = XLSX.utils.json_to_sheet(newData);
        if (currentNiveauData[0]?.nomNiveau == "Tous") {
            XLSX.utils.sheet_add_aoa(workSheet, [
                columnsTous.map(col => col.title)
            ], { origin: "A1" });
        } else {
            XLSX.utils.sheet_add_aoa(workSheet, [
                columns.map(col => col.title)
            ], { origin: "A1" });
        }
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, `${currentNiveauData[0]?.nomNiveau}.xlsx`);
        XLSX.writeFile(workBook, `${currentNiveauData[0]?.nomNiveau}.xlsx`);

    };

    useEffect(() => {
        getNiveau();
        getStatistiqueSeminariste();
    }, [activeTabIndex, isClicked]);


    return (
        <div>
            <Main className=''>
                <PrimaryLayout title={"Séminaristes"}>
                    <div>
                        <div className='flex flex-col lg:flex-row lg:items-center '>
                            <div className=' flex flex-col items-center space-y-2 lg:flex-row lg:items-center  lg:space-y-0 lg:space-x-3'>
                                {/* card1 */}
                                <HomeCard bg={'bg-secondary_orange'} title={'Nombre de séminariste'} item1={{
                                    title: "Frères",
                                    value: totalFrereSeminariste
                                }} item2={{
                                    title: "Sœurs",
                                    value: totalSoeurSeminariste
                                }}
                                    item3={{
                                        title: "Total",
                                        value: totalSeminariste
                                    }}
                                    icon={'mdi:account-student'}
                                    eye={false}
                                />
                                {/* card2 */}
                                <HomeCard bg={'bg-quaternary_green'} title={'Pépinières'} item1={{
                                    title: "Frères",
                                    value: statistiqueSeminariste?.Pepinieres.totalFrere
                                }} item2={{
                                    title: "Sœurs",
                                    value: statistiqueSeminariste?.Pepinieres.totalSoeur
                                }}
                                    item3={{
                                        title: "Total",
                                        value: statistiqueSeminariste?.Pepinieres.totalFrere + statistiqueSeminariste?.Pepinieres.totalSoeur
                                    }}
                                    icon={''}
                                    eye={false}
                                />
                                {/* card3 */}
                                <HomeCard bg={'bg-quaternary_green'} title={'Enfants'} item1={{
                                    title: "Frères",
                                    value: statistiqueSeminariste?.Enfants.totalFrere
                                }} item2={{
                                    title: "Sœurs",
                                    value: statistiqueSeminariste?.Enfants.totalSoeur
                                }}
                                    item3={{
                                        title: "Total",
                                        value: statistiqueSeminariste?.Enfants.totalFrere + statistiqueSeminariste?.Enfants.totalSoeur
                                    }}
                                    icon={''}
                                    eye={false}
                                />
                                {/* card4 */}
                                <HomeCard bg={'bg-quaternary_green'} title={'Jeunes et adultes'} item1={{
                                    title: "Frères",
                                    value: statistiqueSeminariste?.Jeunes_et_Adultes.totalFrere
                                }} item2={{
                                    title: "Sœurs",
                                    value: statistiqueSeminariste?.Jeunes_et_Adultes.totalSoeur
                                }}
                                    item3={{
                                        title: "Total",
                                        value: statistiqueSeminariste?.Jeunes_et_Adultes.totalFrere + statistiqueSeminariste?.Jeunes_et_Adultes.totalSoeur
                                    }}
                                    icon={''}
                                    eye={false}
                                />
                            </div>

                        </div>
                        <div className='mt-[10px] flex flex-row justify-end items-center'>
                            {(auth?.rolePers != "Formation") ? null :
                                <Button onClick={() => { navigate("/add-niveau"); localStorage.setItem('currentRouteId', "20") }} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                    <div className='border rounded-full p-[3px] bg-primary_green'>
                                        <Icon icon="mdi:plus" className='text-white' />
                                    </div>
                                    <p className='text-secondary_green'>Ajouter niveau </p>
                                </Button>
                            }
                        </div>
                        {/* niveauleau */}
                        <div className='md:border md:shadow-lg py-[20px] md:px-[10px]  border-gray-300 mt-[14px] rounded-t-[10px]'>
                            <div className='w-full md:border-b-[2px] border-gray-300 flex items-center space-x-[10px] md:space-x-[20px] overflow-x-auto hide-scrollbar'>
                                {
                                    niveau?.map((item: any, index: number) => {

                                        return (
                                            <button onClick={() => setActiveTabIndex(index)} className={`flex-shrink-0  px-[12px] py-[8px] ${activeTabIndex == index ? "bg-primary_orange" : ""} rounded-t-[10px]`} key={index}>
                                                <p className={`text-[14px] ${activeTabIndex == index ? "text-white font-bold" : "text-primary_green"}  `}>{item.nomNiveau}</p>
                                            </button>
                                        )
                                    })
                                }

                            </div>
                            <div className=' border-red-600 flex flex-row items-start md:items-center justify-between space-x-[20px] mt-[10px]'>
                                <div className=' '>
                                    <Input className='rounded-[5px]' type='text' id={"recherche"} placeholder='Rechercher' onChange={(e) => setSearchTerm(e.target.value)} />
                                </div>
                                <div className='flex flex-col  space-y-[10px] md:flex-row md:items-center md:justify-between md:space-x-[20px] md:space-y-[0px]'>
                                    {auth?.rolePers != "Accueil_Hebergement" ? null :
                                        <Button onClick={() => navigate("/add-seminariste")} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                            <div className='border rounded-full p-[3px] bg-primary_green'>
                                                <Icon icon="mdi:plus" className='text-white' />
                                            </div>
                                            <p className='text-secondary_green'>Ajouter séminariste </p>
                                        </Button>
                                    }
                                    <Button onClick={() => downloadExcel()} outline={true} className='button-icon bg-tertiary_green' bg={''}>
                                        <p className='text-secondary_green'>Exporter</p>
                                    </Button>
                                    {
                                        // <Button onClick={() => alert("sss")} outline={true} className='button-icon bg-tertiary_green' bg={''}>
                                        //     <p className='text-secondary_green'>Badge</p>
                                        // </Button>
                                    }
                                </div>
                            </div>
                            <div className="relative overflow-x-auto shadow-sm mt-[10px]">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-white  bg-secondary_green">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Nom et prénoms</th>
                                            <th scope="col" className="px-6 py-3">Genre</th>
                                            <th scope="col" className="px-6 py-3">Dortoirs</th>
                                            {currentNiveauData.length > 0 && currentNiveauData[0]?.nomNiveau != "Tous" ? null :
                                                <th scope="col" className="px-6 py-3">Niveau</th>
                                            }
                                            <th scope="col" className="px-6 py-3">Sous-comités</th>
                                            <th scope="col" className="px-6 py-3">Santé</th>
                                            <th scope="col" className="px-6 py-3">Contact</th>
                                            <th scope="col" className="px-6 py-3">Situation</th>
                                            <th scope="col" className="px-6 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {
                                            currentNiveauData.length > 0 ?
                                                filteredSeminariste?.map((item: any, index: number) => (
                                                    <tr className={`${index % 2 == 0 ? "bg-white" : "bg-white/50"} dark:bg-gray-800`} key={index}>
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {item.nomSemi} {item.prenomSemi}
                                                        </th>
                                                        <td className="px-6 py-4">{item.genreSemi}</td>
                                                        <td className="px-6 py-4">{item.nomdortoir}</td>
                                                        {currentNiveauData.length > 0 && currentNiveauData[0]?.nomNiveau != "Tous" ? null :
                                                            <td className="px-6 py-4">{item.nomNiveau}</td>
                                                        }
                                                        <td className="px-6 py-4">{item.sousComite}</td>
                                                        <td className="px-6 py-4">{item.etatSante}</td>
                                                        <td className="px-6 py-4">{item.phoneSemi}</td>
                                                        <td className="px-6 py-4">{item.situation}</td>

                                                        <td className="px-6 py-4 text-right">
                                                            <div className='flex flex-row justify-start items-center space-x-2'>
                                                                <EditButton onClick={() => { navigate(`/update-seminariste/${item.idSemi}`); localStorage.setItem('currentRouteId', "20") }} />
                                                                <DeleteButton onClick={() => {
                                                                    setOpen(true)
                                                                    setSeminaristeId(item.idSemi)

                                                                }} />
                                                            </div>
                                                        </td>

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
