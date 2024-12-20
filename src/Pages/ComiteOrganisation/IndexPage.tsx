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
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';
import DeleteModal from '../../ components/Modal/DeleteModal';
// import '../../assets/css/index.css';
const IndexPage = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [coId, setCoId] = useState<any>(null);
    const [isClicked, setIsClicked] = useState<boolean>(false);

    let auth: any = localStorage.getItem("user");
    auth = JSON.parse(auth);
    console.log("auth", auth);

    const [activeTabIndex, setActiveTabIndex] = React.useState<number>(0);
    const [totalByComi, setTotalByComi] = React.useState<any>([]);
    const [totalByGender, setTotalByGender] = React.useState<any>([]);
    const [listParCo, setListParCo] = React.useState<any>([]);
    const [selectedComiMember, setSelectedComiMember] = React.useState<any>(null);
    const [selectedComiMemberForpdf, setSelectedComiMemberForpdf] = React.useState<any>(null);

    const navigate = useNavigate();



    const columns = [
        { title: "Nom et Prénoms", field: "nomPrenomCo", },
        { title: "Genre", field: "genrePers", },
        { title: "Sous comité", field: "sousComite", },
        { title: "Rôle", field: "rolePers", },
        { title: "Contact", field: "phonePers", },
        { title: "situation", field: "situation", },
    ]


    const downloadPdf = () => {
        const doc: any = new jsPDF()
        doc.text(`Commission_${selectedComiMember?.commission}`, 20, 10)
        doc.autoTable({
            theme: "grid",
            columns: columns.map(col => ({ ...col, dataKey: col.field })),
            body: selectedComiMemberForpdf
        })
        doc.save(`${`Commission_${selectedComiMember?.commission}`}.pdf`)
    }


    const deleteCo = async (id: any) => {
        // if(pcoPhone == auth?.phonePers){
        //   toast.error("Vous ne pouvez pas vous supprimer vous même")
        //   setOpen(false)
        // } else{

        try {
            const { data } = await apiService.deleteCo(id)
            console.log("data", data);
            setOpen(false)
            setIsClicked(!isClicked);
            toast.success("Co supprimé avec succès");

        } catch (error) {
            console.log("error pco", error);
            toast.error("Une erreur s'est produite lors de la suppression du pco");
        }
    }

    // const tab = [
    //     { id: 0, name: "Communicatoin" },
    //     { id: 1, name: "Restauration" },
    //     { id: 2, name: "Formation" },
    //     { id: 3, name: "Sécurité" },
    //     { id: 4, name: "Protocole" },
    //     { id: 5, name: "Hygiène" },
    //     { id: 6, name: "Administration" },
    //     { id: 7, name: "Accueil/Hébergement" },
    //     { id: 8, name: "Logistique" },
    //     { id: 9, name: "Finances" },
    //     { id: 10, name: "Pépinère" },
    //     { id: 11, name: "Santé" }
    // ];


    const getListParCo = async () => {
        try {
            const { data: listParCo } = await apiService.getListParCo();
            console.log("listParCo", listParCo);
            setListParCo(listParCo);
            const selectedComiMember = listParCo[activeTabIndex];
            console.log("selectedComiMember", selectedComiMember);

            setSelectedComiMember(selectedComiMember);
            const selectedComiMemberForpdf = selectedComiMember?.membres.map((item: any) => {
                return {
                    nomPrenomCo: item.nomPers + " " + item.pernomPers,
                    genrePers: item.genrePers,
                    sousComite: item.sousComite,
                    rolePers: item.rolePers,
                    phonePers: item.phonePers,
                    situation: item.situation && 'Néant',
                }
            })
            setSelectedComiMemberForpdf(selectedComiMemberForpdf);

        } catch (error) {
            console.log("error", error);

        }
    }

    const getTotalGender = async () => {
        try {
            const { data: totalByGender } = await apiService.getTotalGender();
            console.log("getTotalGender", totalByGender);
            setTotalByGender(totalByGender);
        } catch (error) {
            console.log("error", error);

        }
    }

    const getTotalByComi = async () => {
        try {
            const { data: totalByComi } = await apiService.getTotalByComi();
            console.log("totalByComi", totalByComi);
            setTotalByComi(totalByComi);
        } catch (error) {
            console.log("error", error);

        }
    }

    useEffect(() => {
        getListParCo();
        getTotalByComi();
        getTotalGender();
    }, [activeTabIndex, isClicked]);
    return (
        <div>
            <Main className=''>
                <PrimaryLayout title={"Comité d'organisation"}>
                    <div>
                        <div className='flex flex-col lg:flex-row lg:items-center '>
                            <div className=' flex flex-col items-center space-y-2 lg:flex-row lg:items-center  lg:space-y-0 lg:space-x-3'>
                                {/* card1 */}
                                <HomeCard bg={'bg-secondary_orange'} title={'Membres de C.O'} item1={{
                                    title: "Frères",
                                    value: totalByGender?.frere
                                }} item2={{
                                    title: "Sœurs",
                                    value: totalByGender?.soeur
                                }}
                                    item3={{
                                        title: "Total",
                                        value: totalByGender?.frere + totalByGender?.soeur + totalByGender?.non_defini
                                    }}
                                    icon={'fa:group'}
                                    eye={false}
                                />
                                {/* card2 */}
                                {auth?.rolePers == "Pco" ? 
                                    <HomeCard onClickEye={() => navigate('/materiel')} bg={'bg-quaternary_green'} title={'Materiels'} item1={{
                                        title: "Loués",
                                        value: totalByComi?.loues
                                    }} item2={{
                                        title: "Achetés",
                                        value: totalByComi?.achetes
                                    }}
                                        item3={{
                                            title: "Total depenses",
                                            value: totalByComi?.totalDepenses
                                        }}
                                        icon={'entypo:tools'}
                                        eye={true}
                                    />:
                                    <HomeCard onClickEye={() => navigate(`/materiel-detail`)} bg={'bg-quaternary_green'} title={'Materiels'} item1={{
                                        title: "Loués",
                                        value: totalByComi?.loues
                                    }} item2={{
                                        title: "Achetés",
                                        value: totalByComi?.achetes
                                    }}
                                        item3={{
                                            title: "Total depenses",
                                            value: totalByComi?.totalDepenses
                                        }}
                                        icon={'entypo:tools'}
                                        eye={true}
                                    />
                                }
                                {/* card3 */}
                                {/* <HomeCard bg={'bg-quaternary_green'} title={'Caisse de l\'activité (en Fcfa)'} item1={{
                                    title: "Collecte",
                                    value: 12
                                }} item2={{
                                    title: "Dépense",
                                    value: 12
                                }}
                                    item3={{
                                        title: "Différence",
                                        value: 24
                                    }}
                                    icon={'entypo:tools'}
                                    eye={true}
                                /> */}
                            </div>

                        </div>
                        {auth?.rolePers == "Pco" ? null :
                            <div className='mt-[10px] flex flex-row justify-end items-center'>
                                <Button onClick={() => navigate("/add-commission")} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                    <div className='border rounded-full p-[3px] bg-primary_green'>
                                        <Icon icon="mdi:plus" className='text-white' />
                                    </div>
                                    <p className='text-secondary_green'>Ajouter un membre de co </p>
                                </Button>
                            </div>
                        }
                        {/* tableau */}
                        <div className='md:border md:shadow-lg py-[20px] md:px-[10px]  border-gray-300 mt-[14px] rounded-t-[10px]'>
                            <div className='w-full md:border-b-[2px] border-gray-300 flex items-center space-x-[10px] md:space-x-[20px] overflow-x-auto hide-scrollbar'>
                                {
                                    listParCo.map((item: any, index: number) => {
                                        return (
                                            <button onClick={() => setActiveTabIndex(index)} className={`flex-shrink-0  px-[12px] py-[8px] ${activeTabIndex == index ? "bg-primary_orange" : ""} rounded-t-[10px]`} key={index}>
                                                <p className={`text-[14px] ${activeTabIndex == index ? "text-white font-bold" : "text-primary_green"}  `}>{item.commission == 'Accueil_Hebergement' ? 'Accueil/Hébergement' : item.commission == 'Pepiniere' ? 'Pépinière' : item.commission == 'Sante' ? 'Santé' : item.commission == 'Hygiene' ? 'Hygiène' : item.commission == 'Securite' ? 'Sécurite' : item.commission}</p>
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
                                    <Button onClick={() => navigate("/add-commission")} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                        <Icon icon="fluent:document-edit-24-filled" className='text-primary_green text-[18px]' />
                                        <p className='text-secondary_green'>Rapport </p>
                                    </Button>
                                    {/* <Button onClick={() => navigate("/add-commission")} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                        <div className='border rounded-full p-[3px] bg-primary_green'>
                                            <Icon icon="mdi:plus" className='text-white' />
                                        </div>
                                        <p className='text-secondary_green'>Ajouter un membre </p>
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
                                            <th scope="col" className="px-6 py-3">Sous-comités</th>
                                            <th scope="col" className="px-6 py-3">Contact</th>
                                            <th scope="col" className="px-6 py-3">Situation</th>

                                            {
                                                (auth?.rolePers == "Pco" && selectedComiMember?.commission == "Pco") ?
                                                    <th scope="col" className="px-6 py-3">Actions</th> : null
                                            }
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {
                                            selectedComiMember?.membres?.map((item: any, index: number) => (
                                                <tr className={`${index % 2 == 0 ? "bg-white" : "bg-white/50"} dark:bg-gray-800`} key={index}>
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {item.nomPers} {item.prenomPers}
                                                    </th>
                                                    <td className="px-6 py-4">{item.genrePers}</td>
                                                    <td className="px-6 py-4">{item.sousComite}</td>
                                                    <td className="px-6 py-4">{item.phonePers}</td>
                                                    <td className="px-6 py-4">{item.situation && 'Néant'}</td>
                                                    {(auth?.rolePers == "Pco" && selectedComiMember?.commission == "Pco") ?
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center space-x-2">
                                                                <EditButton onClick={() => navigate(`/update-co/${item.idpers}`)} />
                                                                <DeleteButton onClick={() => {
                                                                    setOpen(true)
                                                                    setCoId(item.idpers)
                                                                    //  setPcoPhone(item.phonePers)
                                                                }} />
                                                            </div>
                                                        </td> : null
                                                    }

                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <DeleteModal deleteAction={() => deleteCo(coId)} cancelAction={() => { setOpen(false); setCoId("") }} text='Etes vous sur de bien effacer?' open={open} onClose={() => setOpen(false)} />
                    </div>
                </PrimaryLayout>
            </Main>
        </div>
    );
}

export default IndexPage;
