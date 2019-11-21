export class ClientMirror {
    code: string ;
    titre: string;
    nom: string;
    prenom:string;
    dateNaissance:Date;
    telephone1:string;
    telephone2:string;
    adresse:string;
    email: string;
    statut: number ;
    ville :number ;
    
   

    //? devant les paramètres les rend optionnels(pas obligatoires)

    constructor(code?: string, titre?: string, nom?: string, prenom?: string, dateNaissance?: Date,  telephone1?: string, telephone2?: string, adresse?: string, email?: string, statut?: number, ville?: number,){
        this.code = code;
        this.titre= titre;
        this.nom = nom;
        this.prenom = prenom;
        this.dateNaissance;
        this.telephone1 = telephone1;
        this.telephone2 = telephone2;
        this.adresse= adresse;
        this.email=email;
        this.ville=ville;
        this.statut=statut;
        
    }
}

