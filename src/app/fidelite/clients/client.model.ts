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
    ville :string ;
    
   

    //? devant les paramètres les rend optionnels(pas obligatoires)

    constructor(code?: string, titre?: string, nom?: string, prenom?: string, dateNaissance?: Date,  telephone1?: string, telephone2?: string, adresse?: string, email?: string, statut?: number, ville?: string,){
        this.code = code;
        this.titre= titre;
        this.nom = nom;
        this.prenom = prenom;
        this.dateNaissance = dateNaissance;
        this.telephone1 = telephone1;
        this.telephone2 = telephone2;
        this.adresse= adresse;
        this.email=email;
        this.ville=ville;
        this.statut=statut;
    }
}

export class PaysMirror {
    code:string;
    nom: string;
    dateCreation: Date;
    description: string;


    constructor(code?: string, nom ?: string, dateCreation?: Date, description?: string){
        this.code = code;
        this.nom= nom;
        this.dateCreation =dateCreation;
        this.description = description;
    }

}

export class RegionMirror {
    id: number;
    code:string;
    nom: string;
    dateCreation: Date;
    pays: any;
    description: any;
    
    constructor(id?: number, code?: string, nom?: string, dateCreation?:Date, pays?: any,  description?:any){
        this.id=id;
        this.code = code;
        this.nom= nom;
        this.dateCreation = dateCreation;
        this.pays=pays;
        this.description=description;


    }
}


    export class VilleMirror {
        id: number;
        code:string;
        nom: string;
        dateCreation: Date;
        region: any;
        description: any;
    
    
        constructor(id?: number, code?: string, nom?: string, dateCreation?:Date, region?: any, description?: any ){
            this.id=id;
            this.code = code;
            this.nom= nom;
            this.dateCreation = dateCreation;
            this.region=region;
            this.description=description;
    
    
        }

}

export class Reponse{
    status: number;
    message:string;
    data: any;

    constructor(status?: number, message?:string, data?:any){
        this.status=status;
        this.message=message;
        this.data=data;
    }
}




