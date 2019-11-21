import {Validators} from '@angular/forms';

export class CarteMirror {
  numero: string;
  compteurPoint: number = 0;
  montantAcumule: number = 0;
  nombreTransaction: number = 0;
  statut : number;
  categorieCarte : string;
  client : string;


    //? devant les paramètres les rend optionnels(pas obligatoires)

    constructor(numero?: string, compteurPoint?:  number,  montantAcumule?: number, nombreTransaction?: number, statut?: number, categorieCarte?: string, client?: any){
        this.numero = numero;
        this.compteurPoint = compteurPoint;
        this.montantAcumule = montantAcumule;
        this.nombreTransaction = nombreTransaction;
        this.statut = statut;
        this.categorieCarte = categorieCarte;
        this.client = client;
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

export class TransactionMirror {
    transactionId: string;
    dateTransaction: Date;
    montantInitial: number=0;
    montantReduit: number=0;
    dateEnregistrement:Date;
    commentaire: string;
    carte: string;
    terminal: string;

      //? devant les paramètres les rend optionnels(pas obligatoires)

      constructor(transactionId?: string, dateTransaction?: Date, montantInitial?: number, montantReduit?: number, dateEnregistrement?: Date, commentaire?: string,  carte?: any, terminal?: any){
        this.transactionId =transactionId;
        this.dateTransaction = dateTransaction;
        this. montantInitial =  montantInitial;
        this. montantReduit =  montantReduit;
        this.dateEnregistrement = dateEnregistrement;
        this.commentaire = commentaire;
        this. carte =  carte;
        this.terminal=terminal
    }
}
    
    





