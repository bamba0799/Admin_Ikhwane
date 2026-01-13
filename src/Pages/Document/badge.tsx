import { useParams } from "react-router-dom";
import BadgeCo from "../../ components/Pdf/badgeCo";
import BadgeSeminariste from "../../ components/Pdf/badgeSeminariste";


const Badge = () => {
    const { userType } = useParams();
    const userData = JSON.parse(userType || '{}');
    console.log("userData", userData);

    return (
        <div className="flex flex-row justify-center items-center py-[20px]">
            {userData.userType === 'semi' ? (
                <BadgeSeminariste dortoir={userData.dortoir} firstname={userData.nom} lastname={userData.prenom} niveau={'1'} />
            ) : (
                <BadgeCo dortoir={userData.dortoir} firstname={userData.nom} lastname={userData.prenom} niveau={'1'} />
            )}
        </div>
    );
};

export default Badge;
