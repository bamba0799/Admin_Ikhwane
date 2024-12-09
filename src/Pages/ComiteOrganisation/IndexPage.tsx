import React from 'react';
import Main from '../../ components/Main/Main';
import PrimaryLayout from '../../layouts/PrimaryLayout';
import HomeCard from '../../ components/Card/HomeCard';
import Button from '../../ components/Button/Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';
import Input from '../../ components/Input/Input';
import EditButton from '../../ components/Button/EditButton';
import DeleteButton from '../../ components/Button/DeleteButton';
// import '../../assets/css/index.css';
const IndexPage = () => {

    const [activeTabIndex, setActiveTabIndex] = React.useState<number>(0);

    const navigate = useNavigate();

    const tab = [
        { id: 0, name: "Communicatoin" },
        { id: 1, name: "Restauration" },
        { id: 2, name: "Formation" },
        { id: 3, name: "Sécurité" },
        { id: 4, name: "Protocole" },
        { id: 5, name: "Hygiène" },
        { id: 6, name: "Administration" },
        { id: 7, name: "Accueil/Hébergement" },
        { id: 8, name: "Logistique" },
        { id: 9, name: "Finances" },
        { id: 10, name: "Pépinère" },
        { id: 11, name: "Santé" }
    ];
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
                                    value: 12
                                }} item2={{
                                    title: "Sœurs",
                                    value: 12
                                }}
                                    item3={{
                                        title: "Total",
                                        value: 24
                                    }}
                                    icon={'fa:group'}
                                    eye={false}
                                />
                                {/* card2 */}
                                <HomeCard bg={'bg-quaternary_green'} title={'Materiels'} item1={{
                                    title: "Loués",
                                    value: 12
                                }} item2={{
                                    title: "Achetés",
                                    value: 12
                                }}
                                    item3={{
                                        title: "Total",
                                        value: 24
                                    }}
                                    icon={'entypo:tools'}
                                    eye={true}
                                />
                                {/* card3 */}
                                <HomeCard bg={'bg-quaternary_green'} title={'Caisse de l\'activité (en Fcfa)'} item1={{
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
                                />
                            </div>

                        </div>
                        <div className='mt-[10px] flex flex-row justify-end items-center'>
                            <Button onClick={() => navigate("/add-commission")} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                <div className='border rounded-full p-[3px] bg-primary_green'>
                                    <Icon icon="mdi:plus" className='text-white' />
                                </div>
                                <p className='text-secondary_green'>Ajouter un membre de co </p>
                            </Button>
                        </div>
                        {/* tableau */}
                        <div className='md:border md:shadow-lg py-[20px] md:px-[10px]  border-gray-300 mt-[14px] rounded-t-[10px]'>
                            <div className='w-full md:border-b-[2px] border-gray-300 flex items-center space-x-[10px] md:space-x-[20px] overflow-x-auto hide-scrollbar'>
                                {
                                    tab.map((item, index) => {

                                        return (
                                            <button onClick={() => setActiveTabIndex(index)} className={`flex-shrink-0  px-[12px] py-[8px] ${activeTabIndex == index ? "bg-primary_orange" : ""} rounded-t-[10px]`} key={index}>
                                                <p className={`text-[14px] ${activeTabIndex == index ? "text-white font-bold" : "text-primary_green"}  `}>{item.name}</p>
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
                                    <Button onClick={() => navigate("/add-commission")} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                        <div className='border rounded-full p-[3px] bg-primary_green'>
                                            <Icon icon="mdi:plus" className='text-white' />
                                        </div>
                                        <p className='text-secondary_green'>Ajouter un membre </p>
                                    </Button>
                                    <Button onClick={() => alert("sss")} outline={true} className='button-icon bg-tertiary_green' bg={''}>
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
                    <th scope="col" className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Apple MacBook Pro 17"
                    </th>
                    <td className="px-6 py-4">Silver</td>
                    <td className="px-6 py-4">Laptop</td>
                    <td className="px-6 py-4">$2999</td>
                    <td className="px-6 py-4">$udsuf</td>
                    <td className="px-6 py-4 text-right">
                      <div className='flex flex-row justify-start items-center space-x-2'>
                        <EditButton />
                        <DeleteButton />
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Microsoft Surface Pro
                    </th>
                    <td className="px-6 py-4">White</td>
                    <td className="px-6 py-4">Laptop PC</td>
                    <td className="px-6 py-4">$1999</td>
                    <td className="px-6 py-4">$1999</td>
                    <td className="px-6 py-4 text-right">
                      <div className='flex flex-row justify-start items-center space-x-2'>
                        <EditButton />
                        <DeleteButton />
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Magic Mouse 2
                    </th>
                    <td className="px-6 py-4">Black</td>
                    <td className="px-6 py-4">Accessories</td>
                    <td className="px-6 py-4">$99</td>
                    <td className="px-6 py-4">$99</td>
                    <td className="px-6 py-4 text-right">
                      <div className='flex flex-row justify-start items-center space-x-2'>
                        <EditButton />
                        <DeleteButton />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
                        </div>
                    </div>
                </PrimaryLayout>
            </Main>
        </div>
    );
}

export default IndexPage;
