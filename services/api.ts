import axiosClient from '../config/axios';


    // Exemple de méthode GET

    const getDataById = async (endpoint: string, id?:any, params?: any) => {
        console.log("idInAxios", id);
        
        const access_token = localStorage.getItem("access_token") as string; ;
        try {
            const response = await axiosClient(access_token).get(`${endpoint}/${id}`, { params });
            return response;
        } catch (error) {
            console.error("Error in ge:", error);
            throw error;
        }
    }
    const getData = async (endpoint: string, params?: any) => {
        console.log("params", params);
        const access_token = localStorage.getItem("access_token") as string; ;
        try {
            const response = await axiosClient(access_token).get(endpoint, { params });
            return response;
        } catch (error) {
            console.error("Error in ge:", error);
            throw error;
        }
    }

    // Exemple de méthode POST
   const  postData = async (endpoint: string, data: any) => {
    console.log("data", data);
    const access_token = localStorage.getItem("access_token");
        try {
            const response = await axiosClient(access_token).post(endpoint, data); 
            return response;
        } catch (error) { 
            console.error("Error in postData:", error);
            throw error;
        }
    }

    // Exemple de méthode PUT
    const updateData = async (endpoint: string, id:any, data: any) => {
        console.log("idInAxios", id);
        
        const access_token = localStorage.getItem("access_token");
        try {
            const response = await axiosClient(access_token).patch(`${endpoint}/${id}`, data);
            return response;
        } catch (error) {
            console.error("Error in updateData:", error);
            throw error;
        }
    }

    // Exemple de méthode DELETE
    const deleteData = async (endpoint: string,id:any) => {
        const access_token = localStorage.getItem("access_token");
        try {
            const response = await axiosClient(access_token).delete(`${endpoint}/${id}`);
            return response;
        } catch (error) {
            console.error("Error in deleteData:", error);
            throw error;
        }
    }
const apiService = {
        getUser: async () => getData("/get"),
        loginUser: async (data: any) => postData("/auth/signIn", data),
        getMembresCo: async () => getData("/membre-co/TotalGender"),
        getSeminariste: async () => getData("/seminariste/totalByGender"),
        getDortoir: async () => getData("/dortoirs/totaldortoirBytype"),
        getCommission: async () => getData("/commission/totalByGender"),
        //co
        addMembereCo: async (data: any) => postData("/membre-co/add", data),
        getPcoById: async (pcoId: any) => getDataById(`/membre-co/getPcobyid`, pcoId),
        getCoById: async (coId: any) => getDataById(`/membre-co/getCobyid`, coId),
        getListParCo: async () => getData("/commission/listeparco"),
        updatePco: async (id:any,data: any) => updateData("/membre-co/update", id, data),
        updateCo: async (id:any,data: any) => updateData("/membre-co/update", id, data),
        deletePco: async (id: any) => deleteData("/membre-co/delete", id),
        deleteCo: async (id: any) => deleteData("/membre-co/delete", id),

        //membreco
        getTotalGender: async () => getData("/membre-co/TotalGender"),
        getTotalFormateur: async () => getData("/membre-co/totalFormateur"),
        getPco: async () => getData("/membre-co/getPco"),

        getAllDortoir: async () => getData("/dortoirs"),
        addSeminariste: async (data: any) => postData("/seminariste/add", data),
        deleteSeminariste: async (id: any) => deleteData("/seminariste/delete", id),
        updateSeminariste: async (id:any,data: any) => updateData("/seminariste/update", id, data),
        getStatistiqueSeminariste: async () => getData("/seminariste/totalByCateg"),
        addNiveau: async (data: any) => postData("/niveau/add", data),
        getNiveau: async () => getData("/niveau/all"),
        getSeminaristeById: async (seminaristeId: any) => getDataById(`/seminariste/getone`, seminaristeId),

        // dortoir
        getDortoirList: async () => getData("/dortoirs/listeDortoir"),
        addDortoir: async (data: any) => postData("/dortoirs/add", data),
        deleteDortoir: async (id: any) => deleteData("/dortoirs/delete", id),
        updateDortoir: async (id:any,data: any) => updateData("/dortoirs/update", id, data),
        getDortoirById: async (dortoirId: any) => getDataById(`/dortoirs/getone`, dortoirId),
        getTotalDortoirByType: async () => getData("/dortoirs/totaldortoirBytype"),
        getTotalDortoirByGenre: async () => getData("/dortoirs/totaldortoirByGenre"),
        updateDortoirSeminariste: async (id:any,data: any) => updateData("/seminariste/update", id, data),

        // visiteur
        addVisiteur: async (data: any) => postData("/visiteur/add", data),
        getNbVisiteurDuJours: async (currentDate:string) => getData(`/visiteur/totalByJourParGenre?date=${currentDate}`),
        getTotalVisiteurByGenre: async () => getData("/visiteur/totalByGenre"),
        getVisiteurEnCours: async () => getData("/visiteur/visites/encours"),
        getVisiteurTermines: async () => getData("/visiteur/visites/termine"), 
        getVisiteurById: async (visiteurId: any) => getDataById(`/visiteur/getone`, visiteurId),
        updateVisiteur: async (id:any,data: any) => updateData("/visiteur/update", id, data),
        deleteVisiteur: async (id: any) => deleteData("/visiteur/delete", id),
        terminateVisiteur: async (id: any) => deleteData("/visiteur/softdelete", id), 
        getTotalVisiteurByDay: async () => getData("/visiteur/totalByday"),
        // getTotalVisiteurByGenre: async () => getData("/visiteur/totalByGenre"),



        //materiel  

        getTotalByComi: async () => getData("/materiel/getTotalByComi"),
        getStatMateriel: async () => getData("/commission/statistiquematerielBycomi"),
        updateMateriel: async (id:any,data: any) => updateData("/materiel/update", id, data),
        addMateriel: async (data: any) => postData("/materiel/add", data),
        getAllMateriel: async () => getData("/materiel/getAll"),
        deleteMateriel: async (id: any) => deleteData("/materiel/delete", id),
        getMaterielById: async (materielId: any) => getDataById(`/materiel/getone`, materielId),

}; 

export default apiService;
