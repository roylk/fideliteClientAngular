export class OffreMirror {
  id : number;
  code: string ;
  libele: string;
  orientation: number;
  dateDebut:Date;
  dateFin:Date;
  statut:number;
  categorieCarte:string;
  typeOffre:string;


    //? devant les paramètres les rend optionnels(pas obligatoires)
    constructor(id?: number, code?: string, libele?: string, orientation?: number, dateDebut?: Date, dateFin?: Date,  statut?: number, categorieCarte?: string, typeOffre?: string){
        this.id= id;
        this.code = code;
        this.libele= libele;
        this.orientation = orientation;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.statut = statut;
        this.categorieCarte = categorieCarte;
        this.typeOffre= typeOffre;
    }
}

export class UserMirror {
  id : number;
  nom: string ;
  prenom: string;
  telephone: string;
  email:string;
  login:string;
  motDePasse:string;
  sexe:string;
  statut:number;
  commercant:string;
  role:number;


    //? devant les paramètres les rend optionnels(pas obligatoires)
    constructor(id?: number, nom?: string, prenom?: string, telephone?: string, email?:string, login?: string,  motDePasse?: string, sexe?: string, statut?: number, commercant?:string, role?:number){
        this.id= id;
        this.nom = nom;
        this.prenom= prenom;
        this.telephone=telephone;
        this.email = email;
        this.login = login;
        this.motDePasse = motDePasse;
        this.sexe= sexe;
        this.statut=statut;
        this.commercant=commercant;
        this.role=role;
    }
}

export class PalierMirror {
  id : number;
  montantInf: number ;
  montantSup: number;
  uniteDevise: number;
  unitePoint:number;
  offre:string;

    //? devant les paramètres les rend optionnels(pas obligatoires)
    constructor(id?: number, montantInf?: number, montantSup?: number, uniteDevise?: number, unitePoint?: number, offre?: string){
      this.id=id;
        this.montantInf = montantInf;
        this.montantSup= montantSup;
        this.uniteDevise = uniteDevise;
        this.unitePoint = unitePoint;
        this.offre = offre;
    }
}



export class TypeOffreMirror {
  id : number;
  code: string ;
  libelle: string;
  description: string;

  //? devant les paramètres les rend optionnels(pas obligatoires)
  constructor(id?: number, code?: string, libelle?: string, description?: string){
    this.id=id;
    this.code = code;
    this.libelle= libelle;
    this.description = description;
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




