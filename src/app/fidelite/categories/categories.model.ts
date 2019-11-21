export class CategoriesMirror {
    code: string ;
    lebelle: string;
    periodicite:string;
    action:number;
    politiqueEvaluation:string;
    statut: number ;
    commercant : any ;


    //? devant les paramètres les rend optionnels(pas obligatoires)

    constructor(code?: string, lebelle?:  string,  periodicite?: string, action?: number, politiqueEvaluation?: string, statut?: number, commercant?: any){
        this.code = code;
        this.lebelle = lebelle;
        this.periodicite = periodicite;
        this.action = action;
        this.politiqueEvaluation = politiqueEvaluation;
        this.statut = statut;
        this.commercant = commercant;
    }
}

export class PolitiqueEvaluationsMirror {
  code: string ;
  libele: string;
  description : any;


  //? devant les paramètres les rend optionnels(pas obligatoires)

  constructor(code?: string, libele?:  string,  description?: any){
    this.code = code;
    this.libele = libele;
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




