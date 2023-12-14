
export type getUsers = {
    id_klient: number;
    imie: string;
    nazwisko: string;
    data_urodzenia: string;
    telefon: string;
}

export type getTrainers = {
    id_trener: number;
    id_klub: number;
    imie: string;
    nazwisko: string;
    data_urodzenia: string;
    telefon: string;
}

export type getClubs = {
    id_klub: number;
    nazwa: string;
    miasto: string;
    telefon: string;
}


