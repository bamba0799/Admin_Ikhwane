

import SecondMain from '../../ components/Main/SecondMain';
import SecondLayout from '../../layouts/SecondLayout';
import Button from '../../ components/Button/Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../services/api';
// import toast from "react-hot-toast";
import { useEffect, useState } from 'react';
import Input from '../../ components/Input/Input';
import jsPDF from 'jspdf';




const IndexPage = () => {
    const [statMateriel, setStatMateriel] = useState<any[]>([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const filteredStatMateriel = statMateriel.filter((item) =>
        item.commission.toLowerCase().includes(searchTerm.toLowerCase())
    );



    const columns = [
        { title: "Commission", field: "commission", },
        { title: "Materiels loués", field: "materiels_loues" },
        { title: "Materiels achetés", field: "materiels_achete" },
        { title: "Total matériels", field: "total_materiels" },
        { title: "Montant dépensé(Fcfa)", field: "total_depense" },
    ]

    const downloadPdf = () => {
        const doc: any = new jsPDF()
        doc.text(`statistiques des matériels`, 20, 10)
        doc.autoTable({
            theme: "grid",
            columns: columns.map(col => ({ ...col, dataKey: col.field })),
            body: statMateriel
        })
        doc.save(`statistique_materiel.pdf`)
    }

    const getStatMateriel = async () => {
        try {
            const { data: statMateriel } = await apiService.getStatMateriel();
            console.log("statMateriel", statMateriel);
            setStatMateriel(statMateriel);
        } catch (error) {
            console.log("error", error);

        }
    }



    useEffect(() => {
        getStatMateriel();
    }, [])


    return (
        <div>
            <h1>Commission</h1>

            <SecondMain>
                <SecondLayout title={"Matériels"}>
                    <div className="flex justify-between">

                        <div className="w-full flex flex-col justify-between">
                            <h1 className="text-2xl font-semibold text-primary_green">Matériels réçus</h1>
                            <div className=' mt-[10px] border-emerald-500 flex flex-row w-full items-end justify-between space-y-[10px] md:flex-row md:items-center md:justify-between md:space-x-[20px] md:space-y-[0px]'>
                                <div className=' '>
                                    <Input className='rounded-[5px]' type='text' id={"recherche"} placeholder='Rechercher' onChange={(e) => setSearchTerm(e.target.value)} />
                                </div>
                                <div className='flex flex-col items-center space-y-[10px] md:flex-row md:centeritems-start md:space-y-0 md:space-x-[20px]'>
                                    <Button onClick={() => {navigate("/comite-organisation");localStorage.setItem('currentRouteId',"2")}} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                        <Icon icon="solar:arrow-left-linear" className='text-secondary_green w-[20px] h-[20px]' />
                                        <p className='text-secondary_green'>Retour</p>
                                    </Button>
                                    <Button onClick={() => downloadPdf()} outline={true} className='button-icon bg-tertiary_green' bg={''}>
                                        <p className='text-secondary_green'>Exporter</p>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-x-auto shadow-sm mt-[10px]">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-white  bg-secondary_green">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Commission</th>
                                    <th scope="col" className="px-6 py-3">Materiels loués</th>
                                    <th scope="col" className="px-6 py-3">Materiels achetés</th>
                                    <th scope="col" className="px-6 py-3">Total matériels</th>
                                    <th scope="col" className="px-6 py-3">Montant dépensé(Fcfa)</th>
                                    <th scope="col" className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {
                                    filteredStatMateriel?.map((item: any, index: number) => (
                                        <tr className={`${index % 2 == 0 ? "bg-white" : "bg-white/50"} dark:bg-gray-800`} key={index}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.commission}
                                            </th>
                                            <td className="px-6 py-4">{item.materiels_loues}</td>
                                            <td className="px-6 py-4">{item.materiels_achete}</td>
                                            <td className="px-6 py-4">{item.total_materiels}</td>
                                            <td className="px-6 py-4">{item.total_depense}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <button onClick={()=>navigate(`/materiel-detail`)} className='border border-secondary_green p-[5px] rounded-full'>
                                                        <Icon icon="solar:eye-linear" className='text-secondary_green w-[14px] h-[14px]' />
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </SecondLayout>

            </SecondMain>
        </div>
    );
}

export default IndexPage;
