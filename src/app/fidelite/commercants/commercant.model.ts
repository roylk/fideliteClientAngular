export class CommercantMirror {
    code: string ;
    acronyme: string;
    nom: string;
    telephone1:string;
    telephone2:string;
    adresse:string;
    email: string;
    statut: number ;
    ville :string ;
    
   

    //? devant les paramètres les rend optionnels(pas obligatoires)

    constructor(code?: string, acronyme?: string , nom?:  string,  telephone1?: string, telephone2?: string, adresse?: string, email?: string, statut?: number, ville?: string,){
        this.code = code;
        this.acronyme = acronyme;
        this.nom = nom;
        this.telephone1 = telephone1;
        this.telephone2 = telephone2;
        this.adresse= adresse;
        this.email=email;
        this.ville=ville;
        this.statut=statut;
    }
}

export class TerminalMirror {
    code: string ;
    designation: string;
    numeroSerie: string;
    pointDeVente:string;
    statut: number ;



  //? devant les paramètres les rend optionnels(pas obligatoires)

    constructor(code?: string, designation?: string , numeroSerie?:  string,  pointDeVente?: string,  statut?: number){
        this.code = code;
        this.designation = designation;
        this.numeroSerie = numeroSerie;
        this.pointDeVente = pointDeVente;
        this.statut = statut;
    }
}

export class ConversionMirror {
  id : number;
  nbpointInf : number;
  nbpointSup : number;
  reduction : number;
  type : number;
  commercant : string;


  //? devant les paramètres les rend optionnels(pas obligatoires)

  constructor(id? : number, nbpointInf?: number, nbpointSup?: number , reduction?:  number,  type?: number,  commercant?: string){
    this.id = id;
    this.nbpointInf = nbpointInf;
    this.nbpointSup = nbpointSup;
    this.reduction = reduction;
    this.type = type;
    this.commercant = commercant;
  }
}

export class PointsDeVenteMirror {
   code : string;
   acronyme : string;
   nom : string;
   adresse : string;
   email : string;
   telephone1 : string;
   telephone2 : string;
   statut : string;
   commercantCode : string;
   ville : string;


  //? devant les paramètres les rend optionnels(pas obligatoires)

  constructor(code?: string, acronyme?: string , nom?:  string , adresse?: string, email?: string,
              telephone1?: string, telephone2?: string, statut?: string, commercantCode?: string, ville?: string){
    this.code= code;
    this.acronyme = acronyme;
    this.nom = nom;
    this.adresse =adresse;
    this.email =email;
    this.telephone1 = telephone1;
    this.telephone2 =telephone2;
    this.statut =statut;
    this.commercantCode = commercantCode;
    this.ville =ville;
  }
}


export class PaysMirror {
    code:string;
    nom: string;
    dateCreation: Date;


    constructor(code?: string, nom ?: string, dateCreation?: Date){
        this.code = code;
        this.nom= nom;
        this.dateCreation = this.dateCreation;


    }

}

export class RegionMirror {
    id: number;
    code:string;
    nom: string;
    dateCreation: Date;
    pays: any;
    
    constructor(id?: number, code?: string, nom?: string, pays?: any, dateCreation?:Date){
        this.id=id;
        this.code = code;
        this.nom= nom;
        this.dateCreation = dateCreation;
        this.pays=pays;


    }
}


    export class VilleMirror {
        id: number;
        code:string;
        nom: string;
        dateCreation: Date;
        region: any;
    
    
        constructor(id?: number, code?: string, nom?: string, region?: any, dateCreation?:Date){
            this.id=id;
            this.code = code;
            this.nom= nom;
            this.dateCreation = dateCreation;
            this.region=region;
    
    
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




