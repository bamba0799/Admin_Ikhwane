import { useEffect, useState } from 'react';
import apiService from '../../../services/api';
import SecondMain from '../../ components/Main/SecondMain';
import SecondLayout from '../../layouts/SecondLayout';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import Button from '../../ components/Button/Button';

const DisplayRapport = () => {
    const navigate = useNavigate();
    const [allRapport, setAllRapport] = useState<any>()
    const getAllRapport = async () => {
        try {
            const { data: rapport } = await apiService.getAllRapport()
            console.log("rapport", rapport);
            const rapportStructure = rapport.reduce((acc: any, item: any) => {
                Object.keys(item).forEach(key => {
                    if (!acc[key]) {
                        acc[key] = [];
                    }
                    acc[key].push(item[key]);
                });
                return acc;
            }, {});
            console.log("rapportStructure", rapportStructure);
            setAllRapport(rapportStructure)
        } catch (error) {
            console.log("error rapport", error)
        }
    }

    useEffect(() => {
        getAllRapport()
    }, [])
    return (
        <div>
            <SecondMain>
                <SecondLayout title={"Rapport"}>
                    <div className="flex justify-between">
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-2xl font-semibold text-primary_green">Voir rapport</h1>
                            <Button onClick={() => {navigate("/comite-organisation");localStorage.setItem('currentRouteId',"2")}} outline={true} className='button-icon bg-quaternary_green' bg={''}>
                                <Icon icon="solar:arrow-left-linear" className='text-secondary_green w-[20px] h-[20px]' />
                                <p className='text-secondary_green'>Retour</p>
                            </Button>
                        </div>
                    </div>
                    <div className='mt-[20px] grid  grid-cols-1 md:grid-cols-3'>
                        {/* table 1 */}
                        <div>
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr className=' bg-tertiary_green'>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Libellé rapport</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allRapport?.libelleRapport.map((lib: any, index: any) => (
                                            <tr key={index} className="border-t">
                                                <td className="px-6 py-4 whitespace-wrap">{lib}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        {/* table 2 */}
                        <div>
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr className=' bg-tertiary_green'>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tâches réalisées</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allRapport?.tacheRealisees.map((lib: any, index: any) => (
                                            <tr key={index} className="border-t">
                                                {
                                                    lib != "" ?
                                                        <td className="px-6 py-4 whitespace-wrap">{lib}</td> : null
                                                }
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        {/* table3 */}
                        <div>
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr className=' bg-tertiary_green'>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TachesNonRealisees</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allRapport?.tachesNonRealisees
                                            .map((lib: any, index: any) => (
                                                <tr key={index} className="border-t">
                                                    {
                                                        lib != "" ?
                                                            <td className="px-6 py-4 whitespace-wrap">{lib}</td> : null
                                                    }
                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        {/* table4 */}
                        <div>
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr className=' bg-tertiary_green'>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commentaires</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allRapport?.commentaires
                                            .map((lib: any, index: any) => (
                                                <tr key={index} className="border-t">
                                                    {
                                                        lib != "" ?
                                                            <td className="px-6 py-4 whitespace-wrap">{lib}</td> : null
                                                    }
                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>

                        </div>
                        {/* table4 */}
                        <div>
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr className=' bg-tertiary_green'>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Info Supplémentaire</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allRapport?.infoSuplementaire

                                            .map((lib: any, index: any) => (
                                                <tr key={index} className="border-t">
                                                    {
                                                        lib != "" ?
                                                            <td className="px-6 py-4 whitespace-wrap">{lib}</td> : null
                                                    }
                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        {/* table4 */}
                        <div>
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr className=' bg-tertiary_green'>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Causes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allRapport?.causes
                                            .map((lib: any, index: any) => (
                                                <tr key={index} className="border-t">
                                                    {
                                                        lib != "" ?
                                                            <td className="px-6 py-4 whitespace-wrap">{lib}</td> : null
                                                    }
                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        {/* table4 */}
                        <div>
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr className=' bg-tertiary_green'>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficultés</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allRapport?.difficultes
                                            .map((lib: any, index: any) => (
                                                <tr key={index} className="border-t">
                                                    {
                                                        lib != "" ?
                                                            <td className="px-6 py-4 whitespace-wrap">{lib}</td> : null
                                                    }
                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>

                        </div>
                        {/* table4 */}
                        <div>
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr className=' bg-tertiary_green'>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suggestions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allRapport?.suggestions
                                            .map((lib: any, index: any) => (
                                                <tr key={index} className="border-t">
                                                    {
                                                        lib != "" ?
                                                            <td className="px-6 py-4 whitespace-wrap">{lib}</td> : null
                                                    }
                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>

                </SecondLayout>
            </SecondMain>
        </div>
    );
}

export default DisplayRapport;
