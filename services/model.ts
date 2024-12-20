export interface User {
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    idpers: string;
    motPass: string;
    nomPers: string;
    pernomPers: string;
    genrePers: string;
    phonePers: string;
    situation: boolean;
    rolePers: string;
    sousComite: string;
    roleMembre: string;
  }
  
  // export interface AuthResponse {
  //   user: User;
  //   access_token: string;
  // }

  interface CategoryStats {
    frere: number ;
    soeur: number ;
    Total: number ;
  }

  export interface AddMaterielFormValues {
    designation: string;  
    quantite: number;
    statut: string;      
    date: string;
    lieu: string;
    cout: number;         
  }

  export interface UpdateMaterielFormValues{
    designation: string; 
    quantite: number; 
    statut: string; 
    date: string; 
    lieu: string; 
    cout: number; 
}

  
export interface UpdateMaterielFormValues {
  nomMateriel: string;
  quantite: number;
  etat: string;
  genre: string;
  sousComite: string;
}

  export interface MembreCo {
    frere: number;         // Nombre de frères
    soeur: number;         // Nombre de sœurs
    non_defini: number;         // Total des membres
  }

  export interface Seminariste {
    frere: number;         // Nombre de frères
    soeur: number;         // Nombre de sœurs
    Total: number;         // Total des séminaristes
    m: boolean | null;
  }

  export interface Commision {
    commission: string;
    total_frères: number;
    total_soeurs: number;
    total_membres: string;
  }

  export interface LoginFormValues {
    phonePers: string;
    motPass: string;
  }

  export interface AddCommissionFormValues {
    nomPers: string;
    pernomPers: string;
    genrePers: "frere" | "soeur" | "";
    phonePers: string;
    situation: string | null; 
    sousComite: string; 
    commission: string;
    motPass: string; 
    roleMembre: string;
  }

  export interface AddPcoFormValues {
    nomPers: string;
    pernomPers: string;
    genrePers: "frere" | "soeur" | "";
    phonePers: string;
    situation: string | null; 
    sousComite: string; 
    commission: string;
    motPass: string; 
    roleMembre: string;
  }
  

  export interface UpdatePcoFormValues {
    nomPers: string;
    pernomPers: string;
    genrePers: "frere" | "soeur" | "";
    phonePers: string;
    situation: string | null; 
    sousComite: string; 
    motPass: string; 
    roleMembre: string;
  }

  export interface UpdateCoFormValues {
    nomPers: string;
    pernomPers: string;
    genrePers: "frere" | "soeur" | "";
    phonePers: string;
    situation: string | null; 
    sousComite: string; 
    motPass: string; 
    roleMembre: string;
  }

  

  export interface AddSeminaristeFormValues {
    nomSemi: string;
    prenomSemi: string;
    age: number;
    genreSemi: string;
    phoneSemi: string ; 
    sousComite: string; 
    numUrgence: string; 
    dortoir: string;
    etatSante: string;
    situation: string | null;
    problemeSante: string;
  }

  export interface UpdateSeminaristeFormValues {
    nomSemi: string;
    prenomSemi: string;
    age: number;
    genreSemi: string;
    phoneSemi: string ; 
    sousComite: string; 
    numUrgence: string; 
    dortoir: string;
    etatSante: string;
    situation: string | null;
    problemeSante: string;
    niveau: string;
    categorie: string;
  }

  export interface AddNiveauFormValues {
    nomNiveau: string;
 }

 export interface AddDortoirFormValues {
  nomDortoir: string;
  genre: "frere" | "soeur" | "";
  typedortoir: "co" | "seminariste" | "non_defini" | "";
  nbPlace: number;
 }


export interface UpdateDortoirSeminaristeFormValues {

  dortoir: string;
}
 export interface AddVisiteurFormValues {
  nomVisiteur: string;
  pernomVisiteur: string;
  genreVisiteur: string;
  phoneVisiteur: string;
  roleVisiteur: string; // Rôle dans le sous-comité
  sousComite: string;
}
export interface UpdateVisiteurFormValues {
  nomVisiteur: string;
  pernomVisiteur: string;
  genreVisiteur: string;
  phoneVisiteur: string;
  roleVisiteur: string; // Rôle dans le sous-comité
  sousComite: string;
}
