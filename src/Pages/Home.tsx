import { useEffect, useState } from 'react'
import Main from '../ components/Main/Main'
import { useNavigate } from 'react-router-dom';

// import { Button } from 'flowbite-react'
import Input from '../ components/Input/Input'
import HomeCard from '../ components/Card/HomeCard'
import PrimaryLayout from '../layouts/PrimaryLayout'
import { Icon } from '@iconify/react/dist/iconify.js'

import apiService from '../../services/api'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import Button from '../ components/Button/Button'
import { Commision, MembreCo, Seminariste } from '../../services/model'
import EditButton from '../ components/Button/EditButton';
import DeleteButton from '../ components/Button/DeleteButton';
import DeleteModal from '../ components/Modal/DeleteModal';
import toast from 'react-hot-toast';


function Home() {
  let auth: any = localStorage.getItem("user");
  auth = JSON.parse(auth);
  console.log("auth", auth);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  console.log("isLoading", isLoading);

  const [open, setOpen] = useState<boolean>(false);
  const [pcoId, setPcoId] = useState<any>(null);
  const [pcoPhone, setPcoPhone] = useState<any>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [totalVisiteur, setTotalVisiteur] = useState<any>()

  const [pco, setPco] = useState([])
  const [totalFormateur, setTotalFormateur] = useState<any>(0)

  const [searchTerm, setSearchTerm] = useState<string>("");


  const [seminariste, setSeminariste] = useState<Seminariste>({
    frere: 0,
    soeur: 0,
    Total: 0,
    m: null
  })

  const [membreCo, setMembreCo] = useState<MembreCo>({
    frere: 0,
    soeur: 0,
    non_defini: 0
  })

  const [dortoir, setDortoir] = useState({
    co: 0,
    seminariste: 0,
    non_defini: 0
  })
  const [commission, setCommission] = useState<Commision[]>([
    {
      commission: "",
      total_frères: 0,
      total_soeurs: 0,
      total_membres: ""
    }
  ])

  // Fonction pour filtrer les commissions
  const filteredCommission = commission.filter((item) =>
    item.commission.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const columns = [
    { title: "Commission", field: "commission", },
    { title: "Total frères", field: "total_frères", },
    { title: "Total soeurs", field: "total_soeurs", type: "numeric" },
    { title: "Total membres", field: 'total_membres', type: "currency" }]

  // const downloadExcel = () => {
  //   const newData = commissionDataForExport.map(row => {
  //     delete row.tableData
  //     return row
  //   })
  //   const workSheet = XLSX.utils.json_to_sheet(newData)
  //   const workBook = XLSX.utils.book_new()
  //   XLSX.utils.book_append_sheet(workBook, workSheet, "students")
  //   //Buffer
  //   XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })
  //   //Binary string
  //   XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
  //   //Download
  //   XLSX.writeFile(workBook, "StudentsData.xlsx")

  // }
  //https://github.com/vikas62081/material-table-YT/blob/pdfExport/src/App.js exporter en excel


  const deletePco = async (id: any) => {
    if (pcoPhone == auth?.phonePers) {
      toast.error("Vous ne pouvez pas vous supprimer vous même")
      setOpen(false)
    } else {

      try {
        const { data } = await apiService.deletePco(id)
        console.log("data", data);
        setOpen(false)
        setIsClicked(!isClicked);
        toast.success("Pco supprimé avec succès");

      } catch (error) {
        console.log("error pco", error);
        toast.error("Une erreur s'est produite lors de la suppression du pco");
      }
    }
  }
  const getPco = async () => {
    setIsLoading(true)
    try {
      const { data: pco } = await apiService.getPco()
      setPco(pco)
    } catch (error) {
      setIsLoading(false)
      console.log("error", error);
    }
  }

  const downloadPdf = () => {
    const doc: any = new jsPDF()
    doc.text("Commission Ikhwane", 20, 10)
    doc.autoTable({
      theme: "grid",
      columns: columns.map(col => ({ ...col, dataKey: col.field })),
      body: commission
    })
    doc.save('table.pdf')
  }

  const getHomeData = async () => {
    setIsLoading(true)
    try {
      const { data: membreCo } = await apiService.getMembresCo();
      console.log("yyyyyyy", membreCo);

      setMembreCo(membreCo)
      const { data: seminariste } = await apiService.getSeminariste()
      setSeminariste(seminariste)
      const { data: dort } = await apiService.getDortoir()
      setDortoir(dort)
      const { data: commission } = await apiService.getCommission()
      setCommission(commission)

      const { data: totalFormateur } = await apiService.getTotalFormateur()
      console.log("totalFormateur", totalFormateur);
      setTotalFormateur(totalFormateur)

      const { data: totalVisiteur } = await apiService.getTotalVisiteurByGenre()
      console.log("totalVisiteur", totalVisiteur);
      setTotalVisiteur(totalVisiteur)


    } catch (error) {
      setIsLoading(false)
      console.log("error", error);
    }
  }
  useEffect(() => {
    getHomeData()
    getPco()
  }, [isClicked])

  return (
    <div>
      <Main className=''>
        <PrimaryLayout title={"Tableau de bord"}>
          <div>
            <div className='flex flex-col lg:flex-row lg:items-center '>
              <div className=' flex flex-col items-center space-y-0 lg:flex-row lg:items-center  lg:space-y-0'>
                <HomeCard bg={'bg-secondary_orange'} title={'Membres de C.O'} item1={{
                  title: "Frères",
                  value: membreCo?.frere
                }} item2={{
                  title: "Sœurs",
                  value: membreCo?.soeur
                }}
                  item3={{
                    title: "Total",
                    value: membreCo?.frere + membreCo?.soeur + membreCo?.non_defini
                  }}
                  icon={'fa:group'}
                  eye={false}
                />
                <div className='lg:w-[1px]  bg-primary_green lg:h-[100px] w-[95%] h-[1px]'></div>
                <HomeCard bg={'bg-secondary_orange'} title={'Nombre de séminariste'} item1={{
                  title: "Frères",
                  value: seminariste?.frere
                }} item2={{
                  title: "Sœurs",
                  value: seminariste?.soeur
                }}
                  item3={{
                    title: "Total",
                    value: seminariste?.Total
                  }}
                  icon={'mdi:account-student'}
                  eye={false}
                />
                <div className='lg:w-[1px]  bg-primary_green lg:h-[100px] w-[95%] h-[1px]'></div>
                <HomeCard bg={'bg-secondary_orange'} title={'Nombre de dortoirs'} item1={{
                  title: "Co",
                  value: dortoir?.co
                }} item2={{
                  title: "séminariste",
                  value: dortoir?.seminariste
                }}
                  item3={{
                    title: "Total",
                    value: dortoir?.non_defini + dortoir?.co + dortoir?.seminariste
                  }}
                  icon={'fa-solid:home'}
                  eye={false}
                />
                <div className='lg:w-[1px]  bg-primary_green lg:h-[100px] w-[95%] h-[1px]'></div>
                <HomeCard bg={'bg-secondary_orange'} title={'Nombre de formateur'} item1={{
                  title: "Frères",
                  value: totalFormateur?.frere
                }} item2={{
                  title: "Sœurs",
                  value: totalFormateur?.soeur
                }}
                  item3={{
                    title: "Total",
                    value: totalFormateur?.total_general
                  }}
                  icon={'fa-solid:home'}
                  eye={false}
                />

              </div>
              <HomeCard bg={'bg-quaternary_green mt-3 lg:mt-0 lg:ml-3'} title={'Nombre total de visite'} item1={{
                title: "Frères",
                value: totalVisiteur?.genreVisiteur?.frere
              }} item2={{
                title: "Sœurs",
                value: totalVisiteur?.genreVisiteur?.soeur
              }}
                item3={{
                  title: "Total",
                  value: totalVisiteur?.totalVisites
                }}
                icon={'fa-solid:home'}
                eye={false}
              />
            </div>
            <div className='flex flex-row items-center justify-between mt-[10px]'>
              <div className=' '>
                <Input className='rounded-[5px]' type='text' id={"recherche"} placeholder='Rechercher' onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <Button onClick={() => downloadPdf()} outline={true} className='button-icon bg-tertiary_green' bg={''}>
                <p className='text-secondary_green'>Exporter</p>
              </Button>
            </div>
            <div className="relative overflow-x-auto shadow-sm mt-[10px]">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white  bg-secondary_green">
                  <tr>
                    <th scope="col" className="px-6 py-3">Commission</th>
                    <th scope="col" className="px-6 py-3">Total frères</th>
                    <th scope="col" className="px-6 py-3">Total soeurs</th>
                    <th scope="col" className="px-6 py-3">Total membres</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">

                  {
                    filteredCommission.map((item, index) => (
                      <tr className={`${index % 2 == 0 ? "bg-white" : "bg-white/50"} dark:bg-gray-800`} key={index}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {item.commission}
                        </th>
                        <td className="px-6 py-4">{item.total_frères}</td>
                        <td className="px-6 py-4">{item.total_soeurs}</td>
                        <td className="px-6 py-4">{item.total_membres}</td>

                      </tr>
                    ))
                  }
                </tbody>
              </table>

            </div>
            <div className='mt-[10px] flex flex-row justify-between items-center'>
              <p className=' text-[12px] text-primary_green font-bold'>Les PCO du séminaire</p>
              {auth?.rolePers == "Pco" ? 
                <Button onClick={() => {navigate("/add-pco"); localStorage.setItem('currentRouteId',"20")}} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                  <div className='border rounded-full p-[3px] bg-primary_green'>
                    <Icon icon="mdi:plus" className='text-white' />
                  </div>
                  <p className='text-secondary_green'>Ajouter un PCO</p>
                </Button>:null}
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
                    {auth?.rolePers == "Accueil_Hebergement" ? null :
                      <th scope="col" className="px-6 py-3">Actions</th>
                    }
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {
                    pco?.map((item: any, index: number) => (
                      <tr className={`${index % 2 == 0 ? "bg-white" : "bg-white/50"} dark:bg-gray-800`} key={index}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {item.nomPers} {item.pernomPers}
                        </th>
                        <td className="px-6 py-4">{item.genrePers}</td>
                        <td className="px-6 py-4">{item.sousComite}</td>
                        <td className="px-6 py-4">{item.phonePers}</td>
                        <td className="px-6 py-4">{item.situation}</td>
                        {auth?.rolePers == "Accueil_Hebergement" ? null :
                        <td className="px-6 py-4 text-right">
                            <div className='flex flex-row justify-start items-center space-x-2'>
                              <EditButton onClick={() => navigate(`/update-pco/${item.idpers}`)} />
                              <DeleteButton onClick={() => {
                                setOpen(true)
                                setPcoId(item.idpers)
                                setPcoPhone(item.phonePers)

                              }} />
                            </div>
                            </td>
                          }
                        
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            <DeleteModal deleteAction={() => deletePco(pcoId)} cancelAction={() => { setOpen(false); setPcoId("") }} text='Etes vous sur de bien effacer?' open={open} onClose={() => setOpen(false)} />

          </div>
        </PrimaryLayout>
      </Main>
    </div>
  )
}

export default Home
