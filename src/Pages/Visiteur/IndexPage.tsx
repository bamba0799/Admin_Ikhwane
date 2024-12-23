
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
// import jsPDF from 'jspdf';
import Terminate from '../../ components/Button/Terminate';
import TerminateModal from '../../ components/Modal/TerminateModal';
import * as XLSX from 'xlsx';

// import '../../assets/css/index.css';
const IndexPage = () => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [openTerminateModal, setOpenTerminateModal] = React.useState<boolean>(false);
    const [visiteurId, setVisiteurId] = React.useState<any>(null);
    const [isClicked, setIsClicked] = React.useState<boolean>(false);



    let auth: any = localStorage.getItem("user");
    auth = JSON.parse(auth);
    console.log("auth", auth);

    const [activeTabIndex, setActiveTabIndex] = React.useState<number>(0);

    const [visiteurForPdf, setVisiteurForPdf] = React.useState<any>([]);

    const [nbVisiteurDuJours, setNbVisiteurDuJours] = React.useState<any>([]);

    const [totalVisiteurByGenre, setTotalVisiteurByGenre] = React.useState<any>([]);

    const [visiteurs, setVisiteurs] = React.useState<any>([]);



    const columns = [
        { title: "Nom et Prénoms", field: "nomPrenomSemi", },
        { title: "Genre", field: "genreVisiteur", },
        { title: "Sous comité", field: "sousComite", },
        { title: "Rôle", field: "roleVisiteur", },
        { title: "Contact", field: "phoneVisiteur", },
        { title: "Date d'entrée", field: "createdAt", },
        { title: "Date de sortie", field: "deleteAt", },

    ]

    const visitStatusTab = [
        { id: 0, label: "Visites terminées" },
        { id: 1, label: "Visites en cours" }
    ]

    const [searchTerm, setSearchTerm] = useState<string>("");
    const filteredVisiteurs = visiteurs?.filter((item: any) =>
        item.nomVisiteur.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const navigate = useNavigate();

    const deleteVisiteur = async (id: any) => {
        console.log("id", id);
        setOpen(false);
        try {
            const { data: visiteur } = await apiService.deleteVisiteur(id);
            console.log("visiteur", visiteur);
            setOpen(false);
            setIsClicked(!isClicked);
            toast.success("visiteur supprimé avec succès");
        } catch (error) {
            console.error("Error in deletevisiteur:", error);
            toast.error("Une erreur s'est produite lors de la suppression du visiteur");
        }
    }

    const terminateVisite = async (id: any) => {
        console.log("id", id);
        setOpen(false);
        try {
            const { data: terminate } = await apiService.terminateVisiteur(id);
            console.log("terminate", terminate);
            setOpenTerminateModal(false);
            setIsClicked(!isClicked);
            toast.success("terminate terminé avec succès");
        } catch (error) {
            console.error("Error in deleteterminateur:", error);
            toast.error("Une erreur s'est produite lors de la suppression du terminateur");
        }
    }


    // const downloadPdf = () => {
    //     const doc: any = new jsPDF()
    //     doc.text(`Visiteur_${activeTabIndex == 0 ? 'Terminés' : "en_cours"}`, 40, 10)
    //     doc.autoTable({
    //         theme: "grid",
    //         columns: columns.map(col => ({ ...col, dataKey: col.field })),
    //         body: visiteurForPdf
    //     })
    //     doc.save(`Visitteur_${activeTabIndex == 0 ? 'Terminés' : "en_cours"}.pdf`)
    // }

    const downloadExcel = () => {
        const newData = visiteurForPdf.map((row:any) => {
            const newRow = { ...row };
            delete newRow.tableData;
            return newRow;
        });
        const workSheet = XLSX.utils.json_to_sheet(newData);
        XLSX.utils.sheet_add_aoa(workSheet, [
            columns.map(col => col.title)
        ], { origin: "A1" });
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, `Visiteur_${activeTabIndex == 0 ? 'Terminés' : "en_cours"}.xlsx`);
        XLSX.writeFile(workBook, `Visiteur_${activeTabIndex == 0 ? 'Terminés' : "en_cours"}.xlsx`);

    };

    const getNbVisiteurDuJours = async (currentDate: string) => {
        try {
            const { data: nbVisiteurDuJours } = await apiService.getNbVisiteurDuJours(currentDate);
            console.log("nbVisiteurDuJours", nbVisiteurDuJours);

            setNbVisiteurDuJours(nbVisiteurDuJours);
        } catch (error) {
            console.error("error", error);
        }
    }

    const getTotalVisiteurByGenre = async () => {
        try {
            const { data: totalVisiteurByGenre } = await apiService.getTotalVisiteurByGenre();
            console.log("totalVisiteurByGenre", totalVisiteurByGenre);
            setTotalVisiteurByGenre(totalVisiteurByGenre);
        } catch (error) {
            console.error("error", error);
        }
    }

    const getVisiteurEnCours = async () => {
        try {
            const { data: visiteurEnCours } = await apiService.getVisiteurEnCours();
            console.log("visiteurEnCours", visiteurEnCours);
            const visiteurForPdf = visiteurEnCours?.map((item: any) => {
                return {
                    nomPrenomSemi: `${item.nomVisiteur} ${item.pernomVisiteur}`,
                    genreVisiteur: item.genreVisiteur,
                    sousComite: item.sousComite,
                    roleVisiteur: item.roleVisiteur,
                    phoneVisiteur: item.phoneVisiteur,
                    createdAt: new Date(item.createdAt).toLocaleDateString('fr-FR'),
                    deletedAt: item.deletedAt
                }
            });
            setVisiteurForPdf(visiteurForPdf);
            setVisiteurs(visiteurEnCours);
        } catch (error) {
            console.error("error", error);
        }
    }

    const getVisiteurTermines = async () => {
        try {
            const { data: visiteurTermines } = await apiService.getVisiteurTermines();
            console.log("visiteurTermines", visiteurTermines);
            const visiteurForPdf = visiteurTermines?.map((item: any) => {
                return {
                    nomPrenomSemi: `${item.nomVisiteur} ${item.pernomVisiteur}`,
                    genreVisiteur: item.genreVisiteur,
                    sousComite: item.sousComite,
                    roleVisiteur: item.roleVisiteur,
                    phoneVisiteur: item.phoneVisiteur,
                    createdAt: new Date(item.createdAt).toLocaleDateString('fr-FR'),
                    deletedAt: item.deletedAt
                }
            });
            setVisiteurForPdf(visiteurForPdf);
            setVisiteurs(visiteurTermines);
        } catch (error) {
            console.error("error", error);
        }
    }

    useEffect(() => {
        if (activeTabIndex == 0) {
            getVisiteurTermines();
        } else if (activeTabIndex == 1) {
            getVisiteurEnCours();
        }
    }, [activeTabIndex, isClicked]);


    useEffect(() => {
        const currentDate = new Date();
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = new Intl.DateTimeFormat('fr-CA', options as any).format(currentDate);

        getNbVisiteurDuJours(formattedDate);
        getTotalVisiteurByGenre();

    }, [isClicked]);
    return (
        <div>
            <Main className=''>
                <PrimaryLayout title={"Visiteurs"}>
                    <div>
                        <div className='flex flex-col lg:flex-row lg:items-center '>
                            <div className=' flex flex-col items-center space-y-2 lg:flex-row lg:items-center  lg:space-y-0 lg:space-x-3'>
                                {/* card1 */}
                                <HomeCard bg={'bg-secondary_orange'} title={'Visite de la journée'} item1={{
                                    title: "Frères",
                                    value: nbVisiteurDuJours?.genreVisiteur?.frere
                                }} item2={{
                                    title: "Soeurs",
                                    value: nbVisiteurDuJours?.genreVisiteur?.soeur
                                }}
                                    item3={{
                                        title: "Total",
                                        value: nbVisiteurDuJours?.totalVisites
                                    }}
                                    icon={'fa-solid:home'}
                                    eye={false}
                                />
                                {/* card2 */}
                                <HomeCard bg={'bg-quaternary_green'} title={'Nb total de visite'} item1={{
                                    title: "Frères",
                                    value: totalVisiteurByGenre?.genreVisiteur?.frere
                                }} item2={{
                                    title: "Soeurs",
                                    value: totalVisiteurByGenre?.genreVisiteur?.soeur
                                }}
                                    item3={{
                                        title: "Total",
                                        value: totalVisiteurByGenre?.totalVisites
                                    }}
                                    icon={''}
                                    eye={false}
                                />

                            </div>

                        </div>
                        <div className='mt-[10px] flex flex-row justify-end items-center'>

                        </div>
                        {/* tableau */}
                        <div className='md:border md:shadow-lg py-[20px] md:px-[10px]  border-gray-300 mt-[14px] rounded-t-[10px]'>
                            <div className='w-full md:border-b-[2px] border-gray-300 flex items-center space-x-[10px] md:space-x-[20px] overflow-x-auto hide-scrollbar'>
                                {
                                    visitStatusTab?.map((item: any, index: number) => {
                                        return (
                                            <button onClick={() => setActiveTabIndex(index)} className={`flex-shrink-0  px-[12px] py-[8px] ${activeTabIndex == index ? "bg-primary_orange" : ""} rounded-t-[10px]`} key={index}>
                                                <p className={`text-[14px] ${activeTabIndex == index ? "text-white font-bold" : "text-primary_green"}  `}>{item.label}</p>
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
                                        <Button onClick={() => { navigate("/add-visiteur"); localStorage.setItem('currentRouteId', "20") }} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                            <div className='border rounded-full p-[3px] bg-primary_green'>
                                                <Icon icon="mdi:plus" className='text-white' />
                                            </div>
                                            <p className='text-secondary_green'>Ajouter un visiteur </p>
                                        </Button>
                                    }
                                    <Button onClick={() => downloadExcel()} outline={true} className='button-icon bg-tertiary_green' bg={''}>
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
                                            <th scope="col" className="px-6 py-3">Sous-comités</th>
                                            <th scope="col" className="px-6 py-3">Rôle</th>
                                            <th scope="col" className="px-6 py-3">Contact</th>
                                            <th scope="col" className="px-6 py-3">Date d'entrée</th>
                                            <th scope="col" className="px-6 py-3">Date de sortie</th>
                                            {(activeTabIndex == 1 && auth?.rolePers == "Accueil_Hebergement") ?
                                                <th scope="col" className="px-6 py-3">Actions</th>
                                                : null
                                            }

                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {
                                            visiteurs?.length > 0 ?
                                            filteredVisiteurs?.map((item: any, index: number) => (
                                                    <tr className={`${index % 2 == 0 ? "bg-white" : "bg-white/50"} dark:bg-gray-800`} key={index}>
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {item.nomVisiteur} {item.pernomVisiteur}
                                                        </th>
                                                        <td className="px-6 py-4">{item.genreVisiteur}</td>
                                                        <td className="px-6 py-4">{item.sousComite}</td>
                                                        <td className="px-6 py-4">{item.roleVisiteur ? item.roleVisiteur : "Néant"}</td>
                                                        <td className="px-6 py-4">{item.phoneVisiteur}</td>
                                                        <td className="px-6 py-4">{new Date(item.createdAt).toLocaleString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                                        </td>
                                                        <td className="px-6 py-4">{new Date(item.deletedAt).toLocaleString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                                        </td>
                                                        {(activeTabIndex == 1 && auth?.rolePers == "Accueil_Hebergement") ?
                                                            <td className="px-6 py-4 text-right">
                                                                <div className='flex flex-row justify-start items-center space-x-2'>
                                                                    <EditButton onClick={() => { navigate(`/update-visiteur/${item.idVisiteur}`); localStorage.setItem('currentRouteId', "20") }} />
                                                                    <Terminate
                                                                        onClick={() => {
                                                                            setOpenTerminateModal(true);
                                                                            setVisiteurId(item.idVisiteur);

                                                                        }}
                                                                    />
                                                                    <DeleteButton onClick={() => {
                                                                        setOpen(true);
                                                                        setVisiteurId(item.idVisiteur);
                                                                    }} />
                                                                </div>
                                                            </td> : null
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
                        <DeleteModal deleteAction={() => deleteVisiteur(visiteurId)} cancelAction={() => { setOpen(false); setVisiteurId("") }} text='Etes vous sur de bien effacer?' open={open} onClose={() => setOpen(false)} />
                        <TerminateModal terminateAction={() => terminateVisite(visiteurId)} cancelTerminateAction={() => { setOpenTerminateModal(false); setVisiteurId("") }} text='Etes vous sûr de terminer la visite??' openTerminate={openTerminateModal} onCloseTerminate={() => setOpenTerminateModal(false)} />
                    </div>
                </PrimaryLayout>
            </Main>
        </div>
    );
}

export default IndexPage;
