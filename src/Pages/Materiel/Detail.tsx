

import React, { useEffect, useState } from 'react';
import HomeCard from '../../ components/Card/HomeCard';
import Button from '../../ components/Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../ components/Input/Input';
import EditButton from '../../ components/Button/EditButton';
import DeleteButton from '../../ components/Button/DeleteButton';
import apiService from '../../../services/api';
import DeleteModal from '../../ components/Modal/DeleteModal';
import toast from 'react-hot-toast';
import SecondLayout from '../../layouts/SecondLayout';
import SecondMain from '../../ components/Main/SecondMain';
// import jsPDF from 'jspdf';
import { Icon } from '@iconify/react/dist/iconify.js';
import * as XLSX from 'xlsx';
const Detail = () => {
    const { commission } = useParams();
    console.log("commission", commission);
    const navigate = useNavigate();
    const [allMateriel, setAllMateriel] = React.useState<any>([]);
    const [materielForPdf, setMaterielForPdf] = React.useState<any>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const filteredMateriel = allMateriel.filter((item: any) =>
        item.designation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        { title: "Quantite", field: "quantite", },
        { title: "Statut", field: "statut", },
        { title: "Date", field: "date", },
        { title: "Lieu", field: "lieu", },
        { title: "Coût", field: "cout", },
    ];


    let auth: any = localStorage.getItem("user");
    auth = JSON.parse(auth);

    const [open, setOpen] = React.useState<boolean>(false);
    const [materielId, setMaterielId] = React.useState<any>(null);

    const [isClicked, setIsClicked] = React.useState<boolean>(false);
    const [totalByComiMateriel, setTotalByComiMateriel] = React.useState<any>(null);




    const deleteMateriel = async (id: any) => {
        console.log("id", id);
        setOpen(false);
        try {
            const { data: materiel } = await apiService.deleteMateriel(id);
            console.log("materiel", materiel);
            setOpen(false);
            setIsClicked(!isClicked);
            toast.success("Matériel supprimé avec succès");
        } catch (error: any) {
            const status = error?.response?.status;
            if (status === 702) {
                console.log("error", error);
                toast.error("Vous n'êtes pas autorisé à supprimer ce matériel");
            } else {
                console.error("Error in deleteMatériel:", error);
                toast.error("Une erreur s'est produite lors de la suppression du Matériel");
            }

        }
    }

    // const downloadPdf = () => {
    //     const doc: any = new jsPDF()
    //     doc.text("Detail materiel", 20, 10)
    //     doc.autoTable({
    //         theme: "grid",
    //         columns: columns.map(col => ({ ...col, dataKey: col.field })),
    //         body: materielForPdf
    //     })
    //     doc.save('materiel.pdf')
    // }

    const getTotalByComiMateriel = async () => {
        try {
            const { data: totalByComiMateriel } = await apiService.getTotalByComiMateriel();
            console.log("totalByComiMateriel", totalByComiMateriel);
            setTotalByComiMateriel(totalByComiMateriel);
        } catch (error) {
            console.error("Error in getTotalByComiMateriel:", error);
        }
    }

      const downloadExcel = () => {
        const newData = materielForPdf.map((row:any) => {
          const newRow = { ...row };
          delete newRow.tableData;
          return newRow;
        });
        const workSheet = XLSX.utils.json_to_sheet(newData);
        XLSX.utils.sheet_add_aoa(workSheet, [
          columns.map(col => col.title) 
        ], { origin: "A1" });
      
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "Commission");
        XLSX.writeFile(workBook, "Materiel.xlsx");
      };


    const getAllMateriel = async () => {
        try {
            const { data: allMateriel } = await apiService.getAllMateriel();
            console.log("allMateriel", allMateriel);
            console.log("options", allMateriel);
            setAllMateriel(allMateriel);

            const materielForPdf = allMateriel.map((materiel: any) => ({
                quantite: materiel.quantite,
                statut: materiel.statut,
                date: materiel.date,
                lieu: materiel.lieu,
                cout: materiel.cout
            }));
            console.log("materielForPdf", materielForPdf);

            setMaterielForPdf(materielForPdf)
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        getAllMateriel();
        getTotalByComiMateriel();
    }, [isClicked])

    return (
        <div>
            <SecondMain >
                <SecondLayout title={"Detail matériels"}>
                    <div className='mt-4'>
                        <div className='flex flex-col lg:flex-row lg:items-center '>
                            <div className=' flex flex-col items-center space-y-2 lg:flex-row lg:items-center  lg:space-y-0 lg:space-x-3'>
                                <HomeCard bg={'bg-quaternary_green'} title={'Materiels'} item1={{
                                    title: "Loués",
                                    value: totalByComiMateriel?.loues
                                }} item2={{
                                    title: "Achetés",
                                    value: totalByComiMateriel?.achetes
                                }}
                                    item3={{
                                        title: "Total depenses",
                                        value: totalByComiMateriel?.totalDepenses
                                    }}
                                    icon={'entypo:tools'}
                                    eye={false}
                                />

                            </div>

                        </div>
                        {
                            auth?.rolePers == "Pco" ?
                                <div className='mt-[10px] flex flex-row justify-end items-center'>
                                    <Button onClick={() => navigate("/materiel")} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                        <Icon icon="solar:arrow-left-linear" className='text-secondary_green w-[20px] h-[20px]' />
                                        <p className='text-secondary_green'>Retour</p>
                                    </Button>
                                </div> :
                                <div className='mt-[10px] flex flex-row justify-end items-center'>
                                    <Button onClick={() => {navigate("/comite-organisation");localStorage.setItem('currentRouteId',"2")}} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                        <Icon icon="solar:arrow-left-linear" className='text-secondary_green w-[20px] h-[20px]' />
                                        <p className='text-secondary_green'>Retour</p>
                                    </Button>
                                </div>
                        }
                        {/* niveauleau */}
                        <div className='md:border md:shadow-lg py-[20px] md:px-[10px]  border-gray-300 mt-[14px] rounded-t-[10px]'>

                            <div className=' border-red-600 flex flex-row items-start md:items-center justify-between space-x-[20px] mt-[10px]'>
                                <div className=' '>
                                    <Input className='rounded-[5px]' type='text' id={"recherche"} placeholder='Rechercher' onChange={(e) => setSearchTerm(e.target.value)} />
                                </div>
                                <div className='flex flex-col  space-y-[10px] md:flex-row md:items-center md:justify-between md:space-x-[20px] md:space-y-[0px]'>
                                    <Button onClick={() => {navigate(`/add-materiel`);localStorage.setItem('currentRouteId',"20")}} outline={true} className='button-icon bg-tertiary_green' bg={''}>
                                        <p className='text-secondary_green'>Ajouter</p>
                                    </Button>

                                    <Button onClick={() => downloadExcel()} outline={true} className='button-icon bg-tertiary_green' bg={''}>
                                        <p className='text-secondary_green'>Exporter</p>
                                    </Button>

                                </div>
                            </div>
                            <div className="relative overflow-x-auto shadow-sm mt-[10px]">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-white  bg-secondary_green">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Dénomination</th>
                                            <th scope="col" className="px-6 py-3">Quantité</th>
                                            <th scope="col" className="px-6 py-3">Statut</th>
                                            <th scope="col" className="px-6 py-3">Date</th>
                                            <th scope="col" className="px-6 py-3">Lieu de location ou d'achat</th>
                                            <th scope="col" className="px-6 py-3">Montant dépensé (Fcfa)</th>
                                            <th scope="col" className="px-6 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {
                                            allMateriel.length > 0 ?
                                                filteredMateriel?.map((item: any, index: number) => (
                                                    <tr className={`${index % 2 == 0 ? "bg-white" : "bg-white/50"} dark:bg-gray-800`} key={index}>
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {item.designation}
                                                        </th>
                                                        <td className="px-6 py-4">{item.quantite}</td>
                                                        <td className="px-6 py-4">{item.statut}</td>
                                                        <td className="px-6 py-4">{item.date}</td>
                                                        <td className="px-6 py-4">{item.lieu}</td>
                                                        <td className="px-6 py-4">{item.cout}</td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div className='flex flex-row justify-start items-center space-x-2'>
                                                                <EditButton onClick={() => navigate(`/update-materiel/${item.idMateriel}`)} />
                                                                <DeleteButton onClick={() => {
                                                                    setOpen(true)
                                                                    setMaterielId(item.idMateriel)
                                                                    // setPcoPhone(item.phonePers)

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
                        <DeleteModal deleteAction={() => deleteMateriel(materielId)} cancelAction={() => { setOpen(false); setMaterielId("") }} text='Etes vous sur de bien effacer?' open={open} onClose={() => setOpen(false)} />

                    </div>
                </SecondLayout>
            </SecondMain>
        </div>
    );
}

export default Detail;
